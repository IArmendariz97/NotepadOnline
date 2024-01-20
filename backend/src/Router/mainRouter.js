const { Router } = require("express");
const noteRouter = require("./Notes/notesRouter");
const userRouter = require("./Users/userRouter");
const categoryRouter = require("./Categories/categoriesRouter");
const router = Router();

router.use("/notes", noteRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);

module.exports = router;
