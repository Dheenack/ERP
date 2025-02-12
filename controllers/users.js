// Importing required modules
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// creating connection 
const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_pass,
  database: process.env.database,
});

// Check if database credentials are missing
if (!process.env.database_host || !process.env.database_user || !process.env.database_pass || !process.env.database) {
  console.error("Missing database environment variables!");
  process.exit(1);  // Stop execution if database credentials are missing
}

// handling login
exports.login = (req, res) => {
  const { email, password } = req.body;


  db.query("SELECT * FROM users WHERE email = ?", [email], async (error, results) => {
    if (error) {
      console.error("Database Error:", error);
      return res.status(500).send("Database error");
    }
    
    // Check if email is not found
    if (results.length === 0) {
      console.log("Email not found!");
      return res.render("login", { message: "Email is incorrect!" }); // Display error in UI
    }

    const user = results[0]; // Get first user from results
    console.log("User Found:", user);
    if (!user.PASS) {  // Handle undefined password
      console.log("Password field missing!");
      return res.render("login", { alert: "Password field missing!" });
  }
  
  // Compare password with hashed password
  try {
    const isMatch = await bcrypt.compare(password, user.PASS); // Ensure correct field name
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.render("login", { message: "Password is incorrect!" });
    }

    console.log("Login Successful! Redirecting...");
    res.redirect("/dashboard"); // Redirect to dashboard (ensure it exists)
  } catch (err) {
    console.error("Bcrypt Error:", err); // Log error
    return res.status(500).send("Internal error");
  }
});
};

// Handling Registration (For Debugging)
exports.register = (req, res) => {
//res.send("Form Submitted.");
console.log("🔹 Register endpoint hit!"); // Check if function runs
console.log("Received Data:", req.body); // Check if data is received
  
  const { name, email, password, confirm_password } = req.body;
  
  
  db.query(
    "select email from users where email=?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }

      // Check if email is already taken
      if (result.length > 0) {
        return res.render("register", { message: "Email id Already taken!" });
      } 
      else if (password !== confirm_password) // Check if password matches
        {
        return res.render("register", { message: "Password doesn't match!" });
      }

      // Hash password
      let hashedPassword = await bcrypt.hash(password, 8);

      // Insert data into database
      console.log("Data being inserted:", { name, email, pass: hashedPassword });
      db.query(
        "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (error, result) => {
          if (error) {
            console.log("Error inserting data:", error);
          } else {
            console.log("User inserted successfully:", result);
            return res.render("login", { message: "User Registration Success!" });
          }
        }
      );
      console.log("🔹 Register endpoint hit!"); // Check if function runs
    }
  );
};