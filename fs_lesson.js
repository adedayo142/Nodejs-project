// const fs = require('fs')
// const path = require('path')

//READ async
//const filepath = path.join(__dirname, "data/1.txt")

// fs.readFile(filepath, (err, data) => {
//     if (err) throw Error('File could not be read')
//    data = Buffer.from(data).toString()
//     console.log(data);
// })


//read sync

// const data = fs.readFileSync(filepath)
// okay = Buffer.from(data).toString()
// console.log(okay);

//Write
// const filepath = path.join(__dirname, "data/2.txt")
// const data =`Hello world`
// fs.writeFile(filepath, data, {flag: 'a'}, (err) => {
//     if (err) throw Error(err.message)
//     console.log("successful");
// })

const express = require('express')
const fs = require('fs')
const path = require('path')
const {IncomingForm} = require('formidable')
const app = express()
app.use(express.json())
const PORT = 8000
app.set("view engine", "pug")
app.set("views", `${__dirname}/views`)

const filepath = path.join(__dirname, "views/text.pug")
app.post('/', (req, res) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      let data = fields.content
      console.log(data);
        fs.writeFile(filepath, data,{flag:'w+'}, (err) => {
            if (err) throw Error('resolve')
          console.log('data successful');
          data = Buffer.from(data).toString()
        })
    })
    res.redirect('/')
})

// app.get("/", (req, res) => {
//   const filepath = path.join(__dirname, "views/text.pug")
//   fs.readFileSync(filepath)
//   let data = ""
//   data = Buffer.from(data).toString()
//   console.log(data);
//   res.render('text', {text:"I am a textarea"})
// })

// app.get("/", (req, res) => {
//   const filepath = path.join(__dirname, "views/text.pug")
//     let data =""
//     fs.writeFile(filepath, data, (err, text) => {
//         if (err) throw Error("resolve")
//         text = Buffer.from(data).toString()
//         console.log(text);
//         data = text
//          res.render("text", {text:"I am a textarea"})
// })


// })

app.listen(PORT, 'localhost', () => {
    console.log("app is running on port  "+ PORT);
})