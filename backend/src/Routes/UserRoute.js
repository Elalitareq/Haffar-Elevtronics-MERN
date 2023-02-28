import express from "express";
const router = express.Router();
import {
  getUser,
  getUserById,
  updateOne,
  deleteOne,
  Add,
  login,
  logout,
} from "../Controllers/UserController.js";
import verifyToken from "../Middlewares/authFun.js";

router.get("/", verifyToken, getUser);

router.get("/:id", verifyToken, getUserById);

router.put("/:id", verifyToken, updateOne);

router.delete("/:id", verifyToken, deleteOne);

router.post("/add", verifyToken,Add);

router.post("/login", login);

router.post("/logout", logout);

router.post("/token", verifyToken,(req,res)=>{
  if(req.user){
    return res.status(200).json({
      status:200,
      message:"You are logged in"
    })
  }
})

export default router;
