import axios from "axios";
import express, { Request, Response } from "express";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/api/status", (_: Request, res: Response) => {
  return res.status(200).json({
    success: true,
  });
});

app.get("/api/hello", async (req: Request, res: Response) => {
  const { visitor_name = "Mark" } = req.query;

  try {
    const client_ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const geo = await axios.get(
      `https://get.geojs.io/v1/ip/geo/${client_ip}.json`,
    );

    const location = geo.data.city;

    const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.data.latitude}&longitude=${geo.data.longitude}&current=temperature`;

    const response = await axios.get(weather_url);

    const greeting = `Hello, ${visitor_name}!, the temperature is ${response.data.current.temperature} degrees Celsius in ${location}`;

    return res.status(200).json({
      client_ip,
      greeting,
      location,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.sendStatus(500);
  }
});

app.listen(5500, () => {
  console.log("Server Running!");
});

export default app;
