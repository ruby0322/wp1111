import { useNavigate } from "react-router-dom";
import { Divider, AutoCenter, Image, Space } from 'antd-mobile'
import GoogleSignInButton from "../components/GoogleSignInButton";

const Welcome = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--adm-color-primary)',
        color: 'white',
        paddingTop: '35vh',
      }}
    >
      <AutoCenter>
        <Image src='https://media.discordapp.net/attachments/881468182232195092/1060283808362025032/image.png' />
      </AutoCenter>
      <Divider />
      <Space style={{height: '2rem'}} />
      <GoogleSignInButton />
    </div>
  );
};

export default Welcome;
