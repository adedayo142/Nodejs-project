const express = require('express')
const fs = require('fs')
const path = require('path')
const {IncomingForm} = require('formidable')

const app = express()

//app.use(express.json())

function memCheck() {
    const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(usedMem*100)} MB`);
}
function checkSize(size) {
    const max_size = 1
    size = size /1024/1024
    if (size > max_size) {
        return false
    }
    else return true
}



app.post('/', (req, res) => {
    const myFile = path.join(__dirname, "avatar.mkv")
    const data = fs.readFileSync(myFile)
    fs.writeFileSync(myFile, data)
    memCheck()
    res.json({sa:true})
})

app.post('/stream', (req, res) => {
     const myFile = path.join(__dirname, "avatar.mkv")
    const read = fs.createReadStream(myFile)
    const write = fs.createWriteStream(myFile)
    read.pipe(write)
    memCheck()
    res.end('h')
})

app.post('/formdata', (req, res) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (!checkSize(files.data.size)) {
            return res.send('oversize')
        }
        const type = files.data.mimetype
        const pic = type.startsWith('image')
        if (!pic) {
            return res.send("must be an image")
        }

        // if (files.data.mimetype !== "image/jpeg") return res.send("not image file")
        // return true
     const isFolderExists = fs.existsSync(path.join(__dirname, "document")) //check if file exist
         if (!isFolderExists) fs.mkdirSync(path.join(__dirname, "document"))
        const readFile = fs.createReadStream(files.data.filepath)
         const writeFile = fs.createWriteStream(path.join(__dirname, `document/${files.data.originalFilename}`))
         if (fs.existsSync(path.join(__dirname, `document/${files.data.originalFilename}`))) {
             return res.send(`${files.data.originalFilename} already exists`)
         }
         readFile.pipe(writeFile)
         res.end('file uploaded successfully')
     })
})

app.listen(4000)