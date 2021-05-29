const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const School = require("../../models/school.model");

const router = express.Router();

const s3 = new aws.S3({
    accessKeyId: "AKIAVYNV22AHPO3JGCWC",
    secretAccessKey: "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",
    Bucket: "project-kcane"
});

const imgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "project-kcane",
        acl: "public-read",
        key: function(req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: function(req, file, cb) {
        checkFileType(file,cb);
    }
}).single("submissionImage");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images only");
    }
}

router.post("/img-upload", (req,res) => {
    // console.log(req);
    imgUpload(req, res, (error) => {
        if(error) {
            console.log("Errors", error);
            res.json({error: error});
        } else {
            if(req.file === undefined) {
                console.log("Error: No file selected");
                res.json("Error: No file selected");
            } else {
                const imgName = req.file.key;
                const imgLocation = req.file.location;

                res.send({
                    image: imgName,
                    location: imgLocation
                });
            }
        }
    });
});

router.post("/create", (req,res) => {
    try {
        console.log(req.body);
        const { image, name, about, location, admission } = req.body;

        const newSchool = new School({
            image: image,
            name: name,
            about: about,
            location: location,
            admission: admission
        });

        newSchool.save();

        res.send(req.body);
    } catch(err) {
        console.error(err);
        res.status(400).send(err);
    }
});

router.post("/edit/:id", (req,res) => {
    let id=req.params.id;
    School.findById(id, (err, submission) => {
        if(!submission) {
            res.status(404).send("Submission not found");
        } else {
            submission.image = req.body.image;
            submission.name = req.body.name;
            submission.about = req.body.about;
            submission.location = req.body.location;
            submission.admission = req.body.admission;

            submission.save()
            .then(data => {
                res.status(200).send("Changes saved");
            })
            .catch(err => {
                console.error(err);
                res.status(400).send("Could not make changes");
            })
        }
    })
});

router.get("/:id", (req,res) => {
    const id=req.params.id;
    School.findById(id, (err, submission) => {
        if(err) {
            res.status(500).send("Something went wrong");
        } else {
            console.log(submission);
            res.status(200).send(submission);
        }
    });
});

router.get("/", (req,res) => {
    try {
        School.find({}, function(err, schools) {
            if(!schools) {
                return res.status(404).send({})
            }
            res.status(200).send(schools);
        })
    } catch(err) {
        console.error(err);
        res.status(500).send(err)
    }
});

module.exports = router;