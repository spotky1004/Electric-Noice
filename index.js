// config
config = {
  'noice': {
    'frequency': 8, // noice frequency (px)
    'power': 7, // noice random power (px)
    'range': 100 // range (px)
  },

  'canvas': {
    'width': 0, // false to screen fit
    'height': 0 // false to screen fit
  },

  'line': {
    'spawn': 10, // number of lines
    'color': '#caede7', // color (hex)
    'width': 1.4 // line width (px)
  }
}

// init
var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
canvas.width = (config.canvas.width?config.canvas.width:innerWidth);
canvas.height = (config.canvas.height?config.canvas.height:innerHeight);

var mousePos = [-1e10, -1e10]; // position of mouse (px)
document.onmousemove = getMousePos;
function getMousePos(event) {
  mousePos = [event.clientX, event.clientY]
}

lines = [];
for (var i = 0; i < config.line.spawn; i++) {
  lines.push({});
  var b = Math.floor(Math.random()*2);
  lines[i].x = (b?Math.random()*canvas.width:0);
  lines[i].y = (!b?Math.random()*canvas.height:0);
  lines[i].d = (b?Math.PI*(Math.random()/2+0.75):Math.PI*(Math.random()/2+0.25));
  lines[i].l = Math.sqrt(innerWidth**2+innerHeight**2);
  lines[i].c = config.line.color;
}

// loop (draw)
setInterval( function () {
  canvas.width = (config.canvas.width?config.canvas.width:innerWidth);
  canvas.height = (config.canvas.height?config.canvas.height:innerHeight);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.lineWidth = config.line.width;
  for (var idx = 0, l1 = lines.length; idx < l1; idx++) {
    var l = lines[idx];
    var p = [l.x, l.y];
    c.beginPath();
    c.strokeStyle = l.c;
    for (var t = 0, l2 = (l.l+config.noice.power)/config.noice.frequency; t < l2; t++) {
      var tP = [...p];
      if (Math.abs(mousePos[0]-p[0]) < config.noice.range && Math.abs(mousePos[1]-p[1]) < config.noice.range) {
        tP.forEach((o, i, a) => {a[i]+=Math.random()*config.noice.power*Math.sign(Math.floor(Math.random()*2)*2-1)});
      }
      (i?c.lineTo(tP[0], tP[1]):c.moveTo(tP[0], tP[1]));
      p = [p[0]+Math.sin(l.d)*config.noice.frequency, p[1]-Math.cos(l.d)*config.noice.frequency];
    }
    c.stroke();
  }
}, 20);
