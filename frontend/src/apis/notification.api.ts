const getListNotification = async (data?: any) => {
  const response = await fetch(
    `${process.env.URL_SERVER_API}/notification/list?` +
      new URLSearchParams(data),
    {
      method: "GET",
    }
  );

  return response.json();
};

export { getListNotification };
