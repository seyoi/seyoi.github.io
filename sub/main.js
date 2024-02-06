
let mbtis = {
    'E': 0, 'I': 0,
    'S': 0, 'N': 0,
    'T': 0, 'F': 0,
    'J': 0, 'P': 0
}; 
const qArray = ['Your friends around you have all started investing in coins. Should I start too?', 'Suddenly, you crave a specific dish.', 'A promising cryptocurrency has been listed. In this situation, what would you do?', 'The cryptocurrency I bought is increasing in value. What do you do?',
            'In a social gathering where you meet new people:', 'If I can form a team myself:', 'Your friend criticizes the stock company you invested in. Your reaction?', 'When a taxi driver keeps talking to you during the ride:', 'The day before a 2-night, 3-day trip:',
            'Your friend\'s land investment tripled in value.', 'When a waiter recommends a new dish at a restaurant:', 'If you suddenly win 1 billion won in the lottery:'];
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
// aDOM.style.border = '1px solid black';
// aDOM.style.height = '5rem';

const aDOM2 = document.getElementById('answer-container2');
// aDOM2.style.border = '1px solid black';
// aDOM2.style.height = '5rem';

let qArrayIndex = 0;

aDOM.innerHTML = `<label id='first-label'> ${aArray[qArrayIndex][0]}</label><input type='radio' value='test' class='acon' style='display:none;'>`
aDOM2.innerHTML = `<label id='second-label'> ${aArray[qArrayIndex][2]} </label><input type='radio' value='test' class='acon' style='display:none;'>`

const firstLabel = document.getElementById('first-label')
const secondLabel = document.getElementById('second-label')
const bar = document.getElementById('bar');
let per = 10;
let increaseRate = 100/aArray.length;

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


anal.addEventListener('click',function(){
    
setTimeout(function(){
    console.log('3sec...');
    location.href = 'result.html';

},1000)
bar.style.width = per+'%';

// resultDOM.textContent = `Your investment style is ${result}`;
// anal.style.display = 'none';


});
let currQIndex = 0;
qDOM.innerHTML = `<p>${qArray[currQIndex]}</p>`;





const nextQ = function(e){
    currQIndex++;
    
    firstLabel.textContent = aArray[qArrayIndex][0];
    secondLabel.textContent = aArray[qArrayIndex][2];

    qDOM.innerHTML = `<p>${qArray[currQIndex]}</p>`;

const targetText = e.target.textContent;


for( let i= 0; i < aArray.length; i++){
    const innerIndex = aArray[i];
    for ( let j = 0; j< innerIndex.length; j++){
        if (innerIndex[j] === targetText){
            let mbti = innerIndex[j+1];
            for(k=0; k<mbtiKeys.length; k++){
                if( mbtiKeys[k] === mbti ){
                    mbtis[mbti]++;
                    console.log(mbtis);
                }
            }
        }
        
    }
    }

    bar.style.width = per+'%';
    per = per + increaseRate;

    qArrayIndex++;

   if(qArrayIndex === qArray.length-1){
        
        bar.style.width = '100%';
       
        for(i = 0; i< mbtiKeys.length; i+=2){
            const key1 = mbtiKeys[i];
            const key2 = mbtiKeys[i+1];
            result.push(mbtis[key1]>mbtis[key2] ? key1:key2);
    
           }
        qArrayIndex = 0;
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
        

   }


  
}


aDOM.addEventListener('click',nextQ);
aDOM2.addEventListener('click',nextQ);




