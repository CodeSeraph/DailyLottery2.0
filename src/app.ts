// src/app.ts
import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Sample data class
class PageData {
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

// Define routes
app.get("/", (req, res) => {
  const homeData = new PageData("Home", "Welcome to the home page!");
  res.render("index", { data: homeData });
});

app.get("/about", (req, res) => {
  const aboutData = new PageData("About", "Learn more about us.");
  res.render("about", { data: aboutData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
