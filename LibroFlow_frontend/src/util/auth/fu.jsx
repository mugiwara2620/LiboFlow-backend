const authF = (role) => {
  return {
    isUser: role === "admin" || role === "user" ? true : false,
    isAdmin: role === "admin" ? true : false,
  };
};

export default authF;
