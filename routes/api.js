const router = require("express").Router();
const db = require("./../models");

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

// Get company detail
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
    .then(({ _id }) => {
      console.log(body);
      console.log(_id);
      db.Property.findOneAndUpdate({ _id: body.property }, { $push: { offers: _id } }, { new: true })
    })
    .then(dbOffer => {
      console.log(dbOffer);
      res.json(dbOffer);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
