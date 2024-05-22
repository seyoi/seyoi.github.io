import { IconBrandInstagram, IconBrandYoutube, IconLink } from '@tabler/icons-react';
import { useState } from 'react';

export interface SNSLinksData {
  instagram: string;
  youtube: string;
  other: string;
}

interface SNSLinksProps {
  onSNSLinksChange: (links: SNSLinksData) => void;
}

function SNSLinks({ onSNSLinksChange }: SNSLinksProps) {
  const [instagramLink, setInstagramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [otherLink, setOtherLink] = useState('');

  const handleInputChange = (linkType: keyof SNSLinksData, value: string) => {
    switch (linkType) {
      case 'instagram':
        setInstagramLink(value);
        break;
      case 'youtube':
        setYoutubeLink(value);
        break;
      case 'other':
        setOtherLink(value);
        break;
      default:
        break;
    }

    const snsLinks: SNSLinksData = {
      instagram: linkType === 'instagram' ? value : instagramLink,
      youtube: linkType === 'youtube' ? value : youtubeLink,
      other: linkType === 'other' ? value : otherLink,
    };
    onSNSLinksChange(snsLinks);
  };

  const renderInputField = (label: string, placeholder: string, linkType: keyof SNSLinksData) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <span style={{ marginRight: '5px' }}>{label}</span>
      <input
        className="inline-block border border-solid border-ppVeryLightGray rounded overflow-hidden"
        type="text"
        placeholder={placeholder}
        value={
          linkType === 'instagram'
            ? instagramLink
            : linkType === 'youtube'
              ? youtubeLink
              : otherLink
        }
        onChange={(e) => handleInputChange(linkType, e.target.value)}
      />
    </div>
  );

  return (
    <div>
      {' '}
      <br /> <br />{' '}
      <div className="mb-4">
        <h3 className="text-xl font-bold">외부 링크</h3>
      </div>{' '}
      <IconBrandInstagram size={24} stroke={2} color="#E4405F" />
      {renderInputField('', 'Instagram link', 'instagram')}
      <IconBrandYoutube size={24} stroke={2} color="#FF0000" />
      {renderInputField('', 'Youtube link', 'youtube')}
      <IconLink size={24} stroke={2} color="#000000" />
      {renderInputField('', 'Other link', 'other')}
    </div>
  );
}

export default SNSLinks;
