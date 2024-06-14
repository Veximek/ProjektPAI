const mongoose = require("mongoose")
const Joi = require("joi")
const bookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: String, required: true },
description: { type: String, required: true },
})

const Book = mongoose.model("Book", bookSchema)
    
    const validate = (data) => {
        const schema = Joi.object({
        title: Joi.string().required().label("Title:"),
        author: Joi.string().required().label("Author:"),
        description: Joi.string().required().label("Description:"),
        
        })
        return schema.validate(data)
        }
module.exports = { Book, validate }