/*
Imports
*/

import * as D3 from "d3";
import textures from "textures";

// Viz Library
import Easing from "../animations/easing.js";
import Chart from "../chart.js";
import Filters from "../interfaces/filters.js";
import Legend from "../interfaces/legend.js";
import Tooltip from "../interfaces/tooltip.js";
// Utilities
import grouping from "../utilities/grouping.js";
import sorting from "../utilities/sorting.js";
import unique from "../utilities/unique.js";

/*
Stacked Bar Chart Class
*/

class GroupedStackedBarChart extends Chart {
  // Initialization
  constructor(config) {
    // Configure Parent
    super(config);

    const self = this;

    // Configure Stacked Bar Chart
    self.axis = config.axis;
    self.transitions = config.transitions;
    self.animations = config.animations;
    self.legend = Object.hasOwn(config, "legend") ? config.legend : undefined;
    self.tooltip = Object.hasOwn(config, "tooltip")
      ? config.tooltip
      : undefined;
    self.filters = Object.hasOwn(config, "filters")
      ? config.filters
      : undefined;
    self.sort = Object.hasOwn(config, "sorting")
      ? config.sorting
      : {
          by: "group",
          key: null,
          on: "subgroup",
          ordering: "descending",
        };

    /*
    Setup
    */

    // Set Unique Filters, Groups, Subgroups, ColorScale
    self.filterby = unique.object.values(
      self.data,
      self.accessors.filterby.key,
    );
    self.groups = unique.object.values(self.data, self.accessors.group.key);
    self.subgroups = unique.object.values(
      self.data,
      self.accessors.subgroup.key,
    );
    self.colors = unique.object.values(self.data, self.accessors.color.key);
    self.colorscale = D3.scaleOrdinal().domain(self.colors).range(self.palette);
    self.texturescale = D3.scaleOrdinal()
      .domain(self.filterby)
      .range(self.textures.patterns);

    // Set Filters
    if (self.filters !== undefined) {
      self.filters.keys = ["All"];
      self.filters.keys.push(...self.filterby);
    }

    // Set Mapping
    self.mapping = self.mapData(self.data);

    // Set Colors
    self.colors = self.mapping.colors;

    // Set Textures
    self.texturesMap = Object.fromEntries(
      new Map(
        self.textures.patterns.map((texture) => [
          texture,
          textures
            .paths()
            .d(texture)
            .fill(self.textures.fill)
            .stroke(self.textures.stroke)
            .size(self.textures.size)
            .thicker()
            .lighter(),
        ]),
      ),
    );

    // Ordering by Rotation
    if (self.rotate) {
      self.groups = self.groups.reverse();
    }

    /*
    Get Visualization and Interface Elements
    */

    // Visualization Parent
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("grouped-bar-chart unrotated", true)
      .attr("id", `${self.setID}_visualization`);

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr(
      "id",
      `${self.setID}_interface`,
    );

    /*
    Generate Axes
    */

    self.x = D3.scaleBand()
      .domain(self.groups)
      .range([0, self.dataframe.width])
      .paddingInner(0.05);

    self.y = D3.scaleLinear()
      .domain([
        self.mapping.min,
        Math.floor(self.mapping.max * self.axis.scaling.y),
      ])
      .range([self.dataframe.height, 0]);

    self.subgroupAxis = D3.scaleBand()
      .domain(self.subgroups)
      .range([0, self.x.bandwidth()])
      .padding([0.05]);

    self.axisGrid = self.svg
      .append("g")
      .classed("grid-lines", true)
      .selectAll("line")
      .data(self.y.ticks())
      .join("line")
      .classed("grid-line", true)
      .attr(
        "transform",
        `translate(${self.dataframe.left}, ${self.dataframe.top})`,
      )
      .attr("x1", self.dataframe.left)
      .attr("x2", self.dataframe.right)
      .attr("y1", (d) => self.y(d))
      .attr("y2", (d) => self.y(d))
      .attr("stroke", "#DCDCDC")
      .attr("stroke-width", 1);

    self.xAxis = self.svg
      .append("g")
      .classed("x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr(
        "transform",
        `translate(${self.dataframe.left}, ${self.dataframe.bottom})`,
      )
      .call(D3.axisBottom(self.x).tickSizeOuter(0));

    self.yAxis = self.svg
      .append("g")
      .classed("y-axis", true)
      .attr("id", `${self.setID}_y-axis`)
      .attr(
        "transform",
        `translate(${self.dataframe.right}, ${self.dataframe.top})`,
      )
      .call(D3.axisRight(self.y).tickSizeOuter(0));

    self.xLabels = self.xAxis
      .selectAll(".tick")
      .data(self.groups)
      .attr("transform", (d) => `translate(${self.x(d)}, 0)`)
      .selectAll("text")
      .classed("label interactable", true)
      .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
      .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
      .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d));

    self.yLabels = self.yAxis.selectAll("text").classed("label", true);

    /*
    Generate Data Elements
    */

    self.bars = self.svg
      .append("g")
      .classed(`bars data-elements`, true)
      .attr("id", `${self.setID}_bars`)
      .attr(
        "transform",
        `translate(${self.dataframe.left - 1}, ${self.dataframe.top - 1})`,
      );

    self.bargroups = self.bars
      .selectAll(".bar-group")
      .data(self.mapping.groups)
      .join("g")
      .classed("bar-group data-element", true)
      .attr("id", (group) => `${self.setID}_bar-group_${self.tokenize(group)}`)
      .attr("transform", (group) => `translate(${self.x(group)}, 0)`)
      .attr("opacity", self.transitions.opacity.from)
      .selectAll("rect")
      .data((group) => self.mapping.groupedstacks[group])
      .enter()
      .append("rect")
      .attr(
        "id",
        (d) =>
          `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(
            d.filterby,
          )}_${self.tokenize(d.subgroup)}_color`,
      )
      .attr("class", "bar interactable")
      .attr(
        "data-legend",
        (d) => `${self.setID}_${self.tokenize(d[self.legend.accessor])}`,
      )
      .attr("x", (d) => self.subgroupAxis(d.subgroup))
      .attr("y", (d) => self.y(d.to))
      .attr("width", self.subgroupAxis.bandwidth())
      .attr("height", (d) => self.y(d.from) - self.y(d.to))
      .attr("fill", (d) => d.color)
      .attr("opacity", self.transitions.opacity.from)
      .attr("stroke-width", 2)
      .attr("stroke", "#FFFFFF")
      .clone(true)
      .attr(
        "id",
        (d) =>
          `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(
            d.filterby,
          )}_${self.tokenize(d.subgroup)}`,
      )
      .attr("fill", (d) =>
        self.texturesMap[self.texturescale(d.filterby)].url(),
      )
      .on("mouseover", (e, d) => self.mouseOverBar(e, d))
      .on("mouseout", (e, d) => self.mouseOutBar(e, d));

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animation: ["opacity", self.animations["opacity"]],
            color: self.colors,
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: self.setID,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["opacity", self.transitions["opacity"]],
            uid: self.uid,
            vposition: self.legend.vposition,
            width: self.legend.width,
          })
        : null;

    /*
    Tooltip
    */

    self.Tooltip =
      self.tooltip !== undefined
        ? new Tooltip({
            title: self.tooltip.title,
            accessors: [
              self.accessors.filterby,
              self.accessors.group,
              self.accessors.subgroup,
              self.accessors.value,
            ],
            container: self.viewframe,
            fontsize: self.tooltip.fontsize,
            getID: self.getID,
            height: self.tooltip.height,
            hposition: self.tooltip.hposition,
            itemsize: self.tooltip.itemsize,
            margin: self.margin,
            padding: self.tooltip.padding,
            setID: self.setID,
            uid: self.uid,
            vposition: self.tooltip.vposition,
            width: self.tooltip.width,
          })
        : null;

    /*
    Filters
    */

    self.Filters =
      self.filters !== undefined
        ? new Filters({
            accessors: self.accessors,
            container: self.viewframe,
            default: "All",
            fontsize: self.filters.fontsize,
            getID: self.getID,
            height: self.filters.height,
            hposition: self.filters.hposition,
            itemsize: self.filters.itemsize,
            margin: self.margin,
            options: self.filters.keys,
            padding: self.filters.padding,
            parent: self,
            setID: self.setID,
            uid: self.uid,
            vposition: self.filters.vposition,
            width: self.filters.width,
          })
        : null;

    return self;
  }

  update(filter) {
    let self = this;

    self.clear();

    /*
    Setup
    */

    // Set Filter
    filter = filter === undefined ? "All" : filter;

    // Map Data
    self.mapping = self.mapData(self.data, filter);

    /*
    Get Visualization and Interface Elements
    */

    // Grab SVG Generated From Vue Template
    self.svg = D3.select(`${self.getID}_visualization`)
      .classed("grouped-bar-chart unrotated", true)
      .attr("id", `${self.setID}_visualization`);

    for (const texture in self.texturesMap) {
      self.svg.call(self.texturesMap[texture]);
    }

    // Interface Parent
    self.interface = D3.select(`${self.getID}_interface`).attr(
      "id",
      `${self.setID}_interface`,
    );

    /*
    Generate Axes
    */

    self.x = D3.scaleBand()
      .domain(self.groups)
      .range([0, self.dataframe.width])
      .paddingInner(0.05);

    self.y = D3.scaleLinear()
      .domain([
        self.mapping.min,
        Math.floor(self.mapping.max * self.axis.scaling.y),
      ])
      .range([self.dataframe.height, 0]);

    self.axisGrid = self.svg
      .append("g")
      .classed("grid-lines", true)
      .selectAll("line")
      .data(self.y.ticks())
      .join("line")
      .classed("grid-line", true)
      .attr(
        "transform",
        `translate(${self.dataframe.left}, ${self.dataframe.top})`,
      )
      .attr("x1", self.dataframe.left)
      .attr("x2", self.dataframe.right)
      .attr("y1", (d) => self.y(d))
      .attr("y2", (d) => self.y(d))
      .attr("stroke", "#DCDCDC")
      .attr("stroke-width", 1);

    self.xAxis = self.svg
      .append("g")
      .classed("axis x-axis", true)
      .attr("id", `${self.setID}_x-axis`)
      .attr(
        "transform",
        `translate(${self.dataframe.left}, ${self.dataframe.bottom})`,
      )
      .call(D3.axisBottom(self.x).tickSizeOuter(0));

    self.yAxis = self.svg
      .append("g")
      .classed("axis y-axis", true)
      .attr("id", `${self.setID}_y-axis`)
      .attr(
        "transform",
        `translate(${self.dataframe.right}, ${self.dataframe.top})`,
      )
      .call(D3.axisRight(self.y).tickSizeOuter(0));

    self.xLabels = self.xAxis
      .selectAll(".tick")
      .data(self.groups)
      .attr("transform", (d) => `translate(${self.x(d) + 1}, 0)`)
      .selectAll("text")
      .classed("label interactable", true)
      .attr("id", (d) => `${self.setID}_label_${self.tokenize(d)}`)
      .on("mouseover", (e, d) => self.mouseOverGroupAxis(e, d))
      .on("mouseout", (e, d) => self.mouseOutGroupAxis(e, d));

    self.yLabels = self.yAxis.selectAll("text").classed("label", true);

    /*
    Generate Data Elements
    */

    self.bars = self.svg
      .append("g")
      .classed(`bars data-elements`, true)
      .attr("id", `${self.setID}_bars`)
      .attr(
        "transform",
        `translate(${self.dataframe.left - 1}, ${self.dataframe.top - 1})`,
      );

    self.bargroups = self.bars
      .selectAll(".bar-group")
      .data(self.mapping.groups)
      .join("g")
      .classed("bar-group data-element", true)
      .attr("id", (group) => `${self.setID}_bar-group_${self.tokenize(group)}`)
      .attr("transform", (group) => `translate(${self.x(group)}, 0)`)
      .attr("opacity", self.transitions.opacity.from)
      .selectAll("rect")
      .data((group) => self.mapping.groupedstacks[group])
      .enter()
      .append("rect")
      .attr(
        "id",
        (d) =>
          `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(
            d.filterby,
          )}_${self.tokenize(d.subgroup)}_color`,
      )
      .attr("class", "bar interactable")
      .attr(
        "data-legend",
        (d) => `${self.setID}_${self.tokenize(d[self.legend.accessor])}`,
      )
      .attr("x", (d) => self.subgroupAxis(d.subgroup))
      .attr("y", (d) => self.y(d.to))
      .attr("width", self.subgroupAxis.bandwidth())
      .attr("height", (d) => self.y(d.from) - self.y(d.to))
      .attr("fill", (d) => d.color)
      .attr("opacity", self.transitions.opacity.from)
      .attr("stroke-width", 2)
      .attr("stroke", "#FFFFFF")
      .clone(true)
      .attr(
        "id",
        (d) =>
          `${self.setID}_bar_${self.tokenize(d.group)}_${self.tokenize(
            d.filterby,
          )}_${self.tokenize(d.subgroup)}`,
      )
      .attr("fill", (d) =>
        self.texturesMap[self.texturescale(d.filterby)].url(),
      )
      .on("mouseover", (e, d) => self.mouseOverBar(e, d))
      .on("mouseout", (e, d) => self.mouseOutBar(e, d));

    /*
    Legend
    */

    self.Legend =
      self.legend !== undefined
        ? new Legend({
            title: self.legend.title,
            accessor: self.legend.accessor,
            animation: ["opacity", self.animations["opacity"]],
            container: self.viewframe,
            data: self.mapping.legend,
            fontsize: self.legend.fontsize,
            getID: self.getID,
            getPrefix: self.setID,
            height: self.legend.height,
            hposition: self.legend.hposition,
            itemsize: self.legend.itemsize,
            margin: self.margin,
            padding: self.legend.padding,
            setID: self.setID,
            transition: ["opacity", self.transitions["opacity"]],
            uid: self.uid,
            vposition: self.legend.vposition,
            width: self.legend.width,
          })
        : null;

    /*
    Tooltip
    */

    self.Tooltip =
      self.tooltip !== undefined
        ? new Tooltip({
            title: self.tooltip.title,
            accessors: [
              self.accessors.filterby,
              self.accessors.group,
              self.accessors.subgroup,
              self.accessors.value,
            ],
            container: self.viewframe,
            fontsize: self.tooltip.fontsize,
            getID: self.getID,
            height: self.tooltip.height,
            hposition: self.tooltip.hposition,
            itemsize: self.tooltip.itemsize,
            margin: self.margin,
            padding: self.tooltip.padding,
            setID: self.setID,
            uid: self.uid,
            vposition: self.tooltip.vposition,
            width: self.tooltip.width,
          })
        : null;

    /*
    Filters
    */

    self.Filters =
      self.filters !== undefined
        ? new Filters({
            accessor: self.filters.accessor,
            accessors: self.accessors,
            container: self.viewframe,
            default: filter,
            fontsize: self.filters.fontsize,
            getID: self.getID,
            height: self.filters.height,
            hposition: self.filters.hposition,
            itemsize: self.filters.itemsize,
            margin: self.margin,
            options: self.filters.keys,
            padding: self.filters.padding,
            parent: self,
            setID: self.setID,
            uid: self.uid,
            vposition: self.filters.vposition,
            width: self.filters.width,
          })
        : null;

    return self;
  }

  clear() {
    const self = this;

    // Clear Visualization Components
    self.xLabels.remove();
    self.yLabels.remove();
    self.axisGrid.remove();
    self.xAxis.remove();
    self.yAxis.remove();
    self.bargroups.remove();
    self.bars.remove();
    // Clear Interface Components
    if (self.Legend !== null) self.Legend.clear();
    if (self.Tooltip !== null) self.Tooltip.clear();
    if (self.Filters !== null) self.Filters.clear();

    return self;
  }

  /*
  Event Handlers
  */

  mouseOverGroupAxis(e, group) {
    const self = this;

    // Highlight Selected Axis Group
    D3.selectAll(`${self.getID}_bar-group_${self.tokenize(group)} .bar`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);

    return self;
  }

  mouseOutGroupAxis() {
    const self = this;

    // Return All Bars to Unhighlighted State
    D3.selectAll(`${self.getID}_visualization .bar-group .bar`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);

    return self;
  }

  mouseOverBar(e, d) {
    const self = this;

    // Highlight Bar & Update Tooltip
    D3.selectAll(`[id^="${e.target.id}"]`)
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .delay(self.animations.opacity.delay)
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.to);
    this.Tooltip.update(e, d);

    return self;
  }

  mouseOutBar(e, d) {
    const self = this;

    // Return All Bars to Unhighlighted State and Refresh Tooltip
    D3.selectAll(".bar")
      .transition()
      .ease(Easing[self.animations.opacity.easing])
      .duration(self.animations.opacity.duration)
      .attr("opacity", self.transitions.opacity.from);
    this.Tooltip.refresh(e, d);

    return self;
  }

  /*
  Map Data and Set Value Types
  */

  mapData(data, filter) {
    const self = this;

    self.selectedFilter = filter === undefined ? "All" : filter;

    if (self.selectedFilter !== "All") {
      data = data.filter(
        (datum) => datum[self.accessors.filterby.key] == filter,
      );
    }

    // Remap Data By Accessors to Class Data Schema
    data = data.map((datum) => {
      return {
        // uuid: datum.uuid,
        color: self.colorscale(datum[self.accessors.color.key]),
        filterby: datum[self.accessors.filterby.key],
        group: datum[self.accessors.group.key],
        subgroup: datum[self.accessors.subgroup.key],
        value: datum[self.accessors.value.key],
      };
    });

    data = super.groupByKeysThenSum(
      data,
      ["filterby", "group", "subgroup", "color"],
      ["value"],
    );

    // Get Unique Filters, Groups, Subgroups, Colors, and Grouped Data
    const filteroptions = [...unique.object.values(data, "filterby")];
    const groups = [...unique.object.values(data, "group")];
    const subgroups = [...unique.object.values(data, "subgroup")];
    const colors = [...unique.object.values(data, "color")];
    const grouped = grouping.group.objects(data, "group");

    // Generate Stacks
    let groupedstacks = {};
    for (const groupkey in grouped) {
      const grouping = grouped[groupkey];
      groupedstacks[groupkey] = [];
      let from = [];
      for (const f in filteroptions) {
        const filter = filteroptions[f];
        let stack = [];
        for (const s in subgroups) {
          const subgroup = subgroups[s];
          for (const d in grouping) {
            const datum = grouping[d];
            if (datum.subgroup === subgroup && datum.filterby === filter) {
              if (typeof from[s] === "undefined") {
                from[s] = 0;
              }
              datum.from = from[s];
              datum.to = from[s] + datum.value;
              from[s] = datum.to;
              stack.push(datum);
            }
          }
        }
        groupedstacks[groupkey].push(...stack);
      }
    }

    // Compute Group-wise Value Range (Max and Min)
    let maxs = [];
    let mins = [];
    for (const group in groupedstacks) {
      const grouped = groupedstacks[group];
      let max = 0;
      let min = 0;
      for (const s in subgroups) {
        const subgroup = subgroups[s];
        for (const j in grouped) {
          const datum = grouped[j];
          if (datum.group === group && datum.subgroup === subgroup) {
            max = datum.to > max ? datum.to : max;
            min = datum.from < min ? datum.from : min;
          }
        }
        maxs.push(max);
        mins.push(min);
      }
    }
    const max = Math.ceil(Math.max(...maxs));
    const min = Math.floor(Math.min(...mins));

    // Generate Legend
    const legend = D3.zip(colors, subgroups).map(([color, subgroup]) => {
      return {
        color: color,
        subgroup: subgroup,
      };
    });

    return {
      colors: colors,
      data: data,
      filters: filteroptions.sort(sorting.strings.natural),
      groupedstacks: groupedstacks,
      groups: groups.sort(sorting.strings.natural),
      legend: legend,
      max: max,
      min: min,
      subgroups: subgroups.sort(sorting.strings.natural),
    };
  }
}

/*
Exports
*/

export default GroupedStackedBarChart;
