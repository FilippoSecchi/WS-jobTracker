"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ComponentPropsWithoutRef } from "react";
import { z } from "zod";

// 🛠️ Utility per unire prefisso e numero
function formatPhone(prefix: string, number: string): string | null {
  const cleanPrefix = prefix?.trim().replace(/[^0-9+]/g, "");
  const cleanNumber = number?.trim().replace(/[^0-9]/g, "");

  if (!cleanPrefix || !cleanNumber) return null;
  return `${cleanPrefix}${cleanNumber}`;
}

// 📌 Schema di validazione con Zod
const personalDataSchema = z.object({
  firstName: z.string().min(1, "Il nome è obbligatorio"),
  lastName: z.string().min(1, "Il cognome è obbligatorio"),
  phonePrefix: z.string().min(1, "Il prefisso è obbligatorio"),
  phone: z.string().min(5, "Il numero di telefono non è valido"),
  waActive: z.boolean(),
  sameAsWa: z.boolean(),
  waPrefix:  z.string().min(1, "Il prefisso è obbligatorio").optional().nullable(),
  wa:  z.string().min(5, "Il numero di WhatsApp non è valido").optional().nullable(),
});

type PersonalDataFormProps = ComponentPropsWithoutRef<"div"> & { userId: string };

export function PersonalDataForm({ userId, ...props }: PersonalDataFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("");
  const [phone, setPhone] = useState("");
  const [waActive, setWaActive] = useState(true);
  const [sameAsWa, setSameAsWa] = useState(true);
  const [waPrefix, setWaPrefix] = useState<string | null>(null);
  const [wa, setWa] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSaveData = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvataggio dati personali...");

    const supabase = createClient();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      // ✅ Validazione con Zod
      const parsed = personalDataSchema.safeParse({
        firstName,
        lastName,
        phonePrefix,
        phone,
        waActive,
        sameAsWa,
        waPrefix,
        wa,
      });

      if (!parsed.success) {
        const zodErrors: Record<string, string> = {};
        parsed.error.issues.forEach((err) => {
          if (err.path[0]) {
            zodErrors[err.path[0].toString()] = err.message;
          }
        });
        setFieldErrors(zodErrors);
        setIsLoading(false);
        return;
      }

      // ✅ Composizione numeri
      const phoneNumber = formatPhone(phonePrefix, phone);
      let waNumber: string | null = null;
      console.log("WA Active:", waActive, "Same as WA:", sameAsWa);

      if (waActive) {
        waNumber = sameAsWa
          ? phoneNumber
          : formatPhone(waPrefix || "", wa || "");
        if (!sameAsWa && !waNumber) {
          setError("Numero WhatsApp non valido");
          setIsLoading(false);
          return;
        }
      }

      if (!phoneNumber) {
        setError("Numero di telefono non valido");
        setIsLoading(false);
        return;
      }

      console.log("Phone:", phoneNumber, "WhatsApp:", waNumber);
      // ✅ Insert su Supabase
      const { error: insertError } = await supabase.from("user_profiles").upsert({
        // Assumendo che l'ID utente sia ottenuto dal contesto di autenticazione
        id: userId,
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        wa_number: waNumber,
        wa_active: waActive,
        wa_same_as_phone: waActive ? sameAsWa : false,
        updated_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;

      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dati Personali</CardTitle>
          <CardDescription>
            Inserisci i dati richiesti per configurare il tuo account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveData}>
            <div className="flex flex-col gap-6">
              {/* Nome */}
              <div className="grid gap-2">
                <Label htmlFor="first_name">Nome *</Label>
                <Input
                  id="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {fieldErrors.firstName && (
                  <p className="text-sm text-red-500">{fieldErrors.firstName}</p>
                )}
              </div>

              {/* Cognome */}
              <div className="grid gap-2">
                <Label htmlFor="last_name">Cognome *</Label>
                <Input
                  id="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {fieldErrors.lastName && (
                  <p className="text-sm text-red-500">{fieldErrors.lastName}</p>
                )}
              </div>

              {/* Telefono */}
              <div className="grid gap-2">
                <Label>Telefono *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Input
                      id="phonePrefix"
                      placeholder="+39"
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                    />
                    {fieldErrors.phonePrefix && (
                      <p className="text-sm text-red-500">{fieldErrors.phonePrefix}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      id="phone"
                      placeholder="123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {fieldErrors.phone && (
                      <p className="text-sm text-red-500">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Switch WhatsApp attivo */}
              <div className="flex flex-row items-center gap-3">
                <Switch
                  id="waActive"
                  checked={waActive}
                  onCheckedChange={() => setWaActive(!waActive)}
                />
                <Label htmlFor="waActive">
                  Contattabile tramite WhatsApp
                </Label>    
              </div>

              {/* Logica condizionale */}
              {waActive && (
                <>
                  <div className="flex flex-row items-center gap-3">
                    <Switch
                      id="sameAsWa"
                      checked={sameAsWa}
                      onCheckedChange={() => setSameAsWa(!sameAsWa)}
                    />
                    <Label htmlFor="sameAsWa">
                      WhatsApp uguale al numero di telefono
                    </Label>
                  </div>
                  {!sameAsWa && (
                    <div className="grid gap-2">
                      <Label>WhatsApp *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <Input
                            id="waPrefix"
                            placeholder="+39"
                            value={waPrefix || ""}
                            onChange={(e) => setWaPrefix(e.target.value)}
                          />
                          {fieldErrors.waPrefix && (
                            <p className="text-sm text-red-500">{fieldErrors.waPrefix}</p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <Input
                            id="wa"
                            placeholder="123456789"
                            value={wa || ""}
                            onChange={(e) => setWa(e.target.value)}
                          />
                          {fieldErrors.wa && (
                            <p className="text-sm text-red-500">{fieldErrors.wa}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Errori generali */}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Attendi... stiamo salvando le tue informazioni." : "Continua"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Hai bisogno di aiuto?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Contattaci
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
