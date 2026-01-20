import { useState } from "react";
import Input from "../component/UI/Input";
import ImagePreview from "../component/UI/imagePreview";
import Button from "../component/UI/Button";

export default function Dashboard() {
  const [postData, setPostdata] = useState({
    title: "",
    message: "",
    verse: "",
    img: "",
  });
  return (
    <div className="p-5 space-y-4 bg-gray-50">
      <section className="text-white flex w-full justify-between space-x-4">
        <div className="rounded-2xl p-4 bg-red-950 w-full">
          <h1 className="text-3xl font-extrabold">15.2k</h1>
          <h1>Total Site Views</h1>
        </div>
        <div className="rounded-2xl p-4 bg-red-950 w-full">
          <h1 className="text-3xl font-extrabold">1.2k</h1>
          <h1>Devotional Engagement</h1>
        </div>
        <div className="rounded-2xl p-4 bg-red-950 w-full">
          <h1 className="text-3xl font-extrabold">805</h1>
          <h1>Post Shares</h1>
        </div>
      </section>
      <section className="bg-white p-3 rounded-2xl">
        <h1 className="font-bold">Create New Daily Word</h1>
        <form action="" className="mb-15 mt-3 space-y-3 md:mb-0">
          <label htmlFor="Title">Title:</label>
          <br />
          <Input
            className="p-2 w-full border border-gray-100 rounded-md"
            placeholder="Enter Title"
            onChange={(e) =>
              setPostdata({ ...postData, title: e.target.value })
            }
            name="title"
            type="text"
            value={postData.title}
          />
          <br />
          <label htmlFor="verse">Verse:</label>
          <br />
          <Input
            className="p-2 w-full border border-gray-100 rounded-md"
            placeholder="Bible Verse"
            onChange={(e) =>
              setPostdata({ ...postData, verse: e.target.value })
            }
            name="verse"
            type="text"
            value={postData.verse}
          />
          <label htmlFor="Title">Content:</label>
          <br />
          <textarea
            className="p-2 w-full border border-gray-100 rounded-md h-32 resize-none"
            placeholder="Your Message......"
            onChange={(e) =>
              setPostdata({ ...postData, message: e.target.value })
            }
            name="Message"
            value={postData.message}
          />
          <br />
          <label htmlFor="image">Image:</label>
          <br />
          <ImagePreview />

          <Button className="bg-red-800 text-white font-bold rounded-md p-2">
            Submit
          </Button>
        </form>
      </section>
    </div>
  );
}
