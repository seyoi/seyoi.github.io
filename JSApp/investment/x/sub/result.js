const mbti = [
    'ENFJ',
    'ENFP',
    'ENTJ',
    'ENTP',

    'ESFJ',
    'ESFP',
    'ESTJ',
    'ESTP',

    'INFJ',
    'INFP',
    'INTJ',
    'INTP',

    'ISFJ',
    'ISFP',
    'ISTJ',
    'ISTP',
]

const firebaseConfig = {
    apiKey: "AIzaSyBdfmSH87sn639a8IIGNFElKQ1ol61FR9I",
    authDomain: "project-flip-the-card.firebaseapp.com",
    databaseURL: "https://project-flip-the-card-default-rtdb.firebaseio.com",
    projectId: "project-flip-the-card",
    storageBucket: "project-flip-the-card.appspot.com",
    messagingSenderId: "849022846127",
    appId: "1:849022846127:web:52f9cb5ac1fa06cd9f805a",
    measurementId: "G-EWCWXDQ8G9"
};
// firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const mbtiNum = 0;

function downloadImg(){
    const storage = firebase.storage();
    // Storage에서 이미지 가져오기
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${mbti[mbtiNum]}.png`);

    // 이미지 다운로드 URL 가져오기
    imageRef.getDownloadURL().then(function (url) {
    // 이미지를 표시할 HTML 요소 선택
    const $img = document.getElementById('main_img');

    // 이미지 로드
    $img.src = url;
    }).catch(function (error) {
    console.error('이미지 가져오기 실패: ', error);
    });
}
function downloadData(){
    db.collection('mbti-category').doc(`${mbti[mbtiNum]}`).get().then((result) => {
        const $mainTitle = document.querySelector('.result_title');
        const $subTitle = document.querySelector('.sub_title');
        const $tendency = document.querySelector('.mbti_tendency');
        const $caution = document.querySelector('.mbti_caution');
        
        $mainTitle.innerHTML = result.data().main_title;
        $subTitle.innerHTML = result.data().sub_title;
        $tendency.innerHTML = result.data().tendency;
        $caution.innerHTML = result.data().caution;
    });    
}
downloadData();
downloadImg();


