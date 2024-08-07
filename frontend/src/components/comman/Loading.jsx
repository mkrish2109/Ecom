import { Button, Spinner } from "flowbite-react";
import React from "react";

function Loading() {
  return (
    <div>
      <Button color="gray">
        <Spinner aria-label="Alternate spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
}

export default Loading;
