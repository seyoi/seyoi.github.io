import { Link } from 'react-router-dom';
// import CardImage from '../components/common/Card';
// import { useEffect } from 'react';
// import axios from 'axios';
// import Chip from '../components/create-meet/Chip';
import Image1 from '../assets/logo/landing1.png';
import Image2 from '../assets/logo/landing2.png';
// import CardImage from '../components/common/Card';

// interface Category {
//   name: string;
//   imageSrc: string;
//   altText: string;
// }

// interface Event {
//   imageSrc: string;
//   name: string;
//   date: string;
//   description: string;
// }

// const categories: Category[] = [
//   { name: '자기계발', imageSrc: 'path_to_image', altText: '자기계발' },
//   { name: '운동', imageSrc: 'path_to_image', altText: '운동' },
//   { name: '음악', imageSrc: 'path_to_image', altText: '음악' },
//   { name: '아웃도어', imageSrc: 'path_to_image', altText: '아웃도어' },
//   { name: '클래스/강의', imageSrc: 'path_to_image', altText: '클래스/강의' },
//   { name: '문화/예술', imageSrc: 'path_to_image', altText: '문화/예술' },
//   { name: 'N잡', imageSrc: 'path_to_image', altText: 'N잡' },
//   { name: '스터디', imageSrc: 'path_to_image', altText: '스터디' },
// ];

// const events: Event[] = [
//   {
//     name: '커피 원데이 클래스',
//     description: '커피를 좋아하는 사람들의 모임',
//     date: '을지로, 2024. 4. 29',
//     imageSrc: 'path_to_image',
//   },
//   {
//     name: '드로잉 모임',
//     description: '그림을 그려봐요',
//     date: '을지로, 2024. 4. 29',
//     imageSrc: 'path_to_image',
//   },
//   {
//     name: '영화 평론 모임',
//     description: '영화관람 좋아 하시죠?',
//     date: '을지로, 2024. 4. 29',
//     imageSrc: 'path_to_image',
//   },
//   {
//     name: '문문문',
//     description: '달과 별을 보러 갈까요?',
//     date: '을지로, 2024. 4. 29',
//     imageSrc: 'path_to_image',
//   },
// ];

// const renderItems = (items: Category[] | Event[]) => {
//   return items.map((item) => (
//     <li key={item.name} className="col text-left items-center">
//       <CardImage src={item.imageSrc} alt={item.altText || item.name} />
//       <span className="text-sm text-bold">{item.name}</span> <br />
//       {typeof item.date !== 'undefined' && (
//         <>
//           <span className="text-sm">{item.description}</span> <br />
//           <span className="text-sm">{item.date}</span>
//         </>
//       )}
//     </li>
//   ));
// };

