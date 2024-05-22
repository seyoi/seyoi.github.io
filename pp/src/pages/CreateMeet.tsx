import { useState } from 'react';
import UploadImage from '../components/create-meet/UploadImage';
import MeetCategoryChips from '../components/create-meet/MeetCategory';
import OnelineInput from '../components/create-meet/OnelineInput';
import Editor from '../components/create-meet/Editor';
import Progress, { Item } from '../components/create-meet/Progress';
import SNSLinks, { SNSLinksData } from '../components/create-meet/SNSLinks';
import MeetDate from '../components/create-meet/MeetDate';
import MeetLocation from '../components/create-meet/MeetLocation';
import MemberData, { MemberDataFormData } from '../components/create-meet/MemberData';
import PickMethod from '../components/create-meet/PickMethod';
import Challenge from '../components/create-meet/Challenge';
import Fee from '../components/create-meet/Fee';

import BtnLarge from '../components/common/buttons/BtnLarge';
import { db, storage } from '../context/Auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface FormData {
  //   imageName: string;
  imageFile: File | null;
  imageDataURL: string;
  categoryIds: number[];
  meetingName: string;
  meetingDescription: string;
  providing: string;
  preps: string;
  editorContent: string;
  snsLinks: SNSLinksData;
  pickMethod: boolean;
  applyMotivation: string[];
  progressItems: Item[];
  memberData: MemberDataFormData | null;

  schedule: {
    type: string;
    date: string;
    time: string;
  };
  address: string;
  challenge: boolean;

  bank: {
    hasFee: boolean;
    feeAmount: string;
    selectedBank: string;
    accountNumber: string;
    refundPolicy: string;
  };
}

