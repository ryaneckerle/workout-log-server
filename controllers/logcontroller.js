const router = require('express').Router();
const Log = require('../db').import('../models/log');
const validateSession = require('../middleware/validate-session');

/* ************************
 *** LOG / ***
 ************************* */
// /log/ POST Allows users to create a workout log with descriptions, definitions, results, and owner properties.
router.post('/', validateSession, (req, res) => {
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

/* ************************
 *** LOG / ***
 ************************* */
// /log/ GET Gets all logs for an individual user.
router.get('/', validateSession, (req, res) => {
  let userid = req.user.id;

  Log.findAll({ where: { owner_id: userid } })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ eror: err }));
});

/* ************************
 *** LOG /:ID ***
 ************************* */
// /log/:id GET Gets individual logs by id for an individual user.
router.get('/:id', validateSession, (req, res) => {
  Log.findOne({ where: { id: req.params.id } })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ************************
 *** LOG /:ID ***
 ************************* */
// /log/:id PUT Allows individual logs to be updated by a user.
router.put('/:id', validateSession, (req, res) => {
  const updateLog = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  };

  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.update(updateLog, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

/* ************************
 *** LOG /:ID ***
 ************************* */
// /log/:id DELETE Allows individual logs to be deleted by a user.
router.delete('/:id', validateSession, (req, res) => {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: 'Log Entry Removed' }))
    .catch((err) => status(500).json({ error: err }));
});

module.exports = router;
