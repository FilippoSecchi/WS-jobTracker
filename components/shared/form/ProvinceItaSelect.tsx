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

interface Provincia {
  id: number;
  regione_id: number;
  nome: string;
  code: string;
}

interface ProvinciaSelectProps {
  value: string;
  regioneId?: string; // 🔑 filtro province per regione
  onChange: (value: string) => void;
}

export default function ProvinciaSelect({ value, regioneId, onChange }: ProvinciaSelectProps) {
  const [open, setOpen] = useState(false);
  const [province, setProvince] = useState<Provincia[]>([]);

  useEffect(() => {
    fetch("/data/province_ita.json")
      .then((res) => res.json())
      .then(setProvince)
      .catch((err) => console.error("Errore caricamento Province Italia:", err));
  }, []);

  const filteredProvince = regioneId
    ? province.filter((p) => String(p.regione_id) === regioneId)
    : [];

  const selectedProvincia = filteredProvince.find((c) => String(c.id) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={!regioneId} // disabilitato finché non scelgo regione
        >
          {selectedProvincia ? `${selectedProvincia.nome} (${selectedProvincia.code})` : "Seleziona una Provincia..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-64 overflow-y-auto">
        <Command>
          <CommandInput placeholder="Cerca Provincia..." />
          <CommandList>
            <CommandEmpty>Nessuna Provincia trovata...</CommandEmpty>
            <CommandGroup>
              {filteredProvince.map((c, i) => (
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
                  {c.nome} ({c.code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
