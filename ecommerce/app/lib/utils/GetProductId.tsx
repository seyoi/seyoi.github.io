import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import { collection, getDocs } from "firebase/firestore";

// 모든 제품 문서의 ID를 가져오는 함수
const getProductIds = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productIds = querySnapshot.docs.map((doc) => doc.id);
    return productIds;
  } catch (error) {
    console.error("Error fetching product IDs:", error);
    return [];
  }
};

export default getProductIds;
