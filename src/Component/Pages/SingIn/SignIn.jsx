import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox as MuiCheckbox } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ToDoIcon from '../../../icon/ToDoIcon.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import { useHistory } from 'react-router-dom'
import Firebase from '../../../Firebase'
import { FormControl } from '@material-ui/core';
import { connect } from 'react-redux'
import { ShowNotify, notify_Type } from '../../../Redux/actions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© حق کپی رایت '}
      <Link color="inherit" href="https://www.linkedin.com/in/amir-minaie/">
        لینکدین امیر مینائی
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Carde: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '27px',
    height: 'min-content',
    width: 'min-content'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#fff',
    width: '70px',
    height: '70px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  filds: {
    width: '350px'
  }
}));

const initialValue = {
  email: '',
  password: '',
  rememberMe: true
}

function SignIn(props) {
  const classes = useStyles();
  const [error, setError] = useState({})
  const [formValue, setFormValue] = useState(initialValue)
  const history = useHistory();

  const Validate = (fildeValues = formValue) => {
    let tempError = {};
    if ('email' in fildeValues)
      tempError.email = (fildeValues.email !== "" && (/$^|.+@.+..+/).test(fildeValues.email)) ? "" : "ایمیل را وارد کنید";
    if ('password' in fildeValues)
      tempError.password = fildeValues.password ? "" : "پسورد را وارد کنید"
    setError({
      ...tempError
    })
    return Object.entries(tempError)
      .map(([name, error]) => { return error === "" ? 0 : 1 })
      .reduce((a, b) => a + b, 0);
  }

  const onSubmit = e => {
    e.preventDefault();
    if (Validate() === 0) {
      Firebase.login(formValue.email, formValue.password)
        .then(res => {
          history.push('/Home')
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMassege = error.massege;
          if (errorCode === 'auth/wrong-password')
            props.dispatch(ShowNotify(notify_Type.Error, "ایمیل و یا کلمه عبور اشتباه است"))
            else{
            props.dispatch(ShowNotify(notify_Type.Error, "خطا در برقرار ارتباط با سرور"))

          console.log("Error Login", error)

            }

        })
    }
  }

  const CnvertChechBoxTarget = (name, value) => ({
    target: { name, value }
  })

  const handleOnchingeFilde = e => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
    // if (value && value != '')
    //   console.log("", name)
    setError({ ...error, [name]: "" })
  }

  useEffect(() => {
    // console.log("error", error)
    // console.log('formVlaue', formValue)
  })

  return (
    <Container >

      <Paper elevation={5} className={classes.Carde}  >
        <Grid container >
          <Grid style={{ gridAutoFlow: 'column' }}>
            <div className={classes.paper}>
              <Avatar sizes='40px' src={ToDoIcon} className={classes.avatar} />
              <Typography component="h1" variant="h5">
                ورود به سیستم
        </Typography>

              <form className={classes.form} noValidate onSubmit={onSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      {...(error.email && { error: true, helperText: error.email })}
                      className={classes.filds}
                      onChange={handleOnchingeFilde}
                      id="email"
                      label="ایمیل"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      {...(error.password && { error: true, helperText: error.password })}
                      onChange={handleOnchingeFilde}
                      className={classes.filds}
                      name="password"
                      label="رمز عبور"
                      type="password"
                      id="password"
                      autoComplete="current-password" />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <FormControlLabel
                        control={<MuiCheckbox
                          name='rememberMe'
                          color="primary"
                          checked={formValue.rememberMe}
                          onChange={e => handleOnchingeFilde(CnvertChechBoxTarget('rememberMe', e.target.checked))}
                        />}
                        label="مرا به خاطر بسپار"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary">
                      ورود
          </Button>
                  </Grid>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        باز یابی رمز عبور
              </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/SignUp" variant="body2">
                        {"ایجاد حساب کاربری"}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Grid>
          <Grid style={{ gridAutoFlow: 'column' }}>
          </Grid>
        </Grid>
      </Paper>
    </Container >

  );
}

const StateMapToprops = (state) => {
  return {
    infoNotify: state.infoNotify
  }
}

export default connect(StateMapToprops)(SignIn)