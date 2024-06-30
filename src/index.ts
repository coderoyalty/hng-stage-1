import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/api/status", (_: Request, res: Response) => {
  return res.status(200).json({
    success: true,
  });
});

app.get("/api/hello", (req: Request, res: Response) => {
  const { visitor_name = "CodeRoyalty" } = req.query;

  const greeting = `Hello, ${visitor_name}`;
  const client_ip = req.ip;

  return res.status(200).json({
    client_ip,
    greeting,
  });
});

app.listen(5500, () => {
  console.log("Server Running!");
});
