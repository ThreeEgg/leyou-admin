export const getParameter = param => {  // 获取url中参数
  const query = window.location.href;
  const iLen = param.length;
  let iStart = query.indexOf(param);
  if (iStart === -1) {
    return '';
  }
  iStart += iLen + 1;
  const iEnd = query.indexOf('&', iStart);
  if (iEnd === -1) {
    return query.substring(iStart);
  }
  return decodeURI(query.substring(iStart, iEnd), 'utf-8');
};

export const getStateByParams = param => {  // 获取url中参数
  const query = window.history.state ? (window.history.state.state || {}) : {};
  return query && (query[param] ? query[param] : '')
}

export const trimEmpty = arr => {  // 数组去空
  const newArr = [];
  arr.forEach(item => {
    if (item !== '') {
      newArr.push(item)
    }
  })
  return newArr;
}

export const exportExcel = (data, title) => {  // 导出表格
  const link = document.createElement('a');
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${title}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const useGo = () => {
  window.open('/pdf/《如何使用小Go》.pdf')
}

export const viewStrategy = () => {
  window.open('/pdf/《拨打策略》.pdf')
}

export const unique = (arr, u_key) => {
  const map = new Map()
  arr.forEach((item, index) => {
    if (!map.has(item[u_key])) {
      map.set(item[u_key], item)
    }
  })
  return [...map.values()]
}
