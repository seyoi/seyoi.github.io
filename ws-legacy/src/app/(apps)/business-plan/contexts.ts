import { createContext } from "react";
import { BusinessPlanFile, BusinessPlanPrompt } from "./types";

export const BusinessPlanFilesContext = createContext<{
  files: BusinessPlanFile[];
  setFiles: React.Dispatch<React.SetStateAction<BusinessPlanFile[]>>;
}>({ files: [], setFiles: () => null });

export const ChochangepaePromptContext = createContext<{
  prompt: BusinessPlanPrompt;
  setPrompt: React.Dispatch<React.SetStateAction<BusinessPlanPrompt>>;
}>({
  prompt: {
    type: "chochangpae",
    chochangpae_a82443c5_794e_43e3_8dff_9a01d942e49c_item_name: "",
    chochangpae_72857563_4ccf_4add_bf69_681a14a6bcfb_item_desc: "",
    chochangpae_27a3b793_2954_493a_bd64_f753edbfa699_item_progress: "",
    chochangpae_520e6859_78e7_4ee4_aefb_21fb6d5cd324_item_bm: "",
    chochangpae_0021ccb0_7de9_4e89_a384_5053b58864df_item_plan: "",
  },
  setPrompt: () => null,
});

export const YechangepaePromptContext = createContext<{
  prompt: BusinessPlanPrompt;
  setPrompt: React.Dispatch<React.SetStateAction<BusinessPlanPrompt>>;
}>({
  prompt: {
    type: "yechangpae",
    yechangpae_ee19b046_d62f_439c_8b47_2ab6ca1e1e42_item_name: "",
    yechangpae_2271ffb1_780c_46b6_a8a7_641147aa461a_item_desc: "",
    yechangpae_3b10bd5a_7ef2_438f_8dad_b08e04aa9eba_item_progress: "",
    yechangpae_d461c789_32bf_4fae_ad6c_e033c6798bea_item_bm: "",
    yechangpae_b8f1f68e_4a7d_4e72_b421_4cf25db4a3a9_item_plan: "",
  },
  setPrompt: () => null,
});
