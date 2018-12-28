//https://www.myphysicslab.com/pendulum/double-pendulum-en.html

var settings = {
    length1: 150,
    length2: 150,
    mass1:30,
	mass2:30,
    gravity:1
  };

let r1 = 150;
let r2 = 150;
let m1 = 20;
let m2 = 20;
let a1 = Math.PI/2;
let a2 = Math.PI/2;
let pg;

let a1_v=0;
let a2_v=0;

let g=1;

let x_trans=window.innerWidth/2;
let y_trans=200;

let ox2=-1;
let py2=-1;
var start=true;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pg = createGraphics(window.innerWidth, window.innerHeight);
  pg.background(0);
  pg.translate(x_trans, y_trans);
  
  var gui = new dat.gui.GUI();
  gui.add(settings, 'length1').min(10).max(400).step(1);
  gui.add(settings, 'length2').min(10).max(400).step(1); 
  gui.add(settings, 'mass1').min(0).max(100).step(1);
  gui.add(settings, 'mass2').min(0).max(100).step(1); 
  gui.add(settings, 'gravity').min(0.1).max(10).step(0.1); 
  
  var obj = { restart:function(){
	  a1 = Math.PI/2;
	  a2 = Math.PI/2;
	  clear();
	  pg.clear();
	  pg.background(0);
      px2=-1;
	  py2=-1;
	  a1_v=0;
	  a2_v=0;
	  a1_a=0;
	  a2_a=0;
	  start=true;
	  
	  }};
  gui.add(obj,'restart');
  
}

function draw() {
	
  r1=settings.length1;
  r2=settings.length2;
  m1=settings.mass1;
  m2=settings.mass2;
  g=settings.gravity;
  //g (2 m1 + m2) sin θ1 
  let num1=-g*(2* m1 + m2)*Math.sin(a1);
      
 //m2 g sin(θ1 − 2 θ2) 
  let num2=-m2*g*Math.sin(a1-2*a2);
  
  //2 sin(θ1 − θ2) 
  let num3=-2*Math.sin(a1-a2)
  
  //m2 (θ2'2 L2 + θ1'2 L1 cos(θ1 − θ2)) 
  let num4=m2*(a2_v*a2_v*r2+a1_v*a1_v*r1* Math.cos(a1-a2));
  //L1 (2 m1 + m2 − m2 cos(2 θ1 − 2 θ2))
  let den=r1*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
  
  let a1_a=(num1+num2+(num3*num4))/den;
  
  // 	2 sin(θ1 − θ2)
  num1=2*Math.sin(a1-a2);
  //(θ1'2 L1 (m1 + m2)
  num2=(a1_v*a1_v*r1*(m1+m2));
  // g(m1 + m2) cos θ1
  num3=g*(m1+m2)* Math.cos(a1);
  //θ2'2 L2 m2 cos(θ1 − θ2))
  num4=a2_v*a2_v*r2*m2* Math.cos(a1-a2);
  
  den=r2*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
  
 let a2_a=(num1*(num2+num3+num4))/den;
 
  //background(220);
  image(pg,0,0);
  stroke(255);
  strokeWeight(4);

  x1 = r1 * Math.sin(a1);
  y1 = r1 * Math.cos(a1);
  
  x2 = x1 + r2 * Math.sin(a2);
  y2 = y1 + r2 * Math.cos(a2);

  translate(x_trans, y_trans);
  
  line(0, 0, x1, y1);
  fill(color(255,0,0));
  ellipse(x1, y1, m1, m1);
  
  line(x1, y1, x2, y2);
  fill(color(0,255,0));
  ellipse(x2, y2, m2, m2);
  
  a1_v+=a1_a;
  a2_v+=a2_a;

  a1+=a1_v;
  a2+=a2_v;
  
  a1_v*=0.999;
  a2_v*=0.999;
  
  pg.strokeWeight(1);
  pg.stroke(color(154,80,250));
  if (!start)
  {
    //pg.point(x2,y2);
    pg.line(px2,py2,x2,y2);
  }
  else
  {
	  start=false;
  }
  px2=x2;
  py2=y2;
  
}