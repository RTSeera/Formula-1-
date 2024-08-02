function _1(md){return(
md`# Continuous scales

Besides [d3.scaleLinear](https://observablehq.com/@d3/d3-scalelinear), d3-scale offers other continuous scales, in which the value is transformed in a non-linear way. These scales are typically useful when one needs to match a domain to a surface area instead of a length, or when the domain is inherently not linear.

- [Square root scales](#scale_sqrt)
- [Power scales](#scale_pow)
- [Log scales](#scale_log)
- [Symlog scales](#scale_symlog)`
)}

function _scale_sqrt(tex,md){return(
md`### Square root

[d3.scaleSqrt](https://d3js.org/d3-scale/pow#scaleSqrt) creates a square-root based scale. It transforms its domain in such a way that if the value *b* is 4 times bigger than value *a*, the result is only multiplied by 2. Its most common use case is to determine the radius of a disk whose surface area must be proportional to the value. As the area is proportional to the square of the radius ${tex`(A = π R^2)`}, conversely the radius — which is what we need to draw the shape on the screen — must be proportional to the square root of the value.`
)}

function _population2radius(d3){return(
d3.scaleSqrt() // instead of scaleLinear()
  .domain([0, 2e9])
  .range([0, 300])
)}

function _4(population2radius){return(
population2radius(1.386e9)
)}

function _5(population2radius){return(
population2radius(127e6)
)}

function _6(population2radius){return(
population2radius(427e3)
)}

function _7(d3,svg,width,population2radius)
{
  const color = d3.scaleOrdinal(d3.schemePaired);

  return svg`<svg width=${width} height=500px>
  <g transform="translate(50,250)" style="text-anchor: middle; font-family: sans-serif; font-weight: bold;">
  <circle r=${population2radius(427e3)} cx=20 fill="${color("Brunei")}" />
  <text dx=20 dy=-10 fill=#555>Brunei</text>
  <circle r=${population2radius(127e6)} cx=200 fill="${color("Japan")}" />
  <text dx=200 fill="white">Japan</text>
  <circle r=${population2radius(1.386e9)} cx=600 fill="${color("China")}" />
  <text dx=600 fill="white">China</text>
  </g>
</svg>
`;
}


function _8(md){return(
md`We have seen this example in the [Introduction to D3’s scales](https://observablehq.com/@d3/introduction-to-d3s-scales#population2radius). Now, let’s add a fat stroke to the disks (and chose smaller countries to save space):`
)}

function _9(d3,svg,width,population2radius)
{
  const color = d3.scaleOrdinal(d3.schemePaired.slice(7));

  const strokeWidth = 8;

  return svg`<svg width=${width} height=200px stroke-width=${strokeWidth} stroke=#ddd>
  <g transform="translate(50,100)" style="text-anchor: middle; font-family: sans-serif; font-weight: bold;">
  <circle r=${population2radius(427e3)} cx=20 fill="${color("Brunei")}" />
  <text dx=20 dy=${-10 - strokeWidth / 2} stroke=none fill=#555>Brunei</text>
  <circle r=${population2radius(56.72e6)} cx=220 fill="${color("China")}" />
  <text dx=220 fill="white" stroke=none>S. Africa</text>
  <circle r=${population2radius(127e6)} cx=500 fill="${color("Japan")}" />
  <text dx=500 fill="white" stroke=none>Japan</text>
  </g>
</svg>
`;
}


function _10(md){return(
md`Oops! As we see, the chart is now visually very wrong: Brunei’s disk has been completely erased, choked by its own stroke. The reason is that SVG (like canvas) paints on both sides of the path, biting into the surface area. A handy solution is to cheat with the scale’s range, by adding half the width to the circle’s radius in order to paint an ‘outer stroke’:`
)}

