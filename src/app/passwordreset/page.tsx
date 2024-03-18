"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";




export default function PasswordResetPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("signup failed", error.message)

      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl'>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <label htmlFor="confirm_pass">confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onReset}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "-" : "Reset Password"}</button>
    </div>
  )
}