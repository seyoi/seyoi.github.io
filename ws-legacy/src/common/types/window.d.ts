import { PlugIn } from "@/domains/ai-chatbot/types/plugIn.type";

export declare global {
  interface Window {
    Docenty: Docenty;
  }
}

class Docenty {
  params: {
    [key: string]: { plugInKey: string; hidePlugInButtonOnBoot?: boolena };
  }[];
  plugIn: PlugIn | null;
  bootOptions?: {
    hidePlugInButtonOnBoot?: boolean;
  };

  constructor({
    plugIn,
    hidePlugInButtonOnBoot,
  }: {
    plugIn: PlugIn;
    hidePlugInButtonOnBoot?: boolean;
  }) {
    this.plugIn = plugIn;
    this.params = [];
    this.bootOptions = {
      hidePlugInButtonOnBoot,
    };
    if (hidePlugInButtonOnBoot) {
      this.hide();
      this.hideButton();
    }
  }

  show() {}

  hide() {}

  showButton() {}

  hideButton() {}
}
