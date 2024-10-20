import { createContext } from "react";
import { searchResultsDTO } from "../components/search/search.models";

const SearchContext = createContext<{
  items: searchResultsDTO[];
  search(term: string): void;
}>({ items: [], search: () => {} });

export default SearchContext;
