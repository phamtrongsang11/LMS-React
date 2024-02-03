import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

export const getAll = <T>(endpoint: string, config?: AxiosRequestConfig) => {
	return axiosInstance.get<T[]>(endpoint, config).then((res) => res.data);
};

export const get = <T>(
	endpoint: string,
	id?: string,
	config?: AxiosRequestConfig
) => {
	return axiosInstance
		.get<T>(id ? endpoint + `/${id}` : endpoint, config)
		.then((res) => res.data);
};

export const post = <T>(
	endpoint: string,
	data: T,
	config?: AxiosRequestConfig
) => {
	return axiosInstance.post<T>(endpoint, data, config).then((res) => res.data);
};

export const patch = <T>(
	endpoint: string,
	data?: T,
	id?: string,
	config?: AxiosRequestConfig
) => {
	return axiosInstance
		.patch<T>(id ? endpoint + `/${id}` : endpoint, data, config)
		.then((res) => res.data);
};

export const deleteOne = <T>(
	endpoint: string,
	id?: string,
	config?: AxiosRequestConfig
) => {
	return axiosInstance
		.delete<T>(id ? endpoint + `/${id}` : endpoint, config)
		.then((res) => res.data);
};

// export default class ApiClient<T> {
// 	endPoint: string;

// 	constructor(endpoind: string) {
// 		this.endPoint = endpoind;
// 	}

// 	getAll = (config?: AxiosRequestConfig) => {
// 		return axiosInstance.get<T>(this.endPoint, config).then((res) => res.data);
// 	};

// 	get = (id?: string, config?: AxiosRequestConfig) => {
// 		return axiosInstance
// 			.get<T>(id ? this.endPoint + `/${id}` : this.endPoint, config)
// 			.then((res) => res.data);
// 	};

// 	post = (data?: T, config?: AxiosRequestConfig) => {
// 		return axiosInstance
// 			.post<T>(this.endPoint, data, config)
// 			.then((res) => res.data);
// 	};

// 	patch = (id?: string, data?: T, config?: AxiosRequestConfig) => {
// 		return axiosInstance
// 			.patch<T>(id ? this.endPoint + `/${id}` : this.endPoint, data, config)
// 			.then((res) => res.data);
// 	};

// 	put = (id?: string, data?: T, config?: AxiosRequestConfig) => {
// 		return axiosInstance
// 			.put<T>(id ? this.endPoint + `/${id}` : this.endPoint, data, config)
// 			.then((res) => res.data);
// 	};

// 	delete = (id?: string, config?: AxiosRequestConfig) => {
// 		return axiosInstance
// 			.delete<T>(id ? this.endPoint + `/${id}` : this.endPoint, config)
// 			.then((res) => res.data);
// 	};
// }
