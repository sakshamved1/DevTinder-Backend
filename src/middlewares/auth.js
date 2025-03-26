const AdminAuth = (req, res, next) => {
  console.log("checking admin Auth");

  const token = "password";

  const isAdminValid = token === "password";

  if (isAdminValid) {
    next();
  } else {
    res.status(401).send("You are not an admin");
  }
};


const userAuth = (req, res, next) => {
    console.log("checking user Auth");
  
    const token = "password";
  
    const isUserValid = token === "password";
  
    if (isUserValid) {
      next();
    } else {
      res.status(401).send("You are not an admin");
    }
  };
  

module.exports = { AdminAuth , userAuth };
