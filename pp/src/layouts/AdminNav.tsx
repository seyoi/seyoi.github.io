import { Link } from 'react-router-dom';

function AdminNav() {
  return (
    <>
      <nav>
        <ul className="py-7 px-4">
          <li className="text-ppBlack text-xl font-bold py-5">관리자 페이지</li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            <Link to={'/admin/meetingname/meetinguserlist'}>참가자 목록</Link>
          </li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            <Link to={'/admin/meetingname/messagesetting'}>안내메세지 관리</Link>
          </li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            출결 및 과제 관리
          </li>
        </ul>
      </nav>
    </>
  );
}

export default AdminNav;
