const express = require("express");
const { join } = require("path");
const { check } = require("express-validator")
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")
// const { readDB, writeDB } = require("../lib/fsUtils");
const { image } = require("../config/cloudinary");
const movieRouter = express.Router()
const dbPath = join(__dirname, "./movies.json")
const { readJson, writeJson } = require("fs-extra")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "yeah"
    }
})
const multerCloudinary = multer({
    "storage": storage
})

const readDB = async filePath => {
    try {
        const fileJson = await readJSON(filePath)
        return fileJson
    } catch (error) {
        throw new Error(error)
    }
}

const writeDB = async (filePath, fileContent) => {
    try {
        await writeJSON(filePath, fileContent)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    readDB: async (dbPath) => readDB(dbPath),
    writeDB: async usersData => writeDB(dbPath, usersData),
}


movieRouter.get('/', async (req, res, next) => {
    try {
        console.log("trying")
        const movies = await readDB(dbPath)
        console.log(movies)
        res.status(200).send(movies)
    } catch (err) {
        console.log(err)
        next(err)
    }
});

movieRouter.get('/:id', async (req, res, next) => {
    try {
        console.log("trying")

    } catch (err) {
        console.log(err)
        next(err)
    }
});

movieRouter.post('/', [
    check("Title").exists,
    check("Year").exists,
    check("Genre").exists,
    check("Runtime").exists,
    check("plot").exists,
    check("Director").exists,
    check("Writer").exists,
    check("Actors").exists,
    check("Rated").exists,
    check("Released").exists,
    check("Country").exists,
    check("Langauge").exists
], async (req, res, next) => {
    try {
        console.log("trying")

    } catch (err) {
        console.log(err)
        next(err)
    }
});

movieRouter.post("/:id/imageupload", multerCloudinary.single("image"), async (req, res, next) => {
    try {
        console.log("trying")
        res.send("Image uploaded!")
    } catch (error) {
        console.log(error)
        next(err)
    }
})

movieRouter.put('/:id', async (req, res, next) => {
    try {
        console.log("trying")

    } catch (err) {
        console.log(err)
        next(err)
    }
});

movieRouter.delete('/:id', async (req, res, next) => {
    try {
        console.log("trying")

    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = movieRouter
