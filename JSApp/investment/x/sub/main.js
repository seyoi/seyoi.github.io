
let mbtis = {
    'E': 0, 'I': 0,
    'S': 0, 'N': 0,
    'T': 0, 'F': 0,
    'J': 0, 'P': 0
}; 
const qArray = ['Everyone is on investing coins, Should I start too?', 'All of sudden i wanna grab some food', 'A promising cryptocurrency has been listed on stock market. In this situation, what would you do?', 'The coin I bought is increasing value. What do you do?',
            'In a social gathering where you meet new people:', 'If I can arrange my own team', 'Your friend criticizes the stock company you invested in. Your reaction?', 'When a taxi driver keeps talking to you during the ride:', 'The day before 3days trip:',
            'Your friends land value tripled', 'When a waiter recommends a new dish at a restaurant:', 'If you suddenly win 1 billion won in the lottery:'];
const aArray = [
    
    ['I need to build up basic knowledge!\'I\'ll search for information everywhere.', 'S', '\'The beginning is crucial!\'I\'ll start by buying some Ethereum.', 'N'], 
   
    ['Order it for delivery and enjoy it alone.', 'I', 'Look for a friend to share the meal.', 'E'],

    ['\'Follow the trend!\' I\'ll buy it right away.', 'S', '\'Stability is the key!\' I\'ll invest in a well-verified cryptocurrency.', 'N'],
    
    ['\'My judgment was right!\'I\'ll buy more at the increased price.', 'T', 'I\'ll sell it immediately to realize the profit.', 'F'],
    
    ['Share a lot of TMI and even make friends.', 'E', 'Feel overwhelmed about what to talk about.', 'I'], ['Definitely with highly skilled team members.', 'S', 'With team members I\'m close to or can synergize with.', 'N'], 
    
    ['How dare you criticize my company! I\'ll argue.', 'T', 'I\'ll join in and criticize with my friend.', 'F'],
    
    ['Engage in conversation until reaching the destination.', 'E', 'Briefly respond and subtly put on my earphones.', 'I'], 
    
    ['Check the reservation schedule once and go to sleep.', 'S', 'What kind of romance awaits?My imagination runs wild.', 'N'],
    
    ['It hurts a bit, but I acknowledge my friend\'s skill.', 'T', 'It was just luck.It doesn\'t matter if I lose everything.I\'ll go all in on cryptocurrency!!', 'P'], 
    
    ['Order a familiar dish rather than the new one.', 'S', 'Order the new dish.', 'N'],
    
    ['This is my money!\tI\'ll deposit it all.', 'J', 'It\'s unexpected money.Even if I lose it all,it doesn\'t matter.I\'ll go all in on cryptocurrency!!', 'P']

    ];

const qDOM = document.getElementById('question-container');
const aDOM = document.getElementById('answer-container');
const aDOM2 = document.getElementById('answer-container2');
const bar = document.getElementById('bar');
let per = 10;
let increaseRate = 100/aArray.length;
let currIndex = 0;

qDOM.innerHTML = `<p>${qArray[currIndex]}</p>`;
aDOM.innerHTML = `<label id='first-label'> ${aArray[currIndex][0]}</label><input type='radio' value='test' class='acon' style='display:none;'>`;
aDOM2.innerHTML = `<label id='second-label'> ${aArray[currIndex][2]} </label><input type='radio' value='test' class='acon' style='display:none;'>`;
const firstLabel = document.getElementById('first-label');
const secondLabel = document.getElementById('second-label');
firstLabel.textContent = aArray[currIndex][0];
secondLabel.textContent = aArray[currIndex][2];

const main = document.getElementById('main');
const mbtiKeys = Object.keys(mbtis);
const mbtiValues = Object.values(mbtis);
const analBtn = document.createElement('button');
const wrapper = document.getElementById('wrapper');
main.append(analBtn);
analBtn.id = 'anal';
const anal = document.getElementById('anal');
anal.style.display = 'none';
const resultDOM = document.getElementById('result-container');
const result = [];

const nextQ = function(e){

    bar.style.width = per+'%';
    per = per + increaseRate;
    const targetText = e.target.textContent;

    if (currIndex < 11 ){
        
        // firstLabel.textContent = aArray[currIndex][0];
        // secondLabel.textContent = aArray[currIndex][2];

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
            wrapper.style.display = 'none';

            const btnWrapper = document.createElement('div');
            anal.parentNode.insertBefore(btnWrapper,anal);
            btnWrapper.appendChild(anal);
            anal.style.display = 'block';
            anal.style.marginLeft = '0';
            anal.style.width = '100%';
            anal.style.padding = '1rem';
            anal.textContent = 'Analyzing...';
            anal.classList.add('animation');
            btnWrapper.classList.add('animation');
            
            qDOM.style.display = 'none';
            console.log(`Your type is ${result}`);
            localStorage.clear();
            localStorage.setItem('result',`${result}`);

            setTimeout(function(){
                location.href = 'result.html';
                
            },3000)

            return;

        }
        
        
    }

aDOM.addEventListener('click',nextQ);
aDOM2.addEventListener('click',nextQ);


Kakao.init('457888e49bbd52d9d5246812ad264e69');



 // 모달 열기 함수
 function openModal() {
    var modal = document.getElementById('shareModal');
    modal.style.display = 'block';

}

// 모달 닫기 함수
function closeModal() {
    var modal = document.getElementById('shareModal');
    modal.style.display = 'none';
}

// 링크 복사 함수
function copyLink() {
    var copyText = document.getElementById("shareLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    copyBtn.textContent = 'Copied!';
}