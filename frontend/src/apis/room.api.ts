const getInforRoom = async (rid: string) => {
  const response = await fetch(`${process.env.URL_SERVER_API}/room/` + rid, {
    method: "GET",
  });

  return response.json();
};

export { getInforRoom };
