// src/hooks/useUpdatePost.ts
import { useMutation } from "react-query"; // Assuming you are using react-query for API calls
import { toast } from "../components/ui/use-toast"; // Toast notification for errors

const useUpdatePost = () => {
  const updatePost = async (updatedPostData: any) => {
    try {
      // Make an API call to update the post (replace with your actual API logic)
      const response = await fetch(`/api/posts/${updatedPostData.postId}`, {
        method: "PUT",
        body: JSON.stringify(updatedPostData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Post update failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: error.message });
      } else {
        toast({ title: "An unknown error occurred" });
      }
      return null;
    }
  };

  return useMutation(updatePost);
};

export default useUpdatePost;
