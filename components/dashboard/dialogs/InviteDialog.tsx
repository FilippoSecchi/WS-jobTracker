"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";

export default function InviteDialog() {
  const [open, setOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

  const handleSendInvite = () => {
    // TODO: Implement invite logic
    console.log("Invite:", { inviteEmail, selectedRole });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <UserPlus className='mr-2 h-4 w-4' />
        Invita Worker
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invia un invito a un nuovo lavoratore</DialogTitle>
            <DialogDescription>
              Inserisci l&lsquo; indirizzo email e seleziona il ruolo per il nuovo lavoratore.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='worker-email'>Email</Label>
              <Input
                id='worker-email'
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder='lavoratore@example.com'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='worker-role'>Ruolo</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
                <SelectTrigger id='worker-role'>
                  <SelectValue placeholder='Seleziona un ruolo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Cuoco'>Cuoco</SelectItem>
                  <SelectItem value='Cameriere'>Cameriere</SelectItem>
                  <SelectItem value='Barista'>Barista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSendInvite}>Invia Invito</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}