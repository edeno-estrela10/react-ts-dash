import React, { FormEvent, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
    Button, CircularProgress, Collapse, Container, IconButton, TextField
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

import AuthContent from "../../components/AuthContent";
import AuthHeader from "../../components/AuthHeader";
import { loginUser, useUserDispatch } from "../../contexts";
import { useStyles } from "./styles";

export interface ILoginProps extends RouteComponentProps {}

export interface ILoginState {
  usuario: string;
  senha: string;
}

const Login: React.FC<ILoginProps> = props => {
  const classes = useStyles();
  // global
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    loginUser(
      userDispatch,
      loginValue,
      passwordValue,
      props.history,
      setIsLoading,
      setError,
    );
  }

  return (
    <Container maxWidth="sm">
      <AuthContent>
        <AuthHeader title="Login" />
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Email ou Usuário"
            name="login"
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={passwordValue}
            onChange={e => setPasswordValue(e.target.value)}
          />
          <div className={classes.btnWrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={
                loginValue.length === 0 ||
                passwordValue.length === 0 ||
                isLoading
              }
            >
              Login
            </Button>
            {isLoading && (
              <CircularProgress size={28} className={classes.buttonProgress} />
            )}
          </div>
          <Collapse in={error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Algo está errado com seu login ou senha :(
            </Alert>
          </Collapse>
        </form>
      </AuthContent>
    </Container>
  );
};

export default Login;
