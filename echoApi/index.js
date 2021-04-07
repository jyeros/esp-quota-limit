const express = require("express");

const app = express();

app.get("/echo", (req, res) => {
  res.status(200).json({ message: req.query.message });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
