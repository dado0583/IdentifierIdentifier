import React, {useState} from 'react';
const Auth = ({onSuccess, onFailure}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const doLogin = () => {
    const cognito = require('amazon-cognito-identity-js');
    var poolData = { UserPoolId : 'us-east-1_3AXVp2yjg',
      ClientId : '4maomje438ov163bl8q99gadqe'
    };
    var userPool = new cognito.CognitoUserPool(poolData);
    var authenticationData = {
      Username : username,
      Password : password,
    };
    var authenticationDetails = new cognito.AuthenticationDetails(authenticationData);
    var userData = {
      Username : 'EthanTheMan',
      Pool : userPool
    };

    var cognitoUser = new cognito.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess,
      onFailure,
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={doLogin}>Log in</button>
    </div>
  );
};

export default Auth;