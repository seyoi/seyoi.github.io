import BtnMedium from '../../components/common/buttons/BtnMedium';
import Checkbox from '../../components/common/forms/Checkbox';
import Input from '../../components/common/forms/Input';
import Selectbox from '../../components/common/forms/Selectbox';
import AdminNav from '../../layouts/AdminNav';

function MessageSetting() {
  const StateOPTIONS = [
    { value: '신청완료', name: '입금완료' },
    { value: '참여중', name: '참여중' },
    { value: '노쇼/환불', name: '노쇼/환불' },
    { value: '마무리안내', name: '마무리안내' },
    { value: '기타', name: '기타' },
  ];
  const MessageOPTIONS = [
    { value: '신청안내', name: '신청안내' },
    { value: '입금안내', name: '입금안내' },
    { value: '일정안내', name: '일정안내' },
    { value: '노쇼/환불 안내', name: '노쇼/환불 안내' },
    { value: '챌린지 안내', name: '챌린지 안내' },
    { value: '마무리 안내', name: '마무리 안내' },
  ];

  return (
    <div className="SideNavCont">
      <AdminNav />
      <div className="container p-8">
        <div className="flex py-6 px-4">
          <span className="w-14 h-14 mx-2 my-3 bg-slate-200">
            <img src="" alt=""/>
          </span>
          <div className="p-2">
            <h2 className="text-xl font-bold">모임 이름</h2>
            <p className="mt-1 text-s text-ppGray">모임 설명이 들어갑니다.</p>
          </div>
        </div>
        <div className="px-2 py-8">
          <h3 className="mt-4 mb-5 text-lg font-bold">일정별 자동 안내 예약 설정</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <Checkbox></Checkbox>
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    상태
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    안내메세지
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    발송일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    안내문구
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    발송완료여부
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    발송성공
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    발송실패
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm">
                    <Checkbox></Checkbox>
                  </td>
                  <td className="p-2 text-sm">
                    <Selectbox options={StateOPTIONS} />
                  </td>
                  <td className="p-2 text-sm">
                    <Selectbox options={MessageOPTIONS} />
                  </td>
                  <td className="p-2 text-sm">
                    <Input name="memo" id="memo" placeholderText="비고" />
                  </td>
                  <td className="p-2 text-sm">
                    <Input name="memo" id="memo" placeholderText="비고" />
                  </td>
                  <td className="p-2 text-sm">완료</td>
                  <td className="p-2 text-sm">20명</td>
                  <td className="p-2 text-sm">5명</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 pt-6 pb-4 text-right">
          <BtnMedium bgColor={'bg-ppGray'} text={'예약 설정 저장'} />
        </div>
      </div>
    </div>
  );
}

export default MessageSetting;
