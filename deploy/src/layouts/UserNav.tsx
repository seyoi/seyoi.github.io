import { Link } from 'react-router-dom'

function UserNav() {
  return (
    <>
       <nav>
        <ul className="py-7 px-4">
          <li className="text-ppBlack text-xl font-bold py-5">모임 참가하기</li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            <Link to={'/user/meetinglist'}>내가 참여 중인 모임</Link>
          </li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            내가 찜한 모임
          </li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            내가 찜한 모임장
          </li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            <Link to={'/allmeetinglist'}>모든 모임 둘러보기</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default UserNav