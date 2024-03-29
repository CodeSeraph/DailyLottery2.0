import express from "express";
import path from "path";
import { PageData } from "./classes/PageData";
import { ContestantsManager } from "./classes/ContestantsManager";

const app = express();
const port = 4000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.get("/", (req, res) => {
  const homeData = new PageData("Daily Stand Up Lottery");
  res.render("index", { data: homeData });
});

app.post("/add/:name", (req, res) => {
  try {
    const contestantsManager = new ContestantsManager();
    contestantsManager.addTeamMember(req.params.name);
    res.redirect(`/`);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/disable/:name", (req, res) => {
  try {
    const contestantsManager = new ContestantsManager();
    contestantsManager.disableTeamMember(req.params.name);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete/:name", (req, res) => {
  try {
    const contestantsManager = new ContestantsManager();
    contestantsManager.deleteTeamMember(req.params.name);
    res.redirect(`/`);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
