const Tour = require('../models/tourModel')

exports.getAllTours = async (req, res) => {
    try {
        //Build query
        const queryObj = { ...req.query }
        const excluededFields = [
            'page',
            'sort',
            'limit',
            'fields',
        ]

        excluededFields.forEach(
            (el) => delete queryObj[el]
        )

        const query = Tour.find(queryObj)

        // const tours = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy')

        // execute query
        const tours = await query

        //send response
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(
            req.params.id
        )

        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'tour not found',
        })
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(
            req.body
        )

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(
            req.params.id
        )

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        })
    }
}
