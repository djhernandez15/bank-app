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
                    email
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
  }
};
