import * as dotenv from 'dotenv';
dotenv.config();

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const fromPhoneNumber = process.env.FROM_PHONE_NUM;
const to = process.env.TO;

const client = twilio(accountSid,authToken)

// const options = {
//     body: 'Hola soy un SMS desde mi Api',
//     from: fromPhoneNumber,
//     to
// };

// try {
//     const message = await client.messages.create(options);
//     console.log(message);
// } catch (error) {
//     console.log(error);
// }

export const message = await client.messages.create({
    body: 'Hola soy un SMS desde mi Api',
    from: fromPhoneNumber,
    to
});

//desde este modulo se puede exportar el envio de sms