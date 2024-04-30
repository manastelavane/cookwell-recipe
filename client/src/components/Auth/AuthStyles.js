import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  container:{
    
    width:'70%',
    [theme.breakpoints.down('md')]: {
      width:'100%'
    },
    [theme.breakpoints.down('sm')]: {
      width:'100%'
    },
  },
  divcontainer:{
    backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1)), url(https://raw.githubusercontent.com/manastelavane/RecipeImages/main/image2.jpeg)`,
    height: '100vh',
    margin:'0',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  button:{
    color:theme.palette.primary.main,
  },
  back:{
    backgroundColor:'#dbf9fc',
    color:'black',
    border:'2px solid black',
    borderRadius:'100px',
    position:'absolute',
    padding:'10px',
    margin:'3px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    cursor:'pointer',
    fontWeight:'600',
    top:'0',
    left:'0',
    "&:hover":{
      backgroundColor:'#b8f8ff',
    }

  }
}));
