import { Header } from "@/components/admin/Header";
import { Banner } from "@/components/ui/banner";
import { PricingTable } from "@clerk/nextjs";
import { CrownIcon } from "lucide-react";
export default function ProPage(){
  return (
    <div>
      <Header/>
      <div className="max-w-6xl mx-auto px-4 space-y-12 pt-10">
        <Banner  header="Unlock Premium AI Dental Care" description="Get unlimited AI consultaion, advanced futures, and priority support to take your dental health to the next level" Icon={CrownIcon} badgeTitle="Upgrade to Pro" />
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-bold mb-4 text-4xl">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Select The Perfect Plan For Your Dental Care Need, All Plans Include Secure Access And Bank Level Enctryption
          </p>
        </div>
        <PricingTable/>
      </div>
    </div>
  );
}