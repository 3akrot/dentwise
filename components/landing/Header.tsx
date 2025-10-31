"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { Sheet,SheetTrigger,SheetContent, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

const Links = {
  "How It Works":"#",
  "Pricing":"#",
  "About":"#"
} as const

export const Header = () => {
  const ismobile = useIsMobile();
  
  let nav;
  type LinkKey = keyof typeof Links
  if(!ismobile){
    nav = (
      <>
        <nav className="hidden md:block">
          <ul className="flex gap-10 ">
            {(Object.keys(Links) as LinkKey[]).map((linkName,index)=>(
               <a key={index} href={Links[linkName]}>{linkName}</a>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <SignInButton mode="modal">
            <Button variant={'outline'}>
              Sign In  
            </Button>    
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>
              Sign Up
            </Button>
          </SignUpButton>

        </div>
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
          <div className="flex h-full flex-col   justify-between">
            <nav className=" space-y-5 pt-4">
              {(Object.keys(Links) as LinkKey[]).map((linkName,index)=>(
                 <a className=" block" key={index} href={Links[linkName]}>{linkName}</a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <SignInButton mode="modal">
                <Button variant={'outline'}>
                  Sign In  
                </Button>    
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </div>


        </SheetContent>
      </Sheet>
    );
  }
  
  
  
  
  
  
  return (
    <header className="fixed z-50 left-0 right-0 top-0 w-full border-b h-16 px-6 py-2 border-border/50 bg-background/50 backdrop-blur-[2px] ">
      <div className="flex justify-between items-center h-full max-w-6xl mx-auto">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src='/logo.png' alt='Dentwise Logo' width={32} height={32}></Image>
            <span className="font-semibold">Dentwise</span>
          </div>
        </Link>
        {nav}
      </div>
    </header>
  );
};
