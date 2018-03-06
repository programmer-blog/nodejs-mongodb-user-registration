# nodejs-mongodb-user-registration

Programmer Blog: http://programmerblog.net

- Source code for article on how to create a user registration form using nodejs and mongodb

- You can read detailed tutorial on our blog: https://programmerblog.net/nodejs-user-registration-tutorial/


 - Install MongoDB
   First you need to install MongoDB on your system, Please visit MonogoDB site and download it.
 
 - Create a MongoDB database
    After MongoDB installation. Create a data/db directory - In windows c:/data/db
   
 - On command prompt, open MongoDB -> bin folder and run
    > mongod
    
 - Open another command prompt and open bin folder and type
    > mongo
    
  - Mongo shell is running, type 
    
    > use dbusers
    
  - Current databse will be changed to to db users.
 
 - install NodeJS
   Please visit NodeJS site and download installer, Install on your system, It also install NPM or Node Package Manager
   
 - Generate NodeJs, Express application
   Using Explress comman line tool to generate an application skeleton.
  
    > express --view=pug nodejs-user-registration-mongodb
 
 - install required dependencies
  
    > cd nodejs-user-registration-mongodb && npm install

 - Create a Model using mongoose
   A User Schema is created in a Models folder using Mongoose
   
 - Create a Form in Pug template engine
   Next a bootstrap based form is created so users can enter their information into the form and send it to server.
    
 - Create a Ajax JavaScript code to send data to server and receive response and display to user
   Using jQuery, An AJAX request is sent to server with data, Data is recevied in /Register Express route.
 
 - Create a Register route to receive, validate and save data to MongoDB database
   A register route is created, Ths route recevies posted data, validates and save it in mongoDB database.
 
 - To run the app:
 
     > SET DEBUG=nodejs-user-registration-mongodb:* & npm start
     
  - To view runnign app
    Open browser and type the URL: http://localhost:3000
    

For detailed tutorial, visit 

 http://programmerblog.net/nodejs-user-registration-tutorial/
 
