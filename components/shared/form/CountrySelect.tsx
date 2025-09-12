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

interface Country {
  id: number;
  name_it: string;
  name_en: string;
  code: string;
  eu_country: boolean;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then(setCountries)
      .catch((err) => console.error("Errore caricamento countries:", err));
  }, []);

  const selectedCountry = countries.find((c) => String(c.id) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCountry ? (
            `${selectedCountry.name_it} (${selectedCountry.code})`
          ) : (
            "Seleziona un paese..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-64 overflow-y-auto scroll mt-0">
        <Command>
          <CommandInput placeholder="Cerca paese..." />
          <CommandList>
            <CommandEmpty>Nessun paese trovato.</CommandEmpty>
            <CommandGroup>
              {countries.map((c, i) => (
                <CommandItem
                  key={`${c.id}-${i}`}
                  value={c.name_it}
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
                  {c.name_it} ({c.code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
