
const UserProfile = (prop:any) => {

  return (
    <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '300px', width: '350px', position: 'relative'  }} className='bg-black  shadow-lg '>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#fff' }}>

        <h2>{prop.name}</h2>
        <p>{prop.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
