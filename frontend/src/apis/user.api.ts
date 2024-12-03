const getListUser = async (data?: any) => {
  const response = await fetch(
    `${process.env.URL_SERVER_API}/user/list?` + new URLSearchParams(data),
    {
      method: "GET",
    }
  );

  return response.json();
};

export { getListUser };
