import './App.css';
import NavBar from './NavBar';
import { Routes, Route, Router } from "react-router-dom";
import UserPage from './UserPage';
import ItemList from './NavBar';

function App() {
  return (
    <Router>
      <div className="App">
      <div className="App-Logo"> LOGO </div>
        <NavBar />
          <Routes>
            <Route path="/">
              <ItemList />
            </Route>
          </Routes>
      </div>
    </Router>
  );
}

// {  return (
//   <div className="App">
//     <div className="App-Logo"> LOGO </div>
//     <NavBar />
//     <ItemList />
//   </div>
// );
// }

export default App;
