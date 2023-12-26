import { useSelector } from 'react-redux';
import './App.css';
import Login from './Layout/Login/Login';
import SitePage from './Layout/SitePage/SitePage';
import { selectIsAuth } from './redux/authSelectors';
// import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const isAuth = useSelector(selectIsAuth);

  console.log(isAuth);

  return (
    <div className="App">
      {isAuth ? <SitePage /> : <Login />}
    </div>
  );
}

export default App;
