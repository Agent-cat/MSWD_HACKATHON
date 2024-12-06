export const getToken = () => localStorage.getItem("token");

export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Split the token and get the payload part
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("canvasElements");
  window.location.href = "/";
};

export const logoutWithNavigate = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("canvasElements");
  navigate("/");
};
