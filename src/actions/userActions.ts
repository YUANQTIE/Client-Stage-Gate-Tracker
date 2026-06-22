"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "@/types";

export async function userSelect() {
  return await prisma.users.findMany();
}

export async function userUpdate(user: UserType){
  return await prisma.users.update({
    where: {user_id: user.user_id},
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      image_id: user.image_id == '' ? null : user.image_id,
      client_id: user.client_id == '' ? null : user.client_id, 
      department_id: user.department_id,
      email: user.email
    }
  })
}