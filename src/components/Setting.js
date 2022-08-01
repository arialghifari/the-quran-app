import React from "react";

function Setting() {
  return (
    <div className="absolute right-0 top-9 bg-zinc-50 min-w-max py-4 px-4 w-72 flex flex-col gap-4 rounded-md shadow-md">
      <p className="font-medium">Appearance Setting</p>
      <hr />

      <div className="flex flex-col items-start">
        <p>Translation</p>
        <div className="flex gap-3 items-center">
          <label htmlFor="show-translation">
            <input
              type="radio"
              id="show-translation"
              name="translation"
              className="mr-1"
            />
            Show
          </label>
          <label htmlFor="hide-translation">
            <input
              type="radio"
              id="hide-translation"
              name="translation"
              className="mr-1"
            />
            Hide
          </label>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="text-arabic" className="cursor-pointer">
          Text Arabic
        </label>
        <select
          name="text_arabic"
          id="text-arabic"
          className="w-full bg-zinc-200 p-1 rounded-sm"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div className="flex flex-col items-start">
        <label htmlFor="text-translation" className="cursor-pointer">
          Text Translation
        </label>
        <select
          name="text_translation"
          id="text-translation"
          className="w-full bg-zinc-200 p-1 rounded-sm"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
    </div>
  );
}

export default Setting;
