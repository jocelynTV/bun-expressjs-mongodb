import express, {Request, Response} from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Pink app listening on port ${port}`);
});
