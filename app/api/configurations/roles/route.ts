import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('app_roles').select('*')
  if (error) return NextResponse.json([], { status: 500 })
  return NextResponse.json(data)
}