function _11(d3,svg,width)
{
  const color = d3.scaleOrdinal(d3.schemePaired.slice(7));

  const strokeWidth = 8;

  const population2radius = d3.scaleSqrt()
    .domain([0, 2e9])
    .range([0 + strokeWidth / 2, 300 + strokeWidth / 2]); // 🌶

  return svg`<svg width=${width} height=200px stroke-width=${strokeWidth} stroke=#ddd>
  <g transform="translate(50,100)" style="text-anchor: middle; font-family: sans-serif; font-weight: bold;">
  <circle r=${population2radius(427e3)} cx=20 fill="${color("Brunei")}" />
  <text dx=20 dy=${-10 - strokeWidth / 2} stroke=none fill=#555>Brunei</text>
  <circle r=${population2radius(56.72e6)} cx=220 fill="${color("China")}" />
  <text dx=220 fill="white" stroke=none>S. Africa</text>
  <circle r=${population2radius(127e6)} cx=500 fill="${color("Japan")}" />
  <text dx=500 fill="white" stroke=none>Japan</text>
  </g>
</svg>`;
}


function _12(md){return(
md`This cheating is mathematically justified. When drawing small values, there is often a minimal size that we want to give to the mark that represents them. In all cases, if we want a chart to correctly convey the information, it must be accompanied by a proper legend based on the same scale, or actual numbers be explicitly marked.`
)}

function _13(md){return(
md`Here is an example of a visual legend that might be suitable for a square-root scale. The disk labeled ‘5’ is 4 times smaller in area as the disk labeled ‘20’, and its radius is half as long. (Finding an harmonious progression with nice and round values is half art, half science.)`
)}

function _14(d3,svg,width)
{
  const values = [5, 20, 50, 100]; // hint: add 0 in this array…

  const scale = d3.scaleSqrt()
    .domain([0, d3.max(values)])
    .range([1, 100]); // … then change 1 to 0

  return svg`<svg width=${width} height=230px><g transform="translate(200,10)">
  ${values.map(
    v =>
      svg`<g><circle cy="${200 - scale(v)}"
              r="${scale(v)}" stroke=black fill=none />
            <text y="${200 - 2 * scale(v) + 3}"
              style="dominant-baseline: hanging; text-anchor: middle;"
            >${v}</text>
          </g>`
  )}</g></svg>`;
}


function _15(md){return(
md`When applied to negative values, the scale adapts to the situation, first by taking the absolute (positive) value, then negating the result. This is a bit difficult to see by looking at numbers, so we’ll use an image. This is the standard square-root scale:`
)}

function _16(visualizeScale,d3){return(
visualizeScale(d3.scaleSqrt())
)}

function _17(md){return(
md`The negative version:`
)}

function _18(visualizeScale,d3){return(
visualizeScale(d3.scaleSqrt().domain([-1, 0]))
)}

function _19(md){return(
md`And the divergent version:`
)}

function _20(visualizeScale,d3){return(
visualizeScale(d3.scaleSqrt().domain([-1, 1]))
)}

function _21(md){return(
md`As we’ve just seen, the negative values are mapped to negative values (by taking the square-root of the absolute value). It’s even possible to go further by specifying a “piecewise” domain and range — allowing the construction of ad-hoc scales such as this one:`
)}

function _22(visualizeScale,d3){return(
visualizeScale(
  d3.scaleSqrt()
    .domain([-400, -100, 0, 400])
    .range([0, 1, 10, 15])
)
)}

function _23(md){return(
md`All the other methods work the same: [invert](https://d3js.org/d3-scale/linear#linear_invert), [clamp](https://d3js.org/d3-scale/linear#linear_clamp), [interpolate](https://d3js.org/d3-scale/linear#linear_interpolate), [rangeRound](https://d3js.org/d3-scale/linear#linear_rangeRound), [unknown](https://d3js.org/d3-scale/linear#linear_unknown)…`
)}

function _24(visualizeScale,d3){return(
visualizeScale(
  d3.scaleSqrt()
    .domain([-100, 100])
    .rangeRound([-10, 10])
)
)}

function _25(md){return(
md`See also [d3.scaleRadial](https://d3js.org/d3-scale/linear#scaleRadial).`
)}

function _scale_pow(tex,md){return(
md`### Power scales

[d3.scalePow](https://d3js.org/d3-scale/pow) creates a power based scale. The transform applied to values is of the type ${tex`y = x^k`} where *k*, the exponent, can be any real number.

d3.scaleSqrt() is, in fact, a shorthand notation for d3.scalePow().exponent(1/2). The exponent *k* can be any real number (except 0).`
)}

