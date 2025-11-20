const express = require('express');
const router = express.Router();
// challenge 1 route
// welcome msg
router.get('/', (req, res) => {
    res.send('Welcome to SkillSphere LMS API');
});

module.exports = router;