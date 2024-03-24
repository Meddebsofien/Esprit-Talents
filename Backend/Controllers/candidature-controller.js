const Candidature = require ('../Models/candidature')
const router = require('../routes/candidature-route')
// var uploads = require('../multerConfig');
// var multer = require('multer');

// Définissez les champs pour le téléchargement de fichiers
// var uploadFields = [
//   { name: 'cvUpload', maxCount: 1 },
//   { name: 'motivationLetterUpload', maxCount: 1 }
// ];

const AjouterCandidature = async (req, res) => {
  try {
    // Utilisez l'instance de Multer pour gérer le téléchargement de fichiers
    // await uploads.fields(uploadFields)(req, res, async function (err) {
    //   if (err instanceof multer.MulterError) {
    //     // Une erreur Multer s'est produite lors du téléchargement.
    //     console.log(err);
    //     res.status(500).json({ message: "Erreur lors du téléchargement des fichiers" });
    //   } else if (err) {
    //     // Une erreur inconnue s'est produite lors du téléchargement.
    //     console.log(err);
    //     res.status(500).json({ message: "Erreur lors du téléchargement des fichiers" });
    //   } else {
    //     // Si tout se passe bien, continuez avec votre logique d'après-téléchargement.
    //     console.log(req.files);

    //     // Ajoutez les chemins des fichiers téléchargés à req.body
    //     req.body.cvUpload = req.files.cvUpload[0].path;
    //     req.body.motivationLetterUpload = req.files.motivationLetterUpload[0].path;

        // Créez la candidature
        await Candidature.create(req.body)
        res.status(201).json({ message: "Candidature ajoutée avec succès " });
      
   
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de la candidature" });
  }
};



 const ModifierCandidature = async (req,res)=>{
    try {
      const data = await Candidature.findByIdAndUpdate(req.params.id,req.body,{new :true})  
      res.status(200).json(data)
    } catch (error) {
    console.log(error.message)
    }
}


const SupprimerCandidature = async (req,res)=>{
    try {
     await Candidature.deleteOne({_id:req.params.id})
     res.status(200).json({message: "candidature supprimée avec succée"})
    }catch(error){
     console.log(error.message)
    }    
}


const getAllCandidature = async (req,res)=>{
    try{
        const data = await Candidature.find()
        res.status(200).json(data)
    }catch(error){
        console.log(error.message)
    }
}
const getCandidatureById = async (req, res) => {
    try {
      const data = await Candidature.findOne({ idUser: req.params.idUser });
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const rejectCandidatureById = async (req, res) => {
    const { idUser } = req.params;
    try {
      const candidatures = await Candidature.find({ idUser });
      if (!candidatures || candidatures.length === 0) {
        return res.status(404).json({ message: 'Candidatures not found for this user' });
      }
      // Mettre à jour le statut de toutes les candidatures de l'utilisateur à "rejected"
      await Candidature.updateMany({ idUser }, { status: 'rejected' });
  
      // Renvoyer une réponse avec un message indiquant que toutes les candidatures ont été rejetées
      res.json({ message: 'All candidatures rejected for this user' });
    } catch (error) {
      // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur
      console.error('Error rejecting candidatures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const acceptCandidatureById = async (req, res) => {
    const { idUser } = req.params;
    try {
      // Trouver toutes les candidatures de l'utilisateur
      const candidatures = await Candidature.find({ idUser });
  
      // Si aucune candidature n'est trouvée, renvoyer une réponse 404
      if (!candidatures || candidatures.length === 0) {
        return res.status(404).json({ message: 'Candidatures not found for this user' });
      }
  
      // Mettre à jour le statut de toutes les candidatures de l'utilisateur à "accepted"
      await Candidature.updateMany({ idUser }, { status: 'accepted' });
  
      // Renvoyer une réponse avec un message indiquant que toutes les candidatures ont été acceptées
      res.json({ message: 'All candidatures accepted for this user' });
    } catch (error) {
      // En cas d'erreur, renvoyer une réponse 500 avec un message d'erreur
      console.error('Error accepting candidatures:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
 
module.exports ={
    AjouterCandidature,
    ModifierCandidature,
    SupprimerCandidature,
    getAllCandidature,
    getCandidatureById,
    rejectCandidatureById,
    acceptCandidatureById,
  

}


