import { useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import CalendarComponent from '../components/common/Calendar';
// import BtnMedium from '../components/common/buttons/BtnMedium';
import '@tabler/icons-react';
import { IconBrandInstagram, IconHeart, IconShare } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentData, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext, db } from '../context/Auth';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

// import Login from '../components/common/Login';
// import Signup from '../components/common/Signup';
function MeetDetail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DocumentData | null>(null);
  //   const [review, setReview] = useState([]);
  //   const [qna, setQna] = useState([]);
  const { id } = useParams();

  //   const reviews: any = [
  //     {
  //       no: 1,
  //       isReplied: false,
  //       content: '',
  //       writer: '',
  //       dateAdded: '',
  //     },
  //     {
  //       no: 2,
  //       isReplied: false,
  //       content: '',
  //       writer: '',
  //       dateAdded: '',
  //     },
  //     {
  //       no: 3,
  //       isReplied: false,
  //       content: '',
  //       writer: '',
  //       dateAdded: '',
  //     },
  //   ];
  const tab1Ref = useRef(null);
  const tab2Ref = useRef(null);
  const tab3Ref = useRef(null);
  const tab4Ref = useRef(null);

  useEffect(() => {
    const fetchMeetData = async () => {
      if (!id) {
        console.error('No ID provided');
        return;
      }
      try {
        const docRef = doc(db, 'meetings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
          console.log(formData);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };

    fetchMeetData();
  }, [id]);
  useEffect(() => {
    const fetchImage = async () => {
      if (formData && formData.imgURL) {
        try {
          const storage = getStorage();
          const imgRef = ref(storage, formData.imgURL);
          const imgUrl = await getDownloadURL(imgRef);

          setFormData((prevData) => ({
            ...prevData,
            imgUrl: imgUrl,
          }));
        } catch (error) {
          console.error('Error fetching image: ', error);
        }
      }
    };

    fetchImage();
  }, [formData]);
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
  const { user } = useContext(AuthContext);

  const handleApply = async () => {
    try {
      if (!user) {
        console.error('User is not logged in');
        return;
      }
      if (!id || typeof id !== 'string') {
        console.error('Invalid ID provided');
        return;
      }
      console.log(user.uid);
      const userId = user.uid;
      const userRef = doc(db, 'users', userId);
      const meetingRef = doc(db, 'meetings', id);
      await updateDoc(userRef, {
        appliedMeetings: arrayUnion(id),
      });
      await updateDoc(meetingRef, {
        appliedUsers: arrayUnion(userId),
      });
      alert('신청이 완료 되었어요!');
      navigate('/user/meetinglist');
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  //   const addReview = () => {
  //     console.log('addreview');
  //   };
  //   const addQna = () => {
  //     console.log('addQna');
  //   };

  return (
    <div className="p-4">
      <div>
        <img src={formData?.imgUrl} alt="" />{' '}
      </div>
      <h2 className="text-2xl font-bold mb-2">{formData && formData.meetingName}</h2>
      <div className="intro flex">
        <h3 className="text-xl mb-4">{formData && formData.meetingDescription}</h3>
        <div className="text-right mb-4">
          <a href={formData && formData.snsLinks.instagram} className="text-blue-500">
            <IconBrandInstagram size={24} strokeWidth={1.5} color="purple" />
          </a>
        </div>
      </div>
      <div className="flex space-x-2 mb-4"></div>
      <hr className="mb-4" />
      <div className="flex justify-between items-center mb-4">
        <div>{formData && formData.address}</div>
        <div className="flex space-x-4">
          <IconHeart size={24} strokeWidth={1.5} color="red" />
          <IconShare size={24} strokeWidth={1.5} color="blue" />
        </div>
      </div>
      {/* <div className="mb-4">
        <h3 className="text-xl font-bold">호스트 프로필</h3>
      </div> */}
      <div>
        <p className="text-lg font-bold mb-2">모임일정</p>
        <div className="flex space-x-4">
          <div>{/* <CalendarComponent data={formData && formData.schedule.date} /> */}</div>
          <div className="schedule">
            <p>일정: {formData && formData.schedule.date}</p>
            <p>장소: {formData && formData.address}</p>
            <p>인원: {formData && formData.memberData.selectedNumber}</p>
            <p>참여비: {formData && formData.bank.feeAmount}</p>
            {/* <BtnMedium text="신청하기" bgColor="bg-blue-500" onClick={handleApply} /> */}
            <button
              className="w-full py-4 px-4 text-lg rounded bg-blue-500 text-white font-bold text-center"
              onClick={() => handleApply()}
            >
              신청 하기
            </button>{' '}
          </div>
        </div>
      </div>
      <div className="tab mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => scrollToSection(tab1Ref)}
            className="bg-gray-100 border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            모임 소개
          </button>
          <button
            onClick={() => scrollToSection(tab2Ref)}
            className="bg-gray-100 border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            제공사항
          </button>
          <button
            onClick={() => scrollToSection(tab3Ref)}
            className="bg-gray-100 border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            준비물
          </button>
          <button
            onClick={() => scrollToSection(tab4Ref)}
            className="bg-gray-100 border text-black py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            진행순서 및 시간
          </button>
        </div>
        <hr className="border-b-2 border-gray-300" />
      </div>
      <div ref={tab1Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">모임소개</h3>
      </div>{' '}
      {formData && formData.editorContent}
      <div ref={tab2Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">제공사항</h3>
      </div>{' '}
      {formData && formData.providing}
      <div ref={tab3Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">준비물</h3>
      </div>{' '}
      {formData && formData.preps}
      <div ref={tab4Ref} className="section mt-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-bold mb-2">진행순서 및 시간</h3>
      </div>{' '}
      {formData &&
        formData.progressItems.map((item: any, index: any) => (
          <div key={index}>
            {index + 1}
            <div>{item.title}</div>
            <div>{item.descriptiion}</div>
            <div>{item.runningTime}</div>
          </div>
        ))}
      <div className="place mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">장소</p>
      </div>
      {formData && formData.address}
      <div className="cancel-guide mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">취소 및 환불가이드</p>
      </div>{' '}
      {formData && formData.bank.refundPolicy}
      {/* <div className="review mt-8 p-4 bg-gray-100 rounded">
        {' '}
        <p className="text-lg font-bold mb-2">리뷰</p> <p>전체 13 건</p>
      </div>{' '}
      {reviews.map((item: any) => (
        <div key={item.no}>{item.no}</div>
      ))}
      <button onClick={() => addReview()}>add review</button> */}
      {/* <div className="qna mt-8 p-4 bg-gray-100 rounded">
        <p className="text-lg font-bold mb-2">문의</p>
        <p>전체 13 건</p>
      </div>{' '}
      <button onClick={() => addQna()}>add qna</button> */}
    </div>
  );
}

export default MeetDetail;
