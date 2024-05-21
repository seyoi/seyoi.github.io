import AdminNav from '../../../layouts/AdminNav';
import { Link } from 'react-router-dom';

function EditChallenge() {
  return (
    <div className="SideNavCont">
      <AdminNav />
      <div className="container">
        <div className="flex px-2 py-4 justify-between">
          <h2 className="text-xl font-medium">과제편집</h2>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  번호
                </th>
                <th className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  과제설명
                </th>
                <th className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  제출기한
                </th>
                <th className="p-2 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  <span
                    className={`inline-block overflow-hidden bg-ppBlue align-middle text-sm rounded`}
                  >
                    <Link to={'/'} className="block py-1 px-2 text-white text-sm">
                      전체 다운로드
                    </Link>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-sm text-center">과제1</td>
                <td className="p-2 text-sm text-center">사진을 올려주세요</td>
                <td className="p-2 text-sm text-center">2024/08/15</td>
                <td className="p-2 text-sm text-center">
                  <span
                    className={`inline-block overflow-hidden bg-ppGray align-middle text-sm rounded`}
                  >
                    <Link to={'/'} className="block py-1 px-2 text-white text-sm">
                      다운로드
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditChallenge;
