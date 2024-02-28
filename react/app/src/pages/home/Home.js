import React, { useState, useEffect } from 'react';
import projectsData from '../../constants/data.json';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // JSON 데이터를 상태에 설정합니다.
    setProjects(projectsData);
  }, []);


  return (
    <div className='item-wrapper'>
        {projects.map(project=>(
            <div className="item" key={project.id}>
             <img src={project.imgsrc} alt="" className="item-img" />  
             <a href={project.src} className="item-a">{project.title}</a> 
            </div>
        ))}
       
      
    </div>
  );
};

export default Home;
