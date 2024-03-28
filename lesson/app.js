const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5555;
const jsonParser = bodyParser.json();
const users = [];
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "awrLaU90IcORLPX7XSaVy6xfvD0z3zmf8KQ7r2sa";
app.use(jsonParser);
app.post("/users/sign-up", (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 12);
  const user = { email, encryptedPassword };

  users.push(user);
  console.log(users);
  const accessToken = jwt.sign({ email }, jwtSecretKey);
  res.json({ accessToken });
});
app.post("/users/log-in", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!bcrypt.compareSync(password, user.encryptedPassword))
    return res.send("password wrong2");
  if (!user) return res.send("not registered email account");
  //   if (user.password !== password) return res.send("password wrong!");

  res.send("logged in successfully");
});
app.get('/my-profile',(req,res)=>{
const accessToken = req.headers.authorization.split("bearer")[1]
try{
   const {email} =  jwt.verify(accessToken, jwtSecretKey)
    const user = users.
}
catch(e){
    res.send("wrong token")
}

});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// app.post();
// app.put();
// app.patch();
// app.delete();
// app.head();
// app.options();
