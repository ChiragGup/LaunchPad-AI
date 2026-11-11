import history from "../models/historyAuth.js"

export const loginHistory = async(userid)=>{
         return await history.create({
            userId: userid,
            loginData:new Date()
         })
        
        }

export const logoutHistory = async (userId) => {
  const logoutUser = await history
    .findOne({
      userId,
      logoutData: null,
    })
    .sort({ loginData: -1 })
    .populate("userId", "fullName email");

  if (!logoutUser) {
    return null;
  }

  logoutUser.logoutData = new Date();

  await logoutUser.save();
console.log(logoutUser)
  return logoutUser;
};