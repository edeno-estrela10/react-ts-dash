import { History } from "history";
import React, {
    createContext, Dispatch, FC, Reducer, SetStateAction, useContext, useReducer
} from "react";

import AuthService from "../services/AuthService";
import { Usuario } from "../shared/models/Usuario";
import { ActionMap } from "../utils/ActionMap";

type UserContextData = {
  isAuthenticated?: boolean;
  user?: Usuario;
};

export enum UserActionsTypes {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
}

type UserPayload = {
  [UserActionsTypes.LOGIN_SUCCESS]: {
    user: Usuario;
  };
  [UserActionsTypes.SIGN_OUT_SUCCESS]: undefined;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

const UserStateContext = createContext<Partial<UserContextData>>({});
const UserDispatchContext = createContext<Dispatch<UserActions>>({} as any);

function userReducer(state: UserContextData, action: UserActions) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const UserProvider: FC = ({ children }) => {
  const storagedIsAuthenticated = localStorage.getItem("user_token");
  const storagedUser = localStorage.getItem("user_data");

  const initializer: UserContextData = {
    isAuthenticated: false,
    user: undefined,
  };
  if (storagedIsAuthenticated && storagedUser) {
    initializer.isAuthenticated = true;
    initializer.user = JSON.parse(storagedUser);
  }
  const [state, dispatch] = useReducer<Reducer<UserContextData, UserActions>>(
    userReducer,
    initializer,
  );

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch(): Dispatch<UserActions> {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################
type DispatchState<T> = Dispatch<SetStateAction<T>>;

async function loginUser(
  dispatch: Dispatch<UserActions>,
  login: string,
  password: string,
  history: History,
  setIsLoading: DispatchState<boolean>,
  setError: DispatchState<boolean>,
) {
  setError(false);
  setIsLoading(true);

  try {
    const response = await AuthService.signIn(login, password);

    localStorage.setItem("user_token", response.token);
    localStorage.setItem("user_data", JSON.stringify(response.user));
    setError(false);
    setIsLoading(false);
    dispatch({
      type: UserActionsTypes.LOGIN_SUCCESS,
      payload: { user: response.user },
    });

    history.push("/app/dashboard");
  } catch (error) {
    // dispatch({ type: ActionsTypes.LOGIN_FAILURE });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch: Dispatch<UserActions>, history?: History) {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_data");
  dispatch({ type: UserActionsTypes.SIGN_OUT_SUCCESS });
  if (history) {
    history.push("/login");
  }
}
