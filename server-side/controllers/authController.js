const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  register: async (req, res) => {
    const { username, email, name, password } = req.body;

    /* CALLBACK HELL
        // Ambil data dari Database yang => email = email dari body
        let getEmailQuery = `SELECT * FROM users WHERE email = ${db.escape(email)}`
        db.query(getEmailQuery, async (err, result) => {

            // Cek apakah email sudah ada di Database
            if (result.length > 0) {

                // Klo ada => return "Email has been used"
                return res.status(400).send({message: 'Email has been used'})
            } else {

                // Klo tidak ada => Hashing passwordnya
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)

                // Lalu kita masukkan ke Database
                let addUserQuery = `INSERT INTO users VALUES 
                (null, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashPassword)}, ${db.escape(name)}, false)`;

                db.query(addUserQuery, (err, result) => {
                    if (err) {
                        return res.status(400).send(err)
                    } return res.status(200).send({
                        data:result, message: "Register Success"
                    })
                })
            }
        })

        */

    // ASYNC AWAIT
    //ambil data dari databse yang email = email dari body
    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(200).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
      username
    )}, ${db.escape(email)}, ${db.escape(hashPassword)}, ${db.escape(
      name
    )}, false, null, false)`;

    let addUserResult = await query(addUserQuery); //input data ke database

    //abis login, harus ambil datanya lagi
    let payload = { id: addUserResult.insertId };
    const token = jwt.sign(payload, "joe", { expiresIn: "4h" });

    let mail = {
      from: `Admin <yuanhar123@gmail.com>`,
      to: `${email}`,
      subject: `Verified your account!`,
      html: `
      <div>
      <p>Thanks for register, you need to activate your account,</p>
      <a href="http://localhost:3000/user/verification/${token}">Click here</a>
      <span>to activate</span>
      </div>`,
    };

    let response = await nodemailer.sendMail(mail);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
    // Kita response "Register Berhasil"
  },
  login: async (req, res) => {
    // ambil user yang email = email dari body

    // cek apakah ada, kl gaada response email atau password salah

    // klo ada passwordnya di cek menggunakan bcrypt

    // klo salah passwordnya, response email atau password salah

    // klo betul kita akan buatkan token untuk user yang login

    // lalu response

    try {
      const { email, password } = req.body;
      const isEmailExist = await query(
        `SELECT * FROM users WHERE email=${db.escape(email)}`
      );
      if (isEmailExist.length == 0) {
        return res
          .status(400)
          .send({ message: "Email or Password is Invalid" });
      }

      if (!isEmailExist[0].isActive) {
        return res
          .status(400)
          .send({ message: "Please verified your account" });
      }

      const isValid = await bcrypt.compare(password, isEmailExist[0].password);

      if (!isValid) {
        return res
          .status(400)
          .send({ message: "Email or Password is incorrect" });
      }

      let payload = {
        id: isEmailExist[0].id_users,
        isAdmin: isEmailExist[0].isAdmin,
      };

      const token = jwt.sign(payload, "joe", { expiresIn: "1h" });

      return res.status(200).send({
        message: "Login Success",
        token,
        data: {
          isAdmin: isEmailExist[0].isAdmin,
          id: isEmailExist[0].id_users,
          name: isEmailExist[0].name,
          email: isEmailExist[0].email,
          username: isEmailExist[0].username,
          imagePath: isEmailExist[0].imagePath,
          isActive: isEmailExist[0].isActive,
        },
        // ,success:true
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchAllUser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(idParams)}`
      );
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(req.user.id)}`
      );
      return res.status(200).send({
        data: {
          isAdmin: users[0].isAdmin,
          id: users[0].id_users,
          name: users[0].name,
          email: users[0].email,
          username: users[0].username,
          isActive: users[0].isActive,
          imagePath: users[0].imagePath,
        },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  verification: async (req, res) => {
    try {
      // console.log("verification", req.user);
      const id = req.user.id;
      let updateIsActiveQuery = `UPDATE users SET isActive=true WHERE id_users=${db.escape(
        id
      )}`;
      let updateResponse = await query(updateIsActiveQuery);
      res.status(200).send({ success: true, message: "Account is verified" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
