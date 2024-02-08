
const mbtis = {
    'E': 0, 'I': 0,
    'S': 0, 'N': 0,
    'T': 0, 'F': 0,
    'J': 0, 'P': 0
}; 
const qArray = [
    'When considering an investment opportunity, do you:',
    'In your investment strategy, do you prefer:',
    'When faced with a loss in your investment, do you:',
    'Are you more likely to:',
    'When researching an investment opportunity, do you:',
    'In your investment approach, do you:',
    'When discussing investment ideas with others, do you:',
    'In volatile market conditions, do you:',
    'Are you more inclined to:',
    'When assessing an investment opportunity, do you:',
    'In your investment journey, do you:',
    'When discussing investment strategies, do you:'
];

const aArray = [
    ['a) Carefully analyze the financial statements and market trends before making a decision?', 'T', 
     'b) Trust your instincts and follow your intuition about the potential success of the investment?', 'I'], 

    ['a) Diversifying your portfolio across various industries and asset classes for stability?', 'S', 
     'b) Concentrating your investments in a few select sectors or companies for higher potential returns?', 'N'],

    ['a) Stay calm and assess the situation rationally, looking for opportunities to recover?', 'T', 
     'b) Feel anxious or distressed, considering selling off investments to cut losses?', 'F'],

    ['a) Stick to a long-term investment plan and avoid frequent buying and selling?', 'J', 
     'b) Actively manage your portfolio, buying and selling based on short-term market movements?', 'P'],

    ['a) Conduct thorough due diligence, analyzing financial metrics and industry dynamics?', 'S', 
     'b) Rely on expert opinions and recommendations from trusted sources to guide your decision?', 'N'],

    ['a) Prefer conservative investments with lower risk and steady returns?', 'J', 
     'b) Seek out high-risk, high-reward opportunities with the potential for significant gains?', 'P'],

    ['a) Enjoy sharing your research and insights to help others make informed decisions?', 'E', 
     'b) Keep your investment strategies private, trusting your own judgment above all else?', 'I'],

    ['a) Stay disciplined and stick to your investment strategy despite market fluctuations?', 'J', 
     'b) React emotionally to market swings, considering panic selling or impulsive buying?', 'P'],

    ['a) Invest in established companies with a proven track record of performance and stability?', 'S', 
     'b) Explore emerging industries or startups with disruptive potential and growth opportunities?', 'N'],

    ['a) Focus on quantitative analysis, evaluating metrics like P/E ratio and cash flow?', 'T', 
     'b) Consider qualitative factors like brand reputation and market positioning in your evaluation?', 'F'],

    ['a) Seek advice from financial professionals and follow established investment principles?', 'S', 
     'b) Trust your own judgment and intuition to make investment decisions independently?', 'N'],

    ['a) Prefer conservative approaches that prioritize capital preservation over aggressive growth?', 'J', 
     'b) Advocate for bold strategies that aim for maximum returns, even if they come with higher risk?', 'P']
];

const qDOM = document.getElementById('question-container');
const aDOM = document.getElementById('answer-container');
const aDOM2 = document.getElementById('answer-container2');
const bar = document.getElementById('bar');
const mbtiKeys = Object.keys(mbtis);
const mbtiValues = Object.values(mbtis);
const wrapper = document.getElementById('wrapper');
const resultDOM = document.getElementById('result-container');
const result = [];
let per = 10;
let increaseRate = 100/aArray.length;
let currIndex = 0;
const maxIndex = 11;
qDOM.innerHTML = `<p>${qArray[currIndex]}</p>`;
aDOM.innerHTML = `<label id='first-label'> ${aArray[currIndex][0]}</label><input type='radio' value='test' class='acon' style='display:none;'>`;
aDOM2.innerHTML = `<label id='second-label'> ${aArray[currIndex][2]} </label><input type='radio' value='test' class='acon' style='display:none;'>`;

const firstLabel = document.getElementById('first-label');
const secondLabel = document.getElementById('second-label');
firstLabel.textContent = aArray[currIndex][0];
secondLabel.textContent = aArray[currIndex][2];

const nextQ = function(e){
    bar.style.width = per+'%';
    per = per + increaseRate;
    const targetText = e.target.textContent;
    if (currIndex < qArray.length-1){
        for( let i= 0; i < aArray.length; i++){
        const innerIndex = aArray[i];
        
        for ( let j = 0; j< innerIndex.length; j++){
                if (innerIndex[j] === targetText){
                    let mbti = innerIndex[j+1];
                    
                    for( k=0; k < mbtiKeys.length; k++){
                        if( mbtiKeys[k] === mbti ){
                            mbtis[mbti]++;
                            
                        };
        

                        }
                    }
                }
                
            }
    currIndex++;  
    firstLabel.textContent = aArray[currIndex][0];
    secondLabel.textContent = aArray[currIndex][2];
    qDOM.textContent = qArray[currIndex];  
    } else {
        console.log('last question!');
        currIndex++;
    }
   if(currIndex === qArray.length ){
        for( let i= 0; i < aArray.length; i++){
            const innerIndex = aArray[i];
            for ( let j = 0; j< innerIndex.length; j++){
                if (innerIndex[j] === targetText){
                    let mbti = innerIndex[j+1];
                    for( k=0; k < mbtiKeys.length; k++){
                        if( mbtiKeys[k] === mbti ){
                            mbtis[mbti]++;
                        };
                    }
                }
            }
            
        }
            bar.style.width = '100%';
            for(i = 0; i< mbtiKeys.length; i+=2){
                const key1 = mbtiKeys[i];
                const key2 = mbtiKeys[i+1];
                result.push(mbtis[key1]>mbtis[key2] ? key1:key2);
        
            }
            currIndex = 0;
            qDOM.style.display = 'none';
            wrapper.style.display = 'none';
            
            
            console.log(`Your type is ${result}`);
            localStorage.clear();
            localStorage.setItem('result',`${result}`);
            showLoadingScreen();
            setTimeout(function(){
                location.href = 'result.html';
                
            },3000)

            return;

        }
        
        
    }

aDOM.addEventListener('click',nextQ);
aDOM2.addEventListener('click',nextQ);


let isLoading = false;

const showLoadingScreen = () => {
  const loadingScreen = document.createElement('div');
  loadingScreen.classList.add('loading');
  loadingScreen.textContent = 'Analysing...';
  document.body.appendChild(loadingScreen);
};

function kakaoLink(){
    Kakao.Link.sendDefault({
        objectType : 'feed',
        content : {
            title : 'MY INVESTMENT TYPE CHECK',
            description : 'Check your investment style!',
            imageUrl : 'img.png',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        },
        social : {
            likeCount : 0,
            commentCount : 0,
            sharedCount : 0,
        },
        buttons : [{
            title : 'web',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        },
        {
            title: 'app',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        }],
    })
}


function kakaoLink(){
    Kakao.Link.sendDefault({
        objectType : 'feed',
        content : {
            title : 'MY INVESTMENT TYPE CHECK',
            description : 'Check your investment style!',
            imageUrl : 'img.png',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        },
        social : {
            likeCount : 0,
            commentCount : 0,
            sharedCount : 0,
        },
        buttons : [{
            title : 'web',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        },
        {
            title: 'app',
            link : {
                mobileWebUrl : 'https://imexer.github.io/index.html',
                webUrl : 'https://imexer.github.io/index.html',

            },
        }],
    })
}
