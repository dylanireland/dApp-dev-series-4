import logo from './logo.svg';
import './App.css';
import Connect from './Connect';
import Update from './Update';
import Query from './Query';
import React from 'react';

function App() {
  const [publicKey, setPublicKey] = React.useState(null);

  return (
    <div>
      <Connect setPublicKey={setPublicKey}/>
      <Update publicKey={publicKey}/>
      <Query/>
    </div>
  );
}

export default App;
