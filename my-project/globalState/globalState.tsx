import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export const GlobalContext = createContext<any>({});

const GlobalProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  let data = {};
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    data = {
      auth: !!token,
      token,
    };
  }

  const [state, setState] = useState<any>(data);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
