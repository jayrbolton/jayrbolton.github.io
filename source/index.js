
var canvas = document.createElement('canvas')
canvas.width = 200
canvas.height = 200
var ctx = canvas.getContext('2d')

function drawTriangle (ctx) {
  ctx.beginPath()
  ctx.moveTo(0, -30)
  ctx.lineTo(60, 30)
  ctx.lineTo(-60, 30)
  ctx.lineTo(0, -30)
}

function draw (ts) {
  var rotation = ts / 10000
  ctx.globalCompositeOperation = 'destination-over'
  ctx.clearRect(0, 0, 200, 200)
  ctx.lineWidth = 2
  
  // Triangle 2
  ctx.strokeStyle = 'rgba(66, 185, 131, 1)'
  ctx.save()
  ctx.translate(80, 80)
  ctx.rotate(rotation)
  drawTriangle(ctx)
  ctx.stroke()
  ctx.restore()

  ctx.strokeStyle = 'rgba(66, 185, 131, 0.75)'
  ctx.save()
  ctx.translate(80, 80)
  ctx.rotate(rotation / 1.2)
  drawTriangle(ctx)
  ctx.stroke()
  ctx.restore()

  ctx.strokeStyle = 'rgba(66, 185, 131, 0.5)'
  ctx.save()
  ctx.translate(80, 80)
  ctx.rotate(rotation / 1.4)
  drawTriangle(ctx)
  ctx.stroke()
  ctx.restore()

  ctx.strokeStyle = 'rgba(66, 185, 131, 0.25)'
  ctx.save()
  ctx.translate(80, 80)
  ctx.rotate(rotation / 1.6)
  drawTriangle(ctx)
  ctx.stroke()
  ctx.restore()

  window.requestAnimationFrame(draw)
}

function triangle (svg, rot, dur, opacity) {
  var path = document.createElementNS(svgNS, 'path')
  var side = 80
  var height = side * Math.sqrt(3) / 2
  var pad = 30
  var a = [pad, pad]
  var b = [pad + side, pad]
  var c = [pad + side / 2, pad + height]
  path.setAttribute('d', 'M' + a[0] + ' ' + a[1] + ' L' + b[0] + ' ' + b[1] + ' L' + c[0] + ' ' + c[1] + ' Z')
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke-width', '2')
  path.setAttribute('stroke', 'rgba(66, 185, 131, ' + opacity + ')')
  var center = [
    pad + side / 2, // + Math.random() * 10,
    pad + height / 2 - 10.5 // + Math.random() * 10
  ]
  path.setAttribute('transform', 'rotate(' + rot + ' ' + center[0] + ' ' + center[1] + ')')
  var anim = document.createElementNS(svgNS, 'animateTransform')
  anim.setAttributeNS(null, "attributeName", "transform")
  anim.setAttributeNS(null, "attributeType", "XML")
  anim.setAttributeNS(null, "type", "rotate")
  anim.setAttributeNS(null, "dur", dur)
  anim.setAttributeNS(null, "repeatCount", "indefinite")
  anim.setAttributeNS(null, "from", '0 ' + center[0] + ' ' + center[1])
  anim.setAttributeNS(null, "to", '360 ' + center[0] + ' ' + center[1])
  // path.appendChild(anim)
  svg.appendChild(path)
}

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.style.width = '120px'
svg.style.height = '120px'
var svgNS = svg.namespaceURI
var rotInterval = Math.random() * 40
triangle(svg, 0, '32', '1')
triangle(svg, rotInterval, '34', '0.8')
triangle(svg, 2 * rotInterval, '36', '0.6')
triangle(svg, 3 * rotInterval, '38', '0.4')
triangle(svg, 4 * rotInterval, '38', '0.2')

var logoLink = document.querySelector('.logo-link')
logoLink.replaceChild(svg, logoLink.firstChild)
