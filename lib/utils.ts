<<<<<<< HEAD
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
=======
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
>>>>>>> 1b89a0a0cad5f6de9778df8f0589c95b5e495215

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

<<<<<<< HEAD
export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
=======
export function convertAmountFromMiliUnits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliUnits(amount: number) {
>>>>>>> 1b89a0a0cad5f6de9778df8f0589c95b5e495215
  return Math.round(amount * 1000);
}
