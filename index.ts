import express, {Request, Response} from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/bun");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", userSchema);

app.use(express.json());


app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Pink app listening on port ${port}`);
});
