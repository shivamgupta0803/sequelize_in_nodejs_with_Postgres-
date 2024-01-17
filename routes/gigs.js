const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require("../modules/Gig");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Get gig list 
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      const gigsJSON = gigs.map(gig => gig.toJSON());
      res.render('gigs', { gigs: gigsJSON });
    })
    .catch(err => console.log(err));
});

router.get('/add', (req, res) => res.render('add'));

router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = [];

  //Validation
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }

  if (!description) {
    errors.push({ text: 'Please add a description' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add a contact_email' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = 'Unknowns'
    } else {
      budget = `$${budget}`
    }

    //Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table 
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }

});

router.get('/search', (req, res) => {
  let { term } = req.query;
  //Make the term lowercase
  term = term.toLowerCase();
  Gig.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
  .then(gigs => {
    const gigsJSON = gigs.map(gig => gig.toJSON());
    res.render('gigs', { gigs: gigsJSON });
  })
    .catch(err => console.log(err));
})
// Add a gig 
// router.
module.exports = router;