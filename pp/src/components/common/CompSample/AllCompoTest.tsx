// import Card from '../Card';
// import PaginatedTable from '../PaginatedTable';
import BtnBorder from '../buttons/BtnBorder';
import BtnLarge from '../buttons/BtnLarge';
import BtnMedium from '../buttons/BtnMedium';
import BtnRound from '../buttons/BtnRound';
import BtnSmall from '../buttons/BtnSmall';
import Checkbox from '../forms/Checkbox';
import Input from '../forms/Input';
import Selectbox from '../forms/Selectbox';
import Textarea from '../forms/Textarea';

function AllCompoTest() {

  const OPTIONS = [
    { value: 'apple', name: '사과' },
    { value: 'banana', name: '바나나' },
    { value: 'orange', name: '오렌지' },
  ];
  
  // const dummyData: string[][] = [
  //   ["인영", "010-4222-6836", "inyoung@example.com"],
  //   ["찬영", "010-4222-6836", "chanyoung@example.com"],
  // ];

  return (
    <>
      <div>
        <Input name="" id="" placeholderText="입력하세요." />
        <Textarea name="" id="" placeholderText="입력하세요." colsNum="10" rowsNum="3" />
        <Checkbox name="hello" id="hi" />
        <Selectbox options={OPTIONS} />
        <BtnMedium bgColor={'bg-ppBlue'} text={'안녕하세요'} />
        <BtnMedium bgColor={'bg-ppGray'} text={'안녕하세요'} />
        <BtnMedium bgColor={'bg-ppMoveBlue'} text={'안녕하세요'} />
        <BtnSmall bgColor={'bg-ppBlue'} text={'안녕하세요'} />
        <BtnSmall bgColor={'bg-ppGray'} text={'안녕하세요'} />
        <BtnSmall bgColor={'bg-ppMoveBlue'} text={'안녕하세요'} />
        <BtnRound bgColor={'bg-ppBlue'} text={'안녕하세요'} />
        <BtnRound bgColor={'bg-ppGray'} text={'안녕하세요'} />
        <BtnLarge bgColor={'bg-ppBlue'} textColor={'text-ppBlue'} text={'안녕하세요'} />
        <BtnBorder bdColor={'border-ppBlue'} textColor={'text-ppBlue'} text={'안녕하세요'} />
      </div>
      {/* <div>
        <Card
          title={'title'}
          imageUrl={'/vite.svg'}
          width={300}
          height={420}
          rounded={10}
          content={'askjdfsaldkjflasjdflkaalksdfjklasdjflkdjsfsdjlkf'}
          info={'infolskdfjlkasjlfkjsdkfksdjfksdjfsdlkfjlkdjfkldj'}
        />
        <PaginatedTable data={dummyData} />
      </div> */}
    </>
  );
}

export default AllCompoTest;
