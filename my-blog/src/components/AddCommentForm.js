import { useState } from "react";
import axios from 'axios';
import useUser from "../hooks/useUser";


const AddCommentForm = ({articleName, onArrticleUpdated}) => {
   const [name, setName] = useState('');
   const [commentText, setCommentsText] = useState('');
   const {user} = useUser();

   const addComment = async () =>{
    const token = user && await user.getIdToken(); 
    const headers = token ? {authtoken: token} : {};
       const response = await axios.post(`/api/articles/${articleName}/comments`, {
            postedBy: name,
            text: commentText,
       },{
           headers,
       });
       const updatedArticle = response.data;
       onArrticleUpdated(updatedArticle);
       setName('');
       setCommentsText('');

   }

   return(
     <div id="add-comment-form">
        <h3>Add a Comment</h3>
        {user && <p>You are posting as {user.email}</p>}
        
        <textarea 
            value={commentText}
            onChange={e => setCommentsText(e.target.value)}
            rows="4" cols="50"/>
        
        <button onClick={addComment}>Submit</button>
     </div>
   )

}
export default AddCommentForm;