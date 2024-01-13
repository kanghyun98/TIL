function solution(phone_book) {
  const len = phone_book.length;
  const sortedList = [...phone_book].sort();

  for (let i = 0; i < len - 1; i++) {
    const thisN = sortedList[i];
    const nextN = sortedList[i + 1];

    if (thisN === nextN.slice(0, thisN.length)) {
      return false;
    }
  }

  return true;
}

// time over: O(N^2)
function solution(phone_book) {
  for (let i = 0; i < phone_book.length; i++) {
    const thisNumber = phone_book[i];

    for (let j = i + 1; j < phone_book.length; j++) {
      const otherNumber = phone_book[j];
      const isSplitted = otherNumber.split(thisNumber).length === 2;
      if (isSplitted) {
        return false;
      }
    }
  }

  return true;
}
