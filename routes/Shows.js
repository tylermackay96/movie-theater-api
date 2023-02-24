const { body, validationResult } = require("express-validator");
const { Show, Genre } = require("../models");
const { Router } = require("express");
const showRouter = Router();

// GET all shows
showRouter.get("/", async (req, res) => {
  try {
    const allShows = await Show.findAll();
    res.status(200).send({ allShows }); // {allShows: allShows}
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// GET one show
showRouter.get("/:showId", async (req, res) => {
  try {
    const show = await Show.findOne({ where: { id: req.params.showId } });
    if (!show) {
      throw new Error("Show not found");
    } else {
      res.status(200).send({ show });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// GET shows of a particular genre
showRouter.get("/genre/:genreName", async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { name: req.params.genreName } });
    if (!genre) {
      throw new Error("Genre not found");
    } else {
      const shows = await genre.getShows();
      res.status(200).send({ shows });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// PUT update rating of a show that has been watched
showRouter.put("/:showId/rating", async (req, res) => {
  try {
    const show = await Show.findOne({ where: { id: req.params.showId } });
    if (!show) {
      throw new Error("Show not found");
    } else {
      const updatedShow = await show.update({ rating: req.body.rating });
      res.status(200).send({ updatedShow });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// PUT update the status of a show
showRouter.put("/:showId/status", async (req, res) => {
  try {
    const show = await Show.findOne({ where: { id: req.params.showId } });
    if (!show) {
      throw new Error("Show not found");
    } else {
      const updatedShow = await show.update({ status: req.body.status });
      res.status(200).send({ updatedShow });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// DELETE a show
showRouter.delete("/:showId", async (req, res) => {
  try {
    const show = await Show.findOne({ where: { id: req.params.showId } });
    if (!show) {
      throw new Error("Show not found");
    } else {
      await show.destroy();
      res.status(200).send({ message: "Show deleted" });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = showRouter;
