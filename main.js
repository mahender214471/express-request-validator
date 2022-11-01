

const DataValidator  = ( schema , data ) => {
    try {
         const { error } = schema.validate(data);
         if(error){
             throw error.details[0].message ;
         }
    }
    catch (err){
        const ErrorMessage = err.split(" ") ;
        let ErrorKey = ErrorMessage[0];
        ErrorKey = ErrorKey.split('"');
        ErrorKey = ErrorKey[1];
        if(ErrorKey){
            ErrorMessage[0] = ErrorKey ;
        }
        let FinalMessage = "" ;
        for (let i = 0; i < ErrorMessage.length; i++) {
            const w = ErrorMessage[i];
            if(i === 0){
                FinalMessage += `${w}`;
            }
            else {
                FinalMessage += ` ${w}`;
            }
        }
        throw FinalMessage
    }
}

class validator {

    constructor (){
        this.ErrorFormat = {
            statusCode:400,
            ErrorMessage:"Bad request",
            ErrorType:"",
            message:"",
        } ;
    }
    
    config( ErrorResponseConf ){
         try{
             this.ErrorFormat = { ...this.ErrorFormat , ...ErrorResponseConf };
         }
         catch(err){
             console.log(err);
             throw new Error(err);
         }
    }

    headers(Schema){
       return ( req , res , next )  => {
            try {
                DataValidator(Schema , req.headers);
                next();
            }
            catch (err){
               this.ErrorFormat.message = err ;
               this.ErrorFormat.ErrorType = "Request headers validation failed"
               return res.status(this.ErrorFormat.statusCode).send(this.ErrorFormat);
            }
       }
    }

    params (Schema){
        return ( req , res , next )  => {
             try {
                 DataValidator(Schema , req.params);
                 next();
             }
             catch (err){
                this.ErrorFormat.message = err ;
                this.ErrorFormat.ErrorType = "Request params validation failed"
                return res.status(this.ErrorFormat.statusCode).send(this.ErrorFormat);
             }
        }
     }

     query (Schema){
        return ( req , res , next )  => {
             try {
                 DataValidator(Schema , req.query);
                 next();
             }
             catch (err){
                this.ErrorFormat.message = err ;
                this.ErrorFormat.ErrorType = "Request query validation failed"
                return res.status(this.ErrorFormat.statusCode).send(this.ErrorFormat);
             }
        }
     }

     body (Schema){
        return ( req , res , next )  => {
             try {
                 DataValidator(Schema , req.body);
                 next();
             }
             catch (err){
                this.ErrorFormat.message = err ;
                this.ErrorFormat.ErrorType = "Request body validation failed"
                return res.status(this.ErrorFormat.statusCode).send(this.ErrorFormat);
             }
        }
     }
}

module.exports = new validator()