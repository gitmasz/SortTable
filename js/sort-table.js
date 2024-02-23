const sortTable = (tableid, colnum, afterSortFunction, ordering) => {
  const tbody = document.getElementById(tableid);
  if (tbody == null) { return; }
  const colindex = colnum - 1;
  const rows = tbody.rows;
  if (rows.length == 0 || rows[0].cells.length < colnum) { return; }
  const tr = tbody.children;
  [].slice.call(tr).sort((row1, row2) => {
    const td1 = row1.getElementsByTagName('td')[colindex];
    const inputs1 = td1.getElementsByTagName('input');
    const v1 = (inputs1.length > 0 ? inputs1[0].value : td1.innerText).toLowerCase();
    const td2 = row2.getElementsByTagName('td')[colindex];
    const inputs2 = td2.getElementsByTagName('input');
    const v2 = (inputs2.length > 0 ? inputs2[0].value : td2.innerText).toLowerCase();
    const sortNumeric = (!isNaN(v1) && !isNaN(v2));
    const res = (sortNumeric ? Number(v1) - Number(v2) : v1.localeCompare(v2));
    return (ordering == 'desc' ? -res : res);
  }).forEach((row) => {
    tbody.appendChild(row);
  });
  if (typeof afterSortFunction == 'function') {
    const thead = tbody.parentNode.getElementsByTagName('thead');
    if (thead.length == 0) { return; }
    const cells = thead[0].getElementsByTagName('th');
    if (cells.length < colnum) { return; }
    const colindex = colnum - 1;
    afterSortFunction(cells, colindex);
  }
};

// function that can be executed after sorting (in the 1st parameter the <td> array with <thead>, in the 2nd parameter the index of the sorted column)
const afterSortTable = (cells, colindex) => {
  // loop through all <td> to remove the effect of previous sorting
  for (let i = 0; i < cells.length; ++i) {
    cells[i].style.color = '#000';
  }

  // highlighting the sorted column
  cells[colindex].style.color = '#000080';
};

document.addEventListener('DOMContentLoaded', () => {
  sortTable('mytbody', 2, afterSortTable);            // sorting by 2nd column (surname)
  // sortTable('mytbody', 2);                         // no function performed after sorting
  // sortTable('mytbody', 3, afterSortTable, 'desc'); // descending sort
  // sortTable('mytbody', 3, null, 'desc');           // as above but without the function performed after sorting
  // sortTable('mytbody', 4, afterSortTable);         // sorting by column with input
})