const express = require('express')
const fs = require('fs')
const path = require('path')
const { IncomingForm } = require('formidable')
PORT = 7000
const app = express()
app.set("view engine", "pug")
app.set("views", `${__dirname}/views`)
     const myFile = path.join(__dirname, "views/file.pug")

app.get('/', (req, res) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {

        console.log(files);
        console.log(fields);

        const isFolderExists = fs.existsSync(path.join(__dirname, "picture"))
        if(!isFolderExists) fs.mkdirSync(path.join(__dirname, "picture"))
        const read = fs.createReadStream(files.data.filepath)
        const write = fs.createWriteStream(path.join(__dirname, `document/${files.data.originalFilename}`))

         if (fs.existsSync(path.join(__dirname, `document/${files.data.originalFilename}`))) {
             return res.send(`${files.data.originalFilename} already exists`)
         }
        read.pipe(write)
     // res.render("file")
         res.end("done")
    })
})

app.listen(PORT, () => {
    console.log("app is listening on port " + PORT);
})


