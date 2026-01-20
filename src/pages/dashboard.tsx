import { useState } from "react";
import Input from "../component/UI/Input";
import ImagePreview from "../component/UI/imagePreview";
import Button from "../component/UI/Button";
import type { ChangeEvent, FormEvent } from "react";

interface PostData {
  title: string;
  message: string;
  verse: string;
  img: File | null;
}

export default function Dashboard() {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    message: "",
    verse: "",
    img: null,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(postData);
    // Firebase logic later
  };

  return (
    <div className="p-5 space-y-4 bg-gray-50">
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

          <label>Content</label>
          <textarea
            className="p-2 w-full border border-gray-200 rounded-md h-32 resize-none"
            placeholder="Your Message..."
            value={postData.message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <label>Image</label>
          <ImagePreview
            image={postData.img}
            onChange={(file) => setPostData({ ...postData, img: file })}
          />

          <Button
            type="submit"
            disabled={false}
            className="bg-red-800 text-white font-bold rounded-md p-2"
          >
            Submit
          </Button>
        </form>
      </section>
    </div>
  );
}
