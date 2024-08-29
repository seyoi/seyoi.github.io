import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase 구성 설정
const firebaseConfig = {
  apiKey: "AIzaSyCbVgsaQuEdjuHR96YygHc32AEPB-r2xn4",
  authDomain: "hanna-9d44a.firebaseapp.com",
  projectId: "hanna-9d44a",
  storageBucket: "hanna-9d44a.appspot.com",
  messagingSenderId: "209213557854",
  appId: "1:209213557854:web:abbc5b0753280bd5ae78cf",
  measurementId: "G-YYXZG13W7R"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Analytics 초기화 (선택사항)
const analytics = getAnalytics(app);

// Firestore 데이터베이스 인스턴스 가져오기
const db = getFirestore(app);


export { db, analytics };
