const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB= require("./config/db")
const authRoutes = require("./routes/auth.routes")
dotenv.config();
const authMiddleware = require("./middleware/auth.middleware")
const knowledgeRoutes = require("./routes/knowledge.routes");
const app = express();
app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/knowledge", knowledgeRoutes);
app.get("/",(req,res)=>{
  res.status(200).json({
    message:"Welcome to codevault API "
  })
})
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;
async function startServer(){
  await connectDB();
  app.listen(PORT ,()=>{
    console.log(`Server started at : ${PORT}`)
  })
}

startServer();