import { IconNode, LucideIcon } from "lucide-react";
import { SettingsIcon } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode } from "react";
interface BannerProps {
  Icon:LucideIcon,
  header:string,
  description:string,
  badgeTitle:string,
  className?:string // اقوله ايه تاني عشان اعرف دينه ان مش لازم البتاع ده يكون موجود
}

export function Banner({Icon,header,description,badgeTitle,className}:BannerProps){
  return (
    <div className={` ${className ?? ""} flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20`}>
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">
            {badgeTitle}
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {header}
          </h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
          {<Icon className={"w-16 h-16 text-primary"}></Icon>}
        </div>
      </div>
    </div>
  );
}