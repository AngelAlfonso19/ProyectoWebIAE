const router = require("express").Router()
const Assessment = require("../db/AssessmentDetail")


router.get('/', async (req, res)=> {
    console.log("Entra a get /api/assessmentDetail");
    try{
        let docs = await Assessment.showAssessments();
        console.log(docs);
        res.json(docs);
    }catch(error){
        console.log("error", error)
    }
})

module.exports = router;