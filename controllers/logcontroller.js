const router = require('express').Router();
const Log = require('../db').import('../models/log');

/* ************************
 *** LOG / ***
 ************************* */
// /log/ POST Allows users to create a workout log with descriptions, definitions, results, and owner properties.
router.post('/', (req, res) => {
  const logEntry = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
