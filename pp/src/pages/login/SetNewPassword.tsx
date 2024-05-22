import { Link } from 'react-router-dom';
function SetNewPassword() {
  return (
    <div className="w-2/5 py-10 px-12 mx-auto my-96 text-center">
      {/* border-solid border border-slate-100 rounded-2xl shadow-md shadow-slate-300 */}
      <p className="text-ppBlack text-4xl font-bold">새로운 비밀번호</p>
      <p className="text-ppVeryLightGray pt-10 text-start">
        새로운 비밀번호를 입력해주세요.
        <br />
        영문, 숫자 합산하여 8자 이상으로 입력해주세요.
      </p>

      <div className="flex flex-col pt-10 pb-4">
        <form>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='새로운 비밀번호'
            maxLength={50}
            // value={email}
            className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
            required
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='비밀번호 확인'
            maxLength={50}
            // value={password}
            className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
            required
          />
        </form>
        <Link to={'/login'}>
          <button
            type='button'
            className='rounded w-full py-4 px-4 text-lg font-bold text-center bg-slate-300 my-6 text-ppWhite hover:bg-ppBlue'
          >
            변경하기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SetNewPassword;