import React, { useState ,useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
const CVUpload = () => {
    const navigate = useNavigate();
    const [cvFile, setCVFile] = useState(null);
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCVUpload = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(); 
            const file = event.target.cv.files[0]; 
            console.log('Fichier sélectionné:', file);
            
            formData.append('resume', file);
            console.log('FormData:', formData); 
            
            const response = await fetch('http://localhost:8081/upload', {
                method: 'POST',
                body: formData,
                headers: {
                   
                },
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors du téléchargement du CV');
            }
            setCVFile(file);
            const responseData = await response.json();
            console.log('Réponse du backend:', responseData);
            
            // Extraire les données du CV
            const { firstName, surname } = responseData.data.basics.name;
           
            
            let userEmail = '';
            const emailArray = responseData.data.basics.email;
            if (Array.isArray(emailArray) && emailArray.length > 0) {
                userEmail = emailArray[0];
                console.log('E-mail:', userEmail);
            } else {
                console.log('Aucun e-mail trouvé');
            }
            
            // Définir le rôle par défaut
            const role = "Student";

            // Envoyer les données extraites au backend avec le rôle
            const dataToSend = {
                 prenom: firstName,
                 nom: surname,
                 mail: userEmail,
                 role: role
            };
            

            // Rediriger vers l'interface de confirmation du mot de passe en utilisant navigate
            navigate("/confirmerpswd", { state: { data: dataToSend } });
        } catch (error) {
            console.error('Erreur:', error.message);
        }
    };
    const handleFileInputChange = (event) => {
        const file = event.target.files[0]; 
        console.log('Fichier sélectionné:', file);
        setCVFile(file);
    };
    useEffect(() => {
        if (cvFile) {
            Swal.fire("CV uploaded successfully");
        }
    }, [cvFile]);

    return (
        <div>
            <form onSubmit={handleCVUpload}>
                <label style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    S'inscrire via CV
                    <input type="file" name="cv" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileInputChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
         
        </div>
    );
    
}

export default CVUpload;
