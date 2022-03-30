function solution(phone_number) {
  const starCount = phone_number.length - 4;
  return '*'.repeat(starCount) + phone_number.match(/\d{4}$/);
}

// 모범답안1, 정규표현식
function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, '*');
}

// 모범답안2, slice()
function hide_numbers(s) {
  var result = '*'.repeat(s.length - 4) + s.slice(-4);

  return result;
}
