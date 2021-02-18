function roundTo(value, digits) {
  return Number(value.toFixed(digits !== undefined ? digits : 1));
}

function pathToSVG(
  vertices,
  inTangents,
  outTangents,
  closed,
  offX,
  offY
) {
  var ox = offX !== undefined ? offX : 0;
  var oy = offY !== undefined ? offY : 0;

  var svg = 'M';
  svg += roundTo(vertices[0][0] + ox, 1).toString() + ',' + roundTo(vertices[0][1] + oy, 1).toString();
  var n, k, VN, IN, ON, VK, IK, OK, x, y, XN, YN, XK, YK, XB, YB, noCurve, total = vertices.length-1, iTotal = total-1;
  
  for(n = 0; n < total; ++n) {
    k = n+1;
    
    VN = vertices[n];
    IN = inTangents[n];
    ON = outTangents[n];
    VK = vertices[k];
    IK = inTangents[k];
    OK = outTangents[k];
    
    XN = roundTo(VN[0] + ON[0] + ox, 1);
    YN = roundTo(VN[1] + ON[1] + oy, 1);
    
    XB = roundTo(VK[0] + ox, 1);
    YB = roundTo(VK[1] + oy, 1);
    
    XK = roundTo(XB + IK[0], 1);
    YK = roundTo(YB + IK[1], 1);
    
    noCurve = IN[0] === 0 && IN[1] === 0 && ON[0] === 0 && ON[1] === 0;
    noCurve = noCurve || (XB === XK && YB === YK);
    
    if( noCurve ) {
      // Line
      svg += 'L';
      svg += XK.toString() + ',' + YK.toString();
      if(n < iTotal) svg += ',';
    } else {
      // Curve
      svg += 'C';
      svg += XN.toString() + ',' + YN.toString() + ',';
      svg += XK.toString() + ',' + YK.toString() + ',';
      svg += XB.toString() + ',' + YB.toString();
    }
  }
  
  if(closed) {
    n = total;
    k = 0;
    
    VN = vertices[n];
    IN = inTangents[n];
    ON = outTangents[n];
    VK = vertices[k];
    IK = inTangents[k];
    OK = outTangents[k];
    
    if( IN[0] === 0 && IN[1] === 0 && ON[0] === 0 && ON[1] === 0 ) {
      // Line
      svg += 'L';
      svg += roundTo(VN[0] + ox, 1).toString() + ',' + roundTo(VN[1] + oy, 1).toString() + ',';
      svg += 'Z';
    } else {
      // Curve
      svg += 'C';
      svg += roundTo(VN[0] + ON[0] + ox, 1).toString() + ',' + roundTo(VN[1] + ON[1] + oy, 1).toString() + ',';
      
      svg += roundTo(VK[0] + IK[0] + ox, 1).toString() + ',' + roundTo(VK[1] + IK[1] + oy, 1).toString() + ',';
      svg += roundTo(VK[0] + ox).toString() + ',' + roundTo(VK[1] + oy).toString();
    }
  }
  
  return svg;
}
