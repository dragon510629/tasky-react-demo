import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from '../api/auth';
import * as actions from '../redux/actions/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textError: {
    color: 'red',
  }
}));

function SignIn({ saveAuth, saveUserInfo }: any):any {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErros] = useState({
    errorEmail: [],
    errorPassword: []
  });
  const history = useHistory();
  const classes = useStyles();

  const onLogin = async (e : any) => {
    let error:any = {
      errorEmail: [],
      errorPassword: [],
    };
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      error.errorEmail.push("Email invalid");
    }
    if(password.length < 6){
      error.errorPassword.push("The password must not be less than 6 characters");
    }
    setErros(error);
    try {
      const auth = await login({email, password});
      saveAuth(auth.data.token);
      saveUserInfo(auth.data.user);
      history.push('./')
    } catch (e){
      console.log(e);
    }
  }
  const changeForm = (e : any) => {
    e.preventDefault();
    const {value , name} = e.target;
    if(name === 'email'){
      setEmail(value);
    }else{
      setPassword(value);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={changeForm}
          />
          {errors.errorEmail.map((item)=> (<p className={classes.textError}>{item}</p>))}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={changeForm}
          />
          {errors.errorPassword.map((item)=> (<p className={classes.textError}>{item}</p>))}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state: any) : any => {
  return {
    auth : state.main,
  }
}

const mapActionToProps = (dispatch : any) => {
  return {
    saveAuth : (key : string) => {
      dispatch(actions.saveAuth(key));
    },
    saveUserInfo : (data : any) => {
      dispatch(actions.saveUser(data));
    }
  }
}

export default connect(mapStateToProps, mapActionToProps)(SignIn);