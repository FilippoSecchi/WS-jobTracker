import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

// Simple email validation function
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Restituisce le iniziali a partire da un nome completo.
 * Esempio: "Mario Rossi" -> "MR"
 * Se la stringa è vuota, ritorna "?"
 */
export function getInitials(first_name?: string, last_name?: string): string {
  if (!first_name || !last_name) return "WS"
  const firstInitial = first_name?.trim().charAt(0).toUpperCase() || "";
  const lastInitial = last_name?.trim().charAt(0).toUpperCase() || "";
  
  return (firstInitial + lastInitial) || "WS"; // fallback "WS"
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi sono indicizzati da 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi sono indicizzati da 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatCurrency(amount: number, locale: string = 'it-IT', currency: string = 'EUR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function formatNumber(amount: number, locale: string = 'it-IT'): string {
  return new Intl.NumberFormat(locale).format(amount);
}

export function formatPercentage(value: number, locale: string = 'it-IT'): string {
  return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: 2 }).format(value);
}

export function formatPhone(prefix: string, number: string): string | null {
  const cleanPrefix = prefix?.trim().replace(/[^0-9+]/g, "");
  const cleanNumber = number?.trim().replace(/[^0-9]/g, "");

  if (!cleanPrefix || !cleanNumber) return null;
  return `${cleanPrefix}${cleanNumber}`;
}