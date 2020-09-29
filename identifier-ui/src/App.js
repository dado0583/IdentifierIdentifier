import React, {useState, useEffect} from 'react';
import Auth from './Auth'
import Search from './Search'
import './App.css';

function App() {
  const [token, setToken] = useState('');

  const onLoginSuccess = (result) => {
    const token = result.getIdToken().getJwtToken();
    localStorage.setItem('token', token)
    setToken(token)
  };
  const onLoginFailure = (err) => console.log('error logging in:', err.message)

  // check (only once) if token exists in localStorage. If it does not exist, we will render the Auth component.
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <div className="App">
      {
        !token ? <Auth onSuccess={onLoginSuccess} onFailure={onLoginFailure} /> : <Search token={token} />
      }
    </div>
  );
}

export default App;
