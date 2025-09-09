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

10.1 - Created Login API & checked User email and password if both are Valid Then Only Create JWT TOKEN & add the token to the cookies and send back to client

    - install cookie-parser
    - just send dummy cookie to user
    - Create GET /profile API and check if you get the cookie back
    - Install jsonwebtoken
    - In login api, After email and password validation Create JWT Token and send it to user in cookie
    - Read the cookie inside your profile API and find the logged in User

10.2 - Created userAuth Middleware to Verify the cookie - userAUth Middleware - Add the userAuth middleware in profile API and a new sendConnectionRequest API - Set the expiry of JWT token cookies to 7 Days

10.3 - Create User Schemea method to getJWT() - Create Userschema method to compare password(passwordInputByUser)

# E-11 Diving Into the API's and Express Router

11.1 - Explore tinder API's - Create list of all API you can think of in Dev Tinder - Group multiple routes under repective routers

11.2 - Read docs for express.router() - Create routes folder for managing auth,profile,request router - create authRouter, profileRouter, requestRouter - API's Clubbing - Import this router in app.js

11.3 - Create POST /logout api - Create PATCH /profile api - Create PATCH /profile/password API => forgot password API - Make sure you validate all data in Post , patch APi's

# E-12 Logical DB Query & Compound Indexes.

12.1 - Create a new Schema for Connection Request - Create a new model for Connection Request - Proper Validation in of data - Create a new API to send connection request - Create POST /request/send/:status/:userId API - Validate the :status to be either interested or ignored - Validate the :userId exists in DB or not - Validate that user cannot send request again if request is already pending - Validate that user cannot send request to himself

    - $or Query and $and Query in mongooose
    - schema.pre("save) function

12.2 - Read article about compound indexes in mongoDB - Read indexes in MongoDB - why do we need index in DB? - what is advanatge is ad
vantage of indexes? - Read about logical Query in mongoDB - ALWAYS THINK ABOUT CORNER CASES & Never Trust Request.body

# E-13 Ref, Populate & Thought process of writing APIs

13.1 - Create Request Review API - Create POST /request/review/:status/:requestId API  
 - Validate the :status to be either accepted or rejected - Validate the :requestId exists in DB or not - Validate that user cannot review request again if request is already accepted/rejected - Validate that user cannot review request if request is ignored - Validate that user cannot review request if request is sent to some other user

13.2 - Throught process - POST VS GET - Read about ref and populate in mongoose - Create GET /user/requests/received API

# E-14 Building feed API & pagination

14.1 - Create GET /user/feed API - Exclude ignored Users, already connected users, requests sent users, Own card from feed API - Explore the $nin , $and , $ne and Other Query Operator

14.2 - Pagination .skip() .limit(10)

    /feed?page=1&limit=10 => 1-10 => .skip(0) & limit(10);
    /feed?page=2&limit=10 => 11-20 => skip(10) & limit 10;
    /feed?page=3&limit=10 => 21-30 =>  skip(20) & limit 10
    /feed?page=4&limit=10 => 31-40 =>  skip(30) & limit 10
    /feed?page=5&limit=10 => 41-50 => skip(10) & limit(10)

    so skip == (page-1)* limit;


    
