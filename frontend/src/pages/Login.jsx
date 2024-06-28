import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="items-center flex justify-center h-[calc(100vh-88px-90px)]  ">
      <form className="p-8 rounded-lg min-w-[300px] max-w-md flex [box-shadow:0px_12px_99px_15px_rgba(0,0,0,0.1)]  flex-col gap-4 ">
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
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
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password" name="password" type="password" required />
        </div>
        <Button
          type="submit"
          className="bg-[#BCFD4C] text-black enabled:hover:bg-[#9aec0c]">
          Login
        </Button>
        <p className="text-center">OR</p>
        <Link
          className="text-center underline hover:underline-offset-4 hover:text-[#BCFD4C]"
          to="/register">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
