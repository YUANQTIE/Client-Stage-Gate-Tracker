"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "@/types";

/**
 * Retrieves all user records from the database.
 * Commonly used to populate assignment dropdowns, member directories, or user selection panels.
 *
 * @returns {Promise<any[]>}
 * Returns a promise that resolves to an array containing all user objects in the database.
 */
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