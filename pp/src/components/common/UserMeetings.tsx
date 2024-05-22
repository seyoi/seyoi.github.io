import { useContext, useEffect, useState } from 'react';
import { AuthContext, db } from '../../context/Auth';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Card from './Card';

function UserMeetings() {
  const { user } = useContext(AuthContext);
  const [userMeetings, setUserMeetings] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchUserMeetings = async () => {
      if (user) {
        try {
          const userMeetingsRef = collection(db, 'meetings');
          const q = query(userMeetingsRef, where('appliedUsers', 'array-contains', user.uid));
          const querySnapshot = await getDocs(q);
          const meetingsData = await Promise.all(
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
          setUserMeetings(meetingsData);
        } catch (error) {
          console.error('Error fetching user meetings: ', error);
        }
      }
    };

    fetchUserMeetings();
  }, [user]);

  return (
    <div>
      <div>
        <ul className="flex">
          {userMeetings.map((meeting: any) => (
            <>
              <div className="max-w-[300px] mb-5 mr-5">
                <Card
                  title={meeting.meetingName}
                  imageUrl={meeting.imgUrl}
                  content={meeting.meetingDescription}
                  info={meeting.address}
                  height={400}
                />{' '}
              </div>
            </>
          ))}{' '}
        </ul>
      </div>
    </div>
  );
}

export default UserMeetings;
