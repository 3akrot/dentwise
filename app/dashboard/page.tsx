import { Header } from "@/components/admin/Header";
import { Banner } from "@/components/ui/banner";
import { User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import {MainActions} from "@/components/dashboard/MainAction";
import {DentalHealthOverview} from "@/components/dashboard/DentailHealthOverView";
import { Next } from "@/components/dashboard/Next";

export default async function  dashboard(){
  const user = await currentUser()

  return (
      <div>
        <Header/>
        <div className="max-w-6xl pt-10 mx-auto px-4 space-y-10">
          <Banner header={ `Welcome back, ${user?.firstName || "Admin"}!` } badgeTitle="Admin Dashboard" description="Your personal AI assistant is ready to help you" Icon={User} />
          <MainActions/>
          <div className="grid lg:grid-cols-3 gap-6">
            <DentalHealthOverview/>
            <Next/>
          </div>
        </div>
      </div>
  );
}