import { client } from './../models/prismaClient';
export async function uniqueEmail(email: string)
{
    let users = await client.user.findMany({
        where: {
            email: email
        }
    })
    if (users.length > 0) throw new Error("email already exists");
}