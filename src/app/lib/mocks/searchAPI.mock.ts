// Mock data
import {
  PublicationSearchResults,
  TopicSearchResults,
  UserSearchResults,
} from "@/app/lib/types/searchAPI.types";

export const mockUserSearchApiResponse: UserSearchResults = {
  searchKey: "USER",
  data: [
    {
      image: "https://dummyjson.com/icon/emilys/128",
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      image: "https://dummyjson.com/icon/michaelw/128",
      firstName: "Janice",
      lastName: "Doe",
    },
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      firstName: "John",
      lastName: "Doe",
    },
  ],
};

export const mockPublicationSearchApiResponse: PublicationSearchResults = {
  searchKey: "PUBLICATION",
  data: [
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "Science and Tech",
    },
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "Geo Politics",
    },
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "History",
    },
  ],
};

export const mockTopicSearchApiResponse: TopicSearchResults = {
  searchKey: "TOPIC",
  data: [
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "Science and Tech",
    },
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "Geo Politics",
    },
    {
      image: "https://dummyjson.com/icon/sophiab/128",
      name: "History",
    },
  ],
};
