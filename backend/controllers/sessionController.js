const Session = require("../models/Session");
const Question = require("../models/Question");

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user?._id;  

    if (!userId) {
      return res.status(400).json({ success: false, message: "User not attached to request" });
    }

    if (!role || !experience) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const QuestionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );

    session.questions = QuestionDocs;
    await session.save();

    res.status(201).json({ success: true, session });

  } catch (error) {
    console.error("Error in createSession:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.deleteSession = async (req,res)=> {
  try {
    const session = await Session.findById(req.params.id);

    if(!session){
      return res.status(404).json({message:"Session not found"});
    }
    if(session.user.toString() !== req.user._id.toString()){
      return res.status(401).json({message:"Not authorized to delete this session"});
    }
    await Question.deleteMany({session:session._id});
    await session.deleteOne();

    res.status(200).json({success: true, message:"Session deleted successfully"});

  } catch (error) {
    res.status(500).json({success: false, message:"Server Error", error: error.message});
  }
};
