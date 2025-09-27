"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"




export type AppStyleType = {
    id: string;
    name: string;
    description?: string;
    text_color?: string;
    text_transform?: string;
    font_style?: string;
    font_size?: string;
    has_border?: boolean;
    has_bullet?: boolean;
    is_rounded?: boolean;
    padding_x?: number;
    padding_y?: number;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
  }



export const styleColumns: ColumnDef<AppStyleType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleziona Tutto"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleziona Riga"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-start space-x-2">
            <Button
                className="text-left text-sm font-normal"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
          cell: ({ row }) => (
            <div className="font-medium text-left">{row.getValue("name")}</div>
          ),
  },
  {
    accessorKey: "preview",
    header: "Anteprima",
    cell: () => (
      <Label className="font-medium text-left px-4 py-1 bg-black text-white rounded-md">Preview</Label>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrizione",
  },
  {
    accessorKey: "text_color",
    header: "Colore",
    cell: () => {
      return (        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="white">Bianco</SelectItem>
              <SelectItem value="black">Nero</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> 
      )
    },
  },
  {
    accessorKey: "text_transform",
    header: "Formattazione",
    cell: () => {
      return (        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="capitalize">Prima Maiuscola</SelectItem>
              <SelectItem value="uppercase">Tutto Maiuscolo</SelectItem>
              <SelectItem value="lowercase">Tutto Minuscolo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> 
      )
    },
  },
  {
    accessorKey: "font_style",
    header: "Stile",
    cell: () => {
      return (        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="normal">Normale</SelectItem>
              <SelectItem value="semi-bold">Semi-bold</SelectItem>
              <SelectItem value="bold">Grassetto</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> 
      )
    },
  },
  {
    accessorKey: "font_size",
    header: "Dimensione",
    cell: () => {
      return (        
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="xs">Extra Small</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> 
      )
    },
  },
  {
    accessorKey: "padding_x",
    header: "Sp. Oriz.",
    cell: () => {
      return (        
        <Input type="number" className="max-w-[120px]" /> 
      )
    },
  },
  {
    accessorKey: "padding_y",
    header: "Sp. Vert.",
    cell: () => {
      return (        
        <Input type="number" className="max-w-[120px]" /> 
      )
    },
  },
  {
    accessorKey: "has_border",
    header: "Bordo",
    cell: () => {
      return ( 
        <div className="text-left">       
          <Switch id="has_border" />
        </div>
      )
    },
  },
  {
    accessorKey: "is_rounded",
    header: "Smussato",
    cell: () => {
      return (        
        <div className="text-left">       
          <Switch id="is_rounded" />
        </div>
      )
    },
  },
  {
    accessorKey: "has_bullet",
    header: "Bullet",
    cell: () => {
      return (        
        <div className="text-left">       
          <Switch id="has_bullet" />
        </div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Creato il",
  },
  {
    accessorKey: "created_by",
    header: "Creato da",
  },
  {
    accessorKey: "updated_at",
    header: "Agiornato il",
  },
  {
    accessorKey: "updated_by",
    header: "Aggiornato da",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="link" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]