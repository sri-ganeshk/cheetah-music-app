import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNav = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => handleNav('popular')}>Popular</button>
      <button onClick={() => handleNav('trending')}>Trending</button>
      <button onClick={() => handleNav('top-artists')}>Top Artists</button>
    </div>
  );
};

export default Navbar;
