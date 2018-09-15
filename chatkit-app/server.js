const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("pusher-chatkit-server");

const app = express();

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:97084d20-4488-413b-9650-fbe5ef97e2ba",
  key:
    "bbf79160-4d14-4385-abc1-680352ed4479:OVa/LPobmAb1z3D2lAvpSaZY3BNy6J7dqdTQs+2Rs0w="
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/users", (req, res) => {
  const { username } = req.body;
  console.log("body", req.body);

  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});
const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
