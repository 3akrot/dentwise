import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Gender } from "./generated/prisma/enums"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function createAvatar(username:string,gender:Gender){
  username = username.replace("/\s+/g","")
  const base = "https://avatar.iran.liara.run/public"
  if(gender == "male"){
    return `${base}/boy?username=${username}`
  }
    return `${base}/girl?username=${username}`
  
}

export function formatPhoneNumber(phonenumber:string){
  //remove all non digites
  phonenumber = phonenumber.replace(/\(\+\d\)|\D/g,"").trim()
  //(+2) 011 245 552 46
  if(phonenumber.length == 0)
  return ""
  if(phonenumber.length <= 3)
  return `(+2) ${phonenumber.slice(0,3)}`
  if(phonenumber.length <= 6)
  return `(+2) ${phonenumber.slice(0,3)} ${phonenumber.slice(3)}`
  if(phonenumber.length <= 9)
  return `(+2) ${phonenumber.slice(0,3)} ${phonenumber.slice(3,6)} ${phonenumber.slice(6)}`
  return `(+2) ${phonenumber.slice(0,3)} ${phonenumber.slice(3,6)} ${phonenumber.slice(6,9)} ${phonenumber.slice(9,11)}`
  
}
