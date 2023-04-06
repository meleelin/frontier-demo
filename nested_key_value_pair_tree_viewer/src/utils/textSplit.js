function textSplit(rawArray) {
  const result = rawArray.map((item) => {
    const split = item.split(".");
    return split;
  });
  return result;
}

export { textSplit };
