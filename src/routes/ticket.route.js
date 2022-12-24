const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");

const { TicketModel } = require("../models/Ticket.model");

const ticketRoutes = Router();

ticketRoutes.get("/", authentication, async (req, res) => {
  const tickets = await TicketModel.find();
  res.send(tickets);
});

ticketRoutes.post("/create", authentication, async (req, res) => {
  const newTicket = new TicketModel(req.body);
  try {
    await newTicket.save();
    res.send(newTicket);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

ticketRoutes.delete("/delete/:ticketId", authentication, async (req, res) => {
  const { ticketId } = req.params;
  const deletedTicket = await TicketModel.findOneAndDelete({
    _id: ticketId,
  });
  if (deletedTicket) {
    res.status(200).send("Deleted");
  } else {
    res.send("couldn't delete");
    console.log(err);
  }
});

ticketRoutes.patch("/edit/:ticketId", authentication, async (req, res) => {
  const { ticketId } = req.params;
  const updatedTicket = await TicketModel.findOneAndUpdate(
    { _id: ticketId },
    req.body
  );
  if (updatedTicket) {
    res.send(updatedTicket);
  } else {
    res.send("couldn't update");
  }
});

module.exports = {
  ticketRoutes,
};
