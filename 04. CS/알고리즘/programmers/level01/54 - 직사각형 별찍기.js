process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const n = data.split(' ');
  const a = Number(n[0]),
    b = Number(n[1]);

  const arr = Array(b).fill('*'.repeat(a));
  console.log(arr.join('\n'));
});
