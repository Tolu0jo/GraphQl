"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const jwtsecret = process.env.JWT_SECRET;
// export const auth =  async (
//   context: { req: { cookies: { token: string; }; }; }
// ) =>{
//   try {
//     const authorization = context.req.cookies.token;
//     if (!authorization) {
//       throw new  AuthenticationError("Invalid/expired token")
//     }
//     const verified = jwt.verify(authorization, jwtsecret);
//     const { doctorId } = verified as { [key: string]: string }; 
//     const doctor = await Doctor.findOne({ _id:doctorId});
//   } catch (err) {
//    throw new  AuthenticationError("Invalid/expired token")
//   }
// }
const auth = (context) => {
    const authentication = context.req.headers.authorization;
    if (authentication) {
        const token = authentication.split("Bearer")[1];
        if (token) {
            try {
                const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
            }
            catch (error) {
                throw new apollo_server_1.AuthenticationError("Invalid/expired token");
            }
        }
        ;
        throw new Error("Provide Bearer token");
    }
    throw new Error("Athorization header must be provded");
};
