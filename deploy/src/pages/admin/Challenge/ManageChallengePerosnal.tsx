import BtnMedium from '../../../components/common/buttons/BtnMedium';
import Checkbox from '../../../components/common/forms/Checkbox';
import Input from '../../../components/common/forms/Input';
import AdminNav from '../../../layouts/AdminNav';
import { Link } from 'react-router-dom';
// import BtnSmall from '../../../components/Common/buttons/BtnSmall';


function ManageChallengePersonal() {
  return (
    <div className="SideNavCont">
      <AdminNav />
      <div className="container">
        <div className="flex px-2 py-4 justify-between">
          <h2 className="text-xl font-medium">개인별 과제관리</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  번호
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  과제 설명
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  제출기한
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  제출
                </th>
                <th className="p-2 text-center uppercase tracking-wider text-gray-500">
                  <span className="inline-block overflow-hidden bg-ppBlue rounded align-middle">
                    <Link to={''} className="block py-1 px-2 text-white text-sm">
                      전체 다운로드
                    </Link>
                  </span>
                </th>
                <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  피드백 작성
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-sm">과제1</td>
                <td className="p-2 text-sm">사진을 올려주세요</td>
                <td className="p-2 text-sm">2024/08/15</td>
                <td className="p-2 text-sm">
                  <Checkbox></Checkbox>
                </td>

                <td className="p-2 text-sm text-center">
                  <span
                    className={`inline-block overflow-hidden bg-ppGray align-middle text-sm rounded`}
                  >
                    <Link
                      to={'/admin/challenge/personal'}
                      className="block py-1 px-2 text-white text-sm"
                    >
                      다운로드
                    </Link>
                  </span>
                </td>
                <td className="p-2 text-sm">
                  <Input name="memo" id="memo" placeholderText="피드백을 입력하는 곳입니다" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 pt-6 pb-4 text-right">
          <BtnMedium bgColor={'bg-ppGray'} text={'저장'} />
        </div>
      </div>
    </div>
  );
}

export default ManageChallengePersonal;
