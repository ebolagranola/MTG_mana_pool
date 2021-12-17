export function new2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

export function mapVal(val, bot, top, bot2, top2) {
  return (val-bot)/(top-bot)*(top2-bot2);
}
