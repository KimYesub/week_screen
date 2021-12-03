// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 10;
var angleDistortion = 0;
var letters = "scream scream screen 스크린 스크린 스크린 screen screen 스크린 태블릿 스scream 크린 scream 스크린screen  스크린 스크린 스크screen 린 스크린 을 보호하기 scream 위한 액정필름을 to not to scream 보호하기 위한 전면케이스를scream  보호하기 위한scream  파우치를 보호하기 위한 가방을 보호하기 위한 인간을 보호하기 위screen 한 연약한 스크린 스screen 크린 스크린 스크린 스크screen 린 스크린 스크린 스크린to not to scream 은 태생이 연약하기 때문에 우리screen 가 지켜줘야 합니다. 스크린스크린 스크린screen  스크린 스크린 스크린 을 지키는 방법은 다양하기 때문에, 원하는 것을 골라 실행하세요. 스크린을 지키는 방법 중 가장 효과적인 것은 충격을 방지하는 것입니다. 액정필름, 극세사 파우치, 전용 홀더 등을 추가로 구매하여 장착하면 스크린 스크린 스크린 스크린 스크린 스크린 스크린 스크린 스크린 을 안전하게 보호할 수 있습니다. 스크린 to not to scream 스크린 스크린 스크린 스크린 스크린 스크린 스크린 스크린 이 잘 깨지는게 아마도 당신의 잘못은 아닐 겁니다. 스크린스크린스크린스크린스크린스크린스크린스크린 스크린스크린스크린스크린 스크린 스크린 스크린스크린to not to scream  스크린스크린 제 작업물을 즐겨주셨나보네요!";


// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

function init() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/2;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px S-CoreDream-1Thin";
    
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
    //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width; 
}

function textWidth( string, size ) {
  context.font = size + "px S-CoreDream-1Thin";

  
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

init();