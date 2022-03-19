const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const Post = require("./model/Post")
const {IncomingForm} = require('formidable')

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.set("view engine", "pug")
app.set("views", `${__dirname}/views`)


mongoose.connect(`${process.env.MONGODB_URI}`, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Database is Connected');
})

app.get("/", (req, res) => {
    res.redirect("/home")
})
app.get("/home", (req, res) => {
    res.render("form")
})

app.post("/addPost", (req, res) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {

        //console.log(fields.email);

         Post.create(fields)
        .then(response => {
            console.log(response);
            res.send('working')
        })
        .catch(err => {
            console.log(err);
            res.send('not working')
        })
        Post.create(files)
            .then(response => {
                console.log(response);
                res.send("uploading")
            })
           const filesystem =`${files.data.originalFilename}`
         const read = fs.createReadStream(files.data.filepath)
         const write = fs.createWriteStream(path.join(__dirname, `../public/images/${filesystem}`))
         read.pipe(write)

     })

})

app.get("/blog", (req, res) => {
    let filter = {}
    Post.find(filter)
    .then(response => {
        console.log(response);
        let blogs = response;
    res.render('index', {title: 'Home', blogs})
    })

})
app.get('/blog/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// app.post("/", async (req, res) => {
//     const { title, description, content, author } = req.body;

//     let data = {
//        title:
//             "In the beginning",

//     description:
//             "Story of my life",

//     content:
//             "I am serious",

//     author:
//             "Samson"
//     }
//     Post.create(data)
//         .then(response => {
//             console.log(response);
//             res.send('it worked')
//         })
//         .catch(err => {
//             console.log(err);
//             res.send('not working')
//     })
// })
// app.get("/updatepost", (req, res) => {
//     let data = {
//         title: "In the beginning"
//     }
//     let filter = {}
//     Post.findOneAndUpdate(filter, data)
//         .then(response => {
//             console.log(response);
//             res.send("still working")
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("not working")
//     })
// })

app.delete("/delete", (req, res) => {
    let data = {
        title:"In the beginning"
    }
    let filter = {}
    Post.deleteOne(filter, data)
        .then(response => {
            console.log(response);
            res.send("deleted")
        })
        .catch(err => {
            console.log(err);
            res.send("not deleted")
    })
})

// app.get("/allpost", (req, res) => {
//     let filter = {
//         description:"God created heaven and earth"
//     }
//     Post.find(filter)
//         .then(response => {
//             res.json(response)
//             console.log(response);
//         })
//         .catch(err => {
//             console.log(err);
//             res.send("not working")
//     })
// })


app.listen(PORT)