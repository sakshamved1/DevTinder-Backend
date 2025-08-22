    - Create a Respository
    - Intialize the repository
    - node_modules, packahge.json, package-lock.json
    - install express
    - create a server
    - listen to port 7777
    - write request handler for /test, /hello, /dashboard
    - Install nodemon and update script inside  package.json
    - what is dependencies
    - What is the use of "-g" while npm install
    - difference between Caret and Tilde (^ vs ~ )
    - Pause


    - Initialize git
    - gitignore
    - create a remote repo on github
    - Push all code to remote origin
    - Play with routes and route extension ex. /hello, /,  /hello/2, /xyz etc.....
    - Order of the routes matter alot
    - Install postman app and make a workspace/collection > Test api call
    - Write  logic to handle GET, POST, PATCH, DELETE, API calls and test them on Postman
    - Explore routing and use of ? ,+,  (), * in routes
    - use of regex in the routes /a/ , /.*fly$/
    - reading the Query params
    - reading the dynamic routes


    E-05 Middleware & Route Handlers
    - Multiple Route handlers - Play with code
    - next()
    - next function and errors along with res.send()
    - app.use("/route", rH, [rH2, rH3], rH4, rh5);

    - What is a middleware ? Why do we need it
    - How express JS basically handles request behind the scene
    - Difference between app.use and app.all
    - Write a dummy auth middleware for admin
    - Write a dummy auth middleware for all user except /user/login
    - Error handling using app.use("/", (err,req,res,next)= {}) i.e. Wild Card error handling

# E-06 Database Schema Model & mangoose

    - Create a cluster on mongodb
    - install mongoose liberary
    - connect Your Application to Database "Connection url"/devTinder
    - call the connectDB function and connect to Databse before starting application on 7777
    - Create a user Schemea & userModel
    - Create POST /signup API to add data to database
    - Push some documents using API calls from Postman
    - Error Handling using try,catch

# E-07 Diving into the Api's

    - Difference between Javascript Object & Json
    - Add the express.json middleware to the App
    - Make your signup API dynamic to receive data from the End user

    - User.findone With duplicate email ids, which object returned
    - Get User by Email
    - API - Feed API - GET /feed - Get all the users from Database
    - API - GET user by id

    - Create a delete User Api
    - Difference Between Patch and Put
    - API - Update the User
    - Explore mongoose Documentation for Model methods
    - What are option in Mode. findOneAndUpdate method, explore more about it
    - API - Update the user using email ID


# E-08 Data Sanitization & Schema

    - Explore SchemaType Options form documenatation
    - add required, unique. lowercase, min, minLength, trim
    - Add default
    - Create a custom Validate function for gender
    - Improve DB schema - Put all appropriate Validations on each field in Schema
    - Add TImeStamps to the user Schema

    - API Level Validation on Patch request And Signup Post api
    - Data Sanitize - Add API validation on Each field
    - Install Validator
    - Explore Validator Liberary Functions & use validator func for password, email, PhotoURL
    - NEVER TRUST req.body


# E-09 Encrypting password

    - Validate Data in signup Api
    - Install bcrypt package
    - create passowordHash using bcrypt.hash & save the user is encrypted password

    - Create login API
    - Compare Passwords & throw an error if email or password is invalid


# E-10 Authentication , JWT & cookies

10.1
    - Created Login API & checked User email and password if both are Valid Then Only Create JWT TOKEN &  add the token to the cookies and send back to client

    - install cookie-parser
    - just send dummy cookie to user
    - Create GET /profile API and check if you get the cookie back
    - Install jsonwebtoken
    - In login api, After email and password validation Create JWT Token and send it to user in cookie
    - Read the cookie inside your profile API and find the logged in User
    
10.2
    - Created userAuth Middleware to Verify the cookie 
    - userAUth Middleware
    - Add the userAuth middleware in profile API and a new sendConnectionRequest API
    - Set the expiry of JWT token  cookies to 7 Days

10.3
    - Create User Schemea method to getJWT()
    - Create Userschema method to compare password(passwordInputByUser)
















