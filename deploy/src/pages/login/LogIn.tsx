import { Link } from 'react-router-dom';

function LogIn() {
  
  return (
    <div className="w-2/5 py-10 px-12 mx-auto my-96 text-center">
      <p className="text-ppBlack text-4xl font-bold">로그인</p>
      <div className="flex flex-col pt-10 pb-4">
        <form>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            maxLength={50}
            // value={email}
            className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
            required
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='비밀번호'
            maxLength={50}
            // value={password}
            className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
            required
          />
        </form>
        <Link to={'/'}>
          <button
            type='button'
            className='rounded w-full py-4 px-4 text-lg font-bold text-center bg-slate-300 my-6 text-ppWhite hover:bg-ppBlue'
          >
            PlanPeak 로그인
          </button>
        </Link>
      </div>
      
      <div className="flex justify-center">
        <div className="grow text-start">
          <Link to={'/findpw'} className="text-ppBlue border-2 border-slate-950">
            PW 찾기
          </Link>
        </div>
        <div className="flex">
          <p className="text-ppVeryLightGray">회원이 아니신가요? &nbsp;</p>
          <Link to={'/signup'} className="text-ppBlue border-2 border-slate-950">
            Create an acount
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
