import React, { useEffect } from 'react'
// const MaterialUi = require('./index')
// const {Grid, Paper} = MaterialUi
import {Grid, Paper, Card, Typography, CardContent, CardActionArea} from '@material-ui/core'
import { width } from '@material-ui/system'
import { func } from 'prop-types'
function PokeCard(props) {
    useEffect(() => {
        // console.log('ini value dan index di card', props.value)
    })

    function clickChecker(){
        console.log(`ke click ${props.value.id}`)
        console.log(props.history)
        props.history.push(`/${props.value.name}`, {id: props.value.id})
    }

    return (
        <Card className="PokeCard" justify="center" style={{marginBottom: "20px", marginLeft: "10px", marginRight: "10px" , Width: "400px", Height: "400px", backgroundColor: "lightgrey"}}>
            <CardActionArea onClick={clickChecker}>
                <CardContent style={{textAlign: "center", margin: "0, auto"}}>
                    <h2 style={{color: "brown", fontFamily: "kalam"}}>{props.value.name}</h2>
                    {/* <Typography style={{ color: "red", fontFamily: "kalam"}}>
                    </Typography> */}
                    <div>
                        <img style={{ maxWidth: "100%", width: "400px", height: "400px", objectFit: "scale-down"}} src={props.value.image} />
                    </div>
                    <p style={{fontFamily: "kalam"}}>Type: {props.value.classification}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PokeCard
