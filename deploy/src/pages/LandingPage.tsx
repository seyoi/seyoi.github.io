import Image1 from '../assets/logo/landing1.png';
import Image2 from '../assets/logo/landing2.png';
import CardImage from '../components/common/Card';

interface Event {
  imageSrc: string;
  name: string;
  date: string;
  description: string;
}

const events: Event[] = [
  {
    name: '커피 원데이 클래스',
    description: '커피를 좋아하는 사람들의 모임',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '드로잉 모임',
    description: '그림을 그려봐요',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '영화 평론 모임',
    description: '영화관람 좋아 하시죠?',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '문문문',
    description: '달과 별을 보러 갈까요?',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '영화연구',
    description: '영화관람 좋아하세요?',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '밴드 모임',
    description: '같이 악기연주 해봐요',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '영화 평론 모임',
    description: '영화관람 좋아 하시죠?',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
  {
    name: '문문문',
    description: '달과 별을 보러 갈까요?',
    date: '을지로, 2024. 4. 29',
    imageSrc: 'path_to_image',
  },
];

function renderItems(items: Event[]) {
  return items.map((item) => (
    <li key={item.name} className="col text-left items-center">
      <CardImage title="" width='full' content='card' info='card'/>
      <span className="text-sm text-bold">{item.name}</span> <br />
      <span className="text-sm">{item.description}</span> <br />
      <span className="text-sm">{item.date}</span>
    </li>
  ));
}

function LandingPage() {
  return (
    <div className='content'>
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
      <div className="w-full flex justify-center my-40">
        <div className="basis-1/3 mt-10 mx-10">
          <h1 className="text-3xl text-bold mt-10 text-right">
            출석과 챌린지를 <br /> 한눈에 확인하세요
          </h1>
          <p className="mt-2 text-bold text-right text-ppVeryLightGray">직관적인 디자인으로 보여드립니다.</p>
        </div>
        <div className="basis-2/3 mx-10">
          <CardImage title="" width='full' content='card' info='card'/>
        </div>
      </div>
      <div className="mt-10 mb-10">
        <h1 className="text-3xl text-center text-bold">
          다른 모임장들은 <br /> 이렇게 이용중이에요
        </h1>
      </div>
      <div className="flex flex-auto gab-4 mb-10 items-center justify-center">
        <ul className="mt-10 ml-2 grid grid-cols-8 gap-8">{renderItems(events)}</ul>
      </div>
    </div>
  );
}

export default LandingPage;
