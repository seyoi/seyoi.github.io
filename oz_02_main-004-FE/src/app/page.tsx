'use client';
import { Button } from '@/stories/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div>
        <Image src="/images/logoPurple.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="flex  mt-8">
        <Link className="mr-4" href="/login">
          <Button label="Login" />
        </Link>
        <Link href="/nick-name">
          <Button label="Nick Name" />
        </Link>
      </div>
    </main>
  );
}
