import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store/store'; 

import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
          <Header />
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route  path="/sign-in" element={<SignIn />} />
            <Route  path="/user" element={<User />} />
          </Routes>
          <Footer />
      </Router>
    </PersistGate>
    </Provider>
  )
}

export default App;
