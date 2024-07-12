import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();
  const params = useParams();
  function goToList() {
    navigate(`/${params.gender || "men"}/category`);
  }

  return (
    <div className="border cursor-pointer relative" onClick={goToList}>
      <div className="h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.75)] text-center">
        <h3 className="text-xl font-bold">{category.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
