const express = require("express");
const cors = require("cors");
const firebase = require("./firebase/admin");
const falso = require("@ngneat/falso");

require("dotenv").config();
const studentRouter = require("./routes/student");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");


function deleteCollection(path) {
    firebase.firestore().collection(path).listDocuments().then(val => {
        val.map((val) => {
            val.delete();
        });
    });
}

async function randomData() {   

    deleteCollection("students");

    const db = firebase.firestore();

    for (let index = 0; index < 15; index++) {
        const books = [];
    
        var booksNumber = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < booksNumber; i++) {
            const book = { title: falso.randBook().title, author: falso.randBook().author,
                           year: falso.randNumber({ min: 1975, max: 2025 }), pages: falso.randNumber({ min: 10, max: 500 })};
            books.push(book);
        }

        const docRef = await db.collection("students").doc();
        let student = { name: `${falso.randFirstName()} ${falso.randLastName()}`, grade: `${falso.randNumber({ min: 5, max: 12 })}th`,
                           books: books};
        await docRef.set(student);
    }
}
  
randomData();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});
