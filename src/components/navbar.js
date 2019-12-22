import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, InputLabel, MenuItem, FormHelperText, FormControl, Select, Fab} from '@material-ui/core';
import {Home} from '@material-ui/icons'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'kalam'
  },
}));

export default function ButtonAppBar({data, setFilter, history}) {
  const classes = useStyles();
  const [age, setAge] = React.useState('')
  const [type, setType] = React.useState([])
  const handleChange = event => {
      setAge(event.target.value)
      setFilter(event.target.value)
      console.log('ini event', event.target.value)
  }

  function Back() {
      console.log('trigger home');
      history.push('/')
      return null
  }
  useEffect(() => {
    if(data){
        let PokemonType = data.map((value) => value.types).flat().filter((value, index, self) => self.indexOf(value) === index)
        setType(PokemonType)
    }
  },[])
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color={"secondary"}>
        <Toolbar >
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          {
              data && 
                <FormControl variant="filled" className={classes.formControl} style={{width: "100px"}}>
                    <InputLabel id="demo-simple-select-filled-label" style={{fontFamily: "kalam"}}>Filter</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                    >
                    <MenuItem value="none">
                        <em>None</em>
                    </MenuItem>
                    {type.map((tp, index) => (
                        <MenuItem key={index} value={tp}>{tp}</MenuItem>
                        ))}
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
          } 
          {
              !data && <Fab onClick={Back} color={"secondary"}><Home/></Fab>
          }
          

          <Typography variant="h5" className={classes.title} style={{marginLeft: "20px"}}>
          Pokémons
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}