"use client";

import { createDoctor, getDoctors, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
  const reuslt = useQuery({ queryKey: ["getDoctors"], queryFn: getDoctors });
  return reuslt;
}

export function useCreateDoctor() {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: ["createDoctor"],
    mutationFn: createDoctor,
    onError:()=>console.log("error creating doctor"),
    onSuccess: ()=>queryClient.invalidateQueries({queryKey:["getDoctors"]})
  });
  return result
}
export function useUpdateDoctor(){
  const queryClient = useQueryClient()

  const result = useMutation({
    mutationKey:["updateDoctor"],
    mutationFn:updateDoctor,
    onSuccess() {
      queryClient.invalidateQueries({queryKey:["getDoctors"]})
    },
    onError(e){
      console.log("error",e)
    }
  })
  return result
}
