"use server";
import { revalidatePath } from "next/cache";
import { Gender } from "../generated/prisma/enums";
import { prisma } from "../prisma";
import { createAvatar } from "../utils";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appoinments: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return doctors.map(({_count,...doctor})=> ({...doctor,appoinmentcount:_count.appoinments}))
  } catch (error: any) {
    throw new Error(`Error fetching doctors : ${error.message}`);
  }
}

export interface DoctorInput {
  name: string;
  email: string;
  gender: Gender;
  isactive: boolean;
  phone: string;
  speciality: string;
}

export async function createDoctor(data:DoctorInput){
  if(!data.email || !data.name){
    throw new Error("Email and Name are required")
  }
  try{
    const newDoctor = await prisma.doctor.create(
      {
        data:{
          ...data,
          isactive: (data.isactive ?? false),
          image_url:createAvatar(data.name,data.gender)
        }
      }
    )
    revalidatePath("/admin")
    return {data:newDoctor,success:true}
  }
  catch(error:any){
    if(error.code === "P2002"){
      return {data:null,success:false,message:"a doctor with a same email exists"}
    }
    throw new Error(`Error Adding New Doctor : ${error.message}`)
  }


}

export async function updateDoctor({ docId, data } : {docId:string , data:DoctorInput}){
  try {
    if(!data.email || !data.name){
      return { data:null , success:false , message:'name and email are required' }
    }
    const currentDoctor = await prisma.doctor.findUnique({
      where:{
        id:docId
      }
    })
    if(currentDoctor?.email !== data.email){
      const doctorwithsamenewmail = await prisma.doctor.findUnique({
        where:{
          email:data.email
        }
      })
      if(doctorwithsamenewmail){
        return { data:null , success:false , message:'a doctor with the same email exists' }

      }
    }
    const result = await prisma.doctor.update({
      where:{
        id:docId
    },data})
    
    revalidatePath("/admin")
    return { data:result , success:true }
  }
  catch(e:any){
    return { data:null , success:false , message:e.message }

  }
}
