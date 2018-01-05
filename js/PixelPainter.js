console.log('sanity check');
let currentColor = null;
let selcell = document.getElementsByClassName('cells');
let mouseD = false;



let pixelPainter = document.getElementById('pixelPainter');
let grid = document.createElement('div');
grid.id = 'Grid';
pixelPainter.appendChild(grid);

function makeGrid(h, w) {
  for (let i = 0; i < h; i++) {
    let row = document.createElement('div');
    row.id = 'row' + i + 1;
    for (let j = 0; j < w; j++) {
      let cell = document.createElement('div')
      cell.className = 'cells';
      cell.id = 'cellId' + i + '' + j;
      cell.addEventListener('mousedown', function (e) {
        mouseD = true;

        changeBgColor(currentColor, e.target);



      }, true)

      cell.addEventListener('mouseover', function (e) {
        if (mouseD) {
          changeBgColor(currentColor, e.target);
        }
      })
      cell.addEventListener('mouseup', function (e) {
        mouseD = false;
      })


      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

makeGrid(30, 50);



let colors = document.createElement('div');
colors.id = 'colorDiv';

function makeColorGrid(h, w) {

  for (let i = 0; i < h; i++) {
    let colorRow = document.createElement('div');
    for (let j = 0; j < w; j++) {
      let colorCells = document.createElement('div');
      colorCells.className = 'colorCells';
      colorCells.style.backgroundColor = getRandomColor();
      colorCells.addEventListener('click', function () {
        currentColor = this.style.backgroundColor;

      })
      colorRow.appendChild(colorCells);
    }
    colors.appendChild(colorRow);
  }
  pixelPainter.appendChild(colors);

  grid.appendChild(clearButton);

}


let clearButton = document.createElement('button');
clearButton.className = 'btn';
clearButton.id = 'allClear';
clearButton.innerHTML = 'Clear';
for (let i = 0; i < selcell.length; i++) {
  clearButton.addEventListener('click', function () {

    changeBgColor('#FFFFFF', selcell[i]);
  })
}

makeColorGrid(14, 3);



function changeBgColor(color, target) {
  target.style.backgroundColor = color;
}




let erase = document.createElement('button');
erase.className = 'btn';
erase.id = 'erase';
erase.innerHTML = 'erase';

erase.addEventListener('click', function (e) {

  currentColor = '#FFFFFF';
})

grid.appendChild(erase);

let grabCCells = document.getElementsByClassName('colorCells');
let randomBtn = document.createElement('button');
randomBtn.className = 'btn';
randomBtn.innerHTML = 'More Colors';
for (let i = 0; i < grabCCells.length; i++) {
  randomBtn.addEventListener('click', function () {
    changeBgColor(getRandomColor(), grabCCells[i]);

  })

}

function getRandomColor() {
  var hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + ("000000" + hex.toString(16)).substr(-6);
}

function clearGrid() {
  colorCells.style.background = '#FFFFFF';
  
}

grid.appendChild(randomBtn);

//===============SAVEBUTTON===============
let savedArr = [];
let saveBtn =document.createElement('button');
saveBtn.innerHTML = 'save'
for(let i = 0; i < selcell.length; i++){
saveBtn.addEventListener('click', function(){
  

  console.log(selcell[i]);
  
  //console.log(grabCCells[i].style.backgroundColor);
  let cellsBackground = selcell[i].style.backgroundColor;
  savedArr.push(cellsBackground);
})
}
grid.appendChild(saveBtn)


//==============LOADBUTTON=================

let loadBtn = document.createElement('button');
loadBtn.innerHTML = 'load';
for(let i = 0; i < selcell.length; i++){
  loadBtn.addEventListener('click', function(){
selcell[i].style.background = savedArr[i];

  })
}
grid.appendChild(loadBtn);

