import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="items-center justify-center flex h-[calc(100vh-88px-90px)] ">
      <form className="flex max-w-md flex-col gap-4  [box-shadow:0px_12px_99px_15px_rgba(0,0,0,0.1)] p-7 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              name="username"
              type="text"
              placeholder="John Doe"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="john12@gmail.com"
              required
              shadow
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Confirm password" value="Repeat password" />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            name="confirmPassword"
            required
            shadow
          />
        </div>

        <Button
          type="submit"
          className="bg-[#BCFD4C] text-black enabled:hover:bg-[#9aec0c]">
          Register new account
        </Button>
        <p className="text-center">OR</p>
        <Link
          className="text-center underline hover:underline-offset-4 hover:  text-[#BCFD4C]"
          to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
