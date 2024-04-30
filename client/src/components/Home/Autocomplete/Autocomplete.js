import React ,{useState}from 'react'
import Autocompletee from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import '../HomeStyles.css'
import {  useNavigate } from 'react-router-dom';

const Autocomplete = () => {
	const [searchResults, setSearchResults] = useState([])
  const [query,setQuery]=useState('');
    const onChangeone=async(e)=>{
        setQuery(e.target.value)
        if(e.target.value){
            const url = 'https://recipenewserver1.onrender.com/card/autocompletesearch'
            const { data } = await axios.get(url, {
                    params: {
                        name: e.target.value,
                    },
                })
             setSearchResults(data)   
        }
    }
   const navigate=useNavigate()

  const navigateOnChange=(e,value)=>{
    var keyCode = e.keyCode || e.which; 
    if(keyCode === 13){
      navigate(`/relatedrecipe?query=${query}`);
    }else{
      navigate(`/recipe/${value?._id}`);
    }
  }
  return (
    <>
    <Autocompletee
        sx={{
            '& label.Mui-focused': {
                color: 'black',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
        }}
        className='autocompletee'
        freeSolo
        filterOptions={(x)=>x}
        onChange={(e,value)=>navigateOnChange(e,value)}
        options={searchResults}
        getOptionLabel={(option) => option.Name}
        renderInput={(params) => <TextField {...params} hiddenLabel type="search" placeholder='Search Recipe...' variant="outlined" className='autocomplete-text' onChange={(e)=>onChangeone(e)}  />}
      />
    </>
  )
}

export default Autocomplete
