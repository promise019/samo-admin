import { useState } from "react";
import Input from "../component/UI/Input";
// import ImagePreview from "../component/UI/imagePreview";
import Button from "../component/UI/Button";
import type { ChangeEvent, FormEvent } from "react";
import { uploadAdminPost } from "../lib/storage";
import { toast, ToastContainer } from "react-toastify";

interface PostData {
  title: string;
  message: string;
  verse: string;
  says: string;
  img: File | null;
}

export default function Dashboard() {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    message: "",
    verse: "",
    says: "",
    img: null,
  });
  const [isloading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!postData.title || !postData.message || !postData.verse) {
      return toast.warn("Please fill in all fields");
    }
    setLoading(true);
    try {
      // Mapping your component's 'message' to the logic's 'content'
      await uploadAdminPost({
        title: postData.title,
        message: postData.message,
        says: postData.says,
        verse: postData.verse,
      });
      setLoading(false);
      // Clear form on success
      setPostData({ title: "", message: "", verse: "", says: "", img: null });
      toast.success("Daily Word published successfully!");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to publish. Ensure you are logged in as Admin.");
    } finally {
      setLoading(false);
    }
    console.log(postData);
    // Firebase logic later
  };

  return (
    <div className="pb-17 p-5 space-y-4 bg-gray-50">
      <ToastContainer />
      {/* Stats */}
      <section className="text-white flex w-full justify-between space-x-4">
        {[
          { value: "15.2k", label: "Total Site Views" },
          { value: "1.2k", label: "Devotional Engagement" },
          { value: "805", label: "Post Shares" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl p-4 bg-red-950 w-full">
            <h1 className="text-3xl font-extrabold">{stat.value}</h1>
            <h1>{stat.label}</h1>
          </div>
        ))}
      </section>

      {/* Form */}
      <section className="bg-white p-3 rounded-2xl">
        <h1 className="font-bold">Create New Daily Word</h1>

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          <label>Title</label>
          <Input
            className="p-2 w-full border rounded-md border-gray-200"
            placeholder="Enter Title"
            name="title"
            type="text"
            value={postData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

          <label>Verse</label>
          <Input
            className="p-2 w-full border rounded-md border-gray-200"
            placeholder="Bible Verse"
            name="verse"
            type="text"
            value={postData.verse}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostData({ ...postData, verse: e.target.value })
            }
          />
          <label>Says</label>
          <Input
            className="p-2 w-full border rounded-md border-gray-200"
            placeholder="Verse Content"
            name="says"
            type="text"
            value={postData.says}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostData({ ...postData, says: e.target.value })
            }
          />

          <label>Content</label>
          <textarea
            className="p-2 w-full border border-gray-200 rounded-md h-32 resize-none"
            placeholder="Your Message..."
            value={postData.message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          {/* <label>Image</label>
          <ImagePreview
            image={postData.img}
            onChange={(file) => setPostData({ ...postData, img: file })}
          /> */}

          <Button
            type="submit"
            disabled={isloading}
            className="bg-red-800 text-white font-bold rounded-md p-2 disabled:bg-red-600"
          >
            {isloading ? "Loading... " : "Submit"}
          </Button>
        </form>
      </section>
    </div>
  );
}
