import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Joi from "joi";

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

app.post("/users", async (req: Request, res: Response) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });
  try {
    const value = await schema.validateAsync(req.body);
    const hash = await Bun.password.hash(value.password);
    const user = new userModel({
      email: value.email,
      password: hash,
      name: value.name,
    });
    const saveUser: any = await user.save();
    const { password, ...newUser } = saveUser._doc;
    res.json(newUser);
  } catch (err: any) {
    res.json({ err: err.message });
  }
});

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Pink app listening on port ${port}`);
});
