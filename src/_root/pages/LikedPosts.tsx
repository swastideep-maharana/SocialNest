import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useGetCurrentUser } from "../../lib/react-query/queries";

const LikedPosts = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();

  // Show loader while the data is loading
  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  // If no liked posts or no currentUser, display a message
  if (!currentUser || currentUser.liked?.length === 0) {
    return <p className="text-light-4">No liked posts</p>;
  }

  return <GridPostList posts={currentUser.liked} showStats={false} />;
};

export default LikedPosts;
