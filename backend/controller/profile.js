import ideaCollection from "../models/createUser.js";
import messageCollection from "../models/notification.js";
import userCollection from "../models/user.js";
import ai from "../config/gemini.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const id = req.user.id;

    const updatedUser = await userCollection.findByIdAndUpdate(
      id,
      {
        fullName: name,
        email: email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};


export const createIdeas = async (req, res) => {
  const {
    title,
    category,
    description,
    problem,
    solution,
    targetAudience,
  } = req.body;
const id = req.user.id;
  try {
    const user = await ideaCollection.create({
      title,
      category,
      description,
      problemStatement: problem,
      proposedSolution: solution,
      targetAudience,
      createdBy: id,
    });

    return res.status(201).json({
      success: true,
      message: "Idea submitted successfully",
      idea: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const exploreIdeas = async(req,res)=>{
try {

const data = await ideaCollection.find().sort({_id:-1});
console.log(data)

    return res.status(200).json({
      success: true,
      data,
    });
} catch(error) 
   {
  console.log(error)
}
}

export const adminexploreIdeas = async(req,res)=>{
try {

    const data = await ideaCollection
    .find()
    .sort({ _id: -1 })
    .populate("createdBy", "fullName email");
    console.log(data)

    return res.status(200).json({
      success: true,
      data,
    });
} catch(error) 
   {
  console.log(error)
}
}

export const getAuthProfile = async(req,res)=>{
  try {
    const id  = req.user.id;
  const data = await ideaCollection.find({ createdBy: id }).sort({_id:-1});
   return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.log(error)
  }
}

export const formData = async(req,res)=>{
  try {
    const{id,title,category,description,target} = req.body;
   const data = await ideaCollection.findByIdAndUpdate(id,{
    title:title,
    description:description,
    category:category,
    targetAudience:target
   });
   res.json({
    sucess:true,
      message:"Data succesfully updated",
    data

   })
  } catch (error) {
     res.json({
    sucess:false,
      message:"Data does not updated",
  

   })
    console.log(error)
  }
}

export const deleteform = async (req, res) => {
  try {
    const data_id = req.body.id;
    const userId = req.user.id;

    console.log("BODY:", req.body);
    console.log("ID:", data_id);
    console.log("USERID:", userId);

    const deletedStartup = await ideaCollection.findOneAndDelete({
      _id: data_id,
      createdBy: userId
    });

    if (!deletedStartup) {
      return res.status(404).json({
        success: false,
        message: "Idea not found or unauthorized"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Idea deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const updateIdeaStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedIdea = await ideaCollection.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedIdea) {
      return res.status(404).json({
        success: false,
        message: "Startup idea not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedIdea,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const message = async(req,res)=>{
  try {
    const {userid,cardid,messagedata} = req.body;
    const id = req.user.id;
    const data = await messageCollection.create(
      {
        adminId:id,
      userId:userid,
      cardId:cardid,
      messagedata:messagedata
      }
      

    )
    console.log("notificatin",data)
    return res.status(200).json({
      success: true,
      message: "Notification message successfully sent",
      data
    });

    
  } catch (error) {
     return res.status(200).json({
      success: FinalizationRegistry,
      message: "Notification message does not sent successfully",
      data
    });
  }
}

export const fetchData  = async(req,res)=>{
  try {
    const data = await userCollection
  .find()
  .select("-password")
  .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data
    });
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: "Data does not fetched successfully",
     
    });
  }
}

export const deletefetechData = async(req,res)=>{
  try {
    const {id} = req.body;
    const data = await userCollection.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Data Deleted successfully",
      
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Data does not Deleted successfully",
      
    });
  }
}
export const getMessage = async(req,res)=>{
  try {
    const id = req.user.id;
    const data = await messageCollection.find({
      userId:id
    }).sort({createdAt:-1}).populate("adminId","fullName").populate("cardId","title")
     return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data
    });
  } catch (error) {
     return res.status(200).json({
      success: false,
      message: "Data does not fetched successfully",
     
    });
  }
}

const generateWithRetry = async (prompt, config) => {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config,
      });
    } catch (error) {
      const status = error.status;

      if (status !== 503 || attempt === maxAttempts) {
        throw error;
      }

      console.log(`Gemini unavailable. Retry attempt ${attempt + 1}`);

      await new Promise(resolve =>
        setTimeout(resolve, attempt * 2000)
      );
    }
  }
};


export const generateIdeas = async (req, res) => {
  try {
    const {
      niche,
      interests,
      skills,
      budget,
      targetAudience,
    } = req.body;

    if (!niche || !niche.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a startup niche or problem.",
      });
    }

    const prompt = `
You are LaunchPad AI, an expert startup consultant.

Generate exactly 2 unique, realistic and innovative startup ideas.

User information:
Startup niche/problem: ${niche}
Interests: ${interests || "Not specified"}
Skills: ${skills || "Not specified"}
Budget: ${budget || "Not specified"}
Target audience: ${targetAudience || "Not specified"}

For every idea, provide:
1. title
2. tagline
3. description
4. problem
5. solution
6. targetAudience
7. keyFeatures (3 to 5 features)
8. estimatedBudget

Make the ideas practical, specific and suitable for an early-stage founder.
Avoid generic ideas and repeated concepts.

Return only valid JSON.
`;

    console.time("Gemini Generation Time");

    const response = await ai.models.generateContent({
      model:  "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              title: {
                type: "STRING",
              },
              tagline: {
                type: "STRING",
              },
              description: {
                type: "STRING",
              },
              problem: {
                type: "STRING",
              },
              solution: {
                type: "STRING",
              },
              targetAudience: {
                type: "STRING",
              },
              keyFeatures: {
                type: "ARRAY",
                items: {
                  type: "STRING",
                },
              },
              estimatedBudget: {
                type: "STRING",
              },
            },

            required: [
              "title",
              "tagline",
              "description",
              "problem",
              "solution",
              "targetAudience",
              "keyFeatures",
              "estimatedBudget",
            ],
          },
        },
      },
    });

    console.timeEnd("Gemini Generation Time");

    if (!response.text) {
      throw new Error("Gemini returned an empty response.");
    }

    const ideas = JSON.parse(response.text);

    return res.status(200).json({
      success: true,
      message: "Startup ideas generated successfully.",
      data: ideas,
    });

  } catch (error) {
    console.error("Gemini generation error:", error.message);
    console.error("Error status:", error.status);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Unable to generate ideas. Please try again.",
    });
  }
};
