// app/api/configurations/general/style/route.ts

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('labels_style').select('*')
  console.log(data, error)
  if (error) return NextResponse.json([], { status: 500 })
  return NextResponse.json(data)
}