import { Models } from "appwrite";
import { GridPostList, Loader } from "../../components/shared";
import { useGetCurrentUser } from "../../lib/react-query/queries";

const Saved = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  // Safely map over save posts if currentUser exists
  const savePosts =
    currentUser?.save
      ?.map((savePost: Models.Document) => ({
        ...savePost.post,
        creator: {
          imageUrl:
            currentUser.imageUrl || "/assets/icons/profile-placeholder.svg", // fallback image URL
        },
      }))
      .reverse() || []; // Default to an empty array if undefined

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="save"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {savePosts.length === 0 ? (
        <p className="text-light-4">No available posts</p>
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          <GridPostList posts={savePosts} showStats={false} />
        </ul>
      )}
    </div>
  );
};

export default Saved;
