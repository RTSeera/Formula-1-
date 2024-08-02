import define1 from "./26670360aa6f343b@209.js";
import define2 from "./a33468b95d0b15b0@817.js";
import define3 from "./79750b3b8e929d9d@240.js";
import define4 from "./da5b85fbbee1c6d3@1199.js";

function _1(md){return(
md`# Detailed Documentation for Formula 1 Data Visualization Project`
)}

function _2(md){return(
md`# Introduction`
)}

function _3(md){return(
md`This documentation accompanies a series of interactive data visualizations which explore various aspects of Formula 1 (F1) racing performance from 2004 to 2022. The project seeks to unveil the intricate dance between driver skill, constructor capabilities, and the evolving dynamics of F1 races.`
)}

function _4(md){return(
md`# Data Used`
)}

function _5(md){return(
md`# Circuits Dataset`
)}

function _6(md){return(
md`# Overview`
)}

function _7(md){return(
md`This dataset encompasses information about Formula 1 racing circuits used throughout the observed period from 2004 to 2022. It is a key component in analyzing the influence of circuit characteristics on race outcomes.
# Usage in Visualizations
This dataset is used to cross-reference circuit information with racing results, allowing for analysis of how geographical and physical characteristics of circuits impact racing conditions and outcomes.`
)}

