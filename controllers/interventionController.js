const intervention = require('../models/Intervention.js');

exports.addIntervention = (req, res) => {
  const newIntervention = new intervention({
    motif: req.body.motif,
    lieu: req.body.lieu,
    date: req.body.date,
  });

  newIntervention.save((err) => {
    if (err) {
      console.log("Erreur lors de l'enregistrement de l'intervention : ", err);
      res.status(500).json({ message: "Erreur lors de l'enregistrement de l'intervention" });
    } else {
      res.status(201).json({ success: "Intervention enregistrée" });
    }
  });
};

exports.getInterventions = (req, res) => {
    intervention.find({ agent: req.body.agent }, (err, interventions) => {
      if (err) {
        console.log("Erreur lors de la recherche des interventions : ", err);
        res.status(500).json({ message: "Erreur lors de la recherche des interventions" });
      } else {
        res.status(200).json(interventions);
      }
    });
  };


