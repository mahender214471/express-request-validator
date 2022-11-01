
# express-request-validator-middlewares

An express middleware for validating request data using joi

 - # Installation
 ```js
npm install express-request-validator-middlewares
yarn add express-request-validator-middlewares
 ```

  - # Queck start
  ```js
const express      = require('express');
const Joi          = require('joi');
const reqValidator = require('express-request-validator-middlewares');
const app = express () ;
const port = process.env.PORT || 4000 ;

// VLIDATE REQUEST HEADERS  DATA
app.get(
    '/validate-headers',
     reqValidator.headers(
       Joi.object().required().min(1).keys({
         token : Joi.string().min(24).max(24).required()
       })
     ) , 
     ( req , res , next) => res.send ( 'Headers verifyed')
)

// VLIDATE REQUEST PARAMS  DATA
app.get(
    '/validate-params',
     reqValidator.params(
       Joi.object().required().min(1).keys({
         id : Joi.string().min(24).max(24).required()
       })
     ) , 
     ( req , res , next) => res.send ( 'Headers verifyed')
)

// VLIDATE REQUEST QUERY DATA
app.get(
    '/validate-params',
     reqValidator.query(
       Joi.object().required().min(1).keys({
         serach : Joi.string().min(24).max(24).required()
       })
     ) , 
     ( req , res , next) => res.send ( 'Headers verifyed')
)

// VLIDATE REQUEST BODY DATA
app.get(
    '/validate-params',
     reqValidator.body(
       Joi.object().required().min(1).keys({
         name : Joi.string().min(24).max(24).required(),
         email : Joi.string().email().required(),
       })
     ) , 
     ( req , res , next) => res.send ( 'Headers verifyed')
)

app.listen(port , () => console.log(`Lisning at port :- ${port}`));
  ```
- # Request error response 
When validation failed user gets this response.
```js
{
    "statusCode": 400,
    "ErrorMessage": "Bad request",
    "ErrorType": "Request params validation failed",
    "message": "id is required"
}
```

- # Change request response 
You can change statusCode or ErrorMessage or add more keys in response
```js
reqValidator.config({
    statusCode:401 ,
    ErrorMessage:"Validation failed",
    ApiDoc:"check this API docs"
})
```
- ## Reference docs
- [joi](https://www.npmjs.com/package/joi) 
   
- ## Author
  Mahender Rajput 
- ## Let in touch
- [Github](https://github.com/mahender214471)  
- [Linked](https://www.linkedin.com/in/mahender-rajput-9ba900229/)