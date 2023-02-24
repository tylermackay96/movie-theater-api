const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const { Router } = require("express");
const userRouter = Router();


//Find All Users 
userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).send({ allUsers }); // {allUsers: allUsers}
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

//Find One User 
userRouter.get("/byName/:name", async (req, res) => {
  try {
    const user = await User.findOne({ where: { name: req.params.name } });
    if (!user) {
      throw new Error("Not found");
    } else {
      res.status(200).send({ user });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// Get all shows watched by a user
userRouter.get("/:userId/shows", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      throw new Error("User not found");
    } else {
      const watchedShows = await user.getShows();
      res.status(200).send({ watchedShows });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});


//Update and add a show if a user has watched it
userRouter.put("/:userId/shows/:showId", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      throw new Error("User not found");
    } else {
      const show = await Show.findOne({ where: { id: req.params.showId } });
      if (!show) {
        throw new Error("Show not found");
      } else {
        const isWatched = await user.hasShow(show);
        if (isWatched) {
          res.status(200).send({ message: "Show already watched by the user" });
        } else {
          await user.addShow(show);
          res.status(200).send({ message: "Show added to user's watched shows" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});