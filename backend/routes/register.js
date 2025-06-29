const express = require("express");
const firebase = require("../firebase/admin");
const router = express.Router();

router.post("/" ,async (req, res) => {
    try {
        const db = firebase.firestore();
        const { email, password } = req.body;
    
        if (!email || !password) {
          throw new Error("Missing email and/or password!");
        }
    
        await db.collection("login").add({
            email,
            password
        });
    
        res.status(202).json({ message: "Created user!" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

module.exports = router;
