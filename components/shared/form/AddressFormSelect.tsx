'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Country {
  id: number;
  name_it: string;
  name_en: string;
  code: string;
  eu_country: boolean;
}

interface Regione {
  id: number;
  nome: string;
}

interface Provincia {
  id: number;
  regione_id: number;
  nome: string;
}

interface OptionType {
  value: number;
  label: string;
}

// Tipizzazione corretta: Select<OptionType, false> → false = non multi-select
const Select = dynamic(() => import('react-select'), { ssr: false }) as typeof import('react-select').default;

export default function AddressFormSelect() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regioni, setRegioni] = useState<Regione[]>([]);
  const [province, setProvince] = useState<Provincia[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedRegione, setSelectedRegione] = useState<Regione | null>(null);
  const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(null);

  useEffect(() => {
    fetch('/data/countries.json').then(res => res.json()).then(setCountries);
    fetch('/data/regioni_ita.json').then(res => res.json()).then(setRegioni);
    fetch('/data/province_ita.json').then(res => res.json()).then(setProvince);
  }, []);

  const countryOptions: OptionType[] = countries.map(c => ({
    value: c.id,
    label: `${c.name_it} (${c.code})`,
  }));

  const regioneOptions: OptionType[] = selectedCountry?.code === 'IT'
    ? regioni.map(r => ({ value: r.id, label: r.nome }))
    : [];

  const provinciaOptions: OptionType[] = selectedRegione
    ? province
        .filter(p => p.regione_id === selectedRegione.id)
        .map(p => ({ value: p.id, label: p.nome }))
    : [];

  return (
    <form className="space-y-4">
            <div className="flex flex-col gap-6">
      {/* COUNTRY */}
              <div className="grid gap-2">        
                <Label htmlFor="country">Paese</Label>
        <Select<OptionType, false>
                  id="country"
          options={countryOptions}
          value={selectedCountry ? { value: selectedCountry.id, label: `${selectedCountry.name_it} (${selectedCountry.name_en})` } : null}
          onChange={(option) => {
            const country = countries.find(c => c.id === option?.value) || null;
            setSelectedCountry(country);
            setSelectedRegione(null);
            setSelectedProvincia(null);
          }}
          isClearable
        />
      </div>

      {/* REGIONI */}
      {selectedCountry && selectedCountry.code === 'IT' && (
              <div className="grid gap-2">
                <Label htmlFor="regione">Regione</Label>
          <Select<OptionType, false>
            id="regione"
            options={regioneOptions}
            value={selectedRegione ? { value: selectedRegione.id, label: selectedRegione.nome } : null}
            onChange={(option) => {
              const regione = regioni.find(r => r.id === option?.value) || null;
              setSelectedRegione(regione);
              setSelectedProvincia(null);
            }}
            isClearable
          />
        </div>
      )}

      {/* PROVINCE */}
      {selectedRegione && (
              <div className="grid gap-2">
                <Label htmlFor="regione">Provincia</Label>
          <Select<OptionType, false>
            id="provincia"
            options={provinciaOptions}
            value={selectedProvincia ? { value: selectedProvincia.id, label: selectedProvincia.nome } : null}
            onChange={(option) => {
              const provincia = province.find(p => p.id === option?.value) || null;
              setSelectedProvincia(provincia);
            }}
            isClearable
          />
        </div>
      )}
      

      {/* EU / Permesso di soggiorno */}
      {selectedCountry && (
              <div className="grid gap-2">
          {selectedCountry.eu_country ? (
            <p>Comunitario</p>
          ) : (
             <p>Permesso di soggiorno</p>
          )}
        </div>
      )}

      </div>
    </form>
  );
}
