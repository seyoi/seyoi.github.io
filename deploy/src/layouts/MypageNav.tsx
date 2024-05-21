import { Link } from 'react-router-dom'

function MypageNav() {
  return (
    <div>
      <nav>
        <ul className="py-7 px-5">
          <li className="text-ppBlack text-2xl font-bold py-5">마이페이지</li>
          <li className="list-none text-ppGray text-lg font-normal leading-10 hover:text-ppBlue">
            <Link to={'/'}>관리자 프로필 설정</Link>
          </li>
          <li className="list-none text-ppGray text-lg font-normal leading-10 hover:text-ppBlue">
            <Link to={'/'}>개인정보 변경</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MypageNav