//how to get prometers pass to url
// useEffect is used for loading data
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import articles from './article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
//function components
const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes:0, comments:[], canUpvote: false})
    const {canUpvote} = articleInfo;
    const {articleId} = useParams();
    const {user, isLoading} = useUser();

    useEffect(() => {
        // get req
        // because we are not allowed to use async as first arg for use 
        const loadArticleInfo = async () =>{
           const token = user && await user.getIdToken(); 
           const headers = token ? {authtoken: token} : {};
           const response = await axios.get(`/api/articles/${articleId}`, {headers})
           const newArticleInfo = response.data;
           setArticleInfo(newArticleInfo);
        }
        if(isLoading){
            loadArticleInfo();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, user]);
   
    //find method to search for a match
    const article = articles.find(article => article.name === articleId);
    // checking for if it exicts
    // we don't need an else close because return will stop runnig the rest code
    // at moment our app is one-sideed just it takes data from server
    // in the below code is procees to make a request from server
    // put req
    const addUpvote = async () => {
        const token = user && await user.getIdToken(); 
        const headers = token ? {authtoken: token} : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }
    
    
    
    
    
    if(!article){
        return <NotFoundPage/>
    }
    return(
        //can't return more than one ele
        //.map to show a new array 
        <>
        <h1>{article.title}</h1>
        <div className='upvotes-section'>
           {user 
             ? <button onClick={addUpvote}>{canUpvote ? "Upvote" : "Already Upvoted"}</button>
             : <button>Log in to upvote</button>}
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map(para => (
            <p key={para}>{para}</p>
        ))}
        {user 
            ? <AddCommentForm articleName={articleId}
            onArrticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>
            : <button>Log in to add a comment</button>}
        <CommentsList comments={articleInfo.comments}/>
        </>
    )
}
export default ArticlePage;