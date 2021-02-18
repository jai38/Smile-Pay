# Smile-Pay

<!-- Payment via face recognitaion. used nodejs, mongodb  -->
<p align="center">
 <h3 align="center">
    SMILEPAY 
 </h3>
 <p> 
    This is a Payment webapp using Facial Recognition System. Our system consists of two modules i.e REGISTRATION and LOGIN.
 </p>
</p>

## About the Project

<p>
Face biometrics is rapidly gaining acceptance with consumers and businesses alike as a convenient and secure method of identity verification because it is a one snap show.
The current payment systems involve a lot of time and long procedures.
The objective is to propose a system which is fastest and simplest method with advanced securities for Payment methods.
</p>

## Built With

- [html](https://www.w3schools.com/html/)
- [Css](https://www.w3schools.com/css/default.asp)
- [Node](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [ejs](https://www.npmjs.com/package/ejs)
- [MongoDB](https://www.mongodb.com/)

## Process Design

<p>
Steps to implement: 
</p>

- 1)Main Page: SmilePay will give two options i.e SIGNUP AND LOGIN.
- 2)Signup: All user details are being stored in database.
- 3)Live Face Capture: Co-ordinates of face are Encoded.
- 4)Login: Particular details are being compared from the pipeline.
- 5)Live Face Detecting: Stored encodings are matched with live face co-ordinates.
- 6)Payment Successful: Transaction is done.
- 7)Payment Unsuccessful: Retry option for 3 times, after that account is blocked.

## Additional Information

<p>
This is a college project and is limited to the users that exist in our database i.e you can make a dummy payment to the user which exist in our system. The details that we are asking to fill are also not real.   
</p>
