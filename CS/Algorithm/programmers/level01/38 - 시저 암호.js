function solution(s, n) {
  const caesarCipherNums = s.split('').map((spell) => {
    const ascii = spell.charCodeAt();

    if (ascii === 32) {
      // 공백
      return ascii;
    } else if (ascii > 90) {
      // 대문자
      return ascii + n > 122 ? ascii + n - 26 : ascii + n;
    } else {
      // 소문자
      return ascii + n > 90 ? ascii + n - 26 : ascii + n;
    }
  });

  return String.fromCharCode(...caesarCipherNums);
}
