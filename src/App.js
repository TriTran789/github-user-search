import './App.css';
import {useState} from 'react'

const API_URL = "https://api.github.com"

async function fetchResults(query) {
  try {
    const respone = await fetch(`${API_URL}/search/users?q=${query}`)
    const json = await respone.json()
    return json.items || []
  } catch (er) {
    throw new Error(er)
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  function changeInput(e) {
    setQuery(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const results = await fetchResults(query)
    setResults(results)
  }
  
  return (
    <div className="App">
      <main className='main'>
        <h1 className='project-name'>Project 5: GitHub User Search</h1>
        <Form
          changeInput={changeInput}
          handleSubmit={handleSubmit}
          value={query}
        />
        <h3 className='results'>Results</h3>
        {results.map((user) => (
          <Users
            key={user.id}
            avatar={user.avatar_url}
            url={user.html_url}
            username={user.login}
          />
        ))}
      </main>
    </div>
  );
}

function Form({changeInput, handleSubmit, value}) {
  return (
    <form onSubmit={handleSubmit} className='form-search'>
      <input type='text' placeholder='Enter your username...' onChange={changeInput} className='form-input'/>
      <button className='form-btn'>Search</button>
    </form>
  )
}

function Users({ avatar, url, username }) {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  )
}

export default App;
