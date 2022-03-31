// 단계를 명확하게 보이기 위해 하나씩 값을 반환했는데, 모범 답안 방식도 괜찮은 것 같다.
// 내가 조건문을 이용해 구현한 것들 거의 다 정규표현식만으로도 구현이 가능하다. 정규표현식 공부 더 해야겠담..

// 내 풀이
function solution(new_id) {
  // 1단계 (대 -> 소)
  let result = new_id.toLowerCase();

  // 2단계 (제거)
  const reg = /[^a-z0-9-_\.]/g;
  result = result.replace(reg, '');

  // 3단계 (연속된 . -> .)
  const reg2 = /\.+/g;
  result = result.replace(reg2, '.');

  // 4단계 (처음or끝의 . 제거)
  const reg3 = /^\.|\.$/g;
  result = result.replace(reg3, '');

  // 5단계 (빈문자열이면 a 대입)
  result = result.length > 0 ? result : 'a';

  // 6단계 (16자 이상이면 첫 15개만 선택, 마지막 .이면 제거)
  result =
    result.length >= 16 ? result.substr(0, 15).replace(reg3, '') : result;

  // 7단계 (2자 이하면 마지막 문자를 길이 3이 될 때까지 반복)
  const len = result.length;
  result = len <= 2 ? result + result[len - 1].repeat(3 - len) : result;

  let answer = result;
  return answer;
}

// 모범 답안
function solution(new_id) {
  const answer = new_id
    .toLowerCase() // 1
    .replace(/[^\w-_.]/g, '') // 2
    .replace(/\.+/g, '.') // 3
    .replace(/^\.|\.$/g, '') // 4
    .replace(/^$/, 'a') // 5
    .slice(0, 15)
    .replace(/\.$/, ''); // 6
  const len = answer.length;
  return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}
