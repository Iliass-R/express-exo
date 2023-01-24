const Agent = require('../models/Agent');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');


exports.register = (req, res) => {
    const numAgent = req.body.numAgent;
    const grade = req.body.grade;
    const password = req.body.password;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log("Problème lors du hashing: ", err);
        res.status(500).json({ message: "Erreur en enregistrant l'agent" });
  } 
  else {
        Agent.create({ numAgent: numAgent, grade: grade, password: hashedPassword }, (err, result) => {
          if (err) {
            if (err.name === "ValidationError") {
              res.status(409).json({ message: `L'agent ${err.errors.numAgent.value} existe déjà` });
            } 
            else {
              console.log("Erreur en enregistrant l'agent :", err);
              res.status(500).json({ message: "Erreur en enregistrant l'agent" });
            }
          } 
          else {
            res.status(201).json({ _id: result._id });
          }
        });
      }
    });
  };

exports.login = (req, res) => {
    const numAgent = req.body.numAgent;
    const password = req.body.password
    Agent.findOne({ numAgent: numAgent }, (err, agent) => {
        if (err) {
            console.log("Erreur en recherchant l'agent :", err);
            res.status(500).json({ message: "Erreur en recherchant l'agent" });
        } else if (agent) {
            bcrypt.compare(password, agent.password, (err, result) => {
            if (err) {
                console.log("Problème lors du hashage :", err);
                res.status(500).json({ message: "Erreur en recherchant l'agent" });
            } else if (result) {
                return res.status(200).json({
                    numAgent: agent.numAgent,
                    token: jwtUtils.generateTokenForUser(agent)
                });
            } else {
                res.status(401).json({ message: "Mot de passe incorrect" });
            }
            });
        } else {
            res.status(404).json({ message: "Agent non trouvé" });
        }
    });
};

exports.update = (req, res) => {
    const grade = req.body.grade;
    Agent.findOneAndUpdate({
        grade: req.body.grade
    }, {
        grade: grade
    }, (err, result) => {
        if (err) {
            console.log("Erreur en recherchant l'agent :", err);
            res.status(500).json({ message: "Erreur en recherchant l'agent" });
        } else if (result) {
            res.status(200).json({ message: "Grade modifié" });
        } else {
            res.status(404).json({ message: "Agent non trouvé" });
        }
    });
};

          