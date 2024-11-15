import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonList from './components/PersonList/PersonList';

function App() {
  return (
    <>
      <div className="container">
        <PersonList />
      </div>

      <div className="footer">
        <p>Made by Kashyap Mavani</p>
      </div>
    </>
  );
}

export default App;
