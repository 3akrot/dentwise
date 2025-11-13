"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { Sheet,SheetTrigger,SheetContent, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { Calendar, Crown, Home, Mic } from "lucide-react";
import { usePathname } from "next/navigation";

const Links = {
  "Dashboard":{href:"#",icon:<Home/>},
  "Appoinments":{href:"#",icon:<Calendar/>},
  "Voice":{href:"#",icon:<Mic/>},
  "Pro":{href:"#",icon:<Crown/>}
} as const
type LinkKey = keyof typeof Links

export const Header = () => {
  const ismobile = useIsMobile();
  const {user} = useUser()
  const pathName = usePathname()
  
  let nav;
  if(!ismobile){
    nav = (
      <>
        <nav className="hidden md:block">
          <ul className="flex gap-10 text-sm">
            {(Object.keys(Links) as LinkKey[]).map((linkName,index)=>(
              <div key={index} className={pathName === `/${linkName}` ? "text-bold flex items-center gap-3" : "flex items-center gap-3"} >
                {Links[linkName].icon}
                <a  key={index} href={Links[linkName].href}>{linkName}</a>
              </div>
            ))}
          </ul>
        </nav>

      </>
    );
  }
  else {
    nav = (
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open menu">☰</button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64  p-4">
          <SheetTitle>Navigation</SheetTitle>
          <div className="flex flex-row-reverse justify-end items-center gap-2">
            <div className="text-left">
              <h4 className="font-bold capitalize">{ user?.fullName}</h4>
              <p>{ user?.emailAddresses[0].emailAddress }</p>
            </div>
            {
              true ?
              <Image className="rounded-full" src={user?.imageUrl ?? ""} alt="user image" width={45} height={45}>
                
              </Image>
              :
              <div className="size-10  bg-primary rounded-full flex items-center justify-center">
                { user?.fullName?.split("")[0].toUpperCase()}
              </div>
            }
          </div>
          <div className="flex h-full flex-col   justify-between">
            <nav className=" text-sm space-y-5 pt-4">
              {(Object.keys(Links) as LinkKey[]).map((linkName,index)=>(
                <div key={index} className={pathName === `/${linkName}` ? "text-bold flex items-center gap-3" : "flex items-center gap-3"} >
                  {Links[linkName].icon}
                  <a  href={Links[linkName].href}>{linkName}</a>
                </div>
              ))}
            </nav>
          </div>

        </SheetContent>
      </Sheet>
    );
  }
  
  
  
  
  
  
  return (
    <header className=" z-50  w-full border-b h-16 px-6 py-2 border-border/50 bg-background/50 backdrop-blur-[2px] ">
      <div className="flex justify-between items-center h-full max-w-6xl mx-auto">
        <div className="flex  items-center gap-5 max-md:flex-1 max-md:justify-between">
          <Link href="/">
            <div className="min-w-10 ">
              <Image src='/logo.png' alt='Dentwise Logo' width={32} height={32}></Image>
            </div>
          </Link>
          {nav}
        </div>

        
        <div className="hidden md:flex items-center gap-2">
          <div className="text-right">
            <h4 className="font-bold capitalize text-lg">{ user?.fullName}</h4>
            <p className="text-sm">{ user?.emailAddresses[0].emailAddress }</p>
          </div>
          {
            user?.hasImage ?
            <Image className="rounded-full" src={user?.imageUrl} alt="user image" width={45} height={45}>
              
            </Image>
            :
            <div className="size-10 rounded-full flex items-center justify-center">
              { user?.fullName?.split("")[0]}
            </div>
          }

        </div>
      </div>
    </header>
  );
};
