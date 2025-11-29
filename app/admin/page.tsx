import { AdminStats } from "@/components/admin/AdminStats";
import { DoctorMangment } from "@/components/admin/DoctorMangment";
import { Header } from "@/components/admin/Header";
import { Banner } from "@/components/ui/banner";
import { currentUser } from "@clerk/nextjs/server";
import { SettingsIcon } from "lucide-react";

export default async function Admin() {
  const user = await currentUser();

  if (user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_ACCOUNT) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Not Authorized</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className=" max-w-6xl mx-auto space-y-6 pt-10 px-4">
        {/* ADMIN WELCOME SECTION */}
        <Banner header={ `Welcome back, ${user?.firstName || "Admin"}!` } badgeTitle="Admin Dashboard" description="                Manage doctors, oversee appointments, and monitor your dental
        practice performance." Icon={SettingsIcon} />
        {/*<div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                
              </h1>
              <p className="text-muted-foreground">

              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            </div>
          </div>
        </div>*/}
        <AdminStats/>
        <DoctorMangment/>
      </div>
    </div>
  );
}
