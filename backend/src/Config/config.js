import mongoose from "mongoose";


import dotenv from "dotenv";

dotenv.config()

mongoose.set('strictQuery', false);

const cluster = process.env.CLUSTER
const username=process.env.USERNAME
const password=process.env.PASSWORD
const dbName=process.env.DB

const URI=`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`
console.log(URI)
export default () => {
// Connecting to the database
mongoose
.connect(URI, {
useNewUrlParser: true,
useUnifiedTopology: true,

})
.then(() => {
console.log("Successfully connected to database");
})
.catch((error) => {
console.log("database connection failed. exiting now...");
console.error(error);
process.exit(1);
});
};
