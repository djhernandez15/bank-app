const bcrypt = require("bcryptjs");
module.exports = {
  registerUser: (req, res) => {
    //get username, password, email off of the body
    const { username, password, email } = req.body;
    console.log(req.body);
    //check to make sure the username isnt taken
    const db = req.app.get("db");
    db.verifyUser([username])
      .then(usersList => {
        if (usersList.length > 0) {
          res.status(403).json({
            error: "USERNAME_OR_PASSWORD_ALREADY_TAKEN"
          });
        } else {
          //hash password before storing in database
          bcrypt
            .hash(password, 12)
            .then(newPassword => {
              //put in database
              db.createUser(username, newPassword, email)
                //add user to session
                .then(() => {
                  req.session.user = {
                    username,
                    email,
                    balance: 0
                  };
                  //send the user
                  res.status(200).json(req.session.user);
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  },
  loginUser: (req, res) => {
    //get username and password off of req.body
    const { username, password } = req.body;
    //get the database
    const db = req.app.get("db");
    //find the user with that username
    db.verifyUser([username]).then(user => {
      if (user.length > 0) {
        //user has brackets because the data is an array with object in it. Access array index then dot notation to access property inside object
        bcrypt.compare(password, user[0].password).then(doesMatch => {
          if (doesMatch) {
            req.session.user = {
              username: user[0].username,
              email: user[0].email,
              balance: user[0].balance
            };
            res.status(200).json(req.session.user);
          } else {
            res.status(403).json({
              error: "USERNAME_OR_PASSWORD_INCORRECT"
            });
          }
        });
      } else {
        res.status(404).json({
          error: "USER_DOES_NOT_EXIST"
        });
      }
    }).catch(err => console.log(err));
    //check to make sure the passwords match
    //put them on the session
    //send response
  }
};
