const Knowledge = require("../models/knowledge.model")
async function createKnowledge(req,res){
  try{
    const{
      title,
      description,
      type,
      content,
      language,
      category,
      tags,
      url
    }=req.body
    if(!title || !type){
      return res.status(400).json({
        message:"Title and type are required"
      })
    }
    console.log("Logged in user:", req.user);
console.log("Request body:", req.body);
    const knowledge = await Knowledge.create({
      user:req.user.id,
      title,
      description,
      type,
      content,
      language,
      category,
      tags,
      url
    })
    res.status(201).json({
      message:"Knowledge saved successfully",
      knowledge
    })
  }
  catch(err){
    res.status(500).json({
      message:"Failed to save knowledge",
      error:err.message
    })
  }
}
async function getKnowledge(req,res){
  try{
    const knowledge = await Knowledge.find({
      user:req.user.id
    }).sort({createdAt:-1})
    res.status(200).json({
      message:"Knowledge fetched successfully",
      knowledge
    })
  }
  catch(err){
    res.status(500).json({
      message:"Failed to fetch knowledge",
      error:err.message
    })
  }
}
async function updateKnowledge(req,res){
  try {
    const updatedKnowledge = await Knowledge.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedKnowledge) {
      return res.status(404).json({
        message: "Knowledge not found"
      });
    }

    res.status(200).json({
      message: "Knowledge updated successfully",
      knowledge: updatedKnowledge
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update knowledge",
      error: error.message
    });
  }
}


// DELETE KNOWLEDGE
async function deleteKnowledge(req, res) {
  try {
    const deletedKnowledge = await Knowledge.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedKnowledge) {
      return res.status(404).json({
        message: "Knowledge not found"
      });
    }

    res.status(200).json({
      message: "Knowledge deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete knowledge",
      error: error.message
    });
  }
}


module.exports = {
  createKnowledge,
  getKnowledge,
  updateKnowledge,
  deleteKnowledge
};
