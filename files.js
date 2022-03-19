const fs = require('fs')

//Reading files
// fs.readFile('./docs/blog.txt', (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// })
//     console.log('Hello');

    //Writing files
// fs.writeFile('./docs/blog.txt', 'Hello samson', () => {
//     console.log('file was edited');
// })
// fs.writeFile('./docs/blog2.txt', 'Hello again', () => {
//     console.log('new file');
// })

    // Directories
if (!fs.existsSync('./assets')) {//Helps not to throw error, if the directory exists
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('new folder');
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('remove folder');
    })
}

// Deleting files
if (fs.existsSync('./docs/blog2.txt')) {
    fs.unlink('./docs/blog2.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    })
}