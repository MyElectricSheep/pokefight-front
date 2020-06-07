import React, {useEffect, useState} from 'react';
import './App.css';

const App = () => {
  const [pokeData, setPokeData] = useState(null)
  const [fullPoke, setFullPoke] = useState(null)
  const [targetPoke, setTargetPoke] = useState(null)

// useEffect(() => {
//   fetch('/pokemon').then(res => res.json()).then(data => setPokeData(data))
// }, [])

const fetchAllPokemons = () => {
  fetch('/pokemon').then(res => res.json()).then(data => setPokeData(data))
}

const fetchOnePokemon = (id) => {
  setFullPoke(null)
  if (!id || !/^\d+$/.test(id)) return alert('Please enter the ID of a pokemon...')
  fetch(`/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {setFullPoke(data)})
    .catch(() => alert('No Pokemon matches that ID'))
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>POKEFIGHT</h1>
        <button onClick={() => fetchAllPokemons()} style={{marginTop: '2em'}}>Fetch all Pokemons</button>
        {pokeData && <span>{`You have successfully fetched ${pokeData.length} pokemons from the API`}</span>}

        <button onClick={() => fetchOnePokemon(targetPoke)} style={{marginTop: '2em'}}>Fetch one Pokemon by Id</button>
        <input type="text" onChange={e => setTargetPoke(e.target.value)}></input>
        {fullPoke && (
          <>
          <span style={{marginTop: '2em'}}>Here's the data we have about {fullPoke.name.english}:</span>
          <h3>Names</h3>
          {Object.keys(fullPoke.name).map(key => {
            return <span>{key}: {fullPoke.name[key]}</span>
          })}
          <h3>Type</h3>
          {fullPoke.type && fullPoke.type.length && fullPoke.type.map(type => {
            return <span>{type}</span>
          })}
          <h3>Base</h3>
          {Object.keys(fullPoke.base).map(key => {
            return <span>{key}: {fullPoke.base[key]}</span>
          })}
          </>
          )}
      </header>
      
    </div>
  );
}

export default App;
