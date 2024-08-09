import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePage, getAllPages } from "../../../services/apiServices";
import AdminPageTitle from "../../comman/AdminPageTitle";
import PagesListItem from "./PagesListItem";
import { toast } from "react-toastify";

function PagesListAdmin() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getAllPages().then((data) => {
      setPages(data.data);
    });
  }, []);

  function goToAddUpdatePages() {
    navigate("/admin/pages/add");
  }

  async function handleDelete(id) {
    const input = window.confirm("Are you sure you want to delete this?");
    if (input) {
      const response = await deletePage(id);

      if (response.success === true) {
        toast.success(response.msg);
      }
      const data = await getAllPages();
      setPages(data.data);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminPageTitle title="Pages" />
        <Button color="primary" className="h-fit" onClick={goToAddUpdatePages}>
          Add Page
        </Button>
      </div>
      <div className="mt-8">
        {pages.map((value) => {
          return (
            <PagesListItem
              key={value._id}
              page={value}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PagesListAdmin;
