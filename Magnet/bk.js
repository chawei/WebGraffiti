var x1 = 2; 
var y1 = 2;
var gapX1 = 26;
var gapY1 = 36;
var shiftX = 10;
var shiftY = 10;
var r1 = 70;
var r2 = r1 - gapY1;
var deltaX = 90;

processing.stroke(0);
processing.fill(255,255,0);

processing.clear();
processing.beginShape();
processing.vertex(x1, y1);
processing.vertex(x1+gapX1, y1+shiftX);
processing.vertex(x1+gapX1, y1+shiftY+gapY1);
processing.vertex(x1, y1+gapY1);
processing.endShape(processing.CLOSE);

processing.pushMatrix();
processing.translate(0,r1*2-gapY1);
processing.beginShape();
processing.vertex(x1, y1);
processing.vertex(x1+gapX1, y1+shiftX);
processing.vertex(x1+gapX1, y1+shiftY+gapY1);
processing.vertex(x1, y1+gapY1);
processing.endShape(processing.CLOSE);
processing.popMatrix();

processing.stroke(0);
processing.strokeWeight(0.3);
processing.noFill();

processing.arc(x1+deltaX, y1+r1,r1*2,r1*2,processing.TWO_PI-processing.PI/2, processing.TWO_PI+processing.PI/2);
processing.arc(x1+deltaX, y1+r1,r2*2,r2*2, processing.TWO_PI-processing.PI/2, processing.TWO_PI+processing.PI/2);		
processing.line(x1, y1, x1+deltaX, y1);
processing.line(x1, y1+gapY1, x1+deltaX, y1+gapY1);
processing.line(x1, y1+r1*2-gapY1, x1+deltaX, y1+r1*2-gapY1);
processing.line(x1, y1+gapY1+r1*2-gapY1, x1+deltaX, y1+gapY1+r1*2-gapY1);

var deltaX_2 = deltaX-14;
processing.pushMatrix();
processing.translate(shiftX,shiftY);
processing.arc(x1+deltaX_2, y1+r1,r1*2,r1*2,processing.TWO_PI-processing.PI/2, processing.TWO_PI+processing.PI/2);
processing.arc(x1+deltaX_2, y1+r1,r2*2,r2*2, processing.TWO_PI-processing.PI/2, processing.TWO_PI+processing.PI/2);		
processing.line(x1, y1, x1+deltaX_2, y1);
processing.line(x1, y1+gapY1, x1+deltaX_2, y1+gapY1);
processing.line(x1, y1+r1*2-gapY1, x1+deltaX_2, y1+r1*2-gapY1);
processing.line(x1, y1+gapY1+r1*2-gapY1, x1+deltaX_2, y1+gapY1+r1*2-gapY1);
processing.popMatrix();