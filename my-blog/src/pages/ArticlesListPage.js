//function components
//.map to loop through the list
// 0 indicates first para 
//substring is a method to define from which chara to and where to stop
// whenever you use map you must have a key prop that has a uniqe value
import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";

const ArticlesListPage = () => {
    return(
        // the first articles indicate the name of para in function and the second is are data
        <>
        <h1>Articles List</h1>
        <ArticlesList articles={articles}/>
        </>
    )
}
export default ArticlesListPage;