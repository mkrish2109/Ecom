import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { login, register } from "../services/apiServices";
import { Bounce, toast } from "react-toastify";
import { FaTelegramPlane } from "react-icons/fa";

function Register() {
  async function handleSubmit(e) {
    try {
      e.preventDefault();

      if (e.target["password"].value !== e.target["confirmPassword"].value) {
        alert("Passwords did not match!");
      }

      const data = {
        fname: e.target["fname"].value,
        lname: e.target["lname"].value,
        email: e.target["email"].value,
        password: e.target["password"].value,
      };

      const response = await register(data);

      if (response.success) {
        return toast.success(response.msg, {
          icon: <FaTelegramPlane />,
        });
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="items-center justify-center flex ">
      <form
        className="flex max-w-md flex-col gap-4  [box-shadow:0px_12px_99px_15px_rgba(0,0,0,0.1)] p-7 rounded-lg"
        onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="fname" value="First Name" />
            </div>
            <TextInput
              id="fname"
              name="fname"
              type="text"
              placeholder="John"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lname" value="Last Name" />
            </div>
            <TextInput
              id="lname"
              name="lname"
              type="text"
              placeholder="Deo"
              required
              shadow
            />
          </div>
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
            <Label htmlFor="confirmPassword" value="Repeat password" />
          </div>
          <TextInput
            id="confirmPassword"
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
          className="text-center underline hover:underline-offset-4 hover:  text-[#13160d]"
          to="/login">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;
