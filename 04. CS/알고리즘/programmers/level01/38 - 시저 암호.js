function solution(s, n) {
  const caesarCipherNums = s.split('').map((spell) => {
    const ascii = spell.charCodeAt();

    // 공백
    if (ascii === 32) {
      return ascii;
    }

    // 대문자
    if (ascii > 90) {
      return ascii + n > 122 ? ascii + n - 26 : ascii + n;
    }

    // 소문자
    return ascii + n > 90 ? ascii + n - 26 : ascii + n;
  });

  return String.fromCharCode(...caesarCipherNums);
}
