import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
});

export const authUser = (payload) => api.post("auth-user", payload);
export const createUser = (payload) => api.post("create-user", payload);
export const borrowRequest = (payload) => api.post("borrow-request", payload);
export const getUser = (payload) => api.post("get-user", payload);

const apis = {
	authUser,
	createUser,
	borrowRequest,
	getUser,
};

export default apis;