const uploadImage = async (imageFile: File): Promise<string> => {
  try {
    const storageRef = ref(storage, 'images/' + imageFile.name);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};
function CreateMeet() {
  const [formData, setFormData] = useState<FormData>({
    // imageName: '',
    imageFile: null,
    imageDataURL: '',
    categoryIds: [],
    meetingName: '',
    meetingDescription: '',
    providing: '',
    preps: '',
    editorContent: '',
    snsLinks: {
      instagram: '',
      youtube: '',
      other: '',
    },
    pickMethod: false,
    applyMotivation: [],
    progressItems: [
      { title: '', description: '', runningTime: '' },
      { title: '', description: '', runningTime: '' },
    ],
    memberData: {
      memberTextData: '',
      selectedChips: [],
      selectedNumber: 0,
      selectedNumberOption: '',
      selectedOption: '',
    },
    schedule: {
      type: '',
      date: '',
      time: '',
    },
    address: '',
    challenge: false,

    bank: {
      hasFee: false,
      feeAmount: '',
      selectedBank: '',
      accountNumber: '',
      refundPolicy: '',
    },
  });
  const [imgURL, setImgURL] = useState('');
  const handleImgUpload = async (imageFile: File) => {
    try {
      const url = await uploadImage(imageFile);
      setImgURL(url);
      console.log(url);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };
  //   const handleImageUpload = (imageFile: File, imageDataURL: string) => {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       //   imageName: imageFile.name,
  //       imageDataURL: imageDataURL,
  //       imageFile: imageFile,
  //     }));
  //   };
  const handleNameInputChange = (name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      meetingName: name,
    }));
  };
  const handleProvidingChange = (desc: string) => {
    setFormData((prevData) => ({
      ...prevData,
      providing: desc,
    }));
  };
  const handlePrepsChange = (preps: string) => {
    setFormData((prevData) => ({
      ...prevData,
      preps: preps,
    }));
  };
  const handleDescriptionInputChange = (description: string) => {
    setFormData((prevData) => ({
      ...prevData,
      meetingDescription: description,
    }));
  };
  const handleEditorContentChange = (content: string) => {
    setFormData((prevData) => ({
      ...prevData,
      editorContent: content,
    }));
    // console.log(content);
  };
  const handleProgressItemChange = (index: number, newItem: Item) => {
    setFormData((prevData) => {
      const newProgressItems = [...prevData.progressItems];
      newProgressItems[index] = newItem;
      return {
        ...prevData,
        progressItems: newProgressItems,
      };
    });
  };
  const handleSNSLinksChange = (snsLinks: SNSLinksData) => {
    setFormData((prevData) => ({
      ...prevData,
      snsLinks: snsLinks,
    }));
  };
  const handleDate = (schedule: { type: string; time: string; date: string }) => {
    console.log(schedule);
    setFormData((prevData) => ({
      ...prevData,
      schedule: schedule,
    }));
  };
  const handleAddress = (data: string) => {
    setFormData((prevData) => ({
      ...prevData,
      address: data,
    }));
  };
  const handleMemberData = (data: MemberDataFormData) => {
    console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      memberData: data,
    }));
  };
  const handleQuestionChange = (questions: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      applyMotivation: questions,
    }));
  };
  const handleChallenge = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      challenge: data,
    }));
  };
  const handleBank = (bankData: any) => {
    setFormData((prev) => ({
      ...prev,
      bank: bankData,
    }));
  };
  const handleSubmit = async () => {
    const emptyFields = [];

    if (formData.imageFile === null) emptyFields.push('이미지');
    if (formData.categoryIds.length === 0) emptyFields.push('카테고리');
    if (formData.meetingName.trim() === '') emptyFields.push('모임 이름');
    if (formData.meetingDescription.trim() === '') emptyFields.push('한줄 소개');
    if (formData.editorContent.trim() === '') emptyFields.push('에디터 내용');
    if (formData.providing.trim() === '') emptyFields.push('제공 사항');
    if (formData.preps.trim() === '') emptyFields.push('준비물');
    if (
      formData.progressItems.some(
        (item) =>
          item.title.trim() === '' ||
          item.description.trim() === '' ||
          item.runningTime.trim() === '',
      )
    )
      emptyFields.push('진행 상황');

    if (
      formData.snsLinks.instagram.trim() === '' &&
      formData.snsLinks.youtube.trim() === '' &&
      formData.snsLinks.other.trim() === ''
    )
      emptyFields.push('외부 링크');

    if (
      formData.schedule.type.trim() === '' ||
      formData.schedule.date.trim() === '' ||
      formData.schedule.time.trim() === ''
    )
      emptyFields.push('일정');

    if (formData.address.trim() === '') emptyFields.push('모임 장소');
    if (!formData.memberData || formData.memberData.memberTextData?.trim() === '')
      emptyFields.push('회원 정보');
    if (!formData.challenge) emptyFields.push('챌린지');
    if (!formData.bank.hasFee || formData.bank.selectedBank.trim() === '')
      emptyFields.push('은행 정보');
    // if (emptyFields.length > 0) {
    //   const fieldNames = emptyFields.join(', ');
    //   alert(`다음 필드에 입력이 필요합니다: ${fieldNames}`);
    //   return;
    // }

    const form = new FormData();
    form.append('re_image', formData.imageFile as File);
    form.append('re_category', JSON.stringify(formData.categoryIds));
    form.append('re_title', formData.meetingName);
    form.append('re_meetbrief', formData.meetingDescription);
    form.append('re_supplies', formData.providing);
    form.append('preparation_materials', formData.preps);
    form.append('content', formData.editorContent);
    form.append('out_links', JSON.stringify(formData.snsLinks));
    form.append('pick_method', formData.pickMethod ? 'True' : 'False');
    form.append('apply_motivation', JSON.stringify(formData.applyMotivation));
    form.append('process', JSON.stringify(formData.progressItems));
    form.append('memberData', JSON.stringify(formData.memberData));
    form.append('schedule', JSON.stringify(formData.schedule));
    form.append('address', formData.address);
    form.append('re_challenge', formData.challenge ? 'True' : 'False');
    form.append('re_payment', JSON.stringify(formData.bank));

    try {
      const docRef = await addDoc(collection(db, 'meetings'), {
        ...formData,
        imgURL: imgURL,
        createdAt: Timestamp.now(),
      });
      alert('모임이 생성되었어요!');
    } catch (error) {
      console.error(error);
      alert('문제가 생겼어요. 다시 시도해 주세요!');
    }
    // try {
    //   const response = await axios.post('https://101.79.9.36/planpeak/post/content_save/', form, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log(formData);
    //   console.log('서버 응답:', response.data);
    //   alert('데이터가 성공적으로 전송되었습니다.');
    // } catch (error) {
    //   console.error('데이터 전송 중 오류 발생:', error);
    //   alert('데이터 전송 중 오류가 발생했습니다.');
    // }
  };
  const handleCategory = (chips: any) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryIds: chips.map((chip: any) => chip.label),
    }));
  };

  return (
    <div className="p-4 mb-20">
      {/* <h1 className="text-xl">모임생성하기</h1> */}
      <h2 className="text-2xl font-bold mb-2">모임생성하기</h2> <br /> <br />
      <UploadImage onImageUpload={handleImgUpload} />
      <MeetCategoryChips onSelectedChipsChange={handleCategory} />
      <OnelineInput title={'모임 이름'} onInputChange={handleNameInputChange} />
      <OnelineInput title={'한줄 소개'} onInputChange={handleDescriptionInputChange} />
      <Editor onContentChange={handleEditorContentChange} />{' '}
      <OnelineInput title={'제공 사항'} onInputChange={handleProvidingChange} />
      <OnelineInput title={'준비물'} onInputChange={handlePrepsChange} />
      <Progress items={formData.progressItems} onItemChange={handleProgressItemChange} />{' '}
      <SNSLinks onSNSLinksChange={handleSNSLinksChange} />
      <MeetDate
        onScheduleChange={(schedule) => handleDate(schedule)}
        schedule={{
          type: '',
          date: '',
          time: '',
        }}
      />{' '}
      <MeetLocation onChange={handleAddress} />
      <MemberData onDataChange={(data) => handleMemberData(data)} />
      <PickMethod onQuestionChange={handleQuestionChange} />
      <Challenge onChange={handleChallenge} />
      <Fee onChange={handleBank} />
      {/* <button className="" onClick={handleSubmit}>
        submit
      </button> */}{' '}
      <br /> <br />
      <BtnLarge text="모임 생성" bgColor="bg-blue-500" onClick={handleSubmit} />
    </div>
  );
}

export default CreateMeet;
