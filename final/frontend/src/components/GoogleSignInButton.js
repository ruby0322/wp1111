// import { GoogleLogin } from "react-google-login";
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { useAuth } from '../hooks/AuthContext';
import { Button, Space } from 'antd-mobile';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = ({ style }) => {
  const { signedIn, signOut, signIn } = useAuth();
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        if (signedIn) signOut();
        console.log('user', user);
        signIn(user);
      });
  };

  return (
    <Button
      color='white'
      fill='none'
      onClick={handleSignIn}
      style={{
        ...style,
        '--border-width': '2px',
        // fontWeight: 'bold'
      }}
    >
      <Space>
        <GoogleOutlined />
        Sign In With Google
      </Space>
    </Button>
  );
};

export default GoogleSignInButton;