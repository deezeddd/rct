// 4 APIs
// Add -> post
// Read -> get
// Edit - put
// delete - del

// {
// blogId : uuid  // For Simplicity
// text : string
// isDeleted : bool
// createdAtTime: dateTime
// updatedAtTime: dateTime
// }

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//Seed data
let blogList = [
  {
    blogId: "1",
    text: "This is Blog",
    isDeleted: false,
    createdAtTime: "dateTime",
    updatedAtTime: "dateTime",
  },
  {
    blogId: "2",
    text: "This is Blog 2 ",
    isDeleted: false,
    createdAtTime: "dateTime",
    updatedAtTime: "dateTime",
  },
];

// Get all the blogs from the DB - deleted = false
app.get("/", (req, res) => {
  const id = req.query?.id;

  try {
    if (id != null) {
      const result = blogList.find(
        (obj) => obj.blogId == id && obj.isDeleted === false
      );
      res.send(result);
    } else {
      const result = blogList.filter((obj) => obj.isDeleted === false);
      res.status(201).send(result);
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong", error: e });
  }
});

// Get all the blogs from the DB - deleted = true (Soft deleted)
app.get("/deleted", (req, res) => {
  const id = req.query?.id;

  try {
    if (id != null) {
      const result = blogList.find(
        (obj) => obj.blogId == id && obj.isDeleted === true
      );
      res.send(result);
    } else {
      const result = blogList.filter((obj) => obj.isDeleted === true);
      res.status(201).send(result);
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong", error: e });
  }
});


// Add the blog to the DB
// generate the new id
app.post("/", (req, res) => {
  const { text } = req.body;
  try {
    if (text !== null && text.length >0) {
      const newBlog = {
        blogId: (blogList.length + 1).toString(), // Generate unique ID
        text,
        isDeleted: false,
        createdAtTime: new Date().toISOString(),
        updatedAtTime: new Date().toISOString(),
      };
      console.log(newBlog);
      blogList.push(newBlog);
      res.status(201).json({ message: `Blog Added: Id: ${newBlog.blogId}` });
    }
    else{
        res.status(404).json({ message: "Body Empty" });
    } 
  } catch (e) {
    res.status(400).json({ message: "Something went wrong", error: e });
  }
});

app.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = blogList.findIndex(
      (obj) => obj.blogId === id && !obj.isDeleted
    );
    if (index !== -1) {
      blogList[index].isDeleted = true; // Setting isDeleted flag true - Soft Delete
      res.status(201).send(blogList.filter((obj) => obj.isDeleted === false));
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong", error: e });
  }
});

app.put("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    //Finding index of the blog via ID
    const index = blogList.findIndex(
      (obj) => obj.blogId === id && !obj.isDeleted
    );
    if (index !== -1) {
      // Updating BlogList
      blogList[index].text = text;
      blogList[index].updatedAtTime = new Date().toISOString();
      res.status(201).send(blogList.filter((obj) => obj.isDeleted === false));
    } else {
      res.status(404).json({ message: "Blog not found or has been deleted." });
    }
  } catch (e) {
    res.status(400).json({ message: "Something went wrong", error: e });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
