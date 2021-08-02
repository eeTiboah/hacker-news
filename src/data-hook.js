import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useCallback
} from "react";
import axios from "axios";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

export default DataProvider = ({ children }) => {
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  const [url, setUrl] = useState(`${API_ENDPOINT}`);
  useEffect(() => {
    dispatchStories({ type: "FETCH_DATA_INIT" });
  }, []);

  const handleStories = useCallback(async () => {
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: "FETCH_DATA_SUCCESS",
        payload: result.data.hits
      });
    } catch {
      dispatchStories({ type: "FETCH_DATA_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleStories();
  }, [handleStories]);

  const getAllData = (search) => {
    setUrl(`${API_ENDPOINT}${search}`);
    handleStories();
  };

  return (
    <DataContext.Provider value={{ stories, getAllData }}>
      {children}
    </DataContext.Provider>
  );
};