import React from 'react';
import Header from '../Header';
import UserAdmin from '../../containers/UserAdmin';

const Layout = () => {
  return (
    <>
      <Header headerText="User Admin" />
      <main>
        <UserAdmin />
      </main>
    </>
  );
};

export default Layout;
