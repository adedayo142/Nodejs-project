

// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('Hello People')
//     res.end();
// })
// server.listen(2000, 'localhost', () => {
//     console.log('listening on port 2000');
// })

//Get file from html

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html')

//     fs.readFile('./views/index.html', (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.end(data)
//         }
//    })
// })
// server.listen(2000, 'localhost', () => {
//     console.log('listening on port 2000');
// })

// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html')
//     let path = './views/'
//     switch (req.url) {
//         case '/':
//             path += 'index.html';
//             res.statusCode = 200
//             break;
//         case '/about':
//             path += 'about.html'
//             res.statusCode = 200
//             break;
//             case '/about-me':
//             res.statusCode = 301
//             res.setHeader('Location', './about')
//             res.end()
//             break;
//         default:
//             path += '404.html'
//             res.statusCode = 404
//             break;
//     }
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.end(data)
//         }
//    })
// })
// server.listen(2000, 'localhost', () => {
//     console.log('listening on port 2000');
// })

//Status code - It describe the type of response sent to the browser
// 200 - ok, 301 - resources moved, 404 - not found, 500 - internal server error


// const http = require('http')

// const PORT = 2000

// const server = http.createServer((req, res) => {
//     res.end("<h1>Hello World</>")
// })
// server.listen(PORT, (err) => {
//     if (err) throw err;
//     process.stdout.write(`server running on port ${PORT}`)
// })

// const http = require('http')

// const PORT = 2000

// const server = http.createServer((req, res) => {
//     if (req.method == "POST" && req.url == "/login") {
//         return res.end("you are login")
//     }else if (req.method == "POST" && req.url == "/signup") {
//         return res.end("you are signed in")
//     }else if (req.method == "POST" && req.url == "/logout") {
//         return res.end("you are logged out")
//     }
//     else {
//         return res.end("home page")
//     }
// })
// server.listen(PORT, (err) => {
//     if (err) throw err;
//     process.stdout.write(`server running on port ${PORT}`)
// })

//  const http = require('http')

//  const PORT = 2000

//  const server = http.createServer((req, res) => {
//      let data = {}

//     req.on("data", (chunk) => {
//          data = Buffer.from(chunk).toString()
//          data = JSON.parse(data)
//          console.log(data);
//      })
//      res.end(JSON.stringify(data))
//  })
//  server.listen(PORT, (err) => {
//      if (err) throw err;
//      process.stdout.write(`server running on port ${PORT}`)
//  })

// const http = require('http')

// const PORT = 2000

// const server = http.createServer((req, res) => {
//     req.on("data", (chunk) => {
//         data = Buffer.from(chunk).toString()
//         data = JSON.parse(data)
//         score = data.fn + data.sn + data.tn
//         console.log(score);

//     })
//     res.end("done")
// })
// server.listen(PORT, (err) => {
//     if (err) throw err;
//     process.stdout.write(`server running on port ${PORT}`)
// })

const express = require('express')
const app = express()
const path = require('path');


const PORT = 2000
app.use(express.json()) //middleware

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`)
app.use(express.static(__dirname + "/public"))
//app.set("views", path.join(__dirname, "views"));
// app.get("/", (req, res) => {
//     res.send("Hello")
// })
app.get("/about", (req, res) => {
    console.log(req.body);
   res.render("about", {title: "Samson"})
})
app.get("/", (req, res) => {
    // res.sendFile(`${__dirname}/views/index.html`)

res.render("index", {title: "Samson Onipede"});

})

console.log(__dirname);
app.listen(PORT, () => {
    console.log("app running on port  "+ PORT);
})