"use server";
import { truncateByDomain } from "recharts/types/util/ChartUtils";
import { prisma } from "../prisma";

export async function getAppointments() {
  try {
    const result = prisma.appoinment.findMany({
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
