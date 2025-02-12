const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.database_host,
  user: process.env.database_user,
  password: process.env.database_pass,
  database: process.env.database,
});

exports.register = (req, res) => {
  //   res.send("Form Submitted.")
  //   const { name, email, password, confirm_password } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  db.query(
    "select email from users where email=?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        return res.render("register", { message: "Email id Already taken!" });
      } else if (password !== confirm_password) {
        return res.render("register", { message: "Password doesn't match!" });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query(
        "insert into users set ?",
        { name: name, email: email, pass: hashedPassword },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            return res.render("register", {
              message: "User Registration Success!",
            });
          }
        }
      );
    }
  );
};
