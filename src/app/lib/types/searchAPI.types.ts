export const SearchResponseTypeNames = [
  "USER",
  "PUBLICATION",
  "TOPIC",
] as const;
export type SearchResponseTypes = (typeof SearchResponseTypeNames)[number];

export abstract class BaseSearchResults {
  searchKey!: SearchResponseTypes;
}
export interface UserSearchData {
  image: string;
  firstName: string;
  lastName: string;
}
export class UserSearchResults extends BaseSearchResults {
  searchKey!: "USER";
  data!: UserSearchData[];
}
export interface PublicationSearchData {
  image: string;
  name: string;
}
export class PublicationSearchResults extends BaseSearchResults {
  searchKey!: "PUBLICATION";
  data!: PublicationSearchData[];
}
export interface TopicSearchData {
  image: string;
  name: string;
}
export class TopicSearchResults extends BaseSearchResults {
  searchKey!: "TOPIC";
  data!: TopicSearchData[];
}
export type SearchApiResponse =
  | UserSearchResults
  | PublicationSearchResults
  | TopicSearchResults;
