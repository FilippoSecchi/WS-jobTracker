"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import SexSelect from "@/components/shared/form/SexSelect";
import SiNoSelect from "../shared/form/SiNoSelect";
import CountrySelect from "../shared/form/CountrySelect";


// 🛠️ Utility per unire prefisso e numero
function formatPhone(prefix: string, number: string): string | null {
  const cleanPrefix = prefix?.trim().replace(/[^0-9+]/g, "");
  const cleanNumber = number?.trim().replace(/[^0-9]/g, "");
  if (!cleanPrefix || !cleanNumber) return null;
  return `${cleanPrefix}${cleanNumber}`;
}

// 📌 Schema di validazione con Zod
const personalDataSchema = z.object({
  firstName: z.string().min(2, "Il  campo nome è obbligatorio"),
  lastName: z.string().min(2, "Il  campo cognome è obbligatorio"),
  sex: z.string().min(2, "Il campo sesso è obbligatorio"),
  dob: z.string().min(2, "Il campo data di nascita è obbligatorio"),
  country: z.string().min(1, "Il campo nazionalità è obbligatoria"),
  euCitizen: z.string().min(1, "Il campo Cittadino UE è obbligatorio"),
  permSogg: z.string().optional().nullable(),
  codFiscValid: z.string().optional().nullable(),
  codFisc: z.string().min(16, "Il  campo codice fiscale è obbligatorio"),
  phonePrefix: z.string().min(1, "Il campo prefisso è obbligatorio"),
  phone: z.string().min(5, "Il campo numero di telefono è obbligatorio"),
  waActive: z.boolean(),
  sameAsWa: z.boolean(),
  waPrefix: z.string().nullable(),
  wa: z.string().nullable(),
}).refine(
  (data) => {
    if (data.euCitizen === "1") {
      return !!data.permSogg && data.permSogg.length > 0;
    }
    return true;
  },
  {
    path: ["permSogg"],
    message: "Il campo Permesso di soggiorno è obbligatorio",
  },
);

type PersonalDataFormValues = z.infer<typeof personalDataSchema>;

type PersonalDataFormProps = {
  userId: string;
  userEmail: string;
  className?: string;
};

