import { Button } from "flowbite-react";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function PagesListItem({ page, handleDelete }) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/admin/pages/${page.slug}`);
  }

  return (
    <div>
      <div className="flex items-center gap-2 py-2 border-b border-b-slate-300">
        <div className="w-16 h-16 shrink-0 rounded-full border border-slate-300 overflow-hidden">
          <img
            src={page?.carouselImages[0] || ""}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grow-[1]">
          <h3 className="font-bold">{page.name}</h3>
        </div>
        <div className="flex gap-2">
          <Button  color="primary" pill onClick={handleEdit}>
            <HiPencil />
          </Button>
          <Button  color="primary"
            pill
            onClick={() => {
              handleDelete(page._id);
            }}>
            <HiTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PagesListItem;
