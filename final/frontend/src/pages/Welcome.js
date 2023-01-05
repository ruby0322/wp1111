import { useNavigate } from "react-router-dom";
import { Divider, AutoCenter } from 'antd-mobile'
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useAuth } from '../hooks/AuthContext';

const Welcome = () => {

  const onSignIn = () => {
    console.log('user signed in successfully!');
  }

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
    }}
    >
      <AutoCenter style={{fontSize: 50}}>
        LOGO
      </AutoCenter>
      <AutoCenter style={{fontSize: 50}}>
          App Name
      </AutoCenter>
      <Divider> 用戶登入 </Divider>
      <GoogleSignInButton onSignIn={onSignIn} />
    </div>
  );
};

export default Welcome;
