import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../appwrite.config";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((user) => {
        if (!user) {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        }
        setUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setIsLoading,
        isLoading,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
