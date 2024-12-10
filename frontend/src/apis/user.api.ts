const getListUser = async (data?: any) => {
  const response = await fetch(
    `${process.env.URL_SERVER_API}/user/list?` + new URLSearchParams(data),
    {
      method: "GET",
    }
  );

  return response.json();
};

const getListFriends = async (userId: string) => {
  const response = await fetch(
    `${process.env.URL_SERVER_API}/user/list-friend/` + userId,
    {
      method: "GET",
    }
  );

  return response.json();
};

export { getListUser, getListFriends };
