import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/apiServices";
import { toast } from "react-toastify";

function VerifyEmail() {
  const navigate = useNavigate();
  const params = useSearchParams();

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const data = {
      verificationToken: params[0].get("token"),
      email: params[0].get("email"),
    };

    async function verify() {
      const response = await verifyEmail(data);
      setVerified(response.success);
      if (response.success) {
        return toast.success(response.msg);
      } else {
        toast.error(response.msg);
      }
    }

    verify();
  }, []);

  function goToHome() {
    navigate("/");
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">
          {verified ? "Verified" : "Verifying Email..."}
        </h2>

        <Button className="w-fit" onClick={goToHome} disabled={!verified}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
