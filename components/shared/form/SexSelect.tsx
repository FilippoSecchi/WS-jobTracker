'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SexSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function SexSelect({ value, onChange }: SexSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleziona..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="woman">Femmina</SelectItem>
        <SelectItem value="man">Maschio</SelectItem>
        <SelectItem value="other">Altro</SelectItem>
      </SelectContent>
    </Select>
  )
}
