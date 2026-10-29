import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

function getTimestamp(date, res) {
  let parsedDate;

  if (date === undefined) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    parsedDate = new Date(Number(date));
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
}

app.get("/api", (_req, res) => {
  getTimestamp(undefined, res);
});

app.get("/api/:date", (req, res) => {
  getTimestamp(req.params.date, res);
});

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
