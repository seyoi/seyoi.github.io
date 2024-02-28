import React from 'react';
import './p9.css'
const P9 = () => {
  return (
    <div className="p9">
      <div className="video">
        <div className="video-player">
          <iframe
            width="100%"
            height="100vh"
            src="https://www.youtube.com/embed/JvFK-bvZxTQ"  // YouTube 동영상의 임베드 링크를 사용합니다.
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default P9;
