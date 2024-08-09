import React, { useEffect, useState } from "react";
import CommonListItem from "./CommonListItem";

function CommonList({
  fields,
  getAllItems,
  deleteItem,
  handleEdit,
  getImage,
  hideEdit,
  hideDelete,
  actions,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems().then((data) => {
      setItems(data.data);
    });
  }, []);

  async function handleDelete(id) {
    const input = window.confirm("Are you sure you want to delete this?");
    if (input) {
      await deleteItem(id);
      alert("Deleted successfully.");
      const data = await getAllItems();
      setItems(data.data);
    }
  }

  return (
    <div>
      {items.map((value) => {
        return (
          <CommonListItem
            key={value._id}
            _id={value._id}
            title={value[fields.title]}
            desc={value[fields.desc]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            getImage={getImage}
            value={value}
            hideEdit={hideEdit}
            hideDelete={hideDelete}
            actions={actions}
            setItems={setItems}
          />
        );
      })}
    </div>
  );
}

export default CommonList;
