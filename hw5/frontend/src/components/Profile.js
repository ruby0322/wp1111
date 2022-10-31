import './Profile.css'

const Profile = ({ profile }) => {
  const isNumric = val => !isNaN(val) && !isNaN(parseFloat(val));
  const passwordFormat = pwd => {
      let format = '';
      for (let i = 0; i < pwd.length; ++i) {
          if (isNumric(pwd[i]))
              format += 'D';
          else
              format += 'N';
      }
      return format
  }
  return (
    <div className='panel'>
      <div className='left'>
        <div className='picture' style={{ backgroundImage: `url(${profile.picture.large})` }}>
        </div>
        <h2 className='name'>
          { `${profile.name.first} ${profile.name.last}` }      
        </h2>
        <h3 className='gender'>
          { `${profile.gender}` }      
        </h3>
        <h3 className='username'>
          { `ID: ${profile.login.username}` }      
        </h3>
        <h3 className='password'>
          { `Hint: ${passwordFormat(profile.login.password)} (${profile.login.password.length})` }      
        </h3>
      </div>  
      <div className='right'>
        <div className='attr'>
            <h2 className='field'>
                Country
            </h2>      
            <h2 className='value'>
                { profile.location.country }
            </h2>      
        </div>
        <div className='attr'>
            <h2 className='field'>
                City
            </h2>      
            <h2 className='value'>
                { profile.location.city }
            </h2>      
        </div>
        <div className='attr'>
            <h2 className='field'>
                Street
            </h2>      
            <h2 className='value'>
                { profile.location.street.name }
            </h2>      
        </div>
        <div className='attr'>
            <h2 className='field'>
                Email
            </h2>      
            <h2 className='value'>
                { profile.email }
            </h2>      
        </div>
      </div>
    </div>
  );
}

export default Profile;
