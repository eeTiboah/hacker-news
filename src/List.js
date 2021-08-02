import { useData } from "./data-hook";

export default List = () => {
  const { stories } = useData();

  return (
    <>
      {stories.isError && <p>Something went wrong</p>}
      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        stories.data.map((item) => {
          return (
            <div key={item.objectId}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })
      )}
    </>
  );
};
