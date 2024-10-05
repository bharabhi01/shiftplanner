const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const shiftRoutes = require("./routes/shiftRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', shiftRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
