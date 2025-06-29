const express = require("express");
const admin = require("../firebase/admin");
const router = express.Router();
const jwt = require("jsonwebtoken");
let secret = "serverKeptSecret";

// Autentificare + generare token
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = admin.firestore();
    const loginRef = db.collection("login");
    const snapshot = await loginRef
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ message: "No matching documents!" });
    }

    // Construire date codate in token
    let tokenEncodedData = { email };

    // Generare token JWT
    const token = jwt.sign(tokenEncodedData, secret, { expiresIn: 3600 });

    return res.status(200).json({
      success: true,
      message: "Successful authentication!",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
