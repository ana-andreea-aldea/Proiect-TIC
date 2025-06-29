const express = require("express");
const firebase = require("../firebase/admin");
const router = express.Router();
const verifyToken = require("./authorization");
let secret = "serverKeptSecret";
const jwt = require("jsonwebtoken");

// Creare elev
router.post("/", verifyToken, async (req, res) => { 

  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const db = firebase.firestore();
    const { name, grade, books } = req.body;

    if (!name || !grade) {
      throw new Error("Missing name and/or grade!");
    }
 
    await db.collection("students").add({
      name,
      grade,
      books
    });

    res.status(202).json({ message: "Created!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Adaugare carte noua pentru un elev
router.post("/:id/book", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const { id } = req.params;

    const book = req.body;
    if (!book) {
      throw new Error("Missing book!");
    }

    const db = firebase.firestore();
    const snapshot = await db.collection("students").doc(id);

    const student = (await snapshot.get()).data();
    let name = student.name;
    let grade = student.grade;
    let books = student.books;
    books.push(book);

    await snapshot.set({
      name,
      grade,
      books
    });

    res.status(202).json({ message: "Created!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Obtinere informatii despre un elev
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id == null) {
      throw error(404, "Missing required params!");
    }

    const db = firebase.firestore();
    const studentsRef = db.collection("students").doc(id);;
    const student = await studentsRef.get();

    res.status(200).json(student.data());
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Obtinere informatii despre toti elevii
router.get("/", async (req, res) => {
  try {
    const db = firebase.firestore();
    const studentsRef = db.collection("students");
    const snapshot = await studentsRef.get();

    const studentsArray = [];
    snapshot.forEach((doc) => {
      let student = doc.data();
      student.id = doc.id;
      studentsArray.push(student);
    });

    res.status(200).json(studentsArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Obtinere detalii despre o anumita carte imprumutata de un elev
router.get("/:id/books/:bookId", async (req, res) => {
  try {
    const { id, bookId } = req.params;

    const db = firebase.firestore();
    const booksRef = db.collection("students").doc(id);
    const snapshot = await booksRef.get();

    if (snapshot.empty) {
      throw error(404, "Student not found!");
    }

    const student = snapshot.data();
    let book = student.books[bookId];

    if (book == null) {
      throw error(404, "Book not found!");
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Obtinere detalii despre toate cartile imprumutate de un elev
router.get("/:id/books", async (req, res) => {
  try {
    const { id } = req.params;

    const db = firebase.firestore();
    const studentsRef = db.collection("students").doc(id);;
    const snapshot = await studentsRef.get();

    if (snapshot.empty) {
      throw error(404, "Student not found!");
    }

    res.status(200).json(snapshot.data().books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Actualizare informatii despre un elev
router.put("/:id", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const { id } = req.params;
    const { name, grade, books } = req.body;

    if (!id || !name || !grade || !books) {
      throw new Error("Missing data!");
    }

    const db = firebase.firestore();
    const docRef = await db.collection("students").doc(id);

    await docRef.set({
      name,
      grade,
      books
    });

    res.status(202).json({ message: "Accepted update!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Actualizare detalii despre o anumita carte imprumutata de un elev
router.put("/:id/books/:bookId", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const book = req.body;
    const { id, bookId } = req.params;

    if (!id || !bookId || !book) {
      throw new Error("Missing data!");
    }

    const db = firebase.firestore();
    const docRef = await db.collection("students").doc(id);
    const student = (await docRef.get()).data();

    let name = student.name;
    let grade = student.grade;
    let books = student.books;
    books[bookId] = book;

    await docRef.set({
      name,
      grade,
      books
    });

    res.status(202).json({ message: "Accepted update!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Stergere elev
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const { id } = req.params;
    if (!id) {
      throw new Error("Missing ID!");
    }

    const db = firebase.firestore();
    await db.collection("students").doc(id).delete();

    res.status(202).json({ message: "Deleted student!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Stergere carte
router.delete("/:id/deleteBook/:bookId", verifyToken, async (req, res) => {
  try {
    jwt.verify(req.token, secret, (err, decoded) => {
       if (err.expiredAt) {
        res.send({ message: "The token has expired. Please log in again." });
      } else {
        res.send({ message: "Not authorized to access this resource." });
      }
    });

    const { id, bookId } = req.params;

    if (!id || !bookId) {
      throw new Error("Missing ID!");
    }

    const db = firebase.firestore();
    const snapshot = await db.collection("students").doc(id);

    let student = (await snapshot.get()).data();
    let name = student.name;
    let grade = student.grade;
    let books = student.books;

    books.splice(bookId, 1)

    await snapshot.set({
      name,
      grade,
      books
    });

    res.status(202).json({ message: "Deleted book!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
