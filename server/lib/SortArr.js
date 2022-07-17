class SortArr {
  //빈도만 구하기
  getCounts(array) {
    const counts = array.reduce((pv, cv) => {
      pv[cv] = (pv[cv] || 0) + 1;
      return pv;
    }, {});

    return counts;
  }

  //빈도순으로 정렬하기
  getSortedArr(array) {
    const counts = this.getCounts(array);

    const result = [];
    for (let key in counts) {
      result.push([key, counts[key]]);
    }
    result.sort((first, second) => {
      return second[1] - first[1];
    });

    const resultJson = result.map((v, i) => ({ [v[0]]: v[1] }));

    return resultJson;
  }

  //최빈값 구하기
  getMode(array) {
    const counts = this.getCounts(array);

    const keys = Object.keys(counts);
    let mode = keys[0];
    keys.forEach((val, idx) => {
      if (counts[val] > counts[mode]) {
        mode = val;
      }
    });

    return mode;
  }
}

export default new SortArr();
