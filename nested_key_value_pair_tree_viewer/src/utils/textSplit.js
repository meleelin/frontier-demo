function textSplit(rawArray) {
  const result = rawArray.map((item) => item.split("."));
  return result;
}

export { textSplit };
