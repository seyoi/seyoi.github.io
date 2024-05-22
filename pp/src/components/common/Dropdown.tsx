import { Link } from 'react-router-dom';

const Dropdown: React.FC = (): JSX.Element => (
    <ul className="absolute space-y-2 mt-5 bg-ppBlue text-ppWhite">
      <li>
        <Link to={'/user/meetinglist'} className="p-2 hover:text-ppBlack">
          내가 참여중인 모임
        </Link>
      </li>
      <li>
        <Link to={'/'} className="p-2 hover:text-ppBlack">
          내가 찜한 모임
        </Link>
      </li>
      <li>
        <Link to={'/'} className="p-2 hover:text-ppBlack">
          내가 찜한 모임장
        </Link>
      </li>
      <li>
        <Link to={'/'} className="p-2 hover:text-ppBlack">
          모든 모임 둘러보기
        </Link>
      </li>
    </ul>
  );
  

export default Dropdown;