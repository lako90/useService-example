import { useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import useServices from '../hooks/useServices';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [{ loading: loadingSignin, data: dataSignin }, signinExecuter] = useServices('auth.signin', { immediate: false });
  console.log('loadingSignin:', loadingSignin);
  console.log('dataSignin:', dataSignin);

  const signin = async (email, password) => {
    try {
      const response = await signinExecuter(email, password);

      setUser({
        email: 'lako@email.com',
        username: 'lako',
        authToken: 'thisIsTheBestAuthToken',
      });
      console.log('response:', response);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => { setUser(null); };

  const providerValue = {
    user,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  AuthProvider,
  useAuth,
};
