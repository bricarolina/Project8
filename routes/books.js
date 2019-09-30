/*router to handle various book routes */

/*const declarations */
const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/*GET books listing */
router.get('/', (req, res, next) => {
    Book.findAll({order: [["title", "ASC"]]}).then(books => {
        res.render('books/index', { books })
    }).catch(error => {
        res.status(500).send(error);
    });
});

/*GET create new book */
router.get('/new', (req, res, next) => {
    res.render("books/new-book", {book: {}, title: "New Book"});
}); 

/*POST create new book form */
router.post('/new', (req, res, next) => {
    Book.create(req.body).then((book) => {
        res.redirect("/books");
    }).catch(error => { // build new book with input, so that previous user input remains, ready for adjustment
        if(error.name === "SequelizeValidationError") {
            res.render("books/new-book", {book: Book.build(req.body), errors: error.errors, title: "New Book"});
        } else {
            throw error;
        }
    }).catch(error => {
        res.status(500).send(error);
    });
});

/*GET specific book details */
router.get('/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        if(book) {
            res.render("books/update-book", {book: book, title: "Edit Book" });
        } else {
            const err = new Error("A server issue has occurred");
            next(err);
        }
    }).catch(error => {
        res.status(500).send(error);
    })
});

/*POST update specific book details */
router.post('/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        if (book) {
            return book.update(req.body);
        } else {
            res.send(404);
        }
    }).then(book => {
        res.redirect("/books");
    }).catch(error => {
        if (error.name === "SequelizeValidationError") {
            const book = Book.build(req.body);
            book.id = req.params.id;
            res.render("books/update-book", {book: book, errors: error.errors, title: "Edit Book"})
        } else {
            throw error;
        }
    }).catch(error => {
        res.status(500).send(error);
    });
});

/*POST delete specific book */
router.post('/:id/delete', (req, res, next) => {
    Book.findByPk(req.params.id).then(book => {
        if (book) {
           return book.destroy();
        } else {
            res.send(404);
        }
    }).then(() => {
        res.redirect("/books");
    }).catch(error => {
        res.status(500).send(error);
    })
});

module.exports = router;