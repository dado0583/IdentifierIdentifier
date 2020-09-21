import React, {useState} from 'react';
import Auth from './Auth'
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const onLoginSuccess = (result) => {
    console.log('id token + ' + result.getIdToken().getJwtToken());
    setToken(result.getIdToken().getJwtToken())
  };
  const onLoginFailure = (err) => console.log('error logging in:', err.message)

  return (
    <div className="App">
      {!token ? <Auth onSuccess={onLoginSuccess} onFailure={onLoginFailure} /> : <p>logged in!</p>}
    </div>
  );
}

export default App;
