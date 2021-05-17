export function formatCurrency(money) {
  const strNum = String(money);
  let str = "";
  for (let i = strNum.length - 1, j = 0; i >= 0; i--, j++) {
    str =
      i !== strNum.length - 1 && j % 3 === 0
        ? strNum[i] + "." + str
        : strNum[i] + str;
  }
  return str;
}
