//(function() {
var q = true;
var b = false;
//var q = false;;
var numNodes = 500;
var delay    = 10;

var svgWidth = 800;
var svgHeight = 500;
var barWidth = 0.8*svgWidth/numNodes;
var barSpacing = 0.1*barWidth;
var padding = (svgWidth-numNodes*(barWidth+barSpacing))/2;
var rand = function(range){return Math.floor(Math.random()*range);};

var board = d3.selectAll('.container').append('svg')
  .attr('class','svg');

var nodes = d3.shuffle(d3.range(numNodes).map(function(d) {
  return {value:d*0.8*svgHeight/numNodes};
}));



//***********************************************************
// BUBBLE SORT
//***********************************************************
var bi = 0;
var len = numNodes;
var bubbleSort = function(array) {

  var done = true;
  for(bi; bi<len-1; bi++) {
    if(array[bi].value > array[bi+1].value){
      var temp = array[bi].value;
      array[bi].value = array[bi+1].value;
      array[bi+1].value = temp;
      done = false;
      return array;
    }
  }
  bi = 0; 
  len--;
  return array;
};
//***********************************************************




//***********************************************************
// QUICK SORT
//***********************************************************
var arr = [5,6,4,9,2,3,0,1,7,8];
var arr = d3.shuffle(d3.range(numNodes));
var stack = [arr.slice()];
var sorted = [];
var i = 0;
var temp = stack.shift();
var pivot = temp.shift();
var tl = temp.length;
var left = [];
var right = [];
var done = false;

var qSort = function () {

    if (tl === 0) {
      sorted.push(pivot);
      if (sorted.length === arr.length) {
        done = true;
        return _.flatten([sorted.concat(left, pivot, temp.slice(i), right, stack)]);
      }
      temp = stack.shift();
      pivot = temp.shift();
      tl = temp ? temp.length : 0;
      return _.flatten([sorted.concat(left, pivot, temp.slice(i), right, stack)]);
    }

    for (i; i < tl; i++) {
      if (temp[i] < pivot) {
        left.push(temp[i]);
        i++;
        return _.flatten([sorted.concat(left, pivot, temp.slice(i), right, stack)]);
      } else {
        right.push(temp[i]);
        i++;
        return _.flatten([sorted.concat(left, pivot, temp.slice(i), right, stack)]);
      }
    }
    i=0;

    left.push(pivot);
    if (right.length)
      stack.unshift(right);
    if (left.length)
      stack.unshift(left);

    temp = stack.shift();
    pivot = temp.shift();
    tl =  temp ? temp.length : 0;
    left = [];
    right = [];
};
//***********************************************************






//***********************************************************
//  UPDATE DATA
//***********************************************************
var update = function (data) {

  //BRING IN NEW DATA
  if (q) {
    data = data.map(function(d) {
      return {value:d*0.8*svgHeight/numNodes};
    });
  }
  var bars = board.selectAll('rect')
    .data(data);
  //.data(data,function(d) { return d.value; } );

  //UPDATE OLD GUYS
  bars.attr('class','')
    .attr('height', function(d,i) {return d.value;})
    .attr('width', barWidth) 
    .attr('x', function(d,i) {return padding+i*(barWidth+barSpacing);})
    .attr('y', function(d) {return svgHeight-d.value;})
    .attr('fill', function(d,i) {return b ? 'grey' 
                : q && i <= sorted.length ? 'green'
                : i === bi  || i === bi+1 ? 'blue' 
                : i >  len                ? 'green'
                :                           'grey';});

  //ENTER NEW GUYS (IF ANY)
  bars.enter().append('rect')
    .attr('class','bars')
    .attr('x', function(d,i) {return padding+i*(barWidth+barSpacing);})
    .attr('y', function(d,i) {return svgHeight-d.value;})
    .attr('width', barWidth) 
    .attr('height', function(d,i) {return d.value;})
    .attr('fill','grey');

  //EXIT
  //bars.exit()
  //.attr('class','bars')
  //.attr('fill','grey')
  //.attr('x', function(d,i) {return padding+i*(barWidth+barSpacing);}) 
  //.attr('y', function(d,i) {return svgHeight-d.value;}) 
  //.attr('width', barWidth) 
  //.attr('height', function(d,i) {return d.value;})
  //.remove();
};

if(b)
  update(d3.shuffle(nodes));
else if(q)
  update(qSort(arr));
else
  update(bubbleSort(nodes));

setInterval(function() {
  if(b)
    update(d3.shuffle(nodes));
  else if(q)
    update(qSort(arr));
  else
    update(bubbleSort(nodes));
}, delay);
//***********************************************************




//})(); 
//
//
//
//
//
//
