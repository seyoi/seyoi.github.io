import axios from "axios";
import { useState } from "react"
// import { Link } from "react-router-dom";

interface UserInfo {
  email: string,
  name: string,
  password: string,
  passwordCheck: string,
  gender: string,
  year: string,
  month: string,
  day: string,
  region: string,
  emailAgreeCheck: number,
  marketingAgreeCheck: number,
}

function SignUp() {

const [userInfo, setUserInfo] = useState<UserInfo>({
  email: '',
  name: '',
  password: '',
  passwordCheck: '',
  gender: '',
  year: '',
  month: '',
  day: '',
  region: '',
  emailAgreeCheck: 0,
  marketingAgreeCheck: 0,
});

// const [isEmail, setIsEmail] = useState<boolean>(false);
// const [isPassword, setIsPassword] = useState<boolean>(false);
// const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);

  const yearList = Array.from({ length: 94 }, (_, i) => i + 1930);
  const monthList = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const dayList = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const regionList : string[] = [
    "서울특별시",
    "인천광역시",
    "대전광역시",
    "광주광역시",
    "대구광역시",
    "울산광역시",
    "부산광역시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도",
  ]

//비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
// 이메일 포멧: 첫글자(대소문자숫자), 중간(-_.대소문자숫자), @필수, .필수, 최상위 도메인 자리 2-3자
// const emailRegEx =
//   /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

// -> 영문, 숫자, 특수문자를 포함하여 8~16자의 비밀번호를 입력하세요.
// 입력하지않을때 비밀번호: 필수 정보입니다.
// const passwordRegex =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
//   /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handleSubmit = (event: any) => {
    event.preventDefault();
  }

  // const handleChangeEmail = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     event.preventDefault();
  //     const { value } = event.target;
  //     setUserInfo ({
  //       ...userInfo,
  //       email: value
  //     });
  //     if (!emailRegEx.test(value)) {
  //       console.log(
  //         "영문과 숫자 특수기호(-_.)를 조합하여 이메일 형식으로 작성해주세요.",
  //       );
  //       setIsEmail(false);
  //     } else {
  //       setIsEmail(true);
  //     }
  //   }, []
  // )

  // const handleChangePasswordCheck = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     event.preventDefault();
  //     const { value } = event.target;
  //     setUserInfo ({
  //       ...userInfo,
  //       passwordCheck: value
  //     });
  //     if (userInfo.password === value) {
  //       setIsPasswordCheck(true);
  //     } else {
  //       console.log(
  //         "비밀번호가 일치하지 않습니다.",
  //       );
  //       setIsPasswordCheck(false);
  //     }
  //   }, []
  // )

  const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserInfo ({
      ...userInfo,
      [name]: value
    })
  }

  const handleCheckbox = (event: any) => {
    const { name } = event.target;
    if (event.target.checked) {
      setUserInfo({ ...userInfo, [name]: 1 });
    } else {
      setUserInfo({ ...userInfo, [name]: 0 });
    }
  }

  // const handleClickSubmit = async(...UserInfo) => {
  // const user = new UserInfo();
  // user.push(userInfo.email);
  // user.append(userInfo.name);
  // user.append(userInfo.password);
  // user.append(userInfo.gender);
  // user.append(`${userInfo.year}-${userInfo.month}-${userInfo.day}`);
  // user.append(userInfo.region);
  // user.append(userInfo.emailAgreeCheck);
  // user.append(userInfo.marketingAgreeCheck);

  //   event.preventDefault();
  //   console.log('제출중');
  //   try{
  //     const response = await axios.post('http://175.45.203.93/3306', user,{
  //   headers: {
  //     'Content-Type' : "application/json",

  //   },
  // });
  // console.log(response.data);

  // } catch(error) {
  //      console.log(error)
  //    }
  // }

  const handleClickSubmit = (event: any) => {
    event.preventDefault();
    console.log('제출중');
    axios.post('https://175.45.203.93/3306',
    {
      mem_email: userInfo.email,
      mem_name: userInfo.name,
      mem_password: userInfo.password,
      mem_gender: userInfo.gender,
      mem_birth: `${userInfo.year}${userInfo.month}${userInfo.day}`,
      mem_address: userInfo.region,
      mem_emailCheck: userInfo.emailAgreeCheck,
      mem_marketingCheck: userInfo.marketingAgreeCheck,
    })
    .then((result) => {
      console.log('성공');
      console.log(result);
      // alert('회원가입 성공');
      // <Link to="/login" />;
    })
    .catch((error) => {
      // alert('회원가입 실패')
      console.log(error)
      console.log(error.response)
      console.log(userInfo)
    })
  }; 

  return (
    <div className='w-5/12 py-10 px-20 mx-auto my-40 text-center content-center'>
      <p className='mb-10 text-ppBlack text-4xl font-bold'>
      회원가입
      </p>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          id='email'
          name='email'
          placeholder='Email'
          maxLength={100}
          value={userInfo.email}
          onChange={handleInput}
          className='w-full py-4 px-4 my-4 mx-auto text-lg font-medium border border-solid border-gray-200 rounded'
          required
        />

        <input 
          type='text'
          id='name'
          name='name'
          placeholder='이름'
          maxLength={50}
          value={userInfo.name}
          onChange={handleInput}
          className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
          required
        />
        <input 
          type='password'
          id='password'
          name='password'
          placeholder='비밀번호'
          maxLength={100}
          value={userInfo.password}
          onChange={handleInput}
          className='w-full py-4 px-4 my-2 text-lg font-medium border border-solid border-gray-200 rounded'
          required
        />
        {/* {passwordErr ? 
          <p className="text-red-500 font-medium">최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자</p> 
          : null
        } */}
        <input 
          type='password'
          id='passwordCheck'
          name='passwordCheck'
          placeholder='비밀번호확인'
          maxLength={100}
          value={userInfo.passwordCheck}
          onChange={handleInput}
          className='w-full py-4 px-4 my-4 text-lg font-medium border border-solid border-gray-200 rounded'
          required
        />
        {/* {passwordErr ? 
          null 
          : <p className="text-red-500 font-medium">비밀번호가 일치하지 않습니다.</p>
        } */}

        <div className="flex font-medium items-center">
          <p className='py-4 px-4 my-2 text-lg  text-ppGray'>
            성별
          </p>
          <div className='flex px-4 text-lg text-ppGray'>
            <input 
              type='radio'
              id='male'
              name='gender'
              value='male'
              className='my-auto'
              onChange={handleInput}
            />
            <label htmlFor='male'className='py-4 px-4 my-2'>남</label>
            <input 
              type='radio'
              id='female'
              name='gender'
              value='femail'
              className='my-auto'
              onChange={handleInput}
            />
            <label htmlFor='female' className='py-4 px-4 my-2'>여</label>
          </div>
        </div>

        <div className='flex'>
          <p className='py-4 px-4 my-2 text-lg font-medium text-ppGray'>생년월일</p>
          <div>
            <select id='year' name='year' value={userInfo.year}
              onChange={handleInput}
              className='f-1 py-4 px-4 my-2 text-lg font-medium text-ppBlack'
              required
            >
              <option
                value=''
                className='text-center'
              >
                년
              </option>
              {yearList.map((year) =>
                <option key={year} value={year}>
                  {year}년
                </option>
              )}
            </select>
            <select id='month' name='month' value={userInfo.month}
              onChange={handleInput}
              className='f-1 py-4 px-4 my-2 text-lg font-medium text-ppBlack'
              required
            >
              <option
                value=''
                className='text-center'
              >
                월
              </option>
              {monthList.map((month) =>
                <option key={month} value={month}>
                  {month}월
                </option>
              )}
            </select>
            <select id='day' name='day' value={userInfo.day} 
              onChange={handleInput}
              className='f-1 py-4 px-4 my-2 text-lg font-medium text-ppBlack'
              required
            >
              <option
                value=''
                className='text-center'
              >
                일
              </option>
              {dayList.map((day) =>
                <option key={day} value={day}>
                  {day}일
                </option>
              )}
            </select>
          </div>
        </div>
          
        <div className="flex">
          <p className='py-4 px-4 my-2 text-lg font-medium text-ppGray'>
            지역
          </p>
          <select id='region' name='region' value={userInfo.region}
           onChange={handleInput}
            className='py-4 px-4 my-2 text-lg text-ppBlack'
            required
          >
            <option
              value=''
              className='text-center'
            >
              지역
            </option>
            {regionList.map((region) =>
              <option key={region} value={region}>
                {region}
              </option>
            )}
          </select>          
        </div>

        <div className="form-group pl-4 text-left text-ppVeryLightGray">
          <div className='flex'>
            <input
              type="checkbox"
              id="emailAgreeCheck"
              name="emailAgreeCheck"
              // checked={userInfo.emailAgreeCheck}
              onChange={handleCheckbox}
              required
              className='py-4 px-4 my-2 content-center'
            />
            <label htmlFor="emailAgreeCheck"
            className='p-2'>이메일 수신 동의</label>
          </div>
          <div className='flex'>
            <input
              type="checkbox"
              id="marketingAgreeCheck"
              name="marketingAgreeCheck"
              onChange={handleCheckbox}
            />
            <label htmlFor="marketingAgreeCheck"
            className='p-2'>마케팅 정보 수신 동의</label>
          </div>
        </div>

          <button
            type='button'
            className='rounded w-full py-4 px-4 text-lg font-bold text-center my-6 text-ppWhite bg-slate-300 hover:bg-ppBlue '
            onClick={handleClickSubmit}
          >
            제출
          </button>

      </form>   
    </div>

  )
}

export default SignUp