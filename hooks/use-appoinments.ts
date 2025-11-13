import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/actions/appointments";
export function useGetAppoinments(){
  const result = useQuery(
    {queryKey:["getAppoinnments"],
     queryFn:getAppointments}
  )
  return result
}