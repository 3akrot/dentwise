import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    if(!id){
          return new Response('missing clerk id' , {status:400})
        }
    if(eventType === "user.created"){
        try {
            await prisma.user.create({
              data:{
                clerk_id:id ?? "",
                email:evt.data?.email_addresses[0]?.email_address,
                name:(evt.data?.first_name ?? "" )+ (evt.data?.last_name ?? ""),
                phone:evt.data?.phone_numbers[0]?.phone_number
              }
            })
        }
        catch (e:any){
          console.log(e)
          return new Response("Error Inserting in db" + e.message , { status:400 })
        }

    }
    else if(evt.type == "user.deleted"){
      try {


        await prisma.user.delete({
          where:{
            clerk_id:id
          }
        })
      }
      catch(e:any){
        return new Response('Error deleting the user' + e.message , { status:400 })
      }
    }
    

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}