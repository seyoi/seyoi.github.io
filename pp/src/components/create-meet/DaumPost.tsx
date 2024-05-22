import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';
import { Address } from 'react-daum-postcode/lib/loadPostcode';
export interface AddressProps {
  onChange: (address: string) => void;
}
function DaumPost({ onChange }: AddressProps) {
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';
    // let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      //   fullAddress = fullAddress.replace(localAddress, '');

      //   console.log(fullAddress);
      onChange(fullAddress);
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      className="ml-1 p-1 w-30 text-white bg-blue-600 inline-block overflow-hidden rounded"
      type="button"
      onClick={handleClick}
    >
      주소찾기
    </button>
  );
}

export default DaumPost;
