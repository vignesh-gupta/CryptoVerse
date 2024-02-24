import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createRequest = (url) => ({ url });

const apiKey = "d98fb8ff8f9946c7ae9042eaf89085a1"

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2" }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory }) => {
        let date = new Date();

        let from = `${date.getFullYear()}-${date.getMonth() + 1}-${
          date.getDate() - 1
        }`;

        return createRequest(
          `/everything?q=${newsCategory}&from=${from}&sortBy=publishedAt&apiKey=${apiKey}`
        );
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
