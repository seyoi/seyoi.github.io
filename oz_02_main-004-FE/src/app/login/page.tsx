import Link from 'next/link';
import React from 'react';
Link;
function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/nick-name">
        {' '}
        <button className="bg-yellow-400 text-white border w-64 h-12 rounded">카카오로 3초만에 로그인</button>
      </Link>
    </div>
  );
}

export default Login;
