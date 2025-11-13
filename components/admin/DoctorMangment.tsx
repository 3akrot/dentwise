"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "../ui/button"
import {  EditIcon, MailIcon, PhoneIcon, StethoscopeIcon } from "lucide-react"
import { Spinner } from "../ui/spinner"
import { Badge } from "../ui/badge"
import { AddDoctorDialog } from "./AddDoctorDiaglog"
import { useGetDoctors } from "@/hooks/use-doctors"
import { useState } from "react"
import { EditDoctorDialog } from "./EditDoctorDialog"

export function DoctorMangment(){
  const {data,isLoading} = useGetDoctors()  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 items-center">
            <StethoscopeIcon className="size-5 text-primary"/>
            <span>Doctors Mangment</span>
          </div>
        </CardTitle>
        <CardDescription>Mange and observe all doctors in practice</CardDescription>
        <CardAction>
          <AddDoctorDialog/>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5">
        { !isLoading ?
          data?.map((doc)=>{
            return (
              <Item variant={'muted'} key={doc.id}>
                <ItemMedia>
                  <Avatar className="size-14">
                    <AvatarImage  src={doc.image_url} alt="doctor_image"></AvatarImage>
                    <AvatarFallback>{ doc.name[0]}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="capitalize">Dr. { doc.name }</ItemTitle>
                  <ItemDescription className="text-xs">
                    <p className="mb-1 text-xs">{doc.speciality} <span className="inline-block px-2 bg-muted/50"> {doc.gender}</span></p>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className=" flex items-center gap-1"><MailIcon size={15}/> { doc.email }</p>
                      <p className=" flex items-center gap-1"><PhoneIcon size={15}/> { doc.phone == "" ? "not mentioned" : doc.phone }</p>
                    </div>
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="flex-1 gap-5 flex-col sm:flex-row justify-center">
                    <div className="text-center bg-background/50 rounded-2xl w-full py-4">
                    <p className="text-primary">{ doc.appoinmentcount }</p>
                      <p>Appointments</p>
                    </div>
                    {doc.isactive ?<Badge>active</Badge> :<Badge variant={'secondary'}>not active</Badge> }
                  <EditDoctorDialog doc={doc} />
                </ItemActions>
              </Item>
            );
          }) : <div className="h-52">
            <Item variant={'outline'}>
              <ItemMedia>
                <Spinner/>
              </ItemMedia>
              <ItemContent>
                <ItemDescription>
                  fetching doctors...
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
          
        }
      </CardContent>

    </Card>
  )
}