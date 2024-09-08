CREATE DATABASE booklog;

use booklog;

CREATE TABLE books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  author VARCHAR(255) NOT NULL,
  publishedYear INT NOT NULL,
  genre VARCHAR(100) NOT NULL,
  ratings DECIMAL(2,1) NOT NULL,
  description TEXT NOT NULL,
  notes TEXT NOT NULL,
  amazonLink VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) NOT NULL UNIQUE
);

INSERT INTO books 
  (name, author, publishedYear, genre, ratings, description, img, notes, amazonLink, isbn) 
VALUES
  ("Psychology of Money", "Morgan Housel", 2020, "Finance", 4.5, 
    "Psychology of Money explores how people think about money, drawing on lessons from history, psychology, and personal experiences. It emphasizes that financial success is more about behavior and mindset than technical knowledge.",
    "https://covers.openlibrary.org/b/isbn/9789390166268-L.jpg", 
    "Focuses on human behavior in relation to money. Highlights how emotions and biases shape financial decisions. Emphasizes the value of long-term thinking and patience in investing.", 
    "https://www.amazon.com/Psychology-Money-Timeless-lessons-happiness/dp/0857197681",
    "9789390166268"),
  
  ("Atomic Habits", "James Clear", 2018, "Self-Help", 4.5, 
    "Atomic Habits is a comprehensive guide on how small, incremental habits can compound over time to produce significant results. James Clear presents a proven system for improving habits and achieving success.",
    "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", 
    "Advocates for small changes leading to significant results over time. Breaks down habits into four stages: cue, craving, response, and reward. Offers practical strategies for habit formation and breaking bad habits.",
    "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    "9780735211292"),

  ("Deep Work", "Cal Newport", 2016, "Productivity", 4.0, 
    "Deep Work by Cal Newport is about how to achieve success in a distracted world by focusing deeply on tasks. The book explains the benefits of deep work and strategies to cultivate it in your daily routine.",
    "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", 
    "Emphasizes the value of undistracted focus in achieving high performance. Explains how 'deep work' can provide a competitive edge in the modern world. Provides practical steps for cultivating deep work habits.",
    "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692",
    "9781455586691"),

  ("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 2011, "History", 4.8, 
    "In Sapiens, Yuval Noah Harari tells the story of humanity from the Stone Age to modern times, examining how biology, culture, and economics have shaped the world we live in.",
    "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", 
    "Covers the history of humankind from the emergence of Homo sapiens to present-day civilization. Explores the roles of biology, culture, and economics in human development. Examines how human societies and ideologies have shaped the modern world.",
    "https://www.amazon.com/Sapiens-Humankind-Yuval-Noah-Harari/dp/0062316095",
    "9780062316097"),

  ("The Lean Startup", "Eric Ries", 2011, "Business", 4.3, 
    "The Lean Startup by Eric Ries outlines a method for developing businesses and products in a way that reduces waste and increases efficiency. It focuses on rapid prototyping and customer feedback.",
    "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", 
    "Introduces the concept of building a 'minimum viable product' (MVP). Emphasizes rapid prototyping and learning from customer feedback. Advocates for a scientific approach to entrepreneurship and innovation.",
    "https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898",
    "9780307887894"),

  ("Thinking, Fast and Slow", "Daniel Kahneman", 2011, "Psychology", 4.7, 
    "Thinking, Fast and Slow by Daniel Kahneman explores the two systems of thinking: fast, intuitive thinking, and slow, logical thinking. It discusses how these systems shape our decisions and behavior.",
    "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg", 
    "Introduces two systems of thinking: fast (intuitive) and slow (analytical). Explores cognitive biases and how they affect decision-making. Provides insights into improving judgment and decision processes.",
    "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
    "9780374533557"),

  ("The 7 Habits of Highly Effective People", "Stephen R. Covey", 1989, "Self-Help", 4.6, 
    "Stephen Covey's classic, The 7 Habits of Highly Effective People, outlines a step-by-step path for developing personal and professional effectiveness. The book is grounded in Covey's insights on ethics, responsibility, and principles.",
    "https://covers.openlibrary.org/b/isbn/9781451639612-L.jpg", 
    "Outlines seven habits for achieving personal and professional success. Focuses on principles such as responsibility, integrity, and balance. Encourages a long-term approach to self-improvement and effectiveness.",
    "https://www.amazon.com/Habits-Highly-Effective-People-Powerful/dp/1451639619",
    "9781451639612"),

  ("Educated", "Tara Westover", 2018, "Memoir", 4.9, 
    "Tara Westover's memoir Educated tells the story of growing up in a survivalist family in rural Idaho, overcoming a lack of formal education, and ultimately earning a PhD from Cambridge University.",
    "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg", 
    "Memoir of overcoming a lack of formal education to achieve academic success. Explores themes of family loyalty, independence, and the pursuit of knowledge. Highlights the transformative power of education.",
    "https://www.amazon.com/Educated-Memoir-Tara-Westover/dp/0399590501",
    "9780399590504"),

  ("The Subtle Art of Not Giving a F*ck", "Mark Manson", 2016, "Self-Help", 4.0, 
    "In The Subtle Art of Not Giving a F*ck, Mark Manson offers a counterintuitive approach to living a good life. Instead of seeking happiness, he argues that embracing limitations and uncertainty can lead to greater fulfillment.",
    "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg", 
    "Advocates for embracing limitations and uncertainty in life. Promotes a counterintuitive approach to happiness and success. Focuses on values and principles that matter most to an individual.",
    "https://www.amazon.com/Subtle-Art-Not-Giving-Counterintuitive/dp/0062457713",
    "9780062457714"),

  ("The Power of Habit", "Charles Duhigg", 2012, "Self-Help", 4.4, 
    "Charles Duhigg's The Power of Habit explores the science behind why habits exist and how they can be changed. It provides insight into how habits can be transformed to improve personal and professional lives.",
    "https://covers.openlibrary.org/b/isbn/9780812981605-L.jpg", 
    "Explores the science of habit formation and change. Breaks down the habit loop into cue, routine, and reward. Offers strategies to improve or break habits for personal and professional growth.",
    "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X",
    "9780812981605");

CREATE TABLE admin (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

insert into admin values ("gokulbakkiyarasu", "gokulB@392002!.."), ("sanjaybakkiyarasu", "sanjayB@392002!..")
