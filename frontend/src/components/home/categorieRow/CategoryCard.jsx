import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();
  const params = useParams();
  function goToList() {
    navigate(`/${params.gender || "men"}//${category.name}`);
  }

  return (
    <div className="border cursor-pointer relative" onClick={goToList}>
      <div className="h-[300px]">
        <img
          src={category.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.75)] text-center">
        <h3 className="text-xl font-bold">{category.displayName}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
