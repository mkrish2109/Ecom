import { Button } from "flowbite-react";
import React from "react";
import { HiTrash } from "react-icons/hi";

function MyImagesPreview({ images, remove }) {
  return (
    <div className="flex items-center gap-2">
      {images.map((img, index) => {
        return (
          <div className="w-20 h-20 rounded-lg border border-slate-300 overflow-hidden relative">
            <img src={img} alt="" className="h-full w-full object-cover" />
            <Button
              pill
              className="absolute top-[2px] right-[2px] h-[24px] w-[24px] flex items-center justify-center"
              onClick={() => {
                remove(index);
              }}>
              <HiTrash />
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default MyImagesPreview;
