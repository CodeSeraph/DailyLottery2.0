import express from "express";
import path from "path";
import { PageData } from "./classes/PageData";

const app = express();
const port = 4000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  const homeData = new PageData("CC Daily Stand Up Lottery");
  res.render("index", { data: homeData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
