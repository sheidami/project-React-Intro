
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
// * this indicates that page should be defined by all pages that are not in rote
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div id="page-body">
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/articles' element={<ArticlesListPage/>}/>
          <Route path='/articles/:articleId' element={<ArticlePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/create-account' element={<CreateAccountPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

// import axouis and make a request by saying
// const res = await axios.get("arg")
// const data = res.data;
