import { ToastProvider } from "../../components/ui/toast";
import Loader from "../../components/shared/Loader";
import UserCard from "../../components/shared/UserCard";
import { useGetUsers } from "../../lib/react-query/queries";
import { useToast } from "../../components/ui/use-toast";

// Define the Document type with the necessary properties
interface Document {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string; // or Date if you need a Date type
  $updatedAt: string; // or Date
  $permissions: string[];
}

interface Creator extends Document {
  name: string;
  email: string;
  // Add other properties for creator
}

const AllUsers = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

  // Error handling
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return (
      <div className="error-container">
        <h2 className="text-red-600">Failed to load users.</h2>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="common-container">
        <div className="user-container">
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>

          {isLoading ? (
            <Loader />
          ) : creators?.documents.length === 0 ? (
            <div className="no-users">
              <p>No users found.</p>
            </div>
          ) : (
            <ul className="user-grid">
              {creators?.documents.map((creator: Creator) => (
                <li key={creator.$id} className="flex-1 min-w-[200px] w-full">
                  <UserCard user={creator} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </ToastProvider>
  );
};

export default AllUsers;
