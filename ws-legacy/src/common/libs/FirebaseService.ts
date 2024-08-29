import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  ref,
  getStorage,
  uploadBytes,
  uploadString,
  type FirebaseStorage,
} from "firebase/storage";
import { generateUUID } from "../utils/generateUUID";
import { getRandomIndex } from "../utils/getRandomIndex";
import type { FirebaseConfig } from "../types/FirebaseConfig";

const imageStorateURLPrefix = "https://storage.googleapis.com/image-dcty/";

class FirebaseService {
  #config: FirebaseConfig;
  #app: FirebaseApp;
  #storage: FirebaseStorage;
  #imageStorage: FirebaseStorage;

  constructor() {
    this.#config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECDT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    this.#app = initializeApp(this.#config);
    this.#storage = getStorage(this.#app);
    this.#imageStorage = getStorage(this.#app, "gs://image-dcty");
  }

  getStorage() {
    return this.#storage;
  }

  getRandomAvatar() {
    return emojiList[getRandomIndex(emojiList)];
  }

  async uploadImageByDataUrl({
    filePath,
    dataUrl,
  }: {
    filePath: string;
    dataUrl: string;
  }) {
    try {
      const filePathWithUUID = `${filePath}/${generateUUID()}/${new Date().getTime().toString()}`;
      const imageRef = ref(this.#imageStorage, filePathWithUUID);
      const uploadResult = await uploadString(imageRef, dataUrl, "data_url");
      return imageStorateURLPrefix + uploadResult.metadata.fullPath;
    } catch (err) {
      throw `uploadImageByDataUrl: ${err}`;
    }
  }

  async uploadImageByFile({
    filePath,
    file,
  }: {
    filePath: string;
    file: File;
  }) {
    try {
      const filePathWithUUID = `${filePath}/${generateUUID()}/${new Date().getTime().toString()}`;
      const imageRef = ref(this.#imageStorage, filePathWithUUID);
      const uploadResult = await uploadBytes(imageRef, file);
      return imageStorateURLPrefix + uploadResult.metadata.fullPath;
    } catch (err) {
      throw `uploadImageByFile: ${err}`;
    }
  }
}

export const firebaseService = new FirebaseService();

const emojiList = [
  `${imageStorateURLPrefix}avatars/emojis/memoji-001.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-002.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-003.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-004.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-005.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-006.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-007.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-008.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-009.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-010.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-011.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-012.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-013.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-014.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-015.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-016.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-017.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-018.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-019.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-020.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-021.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-022.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-023.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-024.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-025.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-026.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-027.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-028.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-029.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-030.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-031.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-032.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-033.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-034.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-035.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-036.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-037.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-038.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-039.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-040.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-041.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-042.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-043.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-044.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-045.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-046.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-047.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-048.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-049.png`,
  `${imageStorateURLPrefix}avatars/emojis/memoji-050.png`,
];
