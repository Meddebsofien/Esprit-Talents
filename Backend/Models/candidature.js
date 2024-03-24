const mongoose = require('mongoose');
const    schema = mongoose.Schema;


const CandidatureSchema = new schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    idOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    },
    date: {
        type: Date,
        default: Date.now,
      

    },
    status: {
        type: String,
        default: 'pending',
       
        enum:["pending","rejected","accepted"],
        

    },
    type: {
        type: String, 
       
        enum : ["Job" , "Intership"],
        

    },
   
    cvUpload: { 
        type: String,
        

       
    },
    motivationLetterUpload: {
         type: String ,
         
         
        },
    telephoneNumber:{
            type:Number,
          

            
        },
    experience:{
        type:Number,
     

       
    },
    intershipDuration:{
        type:Number,
      

       


    },
    levelStudy:{
        type:String,
        enum:["Licence","Master","engineering"],
        
       

    },
    academicField:{
        type:String,
        enum:["Buisness","Computer Science"],
       

       

    }

});




    
    


const Candidature = mongoose.model('Candidature', CandidatureSchema);

    module.exports = Candidature;





