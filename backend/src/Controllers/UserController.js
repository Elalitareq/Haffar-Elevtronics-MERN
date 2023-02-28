import Model from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
// this function is to fetch all the users
export function getUser(req, res, next) {
  Model.find({})
    .then((response) => {
      res.status(200).send({ status: 200, response });
    })
;
}

// this function is to create a new user
export function Add(req, res, next) {
  const model = new Model(req.body);
  model
    .save()
    .then((data) => {
      return res.status(201).send({ status: 201, data });
    })
    .catch((validationError) => {
      res.status(400).send({ status:400,error:validationError,message:validationError.message });
    }).catch((error) => {
      res.status(500).send({ status:400,error,message:error.message });
    })
}

// this function is to get one user by id
export function getUserById(req, res, next) {
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "User not found" });
      } else {
        res.status(200).send({ status: 200, response });
      }
    })
    .catch((err) => {
      next(err);

    });
}

// this function is to update one user by id
export function updateOne(req, res, next) {
  let { id } = req.params;
  const NameB = req.body.username;
  const passwordB = req.body.password;
  Model.findById({_id:id}).then((model)=>{
    if(!model) return res.status(404).send({status:404, message:"User not found"});
  
  if (NameB && passwordB) {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(passwordB, salt))
      .then((hashPassword) =>
        Model.updateMany(
          { _id: id },
          {
            $set: { username: NameB },
          },
          { $set: { password: hashPassword } }
        )
      )
      .then((model) => {
        res.status(200).send({ status: 200, message: "success" });
      })
      .catch((err) => next(err));
  }
  if (NameB && !passwordB) {
    Model.updateOne({ _id: id }, { $set: { username: NameB } })
      .then((model) => {
        res
          .status(200)
          .send({ status: 200, message: "edit name successfully" });
      })
      .catch((err) => next(err));
  }
  if (!NameB && passwordB) {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(passwordB, salt))
      .then((hashPassword) =>
        Model.updateOne({ _id: id }, { $set: { password: hashPassword } })
      )
      .then((model) => {
        res
          .status(200)
          .send({ status: 200, message: "edit password successfully" });
      })
      .catch((err) => next(err));
  }})
}

export function deleteOne(req, res, next) {
  let { id } = req.params;
  console.log(id);
  Model.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: 404, message: "User not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "User deleted successfully" });
      }
    })
    .catch((err) => next(err));
}

export function login(req, res, next) {
  const { username, password } = req.body;
  console.log(req.body);
  Model.findOne({ username })
    .then((model) => {
      if (!(username && password)) {
        res.status(400).send({ status: 400, message: "All input is required" });
      } else if (model) {
        bcrypt
          .compare(password, model.password)
          .then((isMatch) => {
            if (isMatch) {
              const token = jwt.sign(
                { model_id: model._id, username },
                process.env.TOKEN_KEY,
                { expiresIn: "5h" }
              );
              model.token = token;
              res
                .status(200)
                .send({ status: 200, message: "logged in successfully",token });
            } else {
              res
                .status(401)
                .send({ status: 400, message: "Invalid Credentials" });
            }
          })
          .catch((err) => next(err));
      } else {
        res.status(400).send({ status: 400, message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      next(err);
    });
}

export function logout(req, res, next) {
  res
    .clearCookie("auth")
    .status(200)
    .send({ status: 200, message: "logged out successfully" });
}
const userController = {
  getUser,
  Add,
  getUserById,
  updateOne,
  deleteOne,
  login,
  logout,
};
export default userController;
