import { useEffect } from 'react';
import { SafeArea } from 'antd-mobile'

import Welcome from './pages/Welcome';
import Header from './components/Header';
import Home from './pages/Home'
import Search from './pages/Search';
import Invite from './pages/Invite';
import Chat from './pages/Chat';
import User from './pages/User';
import Footer from './components/Footer';

import { gapi } from "gapi-script";

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';


const App = () => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        client_id: '106548217050-jbo0jftkneb2e07k3he07m7ej4g9sadk.apps.googleusercontent.com',
        scope: '',
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
    <div style={{height: '100vh'}}>
      <div style={{backgroundColor: 'var(--adm-color-primary)'}}>
        <SafeArea position='top' />
      </div>
      <div style={{paddingBottom: '2rem'}}>
        <Header />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home/' element={<Home />} />
            <Route exact path='/search/' element={<Search />} />
            <Route exact path='/invite/' element={<Invite />} />
            <Route exact path='/chat/' element={<Chat />} />
            {/* <Route path='/chat/:id' element={<Chat />} /> */}
            {/* <Route path='/activity/:id' element={<Activity />} /> */}
            <Route path='/user/:id' element={<User />} />
        </Routes>
        <Footer />
      </div>
      <div style={{backgroundColor: 'white'}}>
        <SafeArea position='bottom' />
      </div>
    </div>
    </>
  );
}

export default App;
