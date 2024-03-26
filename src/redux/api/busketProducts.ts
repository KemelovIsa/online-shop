import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants/constants";

interface ProductRequest {
  _id: number;
}

interface ProductResponse {
  _id: number;
  name: string;
  photoUrl: string;
  price: string;
  quantity: string;
}

export const busketProductsApi = createApi({
  reducerPath: "busketProductsApi",
  baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
  tagTypes: ["BusketProducts"],
  endpoints: (builder) => {
    return {
      getBusketProducts: builder.query<ProductResponse[], void>({
        query: () => ({
          url: "basket",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        providesTags: ["BusketProducts"],
      }),
      toggleBusketProduct: builder.mutation<ProductResponse, ProductRequest>({
        query: (id) => ({
          url: `basket/${id}`,
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        invalidatesTags: ["BusketProducts"],
      }),
    };
  },
});

export const { useGetBusketProductsQuery, useToggleBusketProductMutation } =
  busketProductsApi;
