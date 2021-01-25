import { compile } from 'mathjs';

const enforceSign = (isFirst, value) => {
  let res = `${value > 0 ? '+' : '-'}${value}`;
  if (isFirst && value > 0) {
    res = res.substring(1);
  }
  return res;
};

export const getDerivativeFunc = (coefficients) => {
  const degree = coefficients.length;
  let equation = '';
  for (let i = 1; i <= degree; i += 1) {
    const coefficient = coefficients[i];
    if (!coefficient) continue;
    const newCoefficient = coefficient * i;
    equation += `${enforceSign(!equation.length, newCoefficient)}*(x^${i-1}) `;
  }
  return compile(equation.trimEnd());
};

export const getNextPosition = (equation, derivFunc, currPos) => (
  currPos - equation.evaluate({ x: currPos }) / derivFunc.evaluate({ x: currPos })
);

export const isDiverges = (history) => {
  history = history.map((h) => h.value).slice(-15);
  const diffs = history
    .reduce(
      (acc, val, idx) =>
        idx > 0 ? [...acc, Math.abs(val - history[idx - 1])] : [],
      [],
    );
  const isIncreasing = history[1] - history[0] > 0;
  const result = diffs.filter(
    (val, idx) =>
      idx > 0 ? (val - history[idx - 1] > 0) === isIncreasing : false
  ).length > 0;
  return result;
};

export const sleep = async (delay) => (
  new Promise((resolve) => setTimeout(resolve, delay * 1000))
);