function _27(visualizeScale,d3,k){return(
visualizeScale(
  d3
    .scalePow()
    .exponent(k)
    .domain([k < 0 ? 0.01 : 0, 1])
)
)}

function _k(Inputs){return(
Inputs.range([-3, 10], {value: 2, label: "exponent k" })
)}

function _29(md){return(
md`And, of course, this applies as well to color scales:`
)}

function _paint(d3,k){return(
d3.scalePow()
  .exponent(k)
  .range(["yellow", "red"])
)}

function _31(html,d3,paint){return(
html`<div>
${d3.ticks(0, 1, 20)
  .map(paint)
  .map(t => `<span title="${t}" style="background:${t}; height: 100px; width:4.7%; display: inline-block;">&nbsp;</span>`)}</div>`
)}

function _32(tex,md){return(
md`An example use of a power scale is when a *sphere*’s three-dimensional volume should be proportional to a value; as we did with the square root scale to compute a disk’s radius, we do now with the cube root ${tex`\sqrt[3]{x} = x^{\frac13}`} to compute the sphere’s radius:`
)}

function _33(visualizeScale,d3){return(
visualizeScale(d3.scalePow().exponent(1 / 3))
)}

function _34(md){return(
md`Another use of a power scale is when when you want to adjust a bit a linear scale, to make it less aggressive visually, or, on the contrary, to add a bit more contrast. (Some people will frown on this as it is mathematically inaccurate, but allow visual perception to prime over pixel count.) Here’s an example that starts at 0.1, but is almost equal to 0.5 in the middle, and ends up in an ‘almost linear‘ fashion. It could be used to figure data points that have a value close to zero, with a small but non-vanishing symbol (an alternative is to use a fixed minimum size).`
)}

function _35(visualizeScale,d3){return(
visualizeScale(
  d3.scalePow()
    .exponent(1.2)
    .range([0.0999, 1])
)
)}

function _36(md){return(
md`All the other methods work the same: piecewise domain and scale, [invert](https://d3js.org/d3-scale/linear#linear_invert), [clamp](https://d3js.org/d3-scale/linear#linear_clamp), [interpolate](https://d3js.org/d3-scale/linear#linear_interpolate), [rangeRound](https://d3js.org/d3-scale/linear#linear_rangeRound), [unknown](https://d3js.org/d3-scale/linear#linear_unknown)…`
)}

function _scale_log(md){return(
md`### Log scales`
)}

function _38(md){return(
md`[d3.scaleLog](https://d3js.org/d3-scale/log#scaleLog) creates a logarithmic scale, a continuous scale in which the domain is transformed by the Math.log function. Its graph is not spectacular:`
)}

function _39(visualizeScale,d3){return(
visualizeScale(d3.scaleLog())
)}

function _40(md){return(
md`The logarithm function’s essential property is to transform multiplications into additions (and [ratios into differences](https://observablehq.com/@d3/change-line-chart)). This way, a vertical chart can span several orders of magnitude without the smallest values being dwarfed by the largest. To prove it, here’s a diagram that shows everything in the Universe:`
)}

function _objects(){return(
[
  { name: "Milky Way Galaxy", size: 1e18 }, // sizes in km
  { name: "Nearest Star", size: 1e13 },
  { name: "The Solar System", size: 1e9 },
  { name: "The Sun", size: 1e6 },
  { name: "The Earth", size: 1e3 },
  { name: "A Mountain", size: 75 },
  { name: "A Human", size: 1e-3 },
  { name: "A Cell", size: 1e-8 },
  { name: "An Atom", size: 1e-12 },
  { name: "A Proton", size: 1e-15 }
]
)}

function _scaleUniverse(d3){return(
d3.scaleLog().domain([1e-15, 1e20])
)}

function _43(width,scaleUniverse,svg,objects,d3)
{
  const height = width / 2,
    m = 40;

  scaleUniverse.range([height - m, m]);

  const g = svg`<g style="font-family: sans-serif; font-size:12; dominant-baseline: middle;">
  ${objects.map(
    d =>
      svg`<g transform="translate(50, ${scaleUniverse(d.size)})">
        <circle r=6 />
        <text x=14>${d.name}</text>
      </g>`
  )}</g>`;

  const axis = d3
    .select(svg`<g transform="translate(50,0)">`)
    .call(d3.axisLeft(scaleUniverse))
    .node();

  return svg`<svg width=${width} height=${height}>${g}${axis}</svg>`;
}


