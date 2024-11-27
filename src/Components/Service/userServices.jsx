import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/users";

// Function to get all users
export const getAllUsers = async () => {
  try {
    const res = await axios.get(API_BASE_URL);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

// Function to create a new user
export const createNewUser = async (user) => {
  try {
    const res = await axios.post(API_BASE_URL, user);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create a new user");
  }
};

// Function to update a user
export const updateUser = async (id, user) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${id}`, user);
    return res.data;
  } catch (error) {
    throw new Error("Failed to update the user");
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete the user");
  }
};

const userService = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};

export default userService;
