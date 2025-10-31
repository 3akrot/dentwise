import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Calendar1, Mic, Star } from "lucide-react";
import Image from "next/image";
export const Hero = () => {
  return (
    <div className="relative min-h-screen py-6 flex items-center overflow-hidden">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <div className="bg-grid"></div>
      </div>
      {/* GRADIENT ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />

      <div className="relative  z-5 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row ">
            {/*LEFT CONTENT*/}
            <div className="space-y-5 flex-1 flex flex-col max-w-4xl justify-center items-center lg:items-stretch ">
              {/*BADGE*/}
              <div className="flex rounded-4xl items-center gap-3 px-4 py-2 font-medium bg-gradient-to-r from-primary/10 to-primary/5  border border-primary/20 backdrop-blur-sm w-fit">
                <div className="w-2 h-2 rounded-full  bg-primary animate-pulse"></div>
                <span className="text-xs">AI-Powered Dental Assistant</span>
              </div>
              <h1 className="text-5xl text-center lg:text-left  lg:text-6xl font-bold  tracking-tight">
                Your dental
                questions
               answered
                instantly
              </h1>
              <p className="text-md text-center lg:text-left text-muted-foreground leading-relaxed max-w-xl">
                Chat with our AI dental assistant for instant advice, book smart
                appointments, and get personalized care recommendations.
                Available 24/7.
              </p>
              <div className="flex flex-col lg:flex-row  items-center gap-2">
                <SignInButton>
                  <Button>
                    <Mic></Mic>
                    Try voice chat
                  </Button>
                </SignInButton>
                <SignInButton>
                  <Button variant={"outline"}>
                    <Calendar1></Calendar1>
                    Book appointment
                  </Button>
                </SignInButton>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-5">
                <div className="flex -space-x-5">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                    alt="Jessica Davis"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                    alt="Sam Miller"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                    alt="Anna Lopez"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                    alt="Mike Rodriguez"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                    alt="Katie Lee"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                </div>
                <div className="flex flex-col items-center lg:items-stretch">
                  <div className="flex gap-1 items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        fill="yellow"
                        stroke="yellow"
                        size={15}
                      ></Star>
                    ))}
                    <span className="text-sm">4.9/5</span>
                  </div>
                  <p className="text-sm">
                    trusted by{" "}
                    <span className="font-medium">1200 patatients</span>
                  </p>
                  <div></div>
                </div>
              </div>
            </div>
            {/*RIGHT CONTENT*/}
            <div className="flex-1 flex flex-col justify-start">
              <Image
                className="mx-auto max-w-3/5 h-auto"
                alt="happy robot"
                width={600}
                height={600}
                src={"/hero.png"}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
