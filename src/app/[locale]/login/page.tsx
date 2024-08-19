"use client";
import BigLogo from "@/assets/logos/white-logo.svg";
import { API_KEY } from "@/utils";
import { log } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function LoginPage() {
  const router = useRouter();

  const loginRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      Login: loginRef.current.value,
      Password: passwordRef.current.value,
    };

    const response = await fetch(`${API_KEY}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await response.json();
    console.log(json);

    if (response.status == 200) {
      router.replace("admin-projects");
      console.log(document.cookie);
      console.log(document.cookie.split(" ")[1]);
    } else {
      console.log("error");
    }
  };

  return (
    <main className="bg-[#C30F08]">
      <div className="min-h-[100vh] flex items-center justify-between w-[1200px] mx-auto">
        <Image src={BigLogo} alt="BigLogo" />
        <div className="bg-[#ffffffa1] px-[44px] py-[66px] rounded-lg">
          <form>
            <p className="text-center">
              Welcome to{" "}
              <span className="inline-block font-bold text-[#C30F08]">AEGBAO</span>
            </p>
            <h2 className="text-center text-[55px] text-[#444444] mt-[60px] mb-[80px]">
              Sign in
            </h2>
            <div>
              <div className="flex flex-col justify-start items-start gap-2">
                <label htmlFor="email">Enter your email address</label>
                <input
                  className="w-[450px] h-[57px] px-[25px] rounded-md"
                  type="text"
                  name="email"
                  placeholder="Email address"
                  ref={loginRef}
                />
              </div>
              <div className="flex flex-col justify-start items-start gap-2 mt-[38px] mb-[70px]">
                <label htmlFor="password">Enter your Password</label>
                <input
                  className="w-[450px] h-[57px] px-[25px] rounded-md"
                  type="password"
                  placeholder="Email password"
                  ref={passwordRef}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogin}
                  className="w-[238px] h-[54px] bg-[#C30F08] text-white rounded-md"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
