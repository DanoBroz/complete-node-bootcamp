const fs = require('fs')
const superagent = require('superagent')

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(() => console.err('I could not find that file 😢'))
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err, data) => {
            if (err) reject('I could not write the file 💥')
            resolve('success')
        })
    })
}

// readFilePro(`${__dirname}/dog.txt`)
//     .then((data) => {
//         console.log(`Breed: ${data}`)
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     })
//     .then((res) => {
//         console.log(res.body.message)

//         return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message)

//         // fs.writeFile('./dog-img.txt', res.body.message, (err, data) => {
//         //     if (err) return console.error(err)
//         //     console.log('Data were retreived')
//         // })
//     })
//     .then(() => {
//         console.log('Random image was saved to file!')
//     })
//     .catch((err) => {
//         console.log(err.message)
//     })

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dogsdf.txt`)
        console.log(`Breed: ${data}`)
        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        )
        console.log(res.body.message)

        await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message)
        console.log('Random image was saved to file!')
    } catch (err) {
        console.log(err.message)
    }
}

getDogPic()
