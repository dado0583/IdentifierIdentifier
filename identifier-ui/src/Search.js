import React, {useState} from 'react'
import axios from 'axios'
const API_URL = 'https://mkd29ltjoa.execute-api.us-east-1.amazonaws.com/default/WhichIdentifier'

const Search = (token) => {
  const [query, setQuery] = useState('');
  const submit = () => {
    const payload = [query];
    const headers = { Dave: token }
    axios.post(API_URL, payload, headers).then((resp) => {
      console.log('got API response', resp)
    }).catch(console.error)
  };

  return (
    <div>
      <h1>Search</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={submit}>search</button>
    </div>
  );
};

export default Search;