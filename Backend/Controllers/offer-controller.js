const Offer = require ('../Models/offer')

const AjouterOffer = async (req,res)=>{
   try {
     await Offer.create(req.body)
     res.status(201).json({message: "offer ajouter avec success"})
   } catch (error)  {
    console.log(error.message)  
   }
}

const ModifierOffer = async (req,res)=>{
    try {
      const data = await Offer.findByIdAndUpdate(req.params.id,req.body,{new :true})  
      res.status(200).json(data)
    } catch (error) {
    console.log(error.message)
    }
}

const SupprimerOffer = async (req,res)=>{
       try {
        await Offer.deleteOne({_id:req.params.id})
        res.status(200).json({message: "offer supprimer avec success"})
       }catch(error){
        console.log(error.message)
       }    
}

const getAllOffers = async (req,res)=>{
    try{
        const data = await Offer.find()
        res.status(200).json(data)
    }catch(error){
        console.log(error.message)
    }
}

const getOfferById = async (req,res)=>{
   try {
    const data = await Offer.findOne({_id:req.params.id})
    res.status(200).json(data)
   } catch (error) {
    console.log(error.message)
    
   }
}

module.exports ={
    AjouterOffer,
    ModifierOffer,
    SupprimerOffer,
    getAllOffers,
    getOfferById

}