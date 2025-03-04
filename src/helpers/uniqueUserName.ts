import { client } from "./../models/prismaClient";
export async function uniqueUserName(userName: string) {
  let users = await client.user.findMany({
    where: {
        userName:userName.toLowerCase()
    },
  });
  if(users.length > 0) throw new Error("userName already exists");
}
