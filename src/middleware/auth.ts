import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Doctor  from "../Model/doctorModel"
import { AuthenticationError } from "apollo-server";


const jwtsecret = process.env.JWT_SECRET as string;
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

const auth =(context: { req: { headers: { authorization: string; }; }; })=>{
  const authentication= context.req.headers.authorization
  if(authentication){
    const token = authentication.split("Bearer")[1]
    if(token){
      try {
        const verified = jwt.verify(token, jwtsecret);
        
      } catch (error) {
        throw new  AuthenticationError("Invalid/expired token")
      }
    };
    throw new Error("Provide Bearer token")
  }
  throw new Error("Athorization header must be provded")
}

