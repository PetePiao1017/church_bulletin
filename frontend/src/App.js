import React, { Component } from 'react';
import MyRoutes from './routes/MyRoutes';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { LOGOUT } from './actions/types';
import { loadUser } from './actions/auth';


// asfjaslfjdsljljflasd

class App extends Component {
  componentWillMount() {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MyRoutes />
        </Provider>
      </div>
    );
  }
}

export default App;
