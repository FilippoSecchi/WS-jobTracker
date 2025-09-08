'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EuCitizenSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function EuCitizenSelect({ value, onChange }: EuCitizenSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
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
