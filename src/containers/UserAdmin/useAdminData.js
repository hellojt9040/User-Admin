import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { fetchUserDetails as fetchUserDetailsURL } from '../../api/urls';
import {
  DEFAULT_ERROR,
  ITEMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../constants/constants';

const useAdminData = () => {
  const [__users, __setUsers] = useState();
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

  const pageChangeHandler = (_, page) => {
    setCurrentPage(page);
    setSelectedUsers([]);
  };

  const updateUser = useCallback(
    (userData) => {
      if (users?.length) {
        const foundIndex = users.findIndex((user) => user.id === userData.id);
        const updatedUsers = [...users];
        updatedUsers.splice(foundIndex, 1, userData);
        setUsers(updatedUsers);
      }
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
        setSelectedUsers((prevUsers) =>
          prevUsers.filter((userId) => userId !== userData.id)
        );
      }
    },
    [users]
  );

  const userSelectionHandler = useCallback(
    ({ id, isAllSelection, checked }) => {
      let userIds = [...selectedUsers];
      if (Array.isArray(userIds)) {
        if (checked) {
          if (isAllSelection) {
            setSelectedUsers(paginatedUsers?.map((user) => user.id));
          } else if (id) {
            setSelectedUsers((prevUsers) => [...prevUsers, id]);
          }
        } else {
          if (isAllSelection) {
            setSelectedUsers([]);
          } else if (id) {
            setSelectedUsers((prevUsers) =>
              prevUsers?.filter((userId) => userId !== id)
            );
          }
        }
      }
    },
    [paginatedUsers]
  );

  const deleteMultipleUsers = () => {
    const userIds = selectedUsers;
    if (Array.isArray(userIds) && userIds.length && users?.length) {
      const updatedUsers = users.filter((user) => !userIds.includes(user.id));
      setSelectedUsers([]);
      setUsers(updatedUsers);
    }
  };

  const filterUsersWithSearch = useCallback(
    (searchValue) => {
      const filteredUsers = __users?.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().includes(searchValue)
        )
      );
      setUsers(filteredUsers);
    },
    [users]
  );

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
        __setUsers(data); // ONLY for master data, DO NOT USE anywhere else
        setTotalPages(Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE));
      } catch (error) {
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
    allSelected,
    selectedUsers: selectedUsers,
    filterUsersWithSearch,
  };
};

export default useAdminData;
