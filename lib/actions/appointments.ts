"use server";
import { truncateByDomain } from "recharts/types/util/ChartUtils";
import { prisma } from "../prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Appoinment } from "../generated/prisma/client";

export async function getAppointments() {
  try {
    const result = await prisma.appoinment.findMany({
      include: {
        doctor: {
          select: {
            name: true,
            image_url: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return result
  } catch (e: any) {
    throw new Error(`Error fetching appoinments : ${e.message}`);
  }
}

export async function getStatus(): Promise<{ totalAppoinment: number, completedAppoinments: number }>{
  const {userId} = await auth()
  if(!userId){
    throw new Error("You must be authntiacted")
  }
  try {
    const user  = await prisma.user.findUnique({where:{clerk_id:userId}})
    console.log(userId)
    if(!user){
      throw new Error("User does not exist")
    }
    
    const [totalAppoinment,completedAppoinments] = await Promise.all([
      prisma.appoinment.findMany({
        where:{
          userId:user.id
        }
      }),
      prisma.appoinment.findMany({
        where:{
          userId:user.id,
          status:'completed'
        }
      })
      
    ])
    return {
      totalAppoinment:totalAppoinment.length,
      completedAppoinments:completedAppoinments.length
    }
  }
  catch(e){
    console.error("prisma error : ",e)
    return {
      totalAppoinment:0,
      completedAppoinments:0
    }
  }

  
  
}