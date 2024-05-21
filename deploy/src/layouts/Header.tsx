import { Link } from 'react-router-dom';
import Logo from '../assets/logo/planpeakHorizontal.jpg';
import { useState, useEffect } from 'react';
// import Dropdown from '../components/common/Dropdown';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userName, setUserName] = useState('');

  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleMenu = () => {
    const menu = document.querySelectorAll('.navbar-menu');
    menu.forEach((m) => {
      m.classList.toggle('hidden');
    })
  };

  useEffect(() => {
    //menu toggle
    const burger = document.querySelectorAll('.navbar-burger');
    burger.forEach((b) => {
      b.addEventListener('click', toggleMenu);
    });

    const close = document.querySelectorAll('.navbar-close');
    close.forEach((c) => {
      c.addEventListener('click', toggleMenu);
    });

    const backdrop = document.querySelectorAll('.navbar-backdrop');
    backdrop.forEach((b) => {
      b.addEventListener('click', toggleMenu);
    });

    return () => {
      burger.forEach((b) => {
        b.removeEventListener('click', toggleMenu);
      });

      close.forEach((c) => {
        c.removeEventListener('click', toggleMenu);
      });

      backdrop.forEach((b) => {
        b.removeEventListener('click', toggleMenu);
      });
    };
  }, []);

  return (
    <header>
      <nav className="relative content flex items-center justify-between py-1">
        <ul className='flex p-1 items-center space-x-4'>
          <li>
            <Link to="/">
              <img style={{ width: '126px' }} src={Logo} alt="PlanPeak logo" />
            </Link>
          </li>
          <div className='md:hidden'>
            <button className="navbar-burger flex items-center text-blue-600 p-3">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className='hidden md:flex flex-auto'>
            <li>
              <Link to="/user/meetinglist" className="p-2 text-ppVeryLightGray hover:text-ppBlue" onClick={() => {setShowSubMenu(!showSubMenu)} }>
                모임 참가하기
                 {/* showSubMenu && <Dropdown /> */}
              </Link>
            </li>
            <li>
              <Link to="/admin/meetinglist" className="p-2 text-ppVeryLightGray hover:text-ppBlue">
                모임 관리하기
              </Link>
            </li>
            <li>
              <Link to="/landing" className="p-2 text-ppVeryLightGray hover:text-ppBlue">
                플랜픽 소개
              </Link>
            </li>
          </ul>
        </ul>
        <div className='flex p-2 space-x-4 md:flex'>
          {isLoggedIn ? (
            <>
              <span className="overflow-hidden rounded-full">
                <Link to="/" className="block py-2 px-3 hover:text-white">
                  {/* {userName} */}
                </Link>
              </span>
              <span className="overflow-hidden rounded-full">
                <Link to="/mypage" className="block py-2 px-3 hover:text-white">
                  마이페이지
                </Link>
              </span>
              <span className="overflow-hidden rounded-full">
                <Link to="/logout" className="block py-2 px-3 hover:text-white" onClick={() => setIsLoggedIn(false)}>
                  로그아웃
                </Link>
              </span>
            </>
          ) : (
            <>
              <span className="overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue">
                <Link to="/login" className="block py-2 px-3 text-ppVeryLightGray hover:text-white">
                  로그인
                </Link>
              </span>
              <span className="overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue">
                <Link to="/signup" className="block py-2 px-3 text-ppVeryLightGray hover:text-white">
                  회원가입하기
                </Link>
              </span>
            </>
          )}
        </div>
      </nav>
      <div className='navbar-menu relative z-50 hidden'>
        <div className='navbar-backdrop fixed inset-0'></div>  
        <nav className='fixed top-0 left-0 bottom-20 flex flex-col w-5/6 max-w-sm py-8 px-8 bg-white border-r overflow-y-auto'>
          <div className='flex items-center mb-8 text-ppBlue'>
            <li>
              <Link to="/">
                <img style={{ width: '126px' }} src={Logo} alt="PlanPeak logo" />
              </Link>
            </li>
            <button className='navbar-close'>
              <svg className="ml-10 h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul className='space-y-8'>
            <li className='md:flex items-center'>
              <Link to="/user/meetinglist" className="p-2 text-ppVeryLightGray hover:text-ppBlue" onClick={() => {setShowSubMenu(!showSubMenu)}}>
                모임 참가하기
                {/* showSubMenu && <Dropdown /> */}
              </Link>
            </li>
            <li>
              <Link to="/admin/meetinglist" className="p-2 text-ppVeryLightGray hover:text-ppBlue">
                모임 관리하기
              </Link>
            </li>
            <li>
              <Link to="/landing" className="p-2 text-ppVeryLightGray hover:text-ppBlue">
                플랜픽 소개
              </Link>
            </li>
            </ul>
          </div>
          <div className='mt-auto'>
          {isLoggedIn ? (
            <>
              <span className="overflow-hidden">
                <Link to="/" className="block py-2 px-3 hover:text-ppBlue">
                  {/* {userName} */}
                </Link>
              </span>
              <span className="overflow-hidden">
                <Link to="/mypage" className="block py-2 px-3 hover:text-text-ppBlue">
                  마이페이지
                </Link>
              </span>
              <span className="overflow-hidden rounded-full">
                <Link to="/logout" className="block py-2 px-3 hover:text-ppBlue" onClick={() => setIsLoggedIn(false)}>
                  로그아웃
                </Link>
              </span>
            </>
          ) : (
            <>
              <span className="overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue">
                <Link to="/login" className="block py-2 px-3 text-ppVeryLightGray hover:text-ppBlue">
                  로그인
                </Link>
              </span>
              <span className="overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue">
                <Link to="/signup" className="block py-2 px-3 text-ppVeryLightGray hover:text-ppBlue">
                  회원가입하기
                </Link>
              </span>
            </>
          )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;