<script lang="ts">
import type { PropType } from "vue";
import type { VisualizationRenderer } from "~/types/dashboard";

export default {
  name: "DashboardModule",
  props: {
    vrenderers: {
      required: true,
      type: Array as PropType<VisualizationRenderer[]>,
    },
  },
  setup(props: any) {
    const visualizations: any[] = reactive([]);
    onMounted(() => {
      const vrenderers = props.vrenderers;
      for (let i = 0; i < vrenderers.length; i++) {
        const vrenderer = vrenderers[i];
        const cfg = vrenderer.config;
        const Cls = vrenderer.class;
        const instance = new Cls(cfg).update();
        visualizations.push(instance);
      }
    });
    onUpdated(() => {
      for (let i = 0; i < visualizations.length; i++) {
        const visualization = toRaw(visualizations[i]) as any;
        visualization.update();
      }
    });
    return { visualizations };
  },
};
</script>

<template>
  <div
    v-for="(visualization, visualization_index) in visualizations"
    :key="visualization_index"
    class="visualization-container"
  >
    <svg
      :id="`${visualization.setID}_visualization`"
      class="visualization-element"
      :viewBox="`0 0 ${visualization.width} ${visualization.height}`"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    />

    <n-grid
      :id="`${visualization.setID}_interface`"
      :cols="9"
      :x-gap="12"
      :y-gap="20"
      class="interface"
    >
      <n-grid-item v-if="visualization.legend" :span="3">
        <n-card
          :id="`${visualization.setID}_legend`"
          :segmented="true"
          :bordered="false"
        ></n-card>
      </n-grid-item>

      <n-grid-item v-if="visualization.tooltip" :span="3">
        <n-card
          :id="`${visualization.setID}_tooltip`"
          :segmented="true"
          :bordered="false"
        ></n-card>
      </n-grid-item>

      <n-grid-item v-if="visualization.filters" :span="3">
        <n-dropdown
          :id="`${visualization.setID}_filters`"
          trigger="click"
          :options="visualization.Filters.data"
          placement="bottom"
          @select="
            (filter) => {
              return visualization.update(filter);
            }
          "
        >
          <n-button>{{
            `${visualization.accessors.filterby.name} > ${visualization.selectedFilter}`
          }}</n-button>
        </n-dropdown>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style>
/*
Interaction Elements
*/

::marker {
  display: none;
}

.interactable {
  cursor: pointer;
}

/*
Visualization Background
*/

.visualization-background {
  position: absolute;
}

/*
Visualization Elements
*/

.visualization-container {
  max-height: 760px;
}
.visualization-container svg {
  shape-rendering: geometricPrecision;
}
.visualization-container svg:path,
.visualization-container svg:rect,
.visualization-container svg:circle {
  cursor: pointer !important;
}
.visualization-container text,
.visualization-container span {
  text-transform: capitalize;
}
.visualization-container .visualization-element {
}
.visualization-container .visualization-element .data-elements {
}
.visualization-container .visualization-element .data-elements .data-element {
}
.visualization-container .visualization-element .x-axis {
}
.visualization-container .visualization-element .y-axis {
}
.visualization-container .visualization-element.unrotated .x-axis .label {
  text-anchor: start;
  vertical-align: middle;
  line-height: 20px;
}
.visualization-container .visualization-element.unrotated .y-axis .label {
  text-anchor: center;
}
.visualization-container .visualization-element.isrotated .x-axis .label {
  text-anchor: center;
}
.visualization-container .visualization-element.isrotated .y-axis .label {
  text-anchor: center;
  vertical-align: middle;
  line-height: 20px;
}

/*
Visualization Interface
*/

.visualization-container .interface {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  min-height: 80px;
  margin-top: 20px;
  margin-bottom: 12px;
}
.visualization-container .interface-element {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*
Visualization Interface – Tooltip
*/

.visualization-container .interface-element.tooltip {
}
.visualization-container
  .interface-element.tooltip
  .tooltip-items
  .tooltip-item {
  line-height: 1.4em;
}
.visualization-container
  .interface-element.tooltip
  .tooltip-items
  .tooltip-label {
  display: inline-flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  font-weight: bold;
  margin-right: 8px;
}
.visualization-container
  .interface-element.tooltip
  .tooltip-items
  .tooltip-value {
  display: inline-flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
}

/*
Visualization Interface – Legend
*/

.visualization-container .interface-element.legend {
  list-style: none;
}
.visualization-container .interface-element.legend .legend-items {
  padding-left: 0px;
}
.visualization-container .interface-element.legend .legend-items .legend-item {
  padding-left: 0px;
  line-height: 1.4em;
  margin-right: 8px;
}
.visualization-container
  .interface-element.legend
  .legend-items
  .legend-item
  .legend-color {
  display: inline-flex;
  flex-direction: row;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 8px;
}
.visualization-container
  .interface-element.legend
  .legend-items
  .legend-item
  .legend-label {
  padding-left: 8px;
  text-anchor: left;
  vertical-align: top;
  font-weight: bold;
}

/*
Visualization Interface – Filters
*/

.visualization-container .interface-element.filters {
}
.visualization-container .interface-element.filters .filterbank .filter {
  line-height: 1.4em;
}
.visualization-container
  .interface-element.filters
  .filterbank
  .filter
  .filter-value {
  font-weight: bold;
  vertical-align: middle;
}
</style>
