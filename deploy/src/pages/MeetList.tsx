// import axios from 'axios';
// import { useEffect } from 'react';
import Card from '../components/common/Card';

function MeetList() {
  const dummyList = [
    { id: 1, title: 'title1', description: 'description1' },
    { id: 1, title: 'title2', description: 'description2' },
    { id: 1, title: 'title3', description: 'description3' },
  ];
  // useEffect(() => {
  //   const fetchMeetList = async () => {
  //     try {
  //       const res = await axios.get('');
  //       console.log(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // }, []);
  return (
    <>
      {' '}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">모임 둘러보기</h2>
        <br />
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dummyList.map((item) => (
            <div key={item.id} className="w-full">
              <Card title={item.title} content={item.description} info="info" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MeetList;
