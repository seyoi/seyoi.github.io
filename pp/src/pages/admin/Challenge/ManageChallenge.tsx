import BtnSmall from '../../../components/common/buttons/BtnSmall';
import AdminNav from '../../../layouts/AdminNav';
import { Link } from 'react-router-dom';


function ManageChallenge() {
  return (
    <div className="SideNavCont">
      <AdminNav />
      <div className="container">
        <div className="flex px-2 py-4 justify-between">
          <h2 className="text-xl font-medium">출결 및 과제 관리</h2>
          <span className="inline-block overflow-hidden bg-ppBlue rounded">
            <Link to={'/admin/challenge/edit'} className="block py-2 px-3 text-white">
              과제편집
            </Link>
          </span>
        </div>
        <div className="flex mt-4">
          <div className="overflow-x-auto w-1/2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이름
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    04/23
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    04/24
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    04/25
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    04/26
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm" rowSpan={2}>
                    이지혜
                  </td>
                  <td className="p-2 text-sm">
                    <BtnSmall bgColor={'bg-ppGray align-middle text-sm'} text={'결석'} />
                    <span className="block mt-3 text-sm">제출완료</span>
                  </td>
                  <td className="p-2 text-sm">
                    <BtnSmall bgColor={'bg-ppBlue align-middle text-sm'} text={'출석'} />
                    <span className="block mt-3 text-sm">미제출</span>
                  </td>
                  <td className="p-2 text-sm">
                    <BtnSmall bgColor={'bg-ppBlue align-middle text-sm'} text={'출석'} />
                    <span className="block mt-3 text-sm">미제출</span>
                  </td>
                  <td className="p-2 text-sm">
                    <BtnSmall bgColor={'bg-ppBlue align-middle text-sm'} text={'출석'} />
                    <span className="block mt-3 text-sm">미제출</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto w-1/2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    출석률
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    과제 달성도
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    과제확인
                  </th>
                  <th className="p-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    비고
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-sm">100%</td>
                  <td className="p-2 text-sm">100%</td>
                  <td className="p-2 text-sm">
                    <span
                      className={`inline-block overflow-hidden bg-ppBlue align-middle text-sm rounded`}
                    >
                      <Link
                        to={'/admin/challenge/personal'}
                        className="block py-1 px-2 text-white text-sm"
                      >
                        이동
                      </Link>
                    </span>
                  </td>
                  <td className="p-2 text-sm">개인사정으로 중도포기</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageChallenge;
