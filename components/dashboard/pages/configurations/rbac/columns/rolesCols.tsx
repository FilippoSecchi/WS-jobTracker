"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
//import { tr } from "zod/v4/locales"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type AppRolesType = {
    id: string;
    name: string;
    description?: string;
    color?: string;
    is_rounded?: boolean;
    has_border?: boolean;
    has_bullet?: boolean;
    is_active: boolean;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
  }

const grayscaleColors = [
  '#000000', '#1a1a1a', '#333333', '#4d4d4d', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6', '#ffffff'
]

const predefinedColors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#008000' },
  { name: 'Light Blue', value: '#ADD8E6' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Purple', value: '#800080' },
  { name: 'Violet', value: '#EE82EE' },
  { name: 'Brown', value: '#A52A2A' },
]

const RoleDetailsDrawer = ({ rowData }: { rowData: AppRolesType }) => {
  const [editingName, setEditingName] = React.useState(false)
  const [editingDesc, setEditingDesc] = React.useState(false)
  const [nameValue, setNameValue] = React.useState(rowData.name)
  const [descValue, setDescValue] = React.useState(rowData.description || '')
  const [roundedValue, setRoundedValue] = React.useState(rowData.is_rounded || false)
  const [borderValue, setBorderValue] = React.useState(rowData.has_border || false)
  const [bulletValue, setBulletValue] = React.useState(rowData.has_bullet || false)
  const [activeValue, setActiveValue] = React.useState(rowData.is_active)
  const [colorValue, setColorValue] = React.useState(rowData.color || '#000000')
  const [colorDialogOpen, setColorDialogOpen] = React.useState(false)

  const handleSaveName = async () => {
    try {
      // TODO: call update API with nameValue
      toast.success("Nome aggiornato con successo")
      setEditingName(false)
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento del nome")
    }
  }

  const handleSaveDesc = async () => {
    try {
      // TODO: call update API with descValue
      toast.success("Descrizione aggiornata con successo")
      setEditingDesc(false)
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento della descrizione")
    }
  }

  const handleSaveActive = async (value: boolean) => {
    try {
      // TODO: call update API with value
      setActiveValue(value)
      toast.success("Stato aggiornato con successo")
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento dello stato")
    }
  }

  const handleSaveRounded = async (value: boolean) => {
    try {
      // TODO: call update API with value
      setRoundedValue(value)
      toast.success("Stato aggiornato con successo")
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento dello stato")
    }
  }

  const handleSaveBullet = async (value: boolean) => {
    try {
      // TODO: call update API with value
      setBulletValue(value)
      toast.success("Stato aggiornato con successo")
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento dello stato")
    }
  }

  const handleSaveBorder = async (value: boolean) => {
    try {
      // TODO: call update API with value
      setBorderValue(value)
      toast.success("Stato aggiornato con successo")
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento dello stato")
    }
  }

  const handleSaveColor = async (value: string) => {
    try {
      // TODO: call update API with value
      setColorValue(value)
      setColorDialogOpen(false)
      toast.success("Colore aggiornato con successo")
    } catch (err) {
      console.error(err)
      toast.error("Errore nell'aggiornamento del colore")
    }
  }

  return (
    <Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <span className="sr-only">Apri Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="font-bold hover:bg-violet-800 hover:text-white text-center"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(rowData.id)
                toast.success("ID copiato negli appunti")
              } catch (err) {
                console.error(err)
                toast.error("Errore nel copiare l'ID")
              }
            }}
          >
            <Copy /> Copia ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DrawerTrigger asChild>
            <DropdownMenuItem>Dettagli</DropdownMenuItem>
          </DrawerTrigger>
          <DropdownMenuItem
            onClick={async () => {
              try {
                // TODO: call delete API here
                toast.success("Eliminato con successo")
              } catch (err) {
                console.error(err)
                toast.error("Errore durante l'eliminazione")
              }
            }}
          >
            Elimina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerContent>
        <div className="mx-auto w-full max-w-full sm:w-3/4 lg:w-3/4 xl:w-4/5 2xl:w-4/5">
          <DrawerHeader>
            <DrawerTitle>Dettagli Ruolo</DrawerTitle>
            <DrawerDescription>ID: {rowData.id}</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[50vh] w-full rounded-md border-none p-4">
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <Label className="font-semibold">Nome:</Label>
                {editingName ? (
                  <div className="flex space-x-2">
                    <Input
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      onBlur={handleSaveName}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      autoFocus
                    />
                    <Button onClick={handleSaveName} size="sm">Salva</Button>
                    <Button onClick={() => setEditingName(false)} variant="outline" size="sm">Annulla</Button>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer p-2 rounded hover:bg-gray-100"
                    onClick={() => setEditingName(true)}
                  >
                    {nameValue}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Descrizione:</Label>
                {editingDesc ? (
                  <div className="space-y-2">
                    <Textarea
                      value={descValue}
                      onChange={(e) => setDescValue(e.target.value)}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveDesc} size="sm">Salva</Button>
                      <Button onClick={() => setEditingDesc(false)} variant="outline" size="sm">Annulla</Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer p-2 rounded hover:bg-gray-100"
                    onClick={() => setEditingDesc(true)}
                  >
                    {descValue || 'Nessuna descrizione'}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Colore Sfondo:</Label>
                <Dialog open={colorDialogOpen} onOpenChange={setColorDialogOpen}>
                  <DialogTrigger asChild>
                    <div
                      className="w-8 h-8 rounded cursor-pointer border"
                      style={{ backgroundColor: colorValue }}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Seleziona Colore</DialogTitle>
                      <DialogDescription>Scegli un colore per il ruolo</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="font-semibold">Scala di Grigi</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {grayscaleColors.map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded border hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => handleSaveColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="font-semibold">Colori Predefiniti</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {predefinedColors.map((color) => (
                            <button
                              key={color.value}
                              className="w-8 h-8 rounded border hover:scale-110 transition-transform"
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                              onClick={() => handleSaveColor(color.value)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="font-semibold">Selettore Colore Personalizzato</Label>
                        <div className="mt-2">
                          <input
                            type="color"
                            value={colorValue}
                            onChange={(e) => handleSaveColor(e.target.value)}
                            className="w-full h-10 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setColorDialogOpen(false)} variant="outline">Chiudi</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Bordo:</Label>
                <Switch
                  checked={borderValue}
                  onCheckedChange={handleSaveBorder}
                />
                <span className="ml-2">{borderValue ? "Attivo" : "Disattivo"}</span>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Bullet:</Label>
                <Switch
                  checked={bulletValue}
                  onCheckedChange={handleSaveBullet}
                />
                <span className="ml-2">{bulletValue ? "Attivo" : "Disattivo"}</span>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Arrotondato:</Label>
                <Switch
                  checked={roundedValue}
                  onCheckedChange={handleSaveRounded}
                />
                <span className="ml-2">{roundedValue ? "Attivo" : "Disattivo"}</span>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Stato:</Label>
                <Switch
                  checked={activeValue}
                  onCheckedChange={handleSaveActive}
                />
                <span className="ml-2">{activeValue ? "Attivo" : "Disattivo"}</span>
              </div>
              <Separator />
              <div className="font-semibold">Metadata</div>
              <div className="text-sm text-muted-foreground">
                <div>Data Creazione: <span className="font-medium">{new Intl.DateTimeFormat('it-IT', { dateStyle: 'full', timeStyle: 'short'}).format(new Date(rowData.created_at))}</span></div>
                <div>Creato da: {rowData.created_by}</div>
                <div>Ultima Modifica: <span className="font-medium">{new Intl.DateTimeFormat('it-IT', { dateStyle: 'full', timeStyle: 'short'}).format(new Date(rowData.updated_at))}</span></div>
                <div>Aggiornato da: {rowData.updated_by}</div>
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter>
            <Button onClick={() => toast.message("Modifica", { description: `Form di modifica per ID: ${rowData.id}` })}>
              Modifica (TODO)
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  // TODO: call delete API here
                  toast.success("Eliminato con successo")
                } catch (err) {
                  console.error(err)
                  toast.error("Errore durante l'eliminazione")
                }
              }}
            >
              Elimina
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export const rolesColumns: ColumnDef<AppRolesType>[] = [
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
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Nome
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Descrizione
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Colore
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_rounded",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Arrotondato
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "has_border",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Bordo
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "has_bullet",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Bullet
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Stato
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Creato il
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Creato da
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Aggiornato il
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "updated_by",
    header: ({ column }) => {
        return (
            <div className="flex flex-row items-center space-x-2">
            <Button
                className="text-left text-base font-semibold"
                variant="link"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Aggiornato da
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
        )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: () => {
        return (
            <div className="flex flex-row items-center space-x-2">
              <p className="text-left text-base font-semibold px-3">
                Azioni
              </p>
            </div>
        )
    },
    cell: ({ row }) => <RoleDetailsDrawer rowData={row.original} />,
  },
]


