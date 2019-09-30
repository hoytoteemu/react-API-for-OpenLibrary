const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const readRoutes = express.Router();
const PORT = 4000;

let Read = require('./read.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/reads', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

readRoutes.route('/').get(function(req, res) {
    Read.find(function(err, reads) {
        if (err) {
            console.log(err);
        } else {
            res.json(reads);
        }
    });
});

readRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Read.findById(id, function(err, read) {
        res.json(read);
    });
});

readRoutes.route('/update/:id').post(function(req, res) {
    Read.findById(req.params.id, function(err, read) {
        if (!read)
            res.status(404).send("data is not found");
        else
            read.read_author_name = req.body.read_author_name;
            read.read_cover_i = req.body.read_cover_i;
            read.read_id_goodreads = req.body.read_id_goodreads;
            read.read_isbn = req.body.read_isbn;
            read.read_title = req.body.read_title;
            read.subject = req.body.read_subject;
            

            read.save().then(read => {
                res.json('Book updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

readRoutes.route('/add').post(function(req, res) {
    let read = new Read(req.body);
    read.save()
        .then(read => {
            res.status(200).json({'read': 'Book added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Book failed');
        });
});
// Delete Student
readRoutes.route('/delete-read/:id').delete((req, res, next) => {
    Read.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

app.use('/reads', readRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});