function _44(md){return(
md`Down to Earth, when charting financial series over long periods, it is often advisable to use a log scale in order to neutralize the effect that inflation has on prices & values. With a linear scale, a financial chart might place an unwarranted emphasis on the volatility of stock prices when they are higher.

*For an example, try changing the definition of [y](https://observablehq.com/@d3/bollinger-bands#y) in the [Bollinger Bands](https://observablehq.com/@d3/bollinger-bands) chart to be d3.scaleLinear()…*`
)}

function _45(md){return(
md`[*logscale*.base](https://d3js.org/d3-scale/log#log_base): by default, log scales are in base 10. It is possible to set (and read) a log scale’s base, for example for a chart representing the sizes of computer memory:`
)}

function _scaleBinary(d3){return(
d3.scaleLog()
  .base(2)
  .domain([16, 2 ** 20])
)}

function _47(visualizeTicks,scaleBinary){return(
visualizeTicks(scaleBinary)
)}

function _48(md){return(
md`A log scale can not, by very definition, include 0 in its domain. However, if the domain spans negative numbers, the absolute value is taken, and the scale works:`
)}

function _49(d3){return(
d3.scaleLog().domain([-100, -1])(-10)
)}

function _50(md){return(
md`The ticks (*i.e.* the marks on the axis) also have to adapt automatically to the various use cases of a scale that can encompass several orders of magnitude and where expectations are different in science, finance, computer science, etc. d3-scale’s heuristic is that, if the base is an integer, the returned ticks are uniformly spaced within each integer power of base; otherwise, one tick per power of base is returned.`
)}

function _powers(d3){return(
d3.scaleLog().domain([0.01, 100000])
)}

function _52(visualizeTicks,powers){return(
visualizeTicks(powers)
)}

function _53(visualizeTicks,powers){return(
visualizeTicks(powers, [5, "~g"])
)}

function _54(md){return(
md`*In the previous cells, try changing the domain to* [1e-10, 1e12], *the format, or the number of ticks from 5 to 3, 10, 20…*`
)}

function _55(md){return(
md`Of course, a binary log scale can be written in binary format:`
)}

function _binaryScale(d3){return(
d3.scaleLog()
  .base(2)
  .domain([1, 32])
)}

function _57(visualizeTicks,binaryScale){return(
visualizeTicks(
  binaryScale,
  [10, "b"] // 💡 see https://d3js.org/d3-axis#axis_ticks
)
)}

function _58(md){return(
md`All the other methods work the same: piecewise domain and scale, [invert](https://d3js.org/d3-scale/linear#linear_invert), [clamp](https://d3js.org/d3-scale/linear#linear_clamp), [interpolate](https://d3js.org/d3-scale/linear#linear_interpolate), [rangeRound](https://d3js.org/d3-scale/linear#linear_rangeRound), [unknown](https://d3js.org/d3-scale/linear#linear_unknown)…`
)}

function _scale_symlog(md){return(
md`### SymLog scales
`
)}

function _60(md){return(
md`[d3.scaleSymLog](https://d3js.org/d3-scale/symlog) offers a bi-symmetric log transformation, suitable ‘for wide-range data’. Its domain can span several orders of magnitude, with negative as well as positive values. A parameter [*scale*.constant](https://d3js.org/d3-scale/symlog#symlog_constant) can set (or read) the slope around 0 — defaults to 1.

If the domain is symmetric, it is usually a good idea to set a symmetric range too.`
)}

function _n(html)
{
  const form = html`<form>
  <input name=i type=number min=0 value=1 step=1 style="width:40px;">
  <span style="font-size:smaller;font-style:oblique;">order of magnitude (powers of 10)</span>
</form>`;
  form.i.oninput = () => (form.value = form.i.valueAsNumber);
  form.i.oninput();
  return form;
}


