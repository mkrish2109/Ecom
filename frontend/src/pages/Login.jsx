import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => {
    return store.user.user;
  });
  console.log("user", user);

  useEffect(() => {
    if (user) {
      navigate("/user/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const data = {
        email: e.target["email"].value,
        password: e.target["password"].value,
      };

      const response = await login(data);

      if (response.success === true) {
        dispatch(loginUser(data));
        return (
          toast.success(response.msg),
          user.role === "admin" ? navigate("/admin/dashboard") : navigate("/")
        );
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  function toggleShow() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="items-center flex justify-center h-[calc(100vh-88px-90px)]  ">
      <form
        className="p-8 rounded-lg min-w-[300px] max-w-md flex [box-shadow:0px_12px_99px_15px_rgba(0,0,0,0.1)]  flex-col gap-4 "
        onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="[&>div>input]:pr-[33px]"
            required
          />{" "}
          {showPassword ? (
            <HiEyeOff
              onClick={toggleShow}
              className="text-2xl cursor-pointer absolute top-[50%] translate-y-[-50%] right-[8px]"
            />
          ) : (
            <HiEye
              onClick={toggleShow}
              className="text-2xl cursor-pointer absolute top-[50%] translate-y-[-50%] right-[8px]"
            />
          )}
        </div>

        <Link to="/forgot-password">Forgot password?</Link>
        <Button
          type="submit"
          className="bg-[#BCFD4C] text-black enabled:hover:bg-[#9aec0c]">
          Login
        </Button>
        <p className="text-center">OR</p>
        <Link
          className="text-center underline hover:underline-offset-4 hover:text-[#13160d]"
          to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
