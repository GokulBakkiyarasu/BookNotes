import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mysql from "mysql2";

// Initialize express app and set the port
const app = express();
const port = 3000;

// MySQL Database connection configuration
const db = mysql.createConnection({
  host: "bemknejwgjkldbbg5v9v-mysql.services.clever-cloud.com",
  port: 3306,
  user: "unerbejze6winor1",
  password: "C7ilcifgpXZhCeFDjnwu",
  database: "bemknejwgjkldbbg5v9v",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log("Error in connecting with the database, ", err.message);
    return;
  }
  console.log("Successfully connected to the database on id: ", db.threadId);
});

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serves static files (CSS, JS, images, etc.)
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

// Session middleware for storing user sessions (e.g., admin login status)
app.use(
  session({
    secret: "a_long_random_string_1234567890abcdef", // Secret key for session encryption
    resave: false, // Avoid saving session if not modified
    saveUninitialized: true, // Save session even if it's new and unmodified
    cookie: { secure: false }, // Set `secure: true` for production (with HTTPS)
  })
);

let sortType = "none"; // Default sort type
let searchQuery = ""; // Default search query
let books = await getAllBooks(sortType); // Fetch all books initially sorted by the default type

// Fetch Books Function
function getAllBooks(sortType, searchQuery) {
  // Initialize the base query with a placeholder for the LIKE clause
  let query = "SELECT * FROM books";

  // Add WHERE clause if searchQuery is provided
  if (searchQuery) {
    query += " WHERE name LIKE ?";
  }

  // Adjust the SQL query to include sorting based on the provided `sortType`
  if (sortType === "name") {
    query += " ORDER BY name ASC";
  } else if (sortType === "year") {
    query += " ORDER BY publishedYear DESC";
  } else if (sortType === "ratings") {
    query += " ORDER BY ratings DESC";
  }

  // Return a promise to handle async book fetching
  return new Promise((resolve, reject) => {
    // Execute the query with parameterized value
    db.query(query, [`%${searchQuery}%`], (err, result) => {
      if (err) {
        console.log("Error in Fetching Data From the Database:", err.message);
        return reject(err);
      }
      console.log("Successfully Fetched Data");
      resolve(result);
    });
  });
}

// Fetch a specific book by its ID
function getBook(id) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM books WHERE id = ?",
      [parseInt(id)],
      (err, result) => {
        if (err) {
          console.log("Failed to fetch the book with given id.", err.message);
          return reject(err);
        }
        console.log("Successfully fetched the book with the given id.");
        resolve(result[0]);
      }
    );
  });
}

// Insert a new book into the database
function insertBook(req, res) {
  const {
    title,
    author,
    year,
    genre,
    ratings,
    isbn,
    link,
    Description,
    Notes,
  } = req.body;

  // Generate cover image link from ISBN
  const img = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  // Insert new book into the books table
  db.query(
    "INSERT INTO books (name, author, publishedYear, genre, ratings, description, notes, amazonLink, img, isbn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      author,
      parseInt(year),
      genre,
      parseFloat(ratings),
      Description,
      Notes,
      link,
      img,
      isbn,
    ],
    (err, result) => {
      if (err) {
        console.log("Failed to insert data", err);
        res.redirect(`/add?error=${err.code}`);
      } else {
        console.log("Record inserted successfully:", result.insertId);
        return res.redirect("/");
      }
    }
  );
}

// Update an existing book record
function updateBook(req, res) {
  const {
    title,
    author,
    year,
    genre,
    ratings,
    isbn,
    link,
    Description,
    Notes,
  } = req.body;

  // Generate cover image link from ISBN
  const img = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const id = parseInt(req.params.id);

  // Update the book with new data
  db.query(
    "UPDATE books SET name = ?, author = ?, publishedYear = ?, genre = ?, ratings = ?, description = ?, notes = ?, amazonLink = ?, img = ?, isbn = ? WHERE id = ?",
    [
      title,
      author,
      parseInt(year),
      genre,
      parseFloat(ratings),
      Description,
      Notes,
      link,
      img,
      isbn,
      id,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating book:", error.message);
        return res.redirect("/");
      }
      console.log("Book updated successfully:", results.affectedRows);
      res.redirect("/");
    }
  );
}

