import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
  },
  profile: {
    display: 'flex',
    flexWrap:'wrap',
    justifyContent: 'space-between',
    width: 'auto',
  },
  
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    cursor:'pointer',
  },
  logout:{
    padding:"0px",
    margin:"0px"
  }
}));