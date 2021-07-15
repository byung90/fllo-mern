const router = require("express").Router();
const db = require("./../models");
const bcrypt = require("bcrypt");

// Create user
router.post("/api/user/create", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      company: req.body.company
    })
      .then(function (data) {
        console.log(data);
        req.session.save(() => {
          req.session.user_id = data._id;
          req.session.logged_in = true;

          const { password, ...userData } = data._doc
          res.status(200).json(userData);
        })
      })
      .catch(function (err) {
        res.status(400).json(err);
      })
  })
});

// list users - DEVELOPMENT
router.get("/api/users", (req, res) => {
  db.User.find({})
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Login user
router.post("/api/user/login", (req, res) => {
  console.log("req.body" + req.body);
  db.User.findOne({
    email: req.body.email
  })
    .populate("company")
    .then(user => {
      console.log("user:" + user);
      if (!user) {
        res.status(400).json("Incorrect Email"); // DEVELOPMENT
        return;
      }
      else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          console.log("result: " + result);
          if (!result) {
            res.status(400).json("Incorrect Password"); // DEVELOPMENT
            return;
          }
          else {
            req.session.save(() => {
              console.log("user:" + user);
              req.session.user_id = user._id;
              req.session.logged_in = true;
              req.session.company_id = user.company._id;
              req.session.company_isBank = user.company.isBank;

              const userData = {
                auth: true,
                user_id: req.session.user_id,
                company_isBank: req.session.company_isBank,
                company_id: req.session.company_id
              }

              res.status(200).json(userData);
            })
          }
        })
      }
    })
    .catch(err => {
      res.status(400).json(err);
    })
})

// Log out
router.post('/api/user/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Check auth
router.get("/api/user/checkAuth", (req, res) => {
  if (req.session.logged_in) {
    console.log(req.session);
    res.json({
      auth: true,
      user_id: req.session.user_id,
      company_isBank: req.session.company_isBank,
      company_id: req.session.company_id
    });
  }
  else {
    res.json({
      auth: false
    });
  }
})

router.get("/api/user/:id", (req, res) => {
  db.User.findById(req.params.id)
    .populate("company")
    .then(dbUser => {
      const { password, ...userData } = dbUser._doc;
      res.json(userData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// Create Company
router.post("/api/createCompany", ({ body }, res) => {
  db.Company.create(body)
    .then(dbCompany => {
      res.json(dbCompany);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Create Property
router.post("/api/createProperty", ({ body }, res) => {
  db.Property.create(body)
    // .then(({ _id, company }) => {
    //   db.Company.findOneAndUpdate({ company }, { $push: { properties: _id } })
    // })
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get all property listings
router.get("/api/listings", (req, res) => {
  db.Property.find({})
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get only company listings
router.get("/api/listings/:companyId", (req, res) => {
  db.Property.find({
    company: req.params.companyId
  })
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get company detail
router.get("/api/company/:companyId", (req, res) => {
  db.Company.findById(req.params.companyId)
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get all companies
router.get("/api/company", (req, res) => {
  db.Company.find({})
    .then(dbCompany => {
      res.json(dbCompany);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get property detail
router.get("/api/property/:propertyId", (req, res) => {
  db.Property.findById(req.params.propertyId)
    .populate("offers")
    .then(dbProperty => {
      res.json(dbProperty);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get all offers
router.get("/api/offers", (req, res) => {
  db.Offer.find({})
    .populate("company")
    .then(dbOffers => {
      res.json(dbOffers);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get all offers for property
router.get("/api/:propertyId/offers", (req, res) => {
  db.Offer.find({
    property: req.params.propertyId
  })
    .then(dbOffers => {
      res.json(dbOffers);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Create offer
router.post("/api/createOffer", ({ body }, res) => {
  db.Offer.create(body)
    .then(dbOffer => {
      console.log(dbOffer);
      res.json(dbOffer);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Update offer
router.post("/api/rejectAllOffers", (req, res) => {
  const query = {
    _id: req.body.propertyId
  };
  db.Offer.updateMany(query, { status: "Rejected" })
    .then(dbOffer => {
      console.log(dbOffer);
      res.json(dbOffer);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
