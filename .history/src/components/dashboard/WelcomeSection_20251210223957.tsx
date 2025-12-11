import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";

export default async function WelcomeSection() {
  const user = await currentUser();

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20 mb-12 overflow-hidden">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">متصل وجاهز</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {new Date().getHours() < 12
              ? "صباح الخير"
              : new Date().getHours() < 18
                ? "مساء الخير"
                : "مساء الخير"}
            ، {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            مساعدك الشخصي لأسنان الذكاء الاصطناعي جاهز لمساعدتك في الحفاظ على صحة فم مثالية.
          </p>
        </div>
      </div>

      <div className="lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full ">
        <Image src="/logo.png" alt="DentWise" width={64} height={64} className="w-16 h-16" />
      </div>
    </div>
  );
}