function _constant_e(html)
{
  const form = html`<form>
  <input name=i type=number min=0 value=0 step=1 style="width:40px;">
  <span style="font-size:smaller;font-style:oblique;">constant (powers of 10)</span>
</form>`;
  form.i.oninput = () => (form.value = form.i.valueAsNumber);
  form.i.oninput();
  return form;
}


function _63(visualizeScale,d3,n,constant_e){return(
visualizeScale(
  d3
    .scaleSymlog()
    .domain([-(10 ** n), 10 ** n])
    .constant(10 ** constant_e)
    .range([-1, 1])
)
)}

function _64(visualizeScale,d3,n,constant_e){return(
visualizeScale(
  d3.scaleSymlog()
    .domain([0, 10 ** n])
    .constant(10 ** constant_e)
    .range([0, 1])
)
)}

function _symlogTime(md){return(
md`The symlog scale can be creatively applied to relative temporal data (the days around “now” are much denser in data points than the long-gone past and far future):`
)}

function _days(){return(
[
  // l: label ; v: value
  { l: "The Big Bang", v: -13.8e9 * 365.24 },
  { l: "Dinosaur extinction", v: -65e6 * 365.24 },
  { l: "The founding of Rome", v: -(800 + 2019) * 365.24 },
  { l: "Last year", v: -365 },
  { l: "Yesterday", v: -1 },
  { l: "Now", v: +0 },
  // { l: "In 2 hours", v: +2 / 24 },
  { l: "Tomorrow", v: +1 },
  { l: "Next year", v: +365 },
  { l: "2100", v: +365.24 * 91 },
  { l: "Asimov’s Foundation", v: +12000 * 365.24 },
  { l: "Sun dies", v: 6e9 * 365 }
]
)}

function _67(d3,days,width)
{
  const scale = d3.scaleSymlog()
    .domain(d3.extent(days, d => d.v))
    .constant(0.1) // try 0.01 to leave room for "in 2 hours"
    .range([width * 0.05, width * 0.95]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", 100)
    .attr("style", "text-anchor:middle; font-family: sans-serif; font-size:12px");

  svg.append("line")
    .attr("x1", scale.range()[0])
    .attr("x2", scale.range()[1])
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "#999");
  
  const g = svg.selectAll("g")
    .data(days)
    .join("g")
    .attr("transform", d => `translate(${scale(d.v)}, 50)`);

  g.append("circle")
    .attr("r", 4)
    .attr("fill", d => (d.l === "Now" ? "red" : "black"));
  g.append("text")
    .attr("y", (_, i) => -8 + 30 * (i % 2))
    .attr("dx", 3)
    .text(d => d.l);

  return svg.node();
}


function _standard(md){return(
md`## Standard methods

All the continous scales presented here offer standard methods:

[*scale*.copy](https://d3js.org/d3-scale/linear#linear_copy) returns a copy of the scale, with the same parameters. Useful when we need to tweak a setting without mutating the original scale:`
)}

function _paintRgb(d3){return(
d3.scaleSqrt()
  .range(["blue", "red"])
  .interpolate(d3.interpolateHsl)
)}

function _paintHsl(paintRgb,d3){return(
paintRgb.copy()
  .interpolate(d3.interpolateHslLong)
)}

function _71(html,d3,paintRgb,paintHsl){return(
html`<div>
${d3.ticks(0, 1, 20)
  .map(paintRgb)
  .map(t => `<span style="background:${t}; height: 100px; width:4.7%; display: inline-block;">&nbsp;</span>`)}</div>

<div>
${d3.ticks(0, 1, 20)
  .map(paintHsl)
  .map(t => `<span style="background:${t}; height: 100px; width:4.7%; display: inline-block;">&nbsp;</span>`)}</div>`
)}

function _72(md){return(
md`[*scale*.invert](https://d3js.org/d3-scale/linear#linear_invert): given a value from the range, returns the corresponding value from the domain. (Works only for scales with a numeric range.)`
)}

function _hitValue(){return(
"Touch or hover the chart below:"
)}

