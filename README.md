Based on the provided image of your **Book Notes Catalog** project's file structure, here's an updated README file to reflect the actual structure:

---

# BookLog 📚

Book Notes Catalog is a web application designed to catalog non-fiction books, allowing users to explore book details, personal notes, ratings, and more. Users can sort books by rating, recency, and title to enhance their reading experience and manage their personal book library.

![Screenshot 2024-09-09 104407](https://github.com/user-attachments/assets/b100499a-fb14-4efa-ab23-89259289f0ba)

## Overview

Book Notes Catalog offers users a platform to track, sort, and rate non-fiction books they've read, along with storing notes and book metadata such as the author, genre, and more. The project is built using Node.js for the backend, with an EJS templating engine for rendering dynamic HTML, and a MySQL database to store the book data.

## File Structure

    BookNotesCatalog/
    │
    ├── public/                # Public folder containing static assets
    │   ├── css/               # CSS stylesheets for the application
    │   │   ├── addbooks.css   # Styles for adding books
    │   │   ├── index.css      # Styles for the main page
    │   │   ├── login.css      # Styles for login page
    │   │   └── readMore.css   # Styles for the 'Read More' page
    │   ├── images/            # Image assets
    │   │   └── Logo.png       # Application logo
    │   ├── js/                # JavaScript files for client-side logic
    │   │   ├── _index.js      # Main JavaScript file
    │   │   ├── addBook.js     # JavaScript for adding books
    │   │   └── login.js       # JavaScript for login functionality
    │   
    ├── views/                 # EJS templates for rendering HTML
    │   ├── partials/          # Reusable partial EJS templates (header, footer, etc.)
    │   │   ├── footer.ejs     # Footer template
    │   │   └── header.ejs     # Header template
    │   ├── addbooks.ejs       # Template for adding books
    │   ├── edit.ejs           # Template for editing book details
    │   ├── error401.ejs       # Template for 401 error page
    │   ├── index.ejs          # Main page template
    │   ├── login.ejs          # Login page template
    │   └── readMore.ejs       # Template for the 'Read More' page
    │
    ├── query.sql              # SQL queries for database operations
    ├── package.json           # Project metadata and dependencies
    ├── package-lock.json      # Exact dependency versions
    ├── .gitignore             # Git ignore file
    └── index.js               # Entry point for Node.js backend
    

## Getting Started

To use Book Notes Catalog locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your system
- MySQL installed and set up for the database

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/GokulBakkiyarasu/BookNotesCatalog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd BookNotesCatalog
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the MySQL database:
   
   - Import the dataset into MySQL (found in the `query.sql` file).
   - Configure your MySQL connection in the `index.js` file.

5. Run the Node.js backend:

    ```bash
    npm run server
    ```

6. Open your preferred web browser and go to `http://localhost:3000`.

## Usage

- Browse the catalog of books and sort them by rating, recency, or title.
- View detailed information, notes, and ratings for each book.
- Use the search functionality to find specific books based on title, author, or genre.

## Contributing

Contributions to Book Notes Catalog are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch.
3. Make your changes.
4. Test your changes thoroughly.
5. Submit a pull request with a clear description of your changes.

## Find Me On

[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-Profile-informational?style=flat&logo=linkedin&logoColor=white&color=0D76A8)](https://www.linkedin.com/in/gokul-bakkiyarasu-531535251)

## Acknowledgments

- Node.js and Express for the backend API and server setup.
- MySQL for providing efficient data management.
- EJS for rendering dynamic HTML.
- The reading community for inspiring this project.

---

You can update the screenshot link and any other details based on your specific project needs.
