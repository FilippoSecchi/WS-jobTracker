"use client";

import React from "react";
import parsePhoneNumber from "libphonenumber-js";
import { PhoneInput } from "@/components/shared/form/phone-input";

type PhoneInputSelectProps = {
  value: string; // national number (without country calling code)
  prefix: string; // e.g. "+39"
  onPrefixChange: (val: string) => void;
  onNumberChange: (val: string) => void;
  placeholder?: string;
  className?: string;
};

// Compose full E.164-like value from prefix and national number
function composeValue(prefix: string, number: string): string {
  const p = (prefix || "").trim();
  const normalizedPrefix = p ? (p.startsWith("+") ? p : `+${p}`) : "";
  const n = (number || "").trim();
  return `${normalizedPrefix}${n}`;
}

export default function PhoneInputSelect({
  value,
  prefix,
  onPrefixChange,
  onNumberChange,
  placeholder,
  className,
}: PhoneInputSelectProps) {
  const internalValue = React.useMemo(
    () => composeValue(prefix, value),
    [prefix, value]
  );

  // Derive defaultCountry from current composed value (helps flag rendering)
  const defaultCountry = React.useMemo(() => {
    try {
      const parsed = parsePhoneNumber(internalValue);
      return parsed?.country;
    } catch {
      return undefined;
    }
  }, [internalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    try {
      const parsed = parsePhoneNumber(inputVal);
      if (parsed) {
        const newPrefix = `+${parsed.countryCallingCode}`;
        const national = parsed.nationalNumber || "";

        // Update prefix if changed
        if (newPrefix !== prefix) onPrefixChange(newPrefix);
        // Always update national number
        onNumberChange(national);
        return;
      }
    } catch {
      // Fallback: keep only digits for number, don't change prefix
      const national = inputVal.replace(/[^0-9]/g, "");
      onNumberChange(national);
      return;
    }

    // If parsing returned falsy without throwing
    const national = inputVal.replace(/[^0-9]/g, "");
    onNumberChange(national);
  };

  return (
    <PhoneInput
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder || "Enter your number"}
      defaultCountry={defaultCountry}
      className={className}
      inline
    />
  );
}