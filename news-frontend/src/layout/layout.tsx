import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation.tsx';

const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
