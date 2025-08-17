import Link from 'next/link'
import React from 'react'


export default function Header() {

    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
        }
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      {session? (
        <div>Welcome</div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  )
}

}
