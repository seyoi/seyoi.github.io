import { useState, ChangeEvent } from 'react';

interface FormData {
  hasFee: boolean;
  feeAmount: string;
  selectedBank: string;
  accountNumber: string;
  refundPolicy: string;
}
interface FeeProps {
  onChange: (formData: FormData) => void;
}
const koreanBanks: string[] = [
  '국민은행',
  '우리은행',
  '신한은행',
  '하나은행',
  '기업은행',
  '농협은행',
  '외환은행',
  '카카오뱅크',
  '케이뱅크',
];

function Fee({ onChange }: FeeProps) {
  const [formData, setFormData] = useState<FormData>({
    hasFee: false,
    feeAmount: '',
    selectedBank: '',
    accountNumber: '',
    refundPolicy: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange(formData);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      hasFee: value === 'yes',
    }));
  };

  return (
    <div>
      {' '}
      <br /> <br />
      <div className="mb-4">
        <h3 className="text-xl font-bold">참여비</h3>
      </div>{' '}
      <div className="flex">
        {' '}
        <input
          className="mr-2"
          type="radio"
          name="hasFee"
          value="yes"
          checked={formData.hasFee}
          onChange={handleRadioChange}
        />
        <label className="mr-4" htmlFor="yes">
          있어요
        </label>
        <input
          className="mr-2"
          type="radio"
          name="hasFee"
          value="no"
          checked={!formData.hasFee}
          onChange={handleRadioChange}
        />
        <label htmlFor="no">없어요</label>
      </div>{' '}
      <br />
      <div className="p-10  bg-gray-100 rounded">
        {formData.hasFee && (
          <div>
            <input
              className="inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
              type="text"
              placeholder="금액"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleInputChange}
            />{' '}
            <br /> <br />
            <select value={formData.selectedBank} onChange={handleInputChange} name="selectedBank">
              <option value="">은행 선택</option>
              {koreanBanks.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>{' '}
            <br /> <br />
            <input
              className="inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
              type="text"
              placeholder="계좌번호"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />{' '}
            <br /> <br />
            <textarea
              className="inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
              placeholder="환불규정"
              name="refundPolicy"
              value={formData.refundPolicy}
              onChange={handleInputChange}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default Fee;
