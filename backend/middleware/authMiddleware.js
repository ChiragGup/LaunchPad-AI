import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next)=>{
try {
     const token  = req.cookies.token;
 console.log(token)
 if(!token){
   return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login."
    });
} 

const data   = jwt.verify(token,  process.env.JWT_SECRET)
req.user = data;

console.log("Middleware req.user:", req.user);
next();
}
catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
    });
}
 }

export default authMiddleware;