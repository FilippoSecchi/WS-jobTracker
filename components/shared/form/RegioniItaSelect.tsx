// components/shared/form/ProvinceItaSelect.tsx
"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Regione {
  id: number;
  nome: string;
}

interface RegioneSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RegioneSelect({ value, onChange }: RegioneSelectProps) {
  const [open, setOpen] = useState(false);
  const [regioni, setRegioni] = useState<Regione[]>([]);

  useEffect(() => {
    fetch("/data/regioni_ita.json")
      .then((res) => res.json())
      .then(setRegioni)
      .catch((err) => console.error("Errore caricamento Regioni Italia:", err));
  }, []);

  const selectedRegione = regioni.find((c) => String(c.id) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedRegione ? selectedRegione.nome : "Seleziona una Regione..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-64 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Cerca Regione..." />
          <CommandList>
            <CommandEmpty>Nessuna Regione trovata...</CommandEmpty>
            <CommandGroup>
              {regioni.map((c, i) => (
                <CommandItem
                  key={`${c.id}-${i}`}
                  value={c.nome}
                  onSelect={() => {
                    onChange(String(c.id));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === String(c.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {c.nome}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
