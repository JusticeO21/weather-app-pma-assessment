'use client';
import  Link  from 'next/link';
import { Text } from '../atoms';

export const Header = () => {
  return (
    <header className="sticky top-0 md:static bg-gray-100 py-4 md:py-0  z-10 md:z-auto flex items-center justify-between gap-7 mb-8">
      <div className='flex gap-3'>
                <Link href="/" className='px-5 py-2 text-white flex items-center bg-gray-900 rounded-md'>
          <Text variant="body">
            Home
          </Text>
      </Link>

        <Link href="/records" className='px-5 py-2 text-white flex items-center bg-gray-900 rounded-md'>
          <Text variant="body">
            Records
          </Text>
      </Link>
      </div>
      
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="User profile"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
};
