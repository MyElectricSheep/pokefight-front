import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [pokeData, setPokeData] = useState(null)
  const [fullPoke, setFullPoke] = useState(null)
  const [targetInfo, setTargetInfo] = useState('name')
  const [targetPoke, setTargetPoke] = useState(null)
  const [halfPoke, setHalfPoke] = useState(null)

// useEffect(() => {
//   fetch('/pokemon').then(res => res.json()).then(data => setPokeData(data))
// }, [])

const resetView = () => {
  setPokeData(null)
  setFullPoke(null)
  setHalfPoke(null)
}

const fetchAllPokemons = () => {
  resetView()
  fetch('/pokemon').then(res => res.json()).then(data => setPokeData(data))
}

const fetchOnePokemon = (id) => {
  resetView()
  if (!id || !/^\d+$/.test(id)) return alert('Please enter the ID of a pokemon...')
  fetch(`/pokemon/${id}`)
    .then(res => res.json())
    .then(data => setFullPoke(data))
    .catch(() => alert('No Pokemon matches that ID'))
}

const fetchOnePokemonSpecificInfo = (id) => {
  resetView()
  if (!id || !/^\d+$/.test(id)) return alert('Please enter the ID of a pokemon...')
  fetch(`/pokemon/${id}/${targetInfo}`)
    .then(res => res.json())
    .then(data => setHalfPoke(data))
    .catch(() => alert('No Pokemon matches that ID'))
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>POKEFIGHT</h1>
        <button onClick={() => fetchAllPokemons()} style={{marginTop: '2em'}}>Fetch all Pokemons</button>
        {pokeData && <span>{`You have successfully fetched ${pokeData.length} pokemons from the API`}</span>}

        <span style={{paddingTop: '0.5em', fontSize: '0.8em'}}>Find a specific pokemon?</span><input type="text" onChange={e => setTargetPoke(e.target.value)}></input>

        <button onClick={() => fetchOnePokemon(targetPoke)} style={{marginTop: '2em'}}>Fetch all info about one Pokemon</button>
        <button onClick={() => fetchOnePokemonSpecificInfo(targetPoke)} style={{marginTop: '2em'}}>Fetch specific info about one Pokemon</button>
        <select id="pokeInfo" name="pokeInfo" onChange={e => {setTargetInfo(e.target.value); setHalfPoke(null);}}>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="base">Base</option>
        </select>
        
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

          {halfPoke && (
            <>
            <span style={{marginTop: '2em'}}>{`Here are the ${targetInfo} characteristics for this Pokemon:`}</span>
            {Object.keys(halfPoke).map(key => {
            return <span>{key}: {halfPoke[key]}</span>
          })}
            </>
          )}
      </header>
      
    </div>
  );
}

export default App;
