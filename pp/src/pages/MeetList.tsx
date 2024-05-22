import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../context/Auth';
import Search from '../components/common/forms/Search';
import BtnLarge from '../components/common/buttons/BtnLarge';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

function MeetList() {
  const [meetList, setMeetList] = useState<any>([]);

  useEffect(() => {
    const fetchMeetList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'meetings'));
        const meetings = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            if (data.imgURL) {
              const storage = getStorage();
              const imgRef = ref(storage, data.imgURL);
              const imgUrl = await getDownloadURL(imgRef);
              return { id: doc.id, ...data, imgUrl };
            } else {
              return { id: doc.id, ...data };
            }
          }),
        );
        console.log(meetings);
        setMeetList(meetings);
      } catch (error) {
        console.error('Error fetching meetings: ', error);
      }
    };

    fetchMeetList();
  }, []);
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">모임 둘러보기</h2>
      <div className="flex justify-between items-center py-0 px-0 bg-gray-100 rounded-md mb-6">
        <Search />
      </div>
      <div className="grid grid-cols-6 gap-8 justify-center mb-8">
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#자기계발" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#운동" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#아웃도어/여행" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#독서/인문학" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#음악/악기" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#문화/예술" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#스터디" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#클래스/강의" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#N잡" />
        <BtnLarge textColor="text-ppLightGray" bgColor="bg-[#d9d9d9]" text="#기타" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meetList.map((item: any) => (
          <Link to={`/meet/${item.id}`} key={item.id} className="w-full">
            <Card
              title={item.meetingName}
              content={item.meetingDescription}
              imageUrl={item.imgURL}
              info=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MeetList;
