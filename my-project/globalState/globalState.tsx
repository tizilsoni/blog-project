import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export const GlobalContext = createContext<any>({});

interface GlobalState {
  auth?: Boolean;
  token?: String;
  username?: String;
  email?: String;
}

const GlobalProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  let data = {};

  if (typeof window !== "undefined") {
    const state = JSON.parse(localStorage.getItem("state") || "{}");
    data = {
      ...state,
      auth: !!state?.token,
    };
  }

  const [state, setState] = useState<GlobalState>(data);

  function setStateWithSave(data: GlobalState) {
    setState((prevState) => ({
      ...prevState,
      ...data,
    }));

    localStorage.setItem("state", JSON.stringify({ ...state, ...data }));
  }

  function logout() {
    setState({});
    localStorage.removeItem("state");
  }

  return (
    <GlobalContext.Provider
      value={{ state, setState: setStateWithSave, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
