"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import CountrySelect from "../shared/form/CountrySelect";
import RegioneSelect from "../shared/form/RegioniItaSelect";
import ProvinciaSelect from "../shared/form/ProvinceItaSelect";
import MultipleUpload from "../shared/form/MultiUpload";

const ITALY_ID = "82";

const domicileDataSchema = z.object({
  // Residenza
  res_country_id: z.string().min(1, "Obbligatorio"),
  res_region_id: z.string().nullable(),
  res_province_id: z.string().nullable(),
  res_city: z.string().min(1, "Obbligatorio"),
  res_street: z.string().min(1, "Obbligatorio"),
  res_street_number: z.string().min(1, "Obbligatorio"),
  res_postal_code: z.string().min(1, "Obbligatorio"),

  // Domicilio
  dom_same_as_res: z.boolean(),
  dom_country_id: z.string().nullable(),
  dom_region_id: z.string().nullable(),
  dom_province_id: z.string().nullable(),
  dom_city: z.string().nullable(),
  dom_street: z.string().nullable(),
  dom_street_number: z.string().nullable(),
  dom_postal_code: z.string().nullable(),

  // Upload documenti
  multipleFiles: z.any().optional(),
});

type DomicileDataFormValues = z.infer<typeof domicileDataSchema>;

type DomicileDataFormProps = {
  userId: string;
  className?: string;
};

export default function DomicileDataForm({ userId, className }: DomicileDataFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<DomicileDataFormValues>({
    resolver: zodResolver(domicileDataSchema),
    defaultValues: {
      dom_same_as_res: true,
    },
  });

  const onSubmit = async (values: DomicileDataFormValues) => {
    const { error } = await supabase
      .from("user_details")
      .update({
        // Residenza
        res_country_id: values.res_country_id,
        res_region_id: values.res_country_id === ITALY_ID ? values.res_region_id : null,
        res_province_id: values.res_country_id === ITALY_ID ? values.res_province_id : null,
        res_city: values.res_city,
        res_street: values.res_street,
        res_street_number: values.res_street_number,
        res_postal_code: values.res_postal_code,

        // Domicilio (se diverso da residenza)
        dom_same_as_res: values.dom_same_as_res,
        dom_country_id: values.dom_same_as_res ? null : values.dom_country_id,
        dom_region_id:
          !values.dom_same_as_res && values.dom_country_id === ITALY_ID
            ? values.dom_region_id
            : null,
        dom_province_id:
          !values.dom_same_as_res && values.dom_country_id === ITALY_ID
            ? values.dom_province_id
            : null,
        dom_city: values.dom_same_as_res ? null : values.dom_city,
        dom_street: values.dom_same_as_res ? null : values.dom_street,
        dom_street_number: values.dom_same_as_res ? null : values.dom_street_number,
        dom_postal_code: values.dom_same_as_res ? null : values.dom_postal_code,

        multipleFiles: values.multipleFiles ? values.multipleFiles : null,

        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) throw error;

    router.push("/onboarding/step3");
  };

  const resCountry = form.watch("res_country_id");
  const resRegion = form.watch("res_region_id");
  const domCountry = form.watch("dom_country_id");
  const domRegion = form.watch("dom_region_id");


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">Residenza e Domicilio</CardTitle>
        <CardDescription>
          Inserisci i dati richiesti per configurare il tuo account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* === RESIDENZA === */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="res_country_id"
                render={({ field }) => (
                  <FormItem>
                  <div className="w-full">
                    <FormLabel>Nazione *</FormLabel>
                    <FormControl>
                      <CountrySelect value={field.value ?? ""} onChange={field.onChange} />
                    </FormControl>
                        </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {resCountry === ITALY_ID && (
                <FormField
                  control={form.control}
                  name="res_region_id"
                  render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>Regione *</FormLabel>
                      <FormControl>
                        <RegioneSelect value={field.value ?? ""} onChange={field.onChange} />
                      </FormControl>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {resCountry === ITALY_ID && resRegion && (
                <FormField
                  control={form.control}
                  name="res_province_id"
                  render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>Provincia *</FormLabel>
                      <FormControl>
                        <ProvinciaSelect
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          regioneId={resRegion} // 🔑 aggiunto filtro province
                        />
                      </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Città / CAP / Via / Numero */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <FormField name="res_city" control={form.control} render={({ field }) => (
                <FormItem>
                <div className="w-full">
                  <FormLabel>Città</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                     </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="res_postal_code" control={form.control} render={({ field }) => (
                <FormItem>
                <div className="w-full">
                  <FormLabel>CAP</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="res_street" control={form.control} render={({ field }) => (
                <FormItem>
                <div className="w-full">
                  <FormLabel>Via</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                    </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="res_street_number" control={form.control} render={({ field }) => (
                <FormItem>
                <div className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                    </div>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Switch domicilio */}
            <FormField
              control={form.control}
              name="dom_same_as_res"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Il domicilio coincide con la residenza</FormLabel>
                </FormItem>
              )}
            />

            {/* === DOMICILIO === */}
            {!form.watch("dom_same_as_res") && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FormField
                    control={form.control}
                    name="dom_country_id"
                    render={({ field }) => (
                      <FormItem>
                      <div className="w-full">
                        <FormLabel>Nazione *</FormLabel>
                        <FormControl>
                          <CountrySelect value={field.value ?? ""} onChange={field.onChange} />
                        </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {domCountry === ITALY_ID && (
                    <FormField
                      control={form.control}
                      name="dom_region_id"
                      render={({ field }) => (
                        <FormItem>
                        <div className="w-full">
                          <FormLabel>Regione *</FormLabel>
                          <FormControl>
                            <RegioneSelect value={field.value ?? ""} onChange={field.onChange} />
                          </FormControl>
                            </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {domCountry === ITALY_ID && domRegion && (
                    <FormField
                      control={form.control}
                      name="dom_province_id"
                      render={({ field }) => (
                        <FormItem>
                        <div className="w-full">
                          <FormLabel>Provincia *</FormLabel>
                          <FormControl>
                            <ProvinciaSelect
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              regioneId={domRegion} // 🔑 filtro province
                            />
                          </FormControl>
                            </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <FormField name="dom_city" control={form.control} render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>Città</FormLabel>
                      <FormControl><Input {...field} value={field.value ?? ""} /></FormControl>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="dom_postal_code" control={form.control} render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>CAP</FormLabel>
                      <FormControl><Input {...field} value={field.value ?? ""} /></FormControl>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="dom_street" control={form.control} render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>Via</FormLabel>
                      <FormControl><Input {...field} value={field.value ?? ""} /></FormControl>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField name="dom_street_number" control={form.control} render={({ field }) => (
                    <FormItem>
                    <div className="w-full">
                      <FormLabel>Numero</FormLabel>
                      <FormControl><Input {...field} value={field.value ?? ""} /></FormControl>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div> 

              </>
            )}
            
            {/* Upload documenti */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">     
                <FormField name="multipleFiles" control={form.control} render={({ field }) => (
                    <FormItem>
                    <div className="w-full">     
                        <FormControl>
                            <MultipleUpload value={field.value ?? []} onChange={field.onChange} />
                        </FormControl>
                    </div>
                <FormMessage />
                </FormItem>
              )} />
            </div>
            

            <Button type="submit" className="w-full">Continua</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
