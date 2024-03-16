"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: '',

  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLinkRequest = async () => {
    try {
      setLoading(true);
      // const response = await axios.post("/api/users/login", user);
      // console.log("signup success", response.data);
      // router.push("/profile")
      console.log("test request: from 'app/forgotpassword/page.tsx'\nfunction: 'onLinkRequest()'")
    } catch (error: any) {
      console.log("password reset process failed", error.message)

      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl my-6'>{loading ? "Processing" : "Reset Password"}</h1>
      <hr />
      
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      {/* NOTICE FOR PROCESS */}
      <p className="border-[1px] border-red-400/20 text-red-300/60 rounded-xl px-10 py-5 mt-4 mb-8 max-w-80 bg-slate-950">NOTE: After submitting, you will be sent a link redirecting your to a page in order for your password to be reset. The link will be sent to your email address</p>

      <button
        onClick={onLinkRequest}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:text-blue-300 hover:border-blue-300">Send Link</button>
      <Link href="/signup">Visit Signup Page</Link>
    </div>
  )
}