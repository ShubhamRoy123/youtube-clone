"use client";

import React, {useState} from 'react'';
function Login() {
  const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [error, setError] = useState('');
      
const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        }

        try {
            const res = await fetch('/api/auth/register',{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
        });

        const data = res.json();

        if (!res.ok) {
            setError("Something went wrong");
        }

        router.push('/login');

    } catch (error) {
        setError("Failed to register");
        console.error("Registration error:", error);    
    }
   }
  return  <div>Register</div>
}

export default Login;
