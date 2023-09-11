// # Task

// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

function sum_to_n_a(n) {
  let sum = BigInt(0);
  for (let i = 1; i <= n; i++) {
    sum += BigInt(i);
  }
  if (sum > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Result exceeds Number.MAX_SAFE_INTEGER");
  }
  return Number(sum);
}

console.log(sum_to_n_a(5));

function sum_to_n_b(n) {
  let sum = (BigInt(n) * BigInt(n + 1)) / BigInt(2);
  if (sum > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Result exceeds Number.MAX_SAFE_INTEGER");
  }
  return Number(sum);
}

console.log(sum_to_n_b(5));

function sum_to_n_c(n) {
  let sum = (n * (n + 1)) / 2;
  if (sum > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Input is too large to safely calculate.");
  }
  return sum;
}

console.log(sum_to_n_c(5));
