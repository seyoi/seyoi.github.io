import { Link } from 'react-router-dom';
import Logo from '../assets/logo/planpeakHorizontal.jpg';
import { useAuth } from '../context/Auth';
import { useState } from 'react';

function Header() {
  const { user, userData, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="p-4 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className=" flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="">
            <img className="h-8 m-1" src={Logo} alt="PlanPeak logo" />
          </Link>
          <nav className="pl-4 hidden md:flex space-x-4">
            <Link to="/user/meetinglist" className="block p-2 text-gray-800 hover:text-ppBlue">
              모임 참가하기
            </Link>
            <Link to="/admin/meetinglist" className="block p-2 text-gray-800 hover:text-ppBlue">
              모임 관리하기
            </Link>
            {/* <Link to="/landing" className="block p-2 text-gray-800 hover:text-ppBlue">
              플랜픽 소개
            </Link> */}
          </nav>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center">
          {user ? (
            <>
              <span>
                <Link to="/" className="block p-2 text-gray-800 hover:text-ppBlue">
                  {userData?.displayName || user.email}
                </Link>
              </span>
              <span>
                <button className="block p-2 text-gray-800 hover:text-ppBlue" onClick={logout}>
                  로그아웃
                </button>
              </span>
            </>
          ) : (
            <>
              <span>
                <Link to="/login" className="block p-2 text-gray-800 hover:text-ppBlue">
                  로그인
                </Link>
              </span>
              <span>
                <Link to="/signup" className="block p-2 text-gray-800 hover:text-ppBlue">
                  회원가입하기
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden mt-5">
          <div className="flex flex-col space-y-4">
            <Link to="/user/meetinglist" className="block p-2 text-gray-800 hover:text-ppBlue">
              모임 참가하기
            </Link>
            <Link to="/admin/meetinglist" className="block p-2 text-gray-800 hover:text-ppBlue">
              모임 관리하기
            </Link>
            {/* <Link to="/landing" className="block p-2 text-gray-800 hover:text-ppBlue">
              플랜픽 소개
            </Link> */}
            {user ? (
              <>
                {/* <Link to="/" className="block p-2 text-gray-800 hover:text-ppBlue">
                  {userData?.displayName || user.email}
                </Link> */}
                <button className="block p-2 text-gray-800 hover:text-ppBlue" onClick={logout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block p-2 text-gray-800 hover:text-ppBlue">
                  로그인
                </Link>
                <Link to="/signup" className="block p-2 text-gray-800 hover:text-ppBlue">
                  회원가입하기
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
