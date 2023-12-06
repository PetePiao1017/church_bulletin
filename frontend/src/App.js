import React, { useEffect } from 'react';
import MyRoutes from './routes/MyRoutes'
import setAuthToken from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { LOGOUT } from './actions/types';
import { loadUser } from './actions/auth';


function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <div className="App">
      <Provider store = {store}>
        <MyRoutes />
      </Provider>
    </div>
  );
}

export default App;