function _circuits_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("circuits.csv"),{from:{table:"circuits"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _9(md){return(
md`# Constructor Standings Dataset 
# Overview
This dataset provides detailed standings of F1 constructor teams after each race, indicating their performance in terms of points, positions, and wins over the course of a season.
# Example Entries
Entry with 'constructorStandingsId' 1 shows the constructor with 'constructorId' 1, linked to 'raceId' 18, in 1st position with 14 points and 1 win.
# Usage in Visualizations
The dataset is utilized to track the success and progress of constructor teams across different races and seasons. It provides insights into the competitiveness of the teams, their consistency, and how they accumulate points relative to one another throughout the F1 championship.`
)}

function _constructor_standings_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("constructor_standings.csv"),{from:{table:"constructor_standings"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _11(md){return(
md`# Constructors Dataset
# Overview
This dataset catalogues information about the Formula 1 teams, known as constructors, detailing their identity, nationality, and background. This dataset plays a crucial role in associating race results and standings with the teams responsible for the cars and drivers.
# Usage in Visualizations
The dataset is fundamental in correlating race data with the constructors, allowing for a deeper analysis of how teams' nationalities and historical backgrounds might correlate with their performance and strategies in the sport.`
)}

function _constructors_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("constructors.csv"),{from:{table:"constructors"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _13(md){return(
md`# Drivers Dataset
# Overview
This dataset is a comprehensive collection of data concerning the drivers in Formula 1, detailing their personal and professional details. It is integral to associating individual performances with the results and standings data.
# Usage in Visualizations
This dataset allows for the exploration of driver statistics and biographies, facilitating the analysis of how age, experience, and nationality may influence race outcomes. By linking driver data with race results, one can investigate patterns such as the prevalence of wins by nationality or the impact of age on driver performance.`
)}

function _drivers_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("drivers.csv"),{from:{table:"drivers"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _15(md){return(
md`# Races Dataset
# Overview
This dataset records details of each Formula 1 Grand Prix, providing a temporal and spatial context to the races over multiple seasons. This dataset is fundamental for temporal analyses and understanding the sequence of events in a given season.
# Usage in Visualizations
The dataset can be used to create a variety of visualizations, such as timelines of races throughout the seasons, maps displaying the locations of circuits, and detailed analyses of race schedules. It enables viewers to track the progression of the F1 season, compare the timing of races across years, and correlate race outcomes with environmental factors like circuit characteristics.`
)}

function _races_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("races.csv"),{from:{table:"races"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _17(md){return(
md`# Results Dataset
# Overview
This dataset encapsulates the outcomes of Formula 1 races, providing granular data on each driver's performance for every race. It is pivotal for analyzing the details that contribute to the final standings of both drivers and constructors.
# Usage in Visualizations
The dataset can be used to generate a multitude of visualizations, such as line graphs depicting the consistency of drivers' performances across races, bar charts showing the distribution of points earned by drivers, and scatter plots examining the relationship between grid positions and final race results. It offers a detailed perspective on the drivers' performances and how various factors contribute to their success or failure in each race.`
)}

function _results_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("results.csv"),{from:{table:"results"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _19(md){return(
md`# Status Dataset
# Overview
This dataset catalogs the final status of drivers at the conclusion of each race, providing insight into the various outcomes beyond the finishing position. This dataset is essential for understanding the reasons behind drivers' race results, whether they finished the race and, if not, what issues they encountered.
# Usage in Visualizations
This dataset allows analysts to categorize race results beyond simple placement, which can be used to create visualizations that show the reliability of cars, the frequency of certain types of retirements, or the impact of rule infractions over time.`
)}

function _status_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("status.csv"),{from:{table:"status"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _results(aq,results_raw){return(
aq.from(results_raw).select(
  aq.not(
    "number",
    "resultId",
    "positionText",
    "position"
  )
)
)}

function _drivers(aq,drivers_raw){return(
aq
  .from(drivers_raw)
  .derive({
    driverNationality: (d) => d.nationality
  })
  .select(aq.not("url", "nationality"))
)}

function _constructors(aq,constructors_raw){return(
aq
  .from(constructors_raw)
  .derive({
    constructorNationality: (d) => d.nationality,
    constructorName: (d) => d.name
  })
  .select(aq.not("url", "nationality", "name"))
)}

function _races(aq,races_raw){return(
aq
  .from(races_raw)
  .derive(
    {
      raceName: (d) => d.name
    },
    { before: "fp1_date" }
  )
  .select(
    aq.not(
      "url",
      "name",
      "time",
      "fp1_date",
      "fp1_time",
      "fp2_date",
      "fp2_time",
      "fp3_date",
      "fp3_time",
      "quali_time",
      "quali_date",
      "sprint_date",
      "sprint_time"
    )
  )
)}

function _circuits(aq,circuits_raw){return(
aq
  .from(circuits_raw)
  .derive(
    {
      trackName: (d) => d.name
    },
    { before: "location" }
  )
  .select(aq.not("url", "alt", "name"))
)}

function _status(aq,status_raw){return(
aq.from(status_raw)
)}

function _constructor_data(aq,constructor_standings_raw,constructors,races,circuits){return(
aq
  .from(constructor_standings_raw)
  .join(constructors, ["constructorId"])
  .join(races, ["raceId"])
  .join(circuits, ["circuitId"])
  .select(aq.not("raceId", "constructorId", "constructorStandingsId", "circuitId"))
)}

function _data(aq,results,drivers,constructors,races,status,circuits,op){return(
aq
  .from(results)
  .join(drivers, ["driverId"])
  .join(constructors, ["constructorId"])
  .join(races, ["raceId"])
  .join(status, ["statusId"])
  .join(circuits, ["circuitId"])
  .select(aq.not("driverId", "constructorId", "raceId", "statusId", "circuitId"))
  .filter((d) => d.milliseconds !== "\\N")
  .derive({
    FL_ms: d => op.timestampToMilliseconds(d.fastestLapTime),
    targetNum: d => op.count()
  }, {
    before: "fastestLap"
  })
)}

function _29(md){return(
md`# History Of F1
The history of Formula 1 (F1) is marked by significant technological, regulatory, and competitive changes since its inception in 1950. Here are some of the key highlights:

# 1950s: The Beginning
**First Championship (1950):** The first F1 World Championship race took place at Silverstone, UK.
Technological Era: Cars used front-engined, narrow-treaded tires, and were predominantly made of aluminum.
# 1960s: Technological Advancements
**Rear-Engine Revolution (1960s):** The shift to rear-engine cars significantly improved handling.
Aerodynamic Innovations: Introduction of wings and aerodynamic elements for downforce.
# 1970s: Safety and Regulations
**Safety Measures:** After several fatal accidents, F1 focused on improving safety standards.
Ground-Effect Aerodynamics: Teams started using ground-effect aerodynamics for better grip.
# 1980s: Turbo Era and Electronics
**Turbocharged Engines:** The 1980s saw the rise of powerful turbocharged engines.
Electronic Innovations: Introduction of electronic aids like traction control and semi-automatic gearboxes.
# 1990s: Refined Technology and Rivalries
**Electronics Ban (1994):** After Ayrton Senna's death, many electronic aids were banned to improve safety.
Schumacher Era: Michael Schumacher's dominance began with Benetton and later Ferrari.
# 2000s: New Millennium Changes
**Team Dominance:** Ferrari, followed by Red Bull, dominated early and late 2000s respectively.
Regulatory Changes: Changes in rules to improve racing competitiveness, including tire and engine regulations.
# 2010s: Hybrid Power and Aerodynamics
**Hybrid Engines (2014):** Introduction of V6 turbo-hybrid engines, emphasizing fuel efficiency.
Aero Regulation Tweaks: Frequent changes in aerodynamic rules to promote overtaking and competition.
# 2020s: The New Era
**COVID-19 Pandemic:** The 2020 season was heavily impacted, leading to a revised, shorter calendar.
Cost Cap and New Regulations (2022): Introduction of a budget cap and significant car design changes to improve racing and reduce costs.
# Key Drivers and Teams
**Legendary Drivers:** Juan Manuel Fangio, Ayrton Senna, Alain Prost, Michael Schumacher, Lewis Hamilton.
Iconic Teams: Ferrari, McLaren, Mercedes, Red Bull, Williams, Lotus.
# Technological Milestones
**Advancements in Safety:** Introduction of the HANS device, improved helmets, and safer circuits.

**Sustainable Practices:** Efforts towards sustainability, including fuel, tires, and operational practices.
Throughout its history, \\F1 has continually evolved, driven by innovation, competition, and a constant push for safety and sustainability.
`
)}

function _30(md){return(
md`# User Guide for Interactive F1 Visualizations
Welcome to the interactive dashboard exploring the fascinating world of Formula 1 racing. Our visualizations bring to life the data from 2004 to 2022, showcasing constructors' performances, fastest laps, and race strategies. Here's how to dive in and explore the data:

# Constructor Points Bar Chart
**Interaction:** Hover over each bar to see the total points scored by each constructor.
# Fastest Lap Speed by Circuit
**Interaction:** Use your mouse to hover over individual dots to display the fastest lap speeds per constructor at each circuit.
# Fastest Lap Time Distribution
**Interaction:** Hovering over the points reveals the specific fastest lap times across races.
# Constructor Standings Over Time
**Interaction:** Select a year from the dropdown menu to display the constructor standings for that season.
# Qualifying Position vs. Race Finishing Position
**Interaction:** Points on this scatter plot respond to your cursor, revealing the correlation between a constructor's qualifying and race finishing positions.
# Interacting with the Timeline
**Interaction:** Click and drag along the timeline to focus on specific years or use the zoom feature to narrow down on particular seasons.
# Changing Tracks and Constructors
**Interaction:** Click on a constructor name or track from the legends to isolate their data across all visualizations for focused analysis.
# General Navigation
**Panning:** Click and drag to move across the visualization space.

**Zooming:** Use the scroll wheel or trackpad gesture to zoom in and out for a granular view or a broader perspective.
# For Best Experience
Begin by selecting a year to anchor your analysis in a specific season.
Explore data for one constructor at a time to see their performance nuances across different visualizations.
Use the zoom and pan functions to focus on areas of interest, like a particularly competitive season or a groundbreaking regulation change.
`
)}

function _31(md){return(
md`# Visualisation
# 1. Constructor Points Bar Chart
**Description:** This bar chart displays the total points achieved by each constructor from 2004 to 2022. Each constructor is represented by a distinct color, and the length of the bar correlates with the points scored, providing a quick visual interpretation of overall performance.
# How does the design of a circuit influence the maximum speeds achieved by the constructors?
Circuit design significantly impacts the speeds that F1 cars can achieve. Tracks with long straights, like Monza, allow cars to reach higher top speeds due to lower aerodynamic drag in straight-line speed setups. In contrast, circuits with tight corners and chicanes, like the Circuit de Monaco, require high downforce setups, which reduce top speed but increase cornering speed.

# Are there any noticeable advancements in technology or regulations reflected in the speed trends?
Yes, advancements in technology, such as the introduction of hybrid turbo engines in 2014, have allowed cars to achieve faster lap times through improved power and efficiency. Additionally, regulatory changes, such as those affecting aerodynamics and tire compounds, can also be observed, often leading to fluctuating lap speeds as teams adapt to new rules.

# 2.Fastest Lap Speed by Circuit
**Description:** A collection of scatter plots represents the fastest lap speeds achieved by various constructors across selected circuits. Each dot's color corresponds to a different constructor, and its position reflects the fastest speed recorded for that year.
# How does the design of a circuit influence the maximum speeds achieved by the constructors?
Circuit design significantly impacts the speeds that F1 cars can achieve. Tracks with long straights, like Monza, allow cars to reach higher top speeds due to lower aerodynamic drag in straight-line speed setups. In contrast, circuits with tight corners and chicanes, like the Circuit de Monaco, require high downforce setups, which reduce top speed but increase cornering speed.
# Are there any noticeable advancements in technology or regulations reflected in the speed trends?
Yes, advancements in technology, such as the introduction of hybrid turbo engines in 2014, have allowed cars to achieve faster lap times through improved power and efficiency. Additionally, regulatory changes, such as those affecting aerodynamics and tire compounds, can also be observed, often leading to fluctuating lap speeds as teams adapt to new rules.`
)}

function _32(data,vl,op,constructor_data)
{
  const d = data
    .filter((d) => d.year >= 2004)
    .groupby("trackName")
    .count()
    .filter((d) => d.count >= 200)
    .dedupe("trackName")
    .array("trackName");

  const yearSelect = vl.selectInterval().encodings("x");
  

  const targetYears = [
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022
  ];
  const constructorYearSelect = vl
    .param("constructorYearSelect")
    .value(targetYears.at(-1)) // initial value
    .bind(vl.menu(targetYears).name("Select an F1 season year: "));

  const constructorSelect = vl
    .selectPoint()
    .fields("constructorName")
    .on("click")
    .clear("dblclick");

  // FL_per_year visualization
  const FL_per_year = vl
    .markCircle()
    .data(
      data
        .filter((v) => op.matchesTargetYear(v.year))
        .filter((x) => op.matchesTargetTracks(x.trackName))
    )
    .transform([vl.filter("datum.year >= 2004")])
    .params(yearSelect)
    .encode(
      vl
        .x()
        .fieldT("date")
        .timeUnit("year")
        .sort("x")
        .title("Race year")
        .scale({
          domain: [2003, 2023]
        }),
      vl
        .y()
        .fieldQ("fastestLapSpeed")
        .title("Fastest lap speed (km/h)")
        .scale({
          domain: [140, 280]
        }),
      vl.tooltip([
        "year",
        "surname",
        "forename",
        "constructorName",
        "fastestLapSpeed",
        "trackName"
      ]),
      vl
        .facet({
          field: "trackName",
          columns: 3
        })
        .title(null),
      vl.size().value(100),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.1")).value("0.8"),
      vl
        .color()
        .if(vl.not(constructorSelect), vl.value("gray"))
        .field("constructorName")
        .scale({ scheme: "category10" }) // Colorblind-friendly color scheme
    )
    .title({
      text: "What goes into winning constructor championships?",
      subtitle: [
        "Based on the observed data between 2004 - 2022, we found that the speed of cars is not only dependent on the constructors (their R&D budget), ",
        "but it also has a lot to do with the qualifying finish and overall racing strategy."
        
      ]
    })
    .width(300)
    .height(100)
    .params(vl.selectInterval().bind("scales"));

  const FL_per_lap = vl
    .markCircle()
    .data(
      data
        .filter((v) => op.matchesTargetYear(v.year))
        .filter((x) => op.matchesTargetTracks(x.trackName))
    )
    .transform([vl.filter("datum.year >= 2004")])
    .params(constructorSelect)
    .encode(
      vl.x().fieldO("fastestLap").title("Fastest lap"),
      vl
        .y()
        .fieldQ("FL_ms")
        .scale({
          domain: [50, 130]
        })
        .title("Fastest lap (sec)"),
      vl.tooltip([
        "year",
        "surname",
        "forename",
        "constructorName",
        "fastestLapSpeed",
        "trackName"
      ]),
      vl.size().value(100),
      vl.color().field("constructorName"),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.2")).value("0.8")
    )
    .width(980)
    .params(vl.selectInterval().bind("scales"));

  const constructor_line = vl
    .markLine()
    .encode(
      vl.x().fieldO("round").title("Round of season"),
      vl.y().fieldO("position").title("Postion in constructor standing"),
      vl.color().field("constructorName").title("Constructor name"),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.2")).value("0.8"),
      vl.size().if(constructorSelect, vl.value("3"))
    )
    .width(465)
    .height(465);

  const constructor_mark = vl
    .markCircle()
    .params(constructorSelect)
    .encode(
      vl.x().fieldO("round"),
      vl.y().fieldO("position"),
      vl.size().value(125),
      vl.color().field("constructorName"),
      vl.tooltip(["constructorName", "round", "year", "position", "points"]),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.2")).value("0.8")
    )
    .width(465)
    .height(465);

  const constructor_plot = vl
    .data(constructor_data)
    .transform(vl.filter("datum.year == constructorYearSelect"))
    .layer(constructor_line, constructor_mark);

  const grid_position = vl
    .markCircle()
    .params(constructorSelect)
    .encode(
      vl.x().field("positionOrder").title("Race finishing position"),
      vl.y().field("grid").sort("descending").title("Qualifying position"),
      vl
        .color()
        .if(vl.not(constructorSelect), vl.value("gray"))
        .field("constructorName")
        .scale({ scheme: "category10" }),
      vl.shape().field('constructorName'),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.2")).value("0.8"),
      vl.size().value(125),
      vl.tooltip(["year", "surname", "forename", "constructorName", "round"])
    )
    .width(465)
    .height(465);

  const grid_trend = vl
    .markLine()
    .transform([vl.regression().on("positionOrder").regression("grid")])
    .encode(
      vl.x().fieldQ("positionOrder").title(null).axis(null),
      vl.y().fieldQ("grid").sort("ascending").title(null).axis(null),
      vl.opacity().value("0.75"),
      vl.strokeDash().value([2, 1]),
      vl.strokeWidth().value(2.5)
    );

  const grid_plot = vl
    .data(
      data
        .filter((v) => op.matchesTargetYear(v.year))
        .filter((x) => op.matchesTargetTracks(x.trackName))
        .filter((x) => x.grid !== 0)
    )
    .transform([vl.filter("datum.year == constructorYearSelect")])
    .layer(grid_position, grid_trend)
    .width(465)
    .height(465);

  const constructor_wins = vl
    .markBar()
    .data(
      constructor_data
        .filter((v) => op.matchesTargetYear(v.year))
        .filter((x) => op.matchesTargetTracks(x.trackName))
    )
    .padding({ bottom: 35 })
    .params(constructorSelect)
    .encode(
      vl.y().max("points").title("Points achieved"),
      vl.x().fieldO("constructorName").sort("-y").title("Constructor name"),
      vl.color().field("constructorName"),
      vl.opacity().if(vl.not(constructorSelect), vl.value("0.2")).value("0.8")
    )
    .transform([vl.filter("datum.year == constructorYearSelect")])
    .width(980)
    .height(250);
  const split_bottom = vl.hconcat(constructor_plot, grid_plot);
  const rtn = vl
    .vconcat(constructor_wins, FL_per_year, FL_per_lap, split_bottom) // Rearranged order
    .params(constructorYearSelect);

  return rtn.render();
}


function _33(md){return(
md`# Visualizations
# 3. Fastest Lap Time Distribution
**Description:** This dense scatter plot shows the distribution of the fastest laps across all races and constructors. Each point's vertical position indicates the lap time, while its horizontal placement shows the race number, offering an insight into consistency and performance.
# Which constructors consistently achieve the fastest laps, and what does that say about their performance strategy?
Constructors like Mercedes, Red Bull, and Ferrari often achieve the fastest laps, indicating a strong emphasis on qualifying performance and the ability to maintain a high pace throughout the race. This suggests that these teams prioritize aerodynamic efficiency, power unit performance, and tire management to maximize their speed on track.
# How do external factors like weather conditions or track temperature impact the fastest lap times?
Weather conditions and track temperatures can dramatically affect tire performance, car handling, and engine efficiency. Wet or cold conditions typically lead to slower lap times due to reduced grip and higher tire wear, while optimal temperatures can help tires reach their performance window, leading to faster laps.

# 4.Constructor Standings Over Time
**Description:** The line graph tracks the changes in constructor standings over the rounds of a selected F1 season. The x-axis represents the round number, while the y-axis indicates the constructor's position, with each line color-coded to a specific constructor.
# How do constructor standings fluctuate throughout a season, and what key events cause significant shifts?
Standings can fluctuate due to various factors, including race wins, podium finishes, technical failures, and rule infractions leading to disqualifications or penalties. Key events such as the introduction of upgrades, mid-season rule changes, or accidents can also cause significant shifts in the standings.

# What correlations can be drawn between the standings and the introduction of new technology or team changes?
The introduction of new technology often correlates with a team's upward movement in the standings, as seen when teams bring significant car updates that improve performance. Similarly, team changes, including driver lineups or key personnel shifts, can impact the dynamics within a team, affecting their performance and standings.

# 5.Qualifying Position vs. Race Finishing Position
**Description:** This scatter plot compares the qualifying position with the final race position, with each constructor represented by a unique color. The diagonal line serves as a reference for comparing qualifying performance to race results.
# How predictive is the qualifying position for the final race outcome?
Qualifying position is often a strong indicator of race performance, as starting closer to the front usually correlates with a higher chance of finishing in a top position. However, it is not absolute, as race strategies, pit stops, and on-track incidents can drastically alter the outcome.
# What strategies do constructors employ when their qualifying performance does not align with race results?
When qualifying performance is poor, teams may adopt alternative race strategies, such as varying pit stop strategies, aggressive overtaking maneuvers, or optimizing tire usage. They may also capitalize on safety car periods or weather changes to gain positions.`
)}

function _34(md){return(
md`# Libraries and Functions`
)}

function _d3(require){return(
require("d3@7")
)}

function _40(data){return(
data.filter((d) => d.year >= 2004).groupby('trackName').count().filter(d => d.count >= 150).dedupe('trackName').array('trackName')
)}

function _41(md){return(
md`# Conclusion:
In this Formula 1 data visualization project, we delved into the sport's intricate dynamics from 2004 to 2022, unraveling the complex interplay between circuits, constructors, and drivers. Our interactive visualizations reveal how factors like circuit design and technological advancements impact race outcomes and team strategies. This exploration not only enhances the understanding of F1's competitive landscape but also highlights the sport's evolution through a data-driven lens. The project invites both fans and newcomers to discover the compelling stories behind each race, offering a deeper appreciation of the thrilling world of Formula 1 racing.

Although There are many advantages of this Project, there are some drawbacks too.
# Drawbacks:
Data Completeness: While comprehensive, our datasets may not capture every nuance of the sport. To mitigate this, we recommend continuous updates and inclusion of more granular data as it becomes available.

Interpretation Risks: There's a risk of misinterpretation, especially in complex visualizations. To address this, we've provided detailed documentation and guidelines on how to interpret the charts accurately.

Technology Limitations: The reliance on specific technologies for visualization might limit accessibility for some users. We suggest exploring alternative platforms or formats to ensure wider accessibility.`
)}

function _42(aq,data){return(
aq.addFunction(
  "matchesTargetTracks",
  (trackName) => {
    const targetTracks = data
      .filter((d) => d.year >= 2004)
      .groupby("trackName")
      .count()
      .filter((d) => d.count >= 150)
      .dedupe("trackName")
      .array("trackName");

    if (targetTracks.includes(trackName)) return trackName;
  },
  { override: true }
)
)}

function _43(aq){return(
aq.addFunction(
  "matchesTargetYear",
  (year) => {
    const targetYears = [
      2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
      2016, 2017, 2018, 2019, 2020, 2021, 2022
    ];
    
    if(targetYears.includes(Number(year))) return year
  },
  { override: true }
)
)}

function _44(aq){return(
aq.addFunction("timestampToMilliseconds", (time) => {
  const arr = time.split(":")
  let min = arr[0]
  let sec = arr[1]
  
  return Number(Number(min * 60) + Number(sec)).toFixed(3)
}, {
  override: true
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["constructors.csv", {url: new URL("./files/bb576a6a969c7447bebb990b1528d0fd17b7711338633a358d994384616c6bfbe840ce727ed444d42e579ea1958df9d2d979f761dfcb2ff7ab31500e119f62d1.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["status.csv", {url: new URL("./files/45b4cb0d3b358efdaeea70cf00bbddb948130d99baeafd7e2bfc6da39f4c42b46559aa02f049aa29fbceeaa34b512ca1cd5db41e386794d8c6e0855a5cb2ada3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["circuits.csv", {url: new URL("./files/6981acc510641baace93ec2980ee143ed632686d1ee4b76b5aa38463b1eedfd780bfe96264bcf3bbb45bb1aab335097a928a0cda26c6415463ea35a055a02793.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["drivers.csv", {url: new URL("./files/67640f297083f56a498bea51c83dca748eb1b2d937b02b9d47f7edd481141753fccfc248e13b5c1fd5bef968bc79056b09ac5b0394f9e516c066cdbceb6dc129.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["races.csv", {url: new URL("./files/2245c328b6fa30903042475a2f0824ae453b1a878fcf5edfb26bac8d9a9231dcd197296d3e20c5ccff34764dfdb9764635e084e94d19cc65f4af824019cb60fb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["constructor_standings.csv", {url: new URL("./files/1b8ce2cdba51500dec7e714f6d665c9f022092797ead6ab7e532cbb3d8ec2f7009435e63494e7e0138ed6f4e8f9271c481c358bfef9ae6d417e61bccff8f781d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["results.csv", {url: new URL("./files/d0a048c52256b387d20e41881fd788bdbf11a263a4dd63704820c9289a86c927fc0ed3954791689010ebed2f60b5b3762682ed36ac88959a8e627fcc4919c33c.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("circuits_raw")).define("circuits_raw", ["__query","FileAttachment","invalidation"], _circuits_raw);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("constructor_standings_raw")).define("constructor_standings_raw", ["__query","FileAttachment","invalidation"], _constructor_standings_raw);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("constructors_raw")).define("constructors_raw", ["__query","FileAttachment","invalidation"], _constructors_raw);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("drivers_raw")).define("drivers_raw", ["__query","FileAttachment","invalidation"], _drivers_raw);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("races_raw")).define("races_raw", ["__query","FileAttachment","invalidation"], _races_raw);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("results_raw")).define("results_raw", ["__query","FileAttachment","invalidation"], _results_raw);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("status_raw")).define("status_raw", ["__query","FileAttachment","invalidation"], _status_raw);
  main.variable(observer("results")).define("results", ["aq","results_raw"], _results);
  main.variable(observer("drivers")).define("drivers", ["aq","drivers_raw"], _drivers);
  main.variable(observer("constructors")).define("constructors", ["aq","constructors_raw"], _constructors);
  main.variable(observer("races")).define("races", ["aq","races_raw"], _races);
  main.variable(observer("circuits")).define("circuits", ["aq","circuits_raw"], _circuits);
  main.variable(observer("status")).define("status", ["aq","status_raw"], _status);
  main.variable(observer("constructor_data")).define("constructor_data", ["aq","constructor_standings_raw","constructors","races","circuits"], _constructor_data);
  main.variable(observer("data")).define("data", ["aq","results","drivers","constructors","races","status","circuits","op"], _data);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["data","vl","op","constructor_data"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("Swatches", child2);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child3 = runtime.module(define3);
  main.import("aq", child3);
  main.import("op", child3);
  const child4 = runtime.module(define4);
  main.import("visualizeTicks", child4);
  main.variable(observer()).define(["data"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["aq","data"], _42);
  main.variable(observer()).define(["aq"], _43);
  main.variable(observer()).define(["aq"], _44);
  return main;
}
