import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://online-crud.up.railway.app",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    const isAuth = localStorage.getItem("isAuth");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (isAuth) {
      headers.set("Authorization", `Bearer ${isAuth}`);
    }
    return headers;
  },
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  tagTypes: ["Products", "favorites-products", "BusketProducts"],
  endpoints: () => ({}),
});
