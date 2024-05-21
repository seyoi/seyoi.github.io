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
        <ul className="my-5">
          <li className="flex px-2 py-4 border-t border-solid border-slate-300 justify-between">
            <Link to={'/admin/meetingname/meetinguserlist'} className="flex">
              <span className="block w-14 h-14 mr-2 bg-slate-200">
                <img src="" alt="" />
              </span>
              <div className="px-1">
                <h3 className="mb-1 text-lg">모임 이름</h3>
                <p className="text-sm text-ppLightGray">모임 설명</p>
              </div>
            </Link>
            <ul className="flex">
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">신청자 수</h4>
                <span className="block text-sm text-ppLightGray">00명</span>
              </li>
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">일정확인</h4>
                <span className="block text-sm text-ppLightGray">00명</span>
              </li>
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">진행상태</h4>
                <span className="block text-sm text-ppLightGray">진행 중</span>
              </li>
            </ul>
          </li>
          <li className="flex px-2 py-4 border-t border-solid border-slate-300 justify-between">
            <Link to={'/admin/meetingname/meetinguserlist'} className="flex">
              <span className="block w-14 h-14 mr-2 bg-slate-200">
                <img src="" alt="" />
              </span>
              <div className="px-1">
                <h3 className="mb-1 text-lg">모임 이름</h3>
                <p className="text-sm text-ppLightGray">모임 설명</p>
              </div>
            </Link>
            <ul className="flex">
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">신청자 수</h4>
                <span className="block text-sm text-ppLightGray">00명</span>
              </li>
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">일정확인</h4>
                <span className="block text-sm text-ppLightGray">00명</span>
              </li>
              <li className="px-4 text-center">
                <h4 className="mb-1 text-lg">진행상태</h4>
                <span className="block text-sm text-ppLightGray">진행 중</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminMeetingList;
