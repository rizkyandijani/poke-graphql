import React, {Component} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import {Grid, GridList, GridListTile} from '@material-ui/core'
import color from '@material-ui/core/colors/amber';
import PokeCard from './components/card'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/navbar'
const useStyles = makeStyles(theme => ({
    list : {
        border: "solid",
        height: "auto",
        margin: "10px"
    }
  }));

const GET_POKEMON_INFO = gql`
query GetPoke($name: String){
  pokemon(name: $name) {
    id,
    number,
    name,
    image,
    types,
    height {
        minimum,
        maximum
    },
    weight {
        minimum,
        maximum
    },
    resistant,
    weaknesses,
    fleeRate,
    maxCP,
    maxHP,
    evolutions {
        id,
        image,
        name,
        classification
    },
    evolutionRequirements{
        name,
        amount
    },
    classification
  }
}`

function Detail(props) {
    let classes = useStyles()
    let { name } = props.match.params
    
    let { id } = props.location.state
    
    const {data, loading, error} = useQuery(GET_POKEMON_INFO,{variables: {name}})
    if(loading) return <div style={{textAlign: "center"}}><h4>Loading..</h4></div> 
    if(error) return console.log(error), <p>Error..</p>
    return (

        <div>
        <Navbar data={null} setFilter={null} history={props.history}/>
            {data && data.pokemon && 
                <Grid container justify="center" style={{marginTop: "100px"}}>
                    <Grid item xs={12} sm={5}  style={{padding: "10px", textAlign: "center", border: "double", borderColor: "black", margin: "10px"}}>
                        <img src={data.pokemon.image} style={{maxWidth: "100%", height: "auto", width: "auto\9"}}/>
                        <div>
                            <h2>{data.pokemon.name}</h2>
                        </div>
                        <div style={{border:"solid"}}>
                            <h2>Evolutions</h2>
                            <Grid xs={12} container justify={"center"}>
                                {data.pokemon.evolutions && data.pokemon.evolutions.map((pokemon, index) => (
                                    // <Grid item><img src={pokemon.image} style={{maxWidth: "70px"}}/></Grid>
                                    <PokeCard key={index} value={pokemon} history={props.history}/>
                                    )
                                )}
                                {!data.pokemon.evolutions && <h4>No Evolutions</h4>}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} style={{ textAlign: "center", margin: "10px", border: "double", borderColor: "black"}}>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Pokemon Height: {data.pokemon.height.minimum} - {data.pokemon.height.maximum}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Pokemon Weight:  {data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Types: {data.pokemon.types.join(', ')}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Resistant : {data.pokemon.resistant.join(', ')}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Weaknesses: {data.pokemon.weaknesses.join(', ')}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Classification: {data.pokemon.classification}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>MaxHP: {data.pokemon.maxHP}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>MaxCP: {data.pokemon.maxCP}</p>

                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Flee Rate: {data.pokemon.fleeRate} %</p>
                            </div>
                        </Grid>
                        {data.pokemon.evolutionRequirements && <Grid item xs={12}>
                            <div className={classes.list}>
                                <p>Evolution Requirement: {data.pokemon.evolutionRequirements.name} ({data.pokemon.evolutionRequirements.amount} pcs)</p>
                            </div>
                        </Grid>}
                                                
                    </Grid>
                </Grid>
            }
        </div>
    )
}

export default Detail
