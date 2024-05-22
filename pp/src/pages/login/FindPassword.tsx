import { Link } from 'react-router-dom';

function FindPassword() {
  return (
    <div className="w-2/5 py-10 px-12 mx-auto my-96 text-center">
      {/* border-solid border border-slate-100 rounded-2xl shadow-md shadow-slate-300 */}
      <p className="text-ppBlack text-4xl font-bold">비밀번호 찾기</p>
      <p className="text-ppVeryLightGray pt-10 text-center">
        가입하신 이메일 주소를 입력해 주세요.
        <br />
        비밀번호를 다시 설정할 수 있는 메일을 보내드립니다.
      </p>
      <div className="flex flex-col pt-8 pb-4">
        
      <form>
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
        <Link to={'/setpw'}>
        <button
            type='button'
            className='rounded w-full py-4 px-4 text-lg font-bold text-center bg-ppBlue my-6 text-ppWhite'
          >
            이메일 보내기
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FindPassword;
