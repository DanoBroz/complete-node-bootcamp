const fs = require('fs')

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
)

exports.checkBody = (req, res, next) => {
    const body = req.body
    if (!body.name || !body.price) {
        return res.status(400).json({
            status: 'fail',
            message:
                'You did not specify the body correctly',
        })
    }
    next()
}

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    })
}

exports.getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(
        (tour) => tour.id === id
    )

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    })
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign(
        { id: newId },
        req.body
    )

    tours.push(newTour)

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            })
        }
    )
}

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: '<Updated tour here...>',
    })
}

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    })
}