// Delete a book record by its ID
function deleteBook(id, res) {
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Error in deleting record from database", err.message);
    } else {
      console.log("Record deleted successfully", result.affectedRows);
      res.redirect("/");
    }
  });
}

// Get Admins
function getAdmins() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM admin", (err, result) => {
      if (err) {
        console.log("Error in executing the query");
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Admin login handling
async function adminLogin(req, res) {
  const entered = req.body;
  const admins = await getAdmins(); // Get all admin username and password from the database
  for (let admin of admins) {
    if (
      entered.username === admin.username &&
      entered.password === admin.password
    ) {
      req.session.isAdmin = true; // Store admin status in session
      return res.redirect("/");
    }
  }
  return res.redirect("/admin/login?error=failed");
}

// Define a middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.isAdmin) {
    return next(); // User is authenticated, proceed to the route
  } else {
    res.status(401).render("error401.ejs"); // Render a custom 401 error page
  }
}

// Routes

// Home route: displays all books, optionally sorted
app.get("/", async (req, res) => {
  let isHome = true;
  books = await getAllBooks(sortType, (searchQuery = ""));
  const isAdmin = req.session.isAdmin || false;
  res.render("index.ejs", {
    books: books,
    home: isHome,
    isAdmin,
    selectedSortType: sortType,
  });
});

// Route to display details of a specific book by its ID
app.get("/book/:id", async (req, res) => {
  const book = await getBook(req.params.id);
  let isHome = false;
  res.render("readMore.ejs", { book: book, home: isHome });
});

// Admin login page route
app.get("/admin/login", (req, res) => {
  let isHome = false;
  res.render("login.ejs", { home: isHome, isLogin: req.query.error });
});

// Route to add a new book
app.get("/add", isAuthenticated, (req, res) => {
  console.log(req.query);
  let isHome = false;
  let isSubmitted = req.query.error || "Success";
  res.render("addbooks.ejs", { home: isHome, isSubmitted });
});

// Admin logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return res.redirect("/"); // If session destruction fails, redirect to home
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.redirect("/"); // Redirect to the login page
  });
});

// Route to delete a book by ID
app.get("/delete/:id", isAuthenticated, (req, res) => {
  deleteBook(req.params.id, res);
});

// Route to edit an existing book by ID
app.get("/edit/:id", isAuthenticated, async (req, res) => {
  let isHome = false;
  let book = await getBook(req.params.id);
  res.render("edit.ejs", { book, home: isHome });
});

// POST route to handle admin login
app.post("/login", (req, res) => {
  adminLogin(req, res);
});

// POST route to handle book search
app.post("/search", async (req, res) => {
  let isHome = true;
  let isBack = true;
  searchQuery = req.body.bookName;
  const isAdmin = req.session.isAdmin || false;
  books = await getAllBooks(sortType, searchQuery);
  res.render("index.ejs", {
    books: books,
    home: isHome,
    isAdmin,
    isBack,
    selectedSortType: sortType,
    searchQuery,
  });
});

// POST route to add a new book
app.post("/addBook", (req, res) => {
  const isAdmin = req.session.isAdmin || false;
  if (isAdmin === false) {
    return res.status(401).render("error401.ejs");
  }
  insertBook(req, res);
});

// POST route to update an existing book
app.post("/editBook/:id", (req, res) => {
  updateBook(req, res);
});

// POST route to handle sorting of books
app.post("/sort", async (req, res) => {
  let isHome = true;
  let isBack = true;
  sortType = req.body.sortType;
  const isAdmin = req.session.isAdmin || false;
  books = await getAllBooks(sortType, searchQuery);
  res.render("index.ejs", {
    books: books,
    home: isHome,
    isAdmin,
    selectedSortType: sortType,
    isBack,
    searchQuery,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Book Notes Catalog app listening on port ${port}`);
});
