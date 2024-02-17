/*
 * ❗️❗️ 필독 ❗️❗️
 * - 함수 블록 내부에만 작성해주세요.
 * - 결과값을 return 하세요.
 * - 추가적인 test가 필요한 경우에는 기존 test 코드 밑에 추가해주세요.
 * - 코드 실행 시 모든 테스트가 true인 경우 통과입니다!
 */

/* 문제 출제
 *
 *   💵 거스름돈 계산하기
 * - 3000원 짜리 배추를 사려고 한다!
 * - n개의 배추를 살 때 w원을 낸 경우 거스름 돈을 계산해주세요.
 * - 단, 배추값보다 돈을 덜 내지 않는다.
 */

function question(n, w) {
    // 여기에서 코드 작성해주세요!
    let result;
    result= w-(3000*n)
    return result;
}

// 여기는 결과값 함수이므로 신경쓰지 않으셔도 됩니다!
Test(
    question,
    [
        [1, 7000],
        [2, 12340],
        [3, 34560],
        [4, 78890],
        [5, 453400],
        [6, 5634500],
    ],
    [4000, 6340, 25560, 66890, 438400, 5616500]
);

function Test(question, conditions, results) {
    for (let index in results) {
        const result = question(...conditions[index]) === results[index];
        console.log(`테스트 ${+index + 1}`, result);
        if (!result) {
            console.log('테스트에 통과하지 못했습니다.');
            return;
        }
    }

    console.log('테스트에 통과하셨습니다!');
}