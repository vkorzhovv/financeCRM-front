import './App.css';
import SitePage from './Layout/SitePage/SitePage';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
import LoginContainer from './Layout/Login/LoginContainer';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/*'
          element={
            <PrivateRoute>
              <SitePage />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<LoginContainer />} />
      </Routes>
    </div>
  );
}

export default App;