const MainPage = () => {
  // useEffect(() => {
  //   const fetchMeetList = async () => {
  //     try {
  //       const res = await axios.get('api');
  //       const cards = res.data; //백엔드로부터 모임 리스트 데이터 받아서 가공하여 화면에 출력
  //     } catch (error) {
  //       console.error(`에러메시지: ${error}`);
  //     }
  //   };
  // }, []);
  return (
    <div className="content">
      {' '}
      <div className="flex flex-col w-full md:w-480 h-auto md:h-125 p-4 md:p-0">
        <div className="w-full md:w-107 h-auto md:h-45 bg-ppBlue text-center mt-2">
          <h1 className="mt-10 text-ppWhite text-4xl leading-tight">
            나의 모임 관리가 <br />
            쉽고, 편해지는 곳
          </h1>
          <p className="text-ppWhite mt-4 text-xl">
            클래스, 모임 관리를 효율적이고 간편하게 해드릴게요!
          </p>
          <br />{' '}
          <Link to="/user/meetinglist/meet-list">
            <button className="border rounded w-[150px] bg-white-500 p-5 mb-5 text-xl text-white">
              모임 둘러보기
            </button>
          </Link>{' '}
          <Link to="/createmeeting">
            <button className="border rounded w-[150px] bg-white-500 p-5 mb-5 text-xl text-white">
              모임 생성하기
            </button>
          </Link>{' '}
          <span className="mt-4 overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue"></span>{' '}
        </div>
        {/* <div className="flex flex-col mt-10 items-center justify-center">
          <ul className="mt-10 grid grid-cols-4 gap-4 [&_span]:text-ppGray">
            {renderItems(categories)}
          </ul>
          <div className="flex">
            <Chip name="운동" />
            <Chip name="자기계발" />
            <Chip name="아웃도어/여행" />
            <Chip name="독서/인문학" />
            <Chip name="음악/악기" />
            <Chip name="문화/예술" />
            <Chip name="스터디" />
            <Chip name="N잡" />
          </div>

          <span className="mt-10 overflow-hidden border border-solid border-ppVeryLightGray rounded-full hover:border-transparent hover:bg-ppBlue">
            {
              <Link
                to="/"
                className="block py-2 px-3 text-ppVeryLightGray hover:text-white font-['Pretendard']"
              >
                더 많은 카테고리 보기
              </Link>
            }
          </span>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center bg-[#d9d9d9]">
          <h2 className="mt-10 text-ppGray text-3xl font-bold text-center">곧 마감되는 모임</h2>
          <ul className="mt-10 ml-2 grid grid-cols-4 gap-4">{renderItems(events)}</ul>
          <h2 className="mt-10 text-ppGray text-3xl font-bold text-center">참여를 기다리는 모임</h2>
          <ul className="mt-10 ml-2 grid grid-cols-4 gap-4">{renderItems(events)}</ul>
          <h2 className="mt-10 text-ppGray text-3xl font-bold text-center">요즘 핫한 모임</h2>
          <ul className="mt-10 ml-2 grid grid-cols-4 gap-4">{renderItems(events)}</ul>
        </div>
        <div className="mt-10 items-center text-center">
          <ul className="flex gap-2 items-center justify-center">
            <li className="w-50 h-30 bg-ppWhite border border-solid border-ppBlack text-left">
              광고배너
            </li>
            <li className="border border-solid border-ppBlack text-left">광고배너</li>
          </ul>
        </div>
        <div className="mt-10 items-center text-center">
          <ul className="flex gap-2 text-center items-center justify-center">
            {cards.map((card)=>(
             <li>
             {card} 
             </li>
         ))}
          </ul>
        </div>
      </div> */}
        <div className="relative text-center">
          <img className="w-full mx-w-md mx-auto" src={Image1} alt="Landing Page1" />
          <h1
            className="text-ppWhite absolute text-6xl font-extrabold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ fontSize: '4vw' }}
          >
            간편한 모임관리 <br /> 지금 시작해보세요
          </h1>
          <span
            className="w-full text-ppWhite block text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ marginTop: '12vw', fontSize: '2vw' }}
          >
            클래스 모임 관리를 효율적이고 간편하게 해드릴게요!
          </span>
        </div>
        <div className="relative text-center">
          <img className="w-full mx-auto" src={Image2} alt="Landing Page2" />
          <h1
            className="text-ppWhite absolute text-6xl font-extrabold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full"
            style={{ fontSize: '4vw' }}
          >
            일일이 알림 보내기 <br /> 귀찮으시죠?
          </h1>
          <span
            className="w-full text-ppWhite block mt-12 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-3/4"
            style={{ marginTop: '12vw', fontSize: '2vw' }}
          >
            이메일 자동화로 번거로운 알림 설정을 최소화 해보세요
          </span>
        </div>
        {/* <div className="w-full flex justify-center my-40">
        <div className="basis-1/3 mt-10 mx-10">
          <h1 className="text-3xl text-bold mt-10 text-right">
            출석과 챌린지를 <br /> 한눈에 확인하세요
          </h1>
          <p className="mt-2 text-bold text-right text-ppVeryLightGray">
            직관적인 디자인으로 보여드립니다.
          </p>
        </div>
        <div className="basis-2/3 mx-10">
          <CardImage title="" width="full" content="card" info="card" />
        </div>
      </div> */}
        {/* <div className="mt-10 mb-10">
        <h1 className="text-3xl text-center text-bold">
          다른 모임장들은 <br /> 이렇게 이용중이에요
        </h1>
      </div> */}
        {/* <div className="flex flex-auto gab-4 mb-10 items-center justify-center">
        <ul className="mt-10 ml-2 grid grid-cols-8 gap-8">{renderItems(events)}</ul>
      </div> */}
      </div>
    </div>
  );
};

export default MainPage;
