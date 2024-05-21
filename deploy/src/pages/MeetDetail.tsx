import { useRef, useState } from 'react';
// import axios from 'axios';
import Chip from '../components/create-meet/Chip';
import CalendarComponent from '../components/common/Calendar';

import '@tabler/icons-react';
import { IconBrandInstagram, IconHeart, IconShare } from '@tabler/icons-react';
import BtnMedium from '../components/common/buttons/BtnMedium';
function MeetDetail() {
  const [formData, setFormData] = useState(null);
  //   const [review, setReview] = useState([]);
  //   const [qna, setQna] = useState([]);
  const reviews: any = [
    {
      no: 1,
      isReplied: false,
      content: '',
      writer: '',
      dateAdded: '',
    },
    {
      no: 2,
      isReplied: false,
      content: '',
      writer: '',
      dateAdded: '',
    },
    {
      no: 3,
      isReplied: false,
      content: '',
      writer: '',
      dateAdded: '',
    },
  ];
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);
  //   useEffect(() => {
  //     const fetchReview = async () => {
  //       try {
  //         const response = await axios.get('');
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //   }, [review]);
  //   useEffect(() => {
  //     const fetchQna = async () => {
  //       try {
  //         const res = await axios.get('');
  //         console.log(res.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //   }, [qna]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:3306/meet');
  //         console.log(response.data[0].formData);
  //         const parsedData = JSON.parse(response.data[0].formData);
  //         setFormData(parsedData);
  //         console.log(parsedData);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleSubmit = () => {
    console.log('submitted');
  };

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  const addReview = () => {
    console.log('addreview');
  };
  const addQna = () => {
    console.log('addQna');
  };
  return (
    <div className="p-4">
      <div>
        {formData && (
          <div className="mb-4">
            {Object.keys(setFormData).map((key) => (
              <p key={key} className="mb-1">
                {key}: {formData[key]}
              </p>
            ))}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-2">커뮤니티 이름</h2>
      <div className="intro flex">
        <h3 className="text-xl mb-4">모임 소개글</h3>
        <div className="text-right mb-4">
          <a href="#" className="text-blue-500">
            <IconBrandInstagram size={24} strokeWidth={1.5} color="purple" />
          </a>
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <Chip name="정기모임" />
        <Chip name="오프라인" />
        <Chip name="자기계발" />
      </div>

      <hr className="mb-4" />
      <div className="flex justify-between items-center mb-4">
        <div>주소</div>
        <div className="flex space-x-4">
          <IconHeart size={24} strokeWidth={1.5} color="red" />
          <IconShare size={24} strokeWidth={1.5} color="blue" />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold">호스트 프로필</h3>
      </div>
      <div>
        <p className="text-lg font-bold mb-2">모임일정</p>
        <div className="flex space-x-4">
          <div>
            <CalendarComponent />
          </div>
          <div className="schedule">
            <p>모임 일정</p>
            <p>장소</p>
            <p>인원</p>
            <p>참여비</p>
            <BtnMedium text="신청하기" bgColor="bg-blue-500" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="tab mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => scrollToSection(tab1Ref)}
            className=" border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            모임소개
          </button>
          <button
            onClick={() => scrollToSection(tab2Ref)}
            className=" border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            제공사항
          </button>
          <button
            onClick={() => scrollToSection(tab3Ref)}
            className=" border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            준비물
          </button>
          <button
            onClick={() => scrollToSection(tab4Ref)}
            className=" border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            진행순서 및 시간
          </button>
        </div>
        <hr className="border-b-2 border-gray-300" />
      </div>
      <div ref={tab1Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">모임소개</h3>
      </div>
      <div ref={tab2Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">제공사항</h3>
      </div>
      <div ref={tab3Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">준비물</h3>
      </div>
      <div ref={tab4Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">진행순서 및 시간</h3>
      </div>
      <div className="place mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">장소</p>
      </div>
      <div className="cancel-guide mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">취소 및 환불가이드</p>
      </div>
      <div className="review mt-8 p-4 bg-gray-100 rounded">
        {' '}
        <p className="text-lg font-bold mb-2">리뷰</p> <p>전체 13 건</p>
        {reviews.map((item: any) => (
          <div key={item.no}>{item.no}</div>
        ))}
        <button onClick={() => addReview()}>add review</button>
      </div>
      <div className="qna mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">문의</p>
        <p>전체 13 건</p>
        <button onClick={() => addQna()}>add qna</button>
      </div>
    </div>
  );
}

export default MeetDetail;
