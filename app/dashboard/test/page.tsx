// app/dashboard/test/page.tsx
// A simple test page to verify Supabase connection and query the 'test' table
import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();

  const { data: test } = await supabase.from('test').select()

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <pre>{JSON.stringify(test, null, 2)}</pre>
      </div>
    </div>
  );
}