function arrayToTree(keyArray, valueArray) {
  const treeNode = [];

  keyArray.forEach((item, idx) => {
    item.reduce((acc, cur, index) => {
      let temp = acc.find((child) => cur === child.name);
      if (!temp) {
        if (item.length - 1 === index) {
          temp = { name: cur, value: valueArray[idx] };
        } else {
          temp = { name: cur, children: [] };
        }

        acc.push(temp);
      }
      return temp.children;
    }, treeNode);
  });
  return treeNode;
}

export { arrayToTree };
