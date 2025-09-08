'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SiNoSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean  
}

export default function SiNoSelect({ value, onChange, disabled }: SiNoSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleziona..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Si</SelectItem>
        <SelectItem value="1">No</SelectItem>
      </SelectContent>
    </Select>
  )
}
