'use client'

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { encodedRedirect } from "@/utils/utils";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login(props: { searchParams: Promise<Message> }) {
  const supabase = createClient();
  const router = useRouter();

    useEffect(() => {
      
  
      const initialize = async () => {
        // searchParams = await props.searchParams;
      };
      initialize();
  
      return () => {
       
      };
    }, [])
  
  const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("logging in");
    console.log(data, error);
    if (error) {
      return encodedRedirect("error", "/sign-in", error.message);
    }
    router.push('/')
    return;
  };

  return (
    <form className="flex-1 flex flex-col min-w-64 max-w-md mx-auto py-8 px-4 gap-4">
      <h1 className="text-2xl font-medium">Sign in</h1>
      {/* <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p> */}
      <div className="flex flex-col gap-6 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        {/* <FormMessage message={searchParams} /> */}
      </div>
    </form>
  );
}
