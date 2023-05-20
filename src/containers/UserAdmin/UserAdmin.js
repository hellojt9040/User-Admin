import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { fetchUserDetails as fetchUserDetailsURL } from '../../api/urls';

const UserAdmin = () => {
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        debugger;
        console.log('fetchUserDetailsURL...', fetchUserDetailsURL);
        const response = await fetch(fetchUserDetailsURL());
        const data = await response.json();
        console.log('fetchUserDetails data...', data);
      } catch (error) {
        console.log('fetchUserDetails error...', error);
      } finally {
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <Card>dfgdfg</Card>
    </div>
  );
};

export default UserAdmin;
