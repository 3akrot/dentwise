import { Header } from "@/components/admin/Header";
import { CallSection } from "@/components/voice/CallSection"
import { Banner } from "@/components/ui/banner";
import { auth } from "@clerk/nextjs/server";
import { Mic } from "lucide-react";
export default async function  VoicePage(){
  const { has } = await auth()
    const paidUser = has({ plan: 'ai_pro' }) || has({ plan: 'ai_basic' })
    if(!paidUser){
      return (
        <p>this feature is for paid users</p>
      );
    }
  return (
      <div>
        <Header/>
        <div className="max-w-6xl pt-10 mx-auto px-4 space-y-10">
          <Banner badgeTitle="Voice Assistant Ready" Icon={Mic} header="AI Voice Assistant" description="Talk to You Ai Voice Assistant With netural Language get Dental advice and more"/>
          <CallSection/>
        </div>
      </div>
  );
}