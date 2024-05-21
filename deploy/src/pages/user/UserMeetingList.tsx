import { Link } from 'react-router-dom';
// import Checkbox from '../../components/Common/forms/Checkbox';
// import Input from '../../components/Common/forms/Input';
// import Selectbox from '../../components/Common/forms/Selectbox';
import UserNav from '../../layouts/UserNav';

// const StateOPTIONS = [
//   { value: '신청완료', name: '신청완료' },
//   { value: '참여중', name: '참여중' },
//   { value: '노쇼/환불', name: '노쇼/환불' },
//   { value: '마무리안내', name: '마무리안내' },
//   { value: '기타', name: '기타' },
// ];
// const MessageOPTIONS = [
//   { value: '신청안내', name: '신청안내' },
//   { value: '입금안내', name: '입금안내' },
//   { value: '일정안내', name: '일정안내' },
//   { value: '노쇼/환불안내', name: '노쇼/환불안내' },
//   { value: '챌린지 안내', name: '챌린지 안내' },
//   { value: '마무리 안내', name: '마무리 안내' },
// ];

// const tableHeader: string[] | any = [
//   <Checkbox></Checkbox>,
//   '상태',
//   '안내메세지',
//   '발송일',
//   '안내문구',
//   '발송완료여부',
//   '발송성공',
//   '발송실패',
// ];

// const tableCell: any = [
//   [
//     <Checkbox></Checkbox>,
//     <Selectbox options={StateOPTIONS}></Selectbox>,
//     <Selectbox options={MessageOPTIONS}></Selectbox>,
//     <Input></Input>,
//     <Input></Input>,
//     '완료',
//     '2000명',
//     '3000명',
//   ],
// ];

function UserMeetingList() {
  return (
    <div className="SideNavCont">
      <UserNav />
      <div className="container p-8">
        <div className="flex px-2 py-4 justify-between">
          <h2 className="text-xl font-medium">내가 참여 중인 모임 목록</h2>
        </div>
        <ul className="my-5">
          <li className="flex px-2 py-4 border-t border-solid border-slate-300 justify-between">
            <Link to={'/'} className="flex">
              <span className="block w-14 h-14 mr-2 bg-slate-200">
                <img src="" alt="" />
              </span>
              <div className="px-1">
                <h3 className="mb-1 text-lg">모임 이름</h3>
                <p className="text-sm text-ppLightGray">모임 설명</p>
              </div>
            </Link>
          </li>
          <li className="flex px-2 py-4 border-t border-solid border-slate-300 justify-between">
            <Link to={'/'} className="flex">
              <span className="block w-14 h-14 mr-2 bg-slate-200">
                <img src="" alt="" />
              </span>
              <div className="px-1">
                <h3 className="mb-1 text-lg">모임 이름</h3>
                <p className="text-sm text-ppLightGray">모임 설명</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserMeetingList;
