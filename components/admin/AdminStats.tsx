"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useGetAppoinments } from "@/hooks/use-appoinments";
import { useGetDoctors } from "@/hooks/use-doctors";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function SpinnerDemo() {
  return (
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">loading status...</ItemTitle>
        </ItemContent>
      </Item>
  )
}


export interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

function AdminStats() {
  const { data: doctors, isLoading: isLoadingDoctors } = useGetDoctors();
  const { data: appointments, isLoading: isLoadingAppoinments } =
    useGetAppoinments();
  const status: AdminStatsProps = {
    totalDoctors: doctors?.length ?? 0,
    activeDoctors: doctors?.filter((e) => e.isactive == true)?.length ?? 0,
    totalAppointments: appointments?.length ?? 0,
    completedAppointments:
      appointments?.filter((e) => e.status == "completed").length ?? 0,
  };
  if (isLoadingAppoinments || isLoadingDoctors) {
    return (
      <div className="h-56 flex items-center justify-center">
        <div>
          <SpinnerDemo />
        </div>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-6 mb-12">
      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Users className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{status.totalDoctors}</div>
              <div className="text-sm text-muted-foreground">Total Doctors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <UserCheck className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{status.activeDoctors}</div>
              <div className="text-sm text-muted-foreground">
                Active Doctors
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {status.totalAppointments}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="size-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {status.completedAppointments}
              </div>
              <div className="text-sm text-muted-foreground">
                Completed Appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export { AdminStats };