function _74(d3,days,width,$0)
{
  const scale = d3.scaleSymlog()
    .domain(d3.extent(days, d => d.v))
    .constant(0.1) // try 0.01 to leave room for "in 2 hours"
    .range([width * 0.05, width * 0.95]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", 100)
    .attr(
      "style",
      "text-anchor:middle; font-family: sans-serif; font-size:12px"
    );

  svg
    .append("line")
    .attr("x1", scale.range()[0])
    .attr("x2", scale.range()[1])
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "#999");

  const g = svg
    .selectAll("g")
    .data(days)
    .join("g")
    .attr("transform", d => `translate(${scale(d.v)}, 50)`);

  g.append("circle")
    .attr("r", 4)
    .attr("fill", d => (d.l === "Now" ? "red" : "black"));
  g.append("text")
    .attr("y", (_, i) => -8 + 30 * (i % 2))
    .attr("dx", 3)
    .text(d => d.l);

  svg.on("mousemove click", function(event) {
    const days = scale.invert(d3.pointer(event)[0]);
    $0.value =
      Math.abs(Math.round(days)) <= 1
        ? Math.round(24 * days) + " hours"
        : Math.round(days) + " days";
  });

  return svg.node();
}


function _75(md){return(
md`[*scale*.clamp](https://d3js.org/d3-scale/linear#linear_clamp) restricts the output value to the range. Useful to keep data points in the screen — even when their values exceed the domain’s bounds. For example, suppose we want to draw a circle with a surface area proportional to one of our data’s dimensions; but some of our data points might be outside the domain, for example have a negative value.`
)}

function _radius(d3){return(
d3.scaleSqrt([0, 100], [0, 30])
)}

function _77(radius){return(
radius(-1e-6)
)}

function _78(d3)
{
  const clamped = d3.scaleSqrt([0, 100], [0, 30]).clamp(true);
  return clamped(-1e-6); // 👍 fixed !
}


function _79(radius){return(
radius.clamp()
)}

function _80(md){return(
md`[*scale*.unknown](https://d3js.org/d3-scale/linear#linear_unknown) sets the return value for unknown (undefined or NaN) input values. Useful when we want to show the missing data in a specific place — below, on the left of the chart.`
)}

function _x(d3,width){return(
d3.scaleLinear([0, 1], [60, width * 0.95]).unknown(10)
)}

function _values(){return(
Array.from({ length: 100 }, (_, i) =>  i % 10 === 0 ? NaN : Math.random())
)}

function _83(DOM,width,values,x)
{
  const context = DOM.context2d(width, 50);

  for (const v of values) {
    context.beginPath();
    context.arc(x(v), 10 + 30 * Math.random(), 5, 0, 2 * Math.PI);

    if (isNaN(v)) context.fillStyle = "#ff000044";
    else context.fillStyle = "#00000044";

    context.fill();
  }

  return context.canvas;
}


function _84(md){return(
md`---

## Appendix`
)}

function _visualizeScale(width,d3){return(
function visualizeScale(scale) {
  const w = Math.min(600, width),
    h = 300,
    m = width > 599 ? 30 : 10;
  const x = d3.scaleLinear()
      .domain(d3.extent(scale.domain()))
      .nice()
      .range([m, w - m]),
    y = d3.scaleLinear()
      .domain(d3.extent(scale.range()))
      .nice()
      .range([h - m, m]),
    svg = d3.create("svg")
      .attr("width", width + 20)
      .attr("height", h + 20),
    g = svg.append("g"),
    line = [];

  for (let i = m + 1e-6; i < w - m; i += 1) {
    const X = x.invert(i),
      Y = scale(X),
      j = y(Y);
    line.push([i, j]);
  }

  g.append("path")
    .attr("d", "M" + line.join("L"))
    .style("stroke", "black")
    .style("fill", "none");

  g.append("g")
    .attr("transform", `translate(${m},0)`)
    .call(d3.axisLeft(y));
  g.append("g")
    .attr("transform", `translate(0,${y(0)})`)
    .call(d3.axisBottom(x));

  return svg.node();
}
)}

