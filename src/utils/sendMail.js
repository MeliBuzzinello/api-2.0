import * as dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const HOST = process.env.EMAIL_HOST;
const PASS = process.env.EMAIL_HOST_PASS;

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: HOST,
        pass: PASS
    },
  });

//desde este modulo se exporta el envio de mail