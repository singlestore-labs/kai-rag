"use client";
import Link from 'next/link';

const NavBar: React.FC = () => {

  return (
    <nav className="bg-purple-600 p-4">
      <ol style={{ listStyleType: 'none', margin: 10, padding: 0 }}>
        <img src='/singlestore_white.svg' width={"10%"} style={{ display: 'inline', marginLeft: '1rem' }} />
        <li style={{ display: 'inline', marginLeft: '5rem' }}>
          <Link href="/">
            Home
          </Link>
        </li>
        <li style={{ display: 'inline', marginLeft: '2rem' }}>
          <Link href="/ask">
            QnA
          </Link>
        </li>
        <li style={{ display: 'inline', marginLeft: '2rem' }}>
          <Link href="/teach">
            Train
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default NavBar;
