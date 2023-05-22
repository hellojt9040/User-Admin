import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { fetchUserDetails as fetchUserDetailsURL } from '../../api/urls';
import {
  DEFAULT_ERROR,
  ITEMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../constants/constants';

const useAdminData = () => {
  const [users, setUsers] = useState();
  const [isFetching, setFetching] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const selectedUsersToDeleteRef = useRef([]);

  const paginatedUsers = useMemo(() => {
    const begin = (currentPage - 1) * ITEMS_PER_PAGE;
    return users?.slice(begin, begin + ITEMS_PER_PAGE);
  }, [users, currentPage]);

  const allSelected =
    JSON.stringify(selectedUsers) ===
    JSON.stringify(paginatedUsers?.map((user) => user.id));
  // const allSelected =
  //   JSON.stringify(selectedUsersToDeleteRef.current) ===
  //   JSON.stringify(paginatedUsers?.map((user) => user.id));
  console.log('allSelected', allSelected);
  console.log('selectedUsers', selectedUsers);

  const pageChangeHandler = (e, page) => {
    console.log('page...', page);
    setCurrentPage(page);
    setSelectedUsers([]);
  };

  const updateUser = useCallback(
    (userData) => {
      if (users?.length) {
        const foundIndex = users.findIndex((user) => user.id === userData.id);
        debugger;
        const updatedUsers = [...users];
        updatedUsers.splice(foundIndex, 1, userData);
        setUsers(updatedUsers);
      }
      console.log('users', users);
    },
    [users]
  );

  const deleteUser = useCallback(
    (userData) => {
      if (users?.length) {
        const updatedUsers = [...users].filter(
          (user) => user.id !== userData.id
        );
        setUsers(updatedUsers);
      }
      console.log('users', users);
    },
    [users]
  );

  const userSelectionHandler = useCallback(
    ({ id, isAllSelection, checked }) => {
      debugger;
      let userIds = [...selectedUsers];
      if (Array.isArray(userIds)) {
        if (checked) {
          if (isAllSelection) {
            // userIds = paginatedUsers?.map((user) => user.id);
            setSelectedUsers(paginatedUsers?.map((user) => user.id));
          } else if (id) {
            // userIds.push(id);
            setSelectedUsers((prevUsers) => [...prevUsers, id]);
          }
        } else {
          // userIds = userIds.filter((userId) => userId !== id);
          if (isAllSelection) {
            setSelectedUsers([]);
          } else if (id) {
            setSelectedUsers((prevUsers) =>
              prevUsers?.filter((userId) => userId !== id)
            );
          }
        }
      }
      // console.log(userIds);
      // setSelectedUsers(userIds);
    },
    [paginatedUsers]
  );

  const deleteMultipleUsers = () => {
    const userIds = selectedUsers;
    if (Array.isArray(userIds) && userIds.length && users?.length) {
      const updatedUsers = users.filter((user) => !userIds.includes(user.id));
      debugger;
      console.log(updatedUsers);
      setSelectedUsers([]);
      setUsers(updatedUsers);
    }
  };

  const usersLength = users?.length ?? 0;
  useEffect(() => {
    setTotalPages(Math.ceil((usersLength ?? 0) / ITEMS_PER_PAGE));
  }, [usersLength, users]);

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
        setTotalPages(Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE));
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
    users: paginatedUsers,
    isFetching,
    isFetched,
    error,
    updateUser,
    deleteUser,
    currentPage,
    totalPages,
    pageChangeHandler,
    userSelectionHandler,
    deleteMultipleUsers,
    // selectedUsers: selectedUsersToDeleteRef.current,
    allSelected,
    selectedUsers: selectedUsers,
  };
};

export default useAdminData;