export function PersonalDataForm({ userId, userEmail, className }: PersonalDataFormProps) {
  const router = useRouter();
  const supabase = createClient();


  const form = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      sex: "",
      dob: "",
      country: "",
      euCitizen: "",
      permSogg: "",
      codFiscValid: "",
      codFisc: "",
      phonePrefix: "+39",
      phone: "",
      waActive: true,
      sameAsWa: true,
      waPrefix: "+39",
      wa: "",
    },
  });
  
  useEffect(() => {
    if (form.watch("euCitizen") !== "1") {
      form.setValue("permSogg", null, { shouldValidate: true });
      form.setValue("codFiscValid", null, { shouldValidate: true });
    }
  }, [form.watch("euCitizen")]);

  useEffect(() => {
    if (!form.watch("waActive")) {
      // se non è attivo → resetto
      form.setValue("waPrefix", "", { shouldValidate: true });
      form.setValue("wa", "", { shouldValidate: true });
    } else if (form.watch("sameAsWa")) {
      // se è attivo e uguale al telefono → sincronizzo
      form.setValue("waPrefix", form.watch("phonePrefix") || "", { shouldValidate: true });
      form.setValue("wa", form.watch("phone") || "", { shouldValidate: true });
    }
  }, [
    form.watch("waActive"),
    form.watch("sameAsWa"),
    form.watch("phonePrefix"),
    form.watch("phone"),
  ]);
  

  const onSubmit = async (values: PersonalDataFormValues) => {
    try {
      const phoneNumber = formatPhone(values.phonePrefix, values.phone);
      let waNumber: string | null = null;

      if (values.waActive) {
        waNumber = values.sameAsWa
          ? phoneNumber
          : formatPhone(values.waPrefix || "", values.wa || "");
      }

      const { error: insertProfileError } = await supabase
        .from("user_profiles")
        .upsert(
          {
            id: userId,
            first_name: values.firstName,
            last_name: values.lastName,
            email: userEmail,
            phone: phoneNumber,
            wa_number: waNumber,
            wa_active: values.waActive,
            wa_same_as_phone: values.waActive ? values.sameAsWa : false,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (insertProfileError) throw insertProfileError;

      const { error: insertDetailsError } = await supabase
        .from("user_details")
        .upsert(
          {
            id: userId,
            cod_fisc: values.codFisc,
            sex: values.sex,
            dob: values.dob,
            country: values.country,
            eu_citizen: values.euCitizen,
            perm_sogg: values.permSogg,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (insertDetailsError) throw insertDetailsError;

      router.push("/onboarding");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">Dati Personali</CardTitle>
        <CardDescription>
          Inserisci i dati richiesti per configurare il tuo account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome + Cognome */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Cognome *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Sesso</FormLabel>
                    <FormControl>
                      <SexSelect value={field.value ?? ""} onChange={field.onChange} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
            </div>

            {/* Codice Fiscale + Sesso + DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Data di Nascita</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Paese di nascita *</FormLabel>
                    <FormControl>
                    <CountrySelect value={field.value ?? ""} onChange={field.onChange} />
                    </FormControl>
                  </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="euCitizen"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Cittadino UE *</FormLabel>
                    <FormControl>
                      <SiNoSelect value={field.value ?? ""} onChange={field.onChange} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {form.watch("euCitizen") === "1"  && ( 
              <FormField
                control={form.control}
                name="permSogg"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full">
                      <FormLabel>Permesso di soggiorno valido *</FormLabel>
                      <FormControl>
                        <SiNoSelect
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          disabled={form.watch("euCitizen") !== "1"} // 🔒 disabilitato se non serve
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              )}
              {form.watch("euCitizen") === "1" && form.watch("permSogg") === "0"  && ( 
              <FormField
                control={form.control}
                name="codFiscValid"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full">
                      <FormLabel>In possesso di Codice Fiscale valido *</FormLabel>
                      <FormControl>
                        <SiNoSelect
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          disabled={form.watch("euCitizen") !== "1"} // 🔒 disabilitato se non serve
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="min-h-[20px]" />
                  </FormItem>
                )}
              />
              )}

            {form.watch("euCitizen") === "1" && form.watch("codFiscValid") === "0" && form.watch("permSogg") === "0"  && ( 
              <FormField
                control={form.control}
                name="codFisc"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full">
                    <FormLabel>Codice Fiscale *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
            )}
            

            {form.watch("euCitizen") === "0"  && ( 
              <FormField
                control={form.control}
                name="codFisc"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full">
                    <FormLabel>Codice Fiscale *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
            )}

            </div>



            {/* Switch WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="waActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Contattabile tramite WhatsApp</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sameAsWa"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    WhatsApp uguale al numero di telefono
                  </FormLabel>
                </FormItem>
              )}
            />
            </div>


            {/* Telefono con PhoneInputSelect */}            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="phonePrefix"
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full">
                      <FormLabel>Prefisso Internazionale *</FormLabel>
                      <FormControl>
                          <Input {...field} />
                      </FormControl>
                      </div>
                      <FormMessage  className="min-h-[20px]"  />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="w-full">
                    <FormLabel>Numero di Telefono *</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    </div>
                    <FormMessage  className="min-h-[20px]"  />
                  </FormItem>
                )}
              />
          </div>

            {form.watch("waActive") && (
              <>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="waPrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prefisso WhatsApp *</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} disabled={form.watch("sameAsWa")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numero WhatsApp *</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} disabled={form.watch("sameAsWa")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
              </>
            )}

            <Button type="submit" className="w-full">
              Continua
            </Button>

            <div className="mt-4 text-center text-sm">
              Hai bisogno di aiuto?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Contattaci
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
