"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Briefcase, Image as ImageIcon, Mail, MapPin, Phone, PlusCircle, Shield, User, Upload } from "lucide-react";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";

// ----------------------
// Schema & Types
// ----------------------
const profileSchema = z.object({
  firstName: z.string().min(1, "Il nome è obbligatorio"),
  lastName: z.string().min(1, "Il cognome è obbligatorio"),
  email: z.string().email("Email non valida"),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || /^\+?[0-9 ()-]{6,20}$/.test(v), {
      message: "Numero di telefono non valido",
    }),
  location: z.string().optional().nullable(),
  jobTitle: z.string().optional().nullable(),
  bio: z.string().max(1000, "La biografia non può superare 1000 caratteri").optional().nullable(),
  skills: z.array(z.string().min(1, "La skill non può essere vuota")).min(0),
});

export type ProfileViewModel = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string | null;
  location?: string | null;
  jobTitle?: string | null;
  bio?: string | null;
  joinDate?: string | null;
  skills: Array<string>;
};

function getInitials(first: string, last: string) {
  const f = first?.[0] ?? "";
  const l = last?.[0] ?? "";
  return (f + l).toUpperCase() || "U";
}

// ----------------------
// Component
// ----------------------
export default function ProfileClient({ profile }: { profile: ProfileViewModel }) {
  const [isEditing, setIsEditing] = useState(false);

  // Local file states to upload on submit
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  // Preview avatar when selecting a new file
  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const supabase = useMemo(() => createSupabaseClient(), []);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: profile.firstName ?? "",
      lastName: profile.lastName ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      jobTitle: profile.jobTitle ?? "",
      bio: profile.bio ?? "",
      skills: profile.skills ?? [],
    },
    mode: "onBlur",
  });

  // Skills management helpers (no useFieldArray, since skills is string[])
  const skillsFields = form.watch("skills") ?? [];
  const appendSkill = (skill: string) => {
    const current = form.getValues("skills") ?? [];
    form.setValue("skills", [...current, skill], { shouldDirty: true });
  };
  const removeSkillAt = (index: number) => {
    const current = form.getValues("skills") ?? [];
    form.setValue(
      "skills",
      current.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  // Keep preview avatar in sync when leaving edit mode or when reset
  useEffect(() => {
    if (!isEditing) setNewAvatarUrl(null);
  }, [isEditing]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleSelectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setNewAvatarUrl(preview);
    } else {
      setNewAvatarUrl(null);
    }
  };

  const handleSelectDocument = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setDocFile(file);
  };

  async function uploadToBucket(params: { bucket: string; path: string; file: File }) {
    const { bucket, path, file } = params;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || "application/octet-stream",
    });
    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);
    return publicUrl;
  }

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    // Confirm before saving if form is dirty or files selected
    const changed = form.formState.isDirty || avatarFile || docFile;
    if (changed) {
      const ok = window.confirm("Confermi di voler salvare le modifiche? I dati verranno aggiornati.");
      if (!ok) {
        toast("Salvataggio annullato.");
        return;
      }
    }

    try {
      toast.loading("Salvataggio in corso...", { id: "save" });

      // 1) Upload files if present
      let uploadedAvatarUrl: string | null = null;
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop();
        const path = `users/${values.email}-avatar-${Date.now()}.${ext}`;
        uploadedAvatarUrl = await uploadToBucket({ bucket: "avatar", path, file: avatarFile });
        toast.success("Avatar caricato con successo");
      }

      if (docFile) {
        const ext = docFile.name.split(".").pop();
        const path = `users/${values.email}-documento-${Date.now()}.${ext}`;
        await uploadToBucket({ bucket: "documents", path, file: docFile });
        toast.success("Documento caricato con successo");
      }

      // 2) Persist profile changes (placeholder - wire up a server action or API route)
      const payload = {
        ...values,
        avatar: uploadedAvatarUrl ?? profile.avatar,
        id: profile.id,
      };
      console.log("Submitting profile payload", payload);

      // TODO: Call your server action to persist data in DB
      // await updateUserProfile(payload)

      toast.success("Profilo aggiornato con successo", { id: "save" });
      setIsEditing(false);
      form.reset(values); // clear dirty state while keeping values
      setAvatarFile(null);
      setDocFile(null);
    } catch (err) {
      console.error("Errore nel salvataggio del profilo:", err);
      toast.error("Si è verificato un errore durante il salvataggio.", { id: "save" });
    }
  };

  const avatarFallback = getInitials(profile.firstName, profile.lastName);
  const name = `${profile.firstName} ${profile.lastName}`.trim() || profile.email;

  
    // Get Page name by path
    let pageName = window.location.pathname.split('/').pop();
    if (!pageName) {
      pageName = '';
    } else {
      pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    console.log('Page Name from Client component:', pageName);

  // ----------------------
  // Render
  // ----------------------
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 mb-8 pb-8 space-y-8">
      {/* Header */}
      <Card className="rounded-none shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={newAvatarUrl || profile.avatar} alt={name} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleSelectAvatar}
              />
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <Badge className="bg-primary">{profile.role}</Badge>
              </div>
              <p className="text-muted-foreground">{profile.jobTitle}</p>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>
              <p className="text-sm text-muted-foreground">Iscritto da: {profile.joinDate}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button type="button" variant={isEditing ? "secondary" : "default"} onClick={() => setIsEditing((v) => !v)}>
                {isEditing ? "Annulla" : "Modifica Profilo"}
              </Button>
              {isEditing && (
                <Button type="submit">Salva modifiche</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informazioni personali */}
      <Card className="rounded-none shadow-none">
        <CardHeader>
          <CardTitle>Informazioni personali</CardTitle>
          <CardDescription>Aggiorna le tue informazioni personali.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" {...form.register("firstName")} />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Cognome</Label>
                <Input id="lastName" {...form.register("lastName")} />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Ruolo lavorativo</Label>
                <Input id="jobTitle" {...form.register("jobTitle")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Ubicazione</Label>
                <Input id="location" {...form.register("location")} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea id="bio" rows={4} {...form.register("bio")} />
                {form.formState.errors.bio && (
                  <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome</p>
                  <p className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {profile.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cognome</p>
                  <p className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {profile.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ruolo lavorativo</p>
                  <p className="flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {profile.jobTitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ubicazione</p>
                  <p className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {profile.location}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Biografia</p>
                <p className="mt-1">{profile.bio}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Ruolo nella piattaforma</p>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <Badge className="bg-primary">{profile.role}</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contatti */}
      <Card className="rounded-none shadow-none">
        <CardHeader>
          <CardTitle>Contatti</CardTitle>
          <CardDescription>Aggiorna le tue informazioni di contatto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input id="phone" {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">{form.formState.errors.phone.message as string}</p>
                )}
              </div>

              {/* Documento di supporto / CV */}
              <div className="space-y-2 md:col-span-2">
                <Label>Documento (CV o altro)</Label>
                <div className="flex items-center gap-2">
                  <Input ref={docInputRef} type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleSelectDocument} />
                  <Button type="button" variant="outline" onClick={() => docInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Seleziona documento
                  </Button>
                </div>
                {docFile && (
                  <p className="text-sm text-muted-foreground">Selezionato: {docFile.name}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {profile.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefono</p>
                  <p className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {profile.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="rounded-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle>Skills</CardTitle>
          <CardDescription>Gestisci le tue competenze.</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {skillsFields.map((skill: string, index: number) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkillAt(index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <span aria-hidden>×</span>
                    </button>
                  </Badge>
                ))}
              </div>
              {/* Add new skill input */}
              <div className="flex">
                <Input
                  placeholder="Aggiungi skill"
                  className="h-8 w-40 mr-2"
                  id="new-skill"
                />
                <Button
                  size="sm"
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("new-skill") as HTMLInputElement;
                    const value = input.value.trim();
                    if (!value) return;
                    if (!form.getValues("skills")?.includes(value)) {
                      appendSkill(value);
                    }
                    input.value = "";
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {(profile.skills ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">Nessuna skill impostata.</p>
              ) : (
                profile.skills!.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom action bar (visible only in edit mode on small screens) */}
      {isEditing && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Annulla
          </Button>
          <Button type="submit">Salva modifiche</Button>
        </div>
      )}
    </form>
  );
}