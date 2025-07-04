'use client';

import Image from 'next/image';
import { AppConfig } from '../lib/config';

export default function Header() {
  return (
    <header className="w-full flex items-center px-6 py-4 shadow bg-white z-10">
      <div className="flex items-center gap-3 p-2 rounded"  style={{ backgroundColor: AppConfig.logoBgColor}}>
        <Image
          src={AppConfig.logo}
          alt="Logo"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </div>
    </header>
  );
}
