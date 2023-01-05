// import { GoogleLogin } from "react-google-login";
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import { useAuth } from '../hooks/AuthContext';
import { Button, Space } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';


const GoogleSignInButton = ({ onSignIn, style }) => {
  const { signIn } = useAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(({user}) => {
        console.log('user', user);
        signIn(user);
        onSignIn();
      });
  };

  return (
    <Button onClick={handleSignIn} style={style} icon={<GoogleOutlined />}>
        Sign In With Google
    </Button>
  );
};

export default GoogleSignInButton;