function _visualizeTicks(width,d3){return(
function visualizeTicks(scale, tickArguments) {
  const height = 20, m = width > 599 ? 90 : 10;

  if (tickArguments === undefined) tickArguments = [];

  scale.range([m, width - m]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("g").call(d3.axisBottom(scale).ticks(...tickArguments));

  return svg.node();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("scale_sqrt")).define("scale_sqrt", ["tex","md"], _scale_sqrt);
  main.variable(observer("population2radius")).define("population2radius", ["d3"], _population2radius);
  main.variable(observer()).define(["population2radius"], _4);
  main.variable(observer()).define(["population2radius"], _5);
  main.variable(observer()).define(["population2radius"], _6);
  main.variable(observer()).define(["d3","svg","width","population2radius"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["d3","svg","width","population2radius"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["d3","svg","width"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["d3","svg","width"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["visualizeScale","d3"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["visualizeScale","d3"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["visualizeScale","d3"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["visualizeScale","d3"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["visualizeScale","d3"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("scale_pow")).define("scale_pow", ["tex","md"], _scale_pow);
  main.variable(observer()).define(["visualizeScale","d3","k"], _27);
  main.variable(observer("viewof k")).define("viewof k", ["Inputs"], _k);
  main.variable(observer("k")).define("k", ["Generators", "viewof k"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("paint")).define("paint", ["d3","k"], _paint);
  main.variable(observer()).define(["html","d3","paint"], _31);
  main.variable(observer()).define(["tex","md"], _32);
  main.variable(observer()).define(["visualizeScale","d3"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["visualizeScale","d3"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("scale_log")).define("scale_log", ["md"], _scale_log);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["visualizeScale","d3"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("objects")).define("objects", _objects);
  main.variable(observer("scaleUniverse")).define("scaleUniverse", ["d3"], _scaleUniverse);
  main.variable(observer()).define(["width","scaleUniverse","svg","objects","d3"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("scaleBinary")).define("scaleBinary", ["d3"], _scaleBinary);
  main.variable(observer()).define(["visualizeTicks","scaleBinary"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["d3"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("powers")).define("powers", ["d3"], _powers);
  main.variable(observer()).define(["visualizeTicks","powers"], _52);
  main.variable(observer()).define(["visualizeTicks","powers"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("binaryScale")).define("binaryScale", ["d3"], _binaryScale);
  main.variable(observer()).define(["visualizeTicks","binaryScale"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("scale_symlog")).define("scale_symlog", ["md"], _scale_symlog);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("viewof n")).define("viewof n", ["html"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof constant_e")).define("viewof constant_e", ["html"], _constant_e);
  main.variable(observer("constant_e")).define("constant_e", ["Generators", "viewof constant_e"], (G, _) => G.input(_));
  main.variable(observer()).define(["visualizeScale","d3","n","constant_e"], _63);
  main.variable(observer()).define(["visualizeScale","d3","n","constant_e"], _64);
  main.variable(observer("symlogTime")).define("symlogTime", ["md"], _symlogTime);
  main.variable(observer("days")).define("days", _days);
  main.variable(observer()).define(["d3","days","width"], _67);
  main.variable(observer("standard")).define("standard", ["md"], _standard);
  main.variable(observer("paintRgb")).define("paintRgb", ["d3"], _paintRgb);
  main.variable(observer("paintHsl")).define("paintHsl", ["paintRgb","d3"], _paintHsl);
  main.variable(observer()).define(["html","d3","paintRgb","paintHsl"], _71);
  main.variable(observer()).define(["md"], _72);
  main.define("initial hitValue", _hitValue);
  main.variable(observer("mutable hitValue")).define("mutable hitValue", ["Mutable", "initial hitValue"], (M, _) => new M(_));
  main.variable(observer("hitValue")).define("hitValue", ["mutable hitValue"], _ => _.generator);
  main.variable(observer()).define(["d3","days","width","mutable hitValue"], _74);
  main.variable(observer()).define(["md"], _75);
  main.variable(observer("radius")).define("radius", ["d3"], _radius);
  main.variable(observer()).define(["radius"], _77);
  main.variable(observer()).define(["d3"], _78);
  main.variable(observer()).define(["radius"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("x")).define("x", ["d3","width"], _x);
  main.variable(observer("values")).define("values", _values);
  main.variable(observer()).define(["DOM","width","values","x"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("visualizeScale")).define("visualizeScale", ["width","d3"], _visualizeScale);
  main.variable(observer("visualizeTicks")).define("visualizeTicks", ["width","d3"], _visualizeTicks);
  return main;
}
