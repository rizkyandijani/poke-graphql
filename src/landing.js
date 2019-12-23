import React, { Component, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import PokeCard from './components/card'
import InfiniteScroll from 'react-infinite-scroller'
import { Waypoint } from 'react-waypoint';
import { func } from 'prop-types';
import { Grid, Paper, Tooltip } from '@material-ui/core'
import { display } from '@material-ui/system';
import Navbar from './components/navbar'
import { filter } from 'minimatch';

const GET_POKEMON_INFO = gql`
{
  pokemons(first: 150) {
    id,
    number,
    name,
    image,
    types,
    classification
  }
}`



function LandingPage(props) {
    
  const prevScrollY = useRef(0)
  const [items, setItems] = React.useState(12)
  const [hasMoreItems, setHasMoreItems] = React.useState(true)
  const [goingDown, setGoingDown] = React.useState(false)
  const [goingUp, setGoingUp] = React.useState(false)
  const [pokes, setPokes] = React.useState([])
  const [typeFilter, setTypeFilter] = React.useState('none')

  function showItems(type = typeFilter) {
    
    let itemsNew = type === 'none' ? data.pokemons.slice(0,items) : Filter(type).slice(0, items)
    return itemsNew
  }

  function Filter(type) {
    let filteredPokemon = data.pokemons.filter((value) => value.types.indexOf(type) !== -1)
    return filteredPokemon
  }

  function loadMore(arr) {
    if(items + 10 >= 150){
      setHasMoreItems(false)
      setItems(150)
    }else{
      setPokes(arr)
      
      setTimeout(() => {
        let addition = items + 9
        setItems(addition)
      }, 1000)
    }
  }
  
  const { data, loading, error, fetchMore } = useQuery(GET_POKEMON_INFO)
  
  useEffect(() => {
    const handleScroll = () => {
      if(data && data.pokemons && items >= showItems().length){
        
        setHasMoreItems(false)
      }
      const currentScrollY = window.scrollY
      if(prevScrollY.current > currentScrollY && goingDown) {
        setGoingDown(false)
      }
      if(prevScrollY.current < currentScrollY && !goingDown) {
        setGoingDown(true)
      }
      prevScrollY.current = currentScrollY
      if((window.innerHeight + currentScrollY) >= document.body.offsetHeight ){
        setGoingDown(false)
        loadMore(data.pokemons)
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll)
  }, [goingDown, goingUp])

  useEffect(() => {
    setItems(12)
  }, [typeFilter])

  if(!data || !data.pokemons){
    return <div style={{textAlign: "center"}}><p>loading...</p></div> 
  }
  if(error) return console.log(error) , <div>error ...</div>
  return (
    <React.Fragment>
        <Navbar data={data.pokemons} setFilter={setTypeFilter}/>
        <div style={{margin: "90px"}}>
        <p>
          <a href="https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon">
            The Pokémon franchise
          </a>{" "}
          revolves around 832 fictional species of collectible monsters, each having
          unique designs and skills. Conceived by Satoshi Tajiri in early 1989,
          Pokémon are creatures that inhabit the fictional Pokémon World. This is
          the list of the first 150 Pokémon as they appear in Pokémon Stadium,
          starting with Bulbasaur in the top left corner and ending with Mewtwo in
          the bottom right corner.
        </p>
      <h1>{typeFilter === 'none' ? 'All Pokemon' : `${typeFilter} Pokemon`} : Total Amount {typeFilter === 'none' ? data.pokemons.length : Filter(typeFilter).length}</h1>
      </div>

      <div className="container" style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {data && data.pokemons && showItems().map((pokemon, index) => (
              <Grid key={index} container justify="center" xs={6} sm={4} md={3} lg={3} xl={2}>
                  <Grid item>
                      <PokeCard history={props.history} key={index} value={pokemon}/>
                  </Grid>
              </Grid>
            
          ))}
      </div>
      <div style={{textAlign: "center"}}>

        <h1>Loader..</h1>
      </div>
      
    </React.Fragment>
  )
}

export default LandingPage;
