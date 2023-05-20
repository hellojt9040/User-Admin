import { useEffect, useState } from 'react';
import { fetchUserDetails as fetchUserDetailsURL } from '../../api/urls';
import { DEFAULT_ERROR } from '../../constants/constants';

const useAdminData = () => {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setFetching(true);
        setError(null);
        const response = await fetch(fetchUserDetailsURL());
        if (!response.ok) {
          throw new Error(DEFAULT_ERROR);
        }

        const data = await response.json();
        if (!!data.error) {
          throw new Error(data.error?.message || DEFAULT_ERROR);
        }
        setUsers(data);
        console.log('fetchUserDetails data...', data);
      } catch (error) {
        console.log('fetchUserDetails error...', error);
        setError(error?.message || DEFAULT_ERROR);
      } finally {
        setFetching(false);
        setFetched(true);
      }
    };

    fetchUserDetails();
  }, []);

  return {
    users,
    isFetching,
    isFetched,
    error,
  };
};

export default useAdminData;
