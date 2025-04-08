import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addLeak } from "./leaks.slice";

interface InputSectionProps {
  title: string;
  value: string;
  setSetter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddLeak: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.leaks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && img) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("img", img);

      dispatch(addLeak(formData));
    }
  };

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImg(event.target.files[0]);
    }
  };

  const handleTitleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target?.value);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-2 p-4 max-w-md border-r-2 border-slate-400"
    >
      <InputSection
        title="Title"
        value={title}
        setSetter={handleTitleChange(setTitle)}
      />
      <div className="flex flex-col">
        <label>Description:</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="h-40 text-black"
        ></textarea>
      </div>
      <div className="flex flex-col">
        <label>File:</label>
        <input
          type="file"
          onChange={handleImgChange}
          accept="image/*"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2"
      >
        {loading ? "Adding..." : "Add Leak"}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

const InputSection: React.FC<InputSectionProps> = ({
  title,
  value,
  setSetter,
}) => {
  return (
    <div className="flex flex-col">
      <label>{title}:</label>
      <input
        placeholder={title}
        type="text"
        value={value}
        onChange={setSetter}
        required
        className="text-black"
      />
    </div>
  );
};

export default AddLeak;
