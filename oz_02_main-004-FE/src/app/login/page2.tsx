import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/nick-name">
        {' '}
        <Image src="/images/kakaoLogin.png" width={200} height={100} alt="kakaoLogin" />
      </Link>
    </div>
  );
}

export default Login;
