import Checkbox from '../../components/common/forms/Checkbox';
import Selectbox from '../../components/common/forms/Selectbox';
import BtnSmall from '../../components/common/buttons/BtnSmall';
import Input from '../../components/common/forms/Input';
import BtnMedium from '../../components/common/buttons/BtnMedium';
import AdminNav from '../../layouts/AdminNav';

function MeetingUserList() {
  const DepositStatus = [
    { value: '입금완료', name: '입금완료' },
    { value: '미입금', name: '미입금' },
  ];
  const StateOPTIONS = [
    { value: '참여중', name: '참여중' },
    { value: '노쇼/환불', name: '노쇼/환불' },
    { value: '마무리안내', name: '마무리안내' },
    { value: '기타', name: '기타' },
  ];
  const SortOPTIONS = [
    { value: '가입날짜 순', name: '가입날짜 순' },
    { value: '이름순', name: '이름순' },
  ];

  return (
    <div className="SideNavCont">
      <AdminNav />
      <div className="container p-8">
        <div className="flex py-6 px-4">
          <span className="w-14 h-14 mx-2 my-3 bg-slate-200">
            <img src="" alt="" />
          </span>
          <div className="p-2">
            <h2 className="text-xl font-bold">모임 이름</h2>
            <p className="mt-1 text-s text-ppGray">모임 설명이 들어갑니다.</p>
          </div>
        </div>
        <div className="px-2 py-8">
          <h3 className="mt-4 mb-5 text-lg font-bold">신청자 정보</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <Checkbox></Checkbox>
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이름
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    연락처
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이메일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    거주지
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    생년월일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    성별
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    입금확인
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    비고
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    참여자 선정
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm">
                    <Checkbox></Checkbox>
                  </td>
                  <td className="p-2 text-sm">이지혜</td>
                  <td className="p-2 text-sm">010-1234-1234</td>
                  <td className="p-2 text-sm">email@gmail.com</td>
                  <td className="p-2 text-sm">경상북도</td>
                  <td className="p-2 text-sm">2024/08/15</td>
                  <td className="p-2 text-sm">여</td>
                  <td className="p-2 text-sm">
                    <Selectbox options={DepositStatus} />
                  </td>
                  <td className="p-2 text-sm">
                    <Input name="memo" id="memo" placeholderText="비고" />
                  </td>
                  <td className="p-2 text-sm align-middle">
                    <BtnSmall bgColor={'bg-ppBlue me-2'} text={'승인'}></BtnSmall>
                    <BtnSmall bgColor={'bg-ppLightGray'} text={'거절'}></BtnSmall>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-2 py-8">
          <div className="flex justify-between items-center">
            <h3 className="mt-4 mb-5 text-lg font-bold">참여자 정보</h3>
            <Selectbox options={SortOPTIONS} />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <Checkbox></Checkbox>
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이름
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    연락처
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이메일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    거주지
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    생년월일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    성별
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    입금확인
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    비고
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    참여자 선정
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm">
                    <Checkbox></Checkbox>
                  </td>
                  <td className="p-2 text-sm">이지혜</td>
                  <td className="p-2 text-sm">010-1234-1234</td>
                  <td className="p-2 text-sm">email@gmail.com</td>
                  <td className="p-2 text-sm">경상북도</td>
                  <td className="p-2 text-sm">2024/08/15</td>
                  <td className="p-2 text-sm">여</td>
                  <td className="p-2 text-sm">
                    <Selectbox options={StateOPTIONS} />
                  </td>
                  <td className="p-2 text-sm">
                    <Input name="memo" id="memo" placeholderText="비고" />
                  </td>
                  <td className="p-2 text-sm align-middle">
                    <BtnSmall bgColor={'bg-ppBlue me-2'} text={'승인'}></BtnSmall>
                    <BtnSmall bgColor={'bg-ppLightGray'} text={'거절'}></BtnSmall>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 px-2 text-right">
              <BtnMedium bgColor={'bg-ppLightGray align-middle ml-2'} text={'블랙리스트 설정'} />
            </div>
          </div>
        </div>
        <div className="px-2 py-8">
          <div className="flex justify-between items-center">
            <h3 className="mt-4 mb-5 text-lg font-bold">모임원 블랙리스트 관리</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <Checkbox></Checkbox>
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이름
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    연락처
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이메일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    거주지
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    생년월일
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    성별
                  </th>

                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    비고
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    가입일자
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm">
                    <Checkbox></Checkbox>
                  </td>
                  <td className="p-2 text-sm">이지혜</td>
                  <td className="p-2 text-sm">010-1234-1234</td>
                  <td className="p-2 text-sm">email@gmail.com</td>
                  <td className="p-2 text-sm">경상북도</td>
                  <td className="p-2 text-sm">2024/08/15</td>
                  <td className="p-2 text-sm">여</td>
                  <td className="p-2 text-sm">
                    <Input name="memo" id="memo" placeholderText="비고" />
                  </td>
                  <td className="p-2 text-sm">2020.00.00</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 px-2 text-right">
              <BtnMedium bgColor={'bg-ppLightGray align-middle ml-2'} text={'블랙리스트 해제'} />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 pb-4 text-right">
          <BtnMedium bgColor={'bg-ppBlue mx-4'} text={'저장'} />
          <BtnMedium bgColor={'bg-ppGray'} text={'선택 인원 메일 발송'} />
        </div>
      </div>
    </div>
  );
}

export default MeetingUserList;
