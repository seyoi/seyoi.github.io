import { Link } from 'react-router-dom';

function AdminMeetingList() {
  return (
    <div className="SideNavCont">
      <nav>
        <ul className="py-7 px-4">
          <li className="text-ppBlack text-xl font-medium py-5">모임 관리하기</li>
          <li className="text-ppGray leading-10 hover:text-ppBlue">
            <Link to={'/admin/meetinglist'}>개설한 모임 목록</Link>
          </li>
        </ul>
      </nav>
      <div className="container p-8">
        <div className="flex px-2 py-4 justify-between">
          <h2 className="text-xl font-medium">개설한 모임 목록</h2>
          <span className={`inline-block overflow-hidden bg-ppBlue rounded`}>
            <Link to={'/createmeeting'} className="block py-2 px-3 text-white">
              새로운 모임 만들기
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminMeetingList;
