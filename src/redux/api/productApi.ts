import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REQUEST_URL } from "../../utils/constants/constants";

interface ProductRequest {
  _id: number;
  name: string;
  photoUrl: string;
  price: string;
  quantity: string;
  productName: number;
}

interface ProductResponse {
  _id: number;
  name: string;
  photoUrl: string;
  price: string;
  quantity: string;
  productName: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => {
    return {
      getProducts: builder.query<ProductResponse[], void>({
        query: () => ({
          url: "products",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        providesTags: ["Products"],
      }),
      createProduct: builder.mutation<ProductResponse, ProductRequest>({
        query: (body) => ({
          url: "products",
          method: "POST",
          body,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        invalidatesTags: ["Products"],
      }),
      updateProduct: builder.mutation({
        query: ({ _id, newData }) => ({
          url: `products/${_id}`,
          method: "PUT",
          body: newData,
        }),
        invalidatesTags: ["Products"],
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;
