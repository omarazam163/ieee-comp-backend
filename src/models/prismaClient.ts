import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export const apiKey = process.env.API_KEY;

export const client = new PrismaClient();


