export interface Vdatum {
  name: string;
}

/*
Categorical
*/

// Bar, Histogram, etc.
export interface SingleCategorical extends Vdatum {
  color: string;
  filterby: string;
  group: string;
  value: number;
}
//  Stackedbar, etc.
export interface DoubleCategorical extends SingleCategorical {
  subgroup: string;
}

/*
Numeric
*/

// Rugplots, etc. with Numbers on X-Axis
export interface SingleNumeric extends Vdatum {
  color: string;
  filterby: string;
  group: string;
  x: number | string;
}
// Scatter Plots, Line Charts, etc. with Numbers on X-Axis
export interface DoubleNumeric extends SingleNumeric {
  y: number;
}
// Aliases
export type SingleDiscrete = typeof SingleNumeric;
export type SingleContinuous = typeof SingleNumeric;
export type CompoundSingleDiscrete = typeof SingleDiscrete;
export type CompoundSingleContinuous = typeof SingleContinuous;
export type DoubleDiscrete = typeof DoubleNumeric;
export type DoubleContinuous = typeof DoubleNumeric;
export type CompoundDoubleDiscrete = typeof DoubleDiscrete;
export type CompoundDoubleContinuous = typeof DoubleContinuous;

/*
Timeseries
*/

// Timelines, etc. with Dates on X-Axis
export interface SingleTimeseries extends Vdatum {
  color: string;
  datetime: string | number | Date;
  filterby: string;
  group: string;
}
// Line Charts, Bubble Charts, etc. with Dates on X-Axis
export interface DoubleTimeseries extends SingleTimeseries {
  y: number;
}
// Aliases
export type DoubleDiscreteTimeseries = typeof DoubleTimeseries;
export type DoubleContinuousTimeseries = typeof DoubleTimeseries;
export type CompoundSingleTimeseries = typeof SingleTimeseries;
export type CompoundDoubleDiscreteTimeseries = typeof DoubleDiscreteTimeseries;
export type CompoundDoubleContinuousTimeseries =
  typeof DoubleContinuousTimeseries;

/*
Compound
*/

export type Compound =
  | CompoundSingleDiscrete
  | CompoundSingleContinuous
  | CompoundDoubleDiscrete
  | CompoundDoubleContinuous
  | CompoundSingleTimeseries
  | CompoundDoubleDiscreteTimeseries
  | CompoundDoubleContinuousTimeseries;

export interface VdatumGeneric {
  color: string;
  datetime?: string | Date;
  filterby: string;
  group?: string;
  subgroup?: string;
  value?: number;
  x?: number;
  y?: number;
}

/*
Visualization
*/

export interface VisualizationRenderer {
  class?:
    | Chart
    | DoughnutChart
    | LineChart
    | ProgressChart
    | RidgelineChart
    | SankeyChart
    | StackedbarChart;
  config: ChartConfig;
  data?: VdatumGeneric[];
  type?: string;
}

export interface VisualizationData {
  id: string;
  data: VdatumGeneric[];
}

/*
Layout Position Modifiers
*/

export interface BoundingBox {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}
export type Position = typeof BoundingBox;
export type Padding = typeof BoundingBox;
export type Border = typeof BoundingBox;
export type Margin = typeof BoundingBox;

/*
Animations & Transitions
*/

export interface Animation {
  delay?: number;
  duration: number;
  easing: string;
}
export interface Animations {
  opacity?: Animation;
  translate?: Animation;
}
export interface Transition {
  from: string | number;
  to: string | number;
}
export interface Transitions {
  opacity?: Transition;
  translate?: Transition;
}

/*
Data Accessors
*/

export interface Accessor {
  name: string;
  key: string;
  type: string;
}
export interface Accessors {
  color: Accessor;
  filterby: Accessor;
  group: Accessor;
  subgroup?: Accessor;
  value?: Accessor;
  x?: Accessor;
  y?: Accessor;
}

/*
Projection Model
*/

export interface ProjectionModel {
  args: object;
  data: object[];
  type: string;
}

export interface Projection {
  model?: ProjectionModel;
  xDomain: number[] | string[];
  yDomain: number[] | string[];
}

/*
Interface Elements
*/

export interface InterfaceElement {
  fontsize: number | string;
  height: number | string;
  hposition: string;
  itemsize: number | string;
  padding: Padding;
  vposition: string;
  width: number | string;
}
export type Filters = typeof InterfaceElement;
export type Tooltip = typeof InterfaceElement;
export type Legend = typeof InterfaceElement;
export interface Interface {
  filters?: Filters;
  legend?: Legend;
  tooltip?: Tooltip;
}

/*
Visualization
*/

export interface ChartConfig {
  id: string;
  accessors: Accessors;
  animations?: Animations;
  data?:
    | SingleCategorical[]
    | DoubleCategorical[]
    | SingleDiscrete[]
    | DoubleDiscrete[]
    | SingleContinuous[]
    | DoubleContinuous[]
    | SingleTimeseries[]
    | DoubleDiscreteTimeseries[]
    | DoubleContinuousTimeseries[]
    | Compound[]
    | VdatumGeneric[];
  filters?: Filters;
  height: number;
  legend?: Legend;
  margin?: Margin;
  padding?: Padding;
  palette?: string[];
  position?: Position;
  projection?: Projection;
  rotate?: boolean;
  tooltip?: Tooltip;
  transitions?: Transitions;
  type: string;
  width: number;
}

export interface ChartConfigImport {
  [path: string]: () => ChartConfig;
}

/*
Dashboard Module
*/

export type DashboardModuleConnector = {
  id: string;
  name: string;
  available: boolean;
  public: boolean;
  report_key: string;
  selected: boolean;
};

export interface DashboardModuleView extends DashboardModuleConnector {
  title: string;
  height: number;
  report_id?: string | number;
  subtitle: string;
  visualizations: VisualizationRenderer[];
  width: number;
}

export type DashboardModuleConfig = {
  id: string;
  name: string;
  title: string;
  data?: VdatumGeneric[];
  height: number;
  subtitle: string;
  visualizations: VisualizationRenderer[];
  width: number;
};

export interface DashboardModuleConfigImport {
  [path: string]: () => DashboardModuleConfig;
}

/*
REDCap
*/

export interface RedcapProjectAPIConnector {
  title: string;
  api_active: boolean;
  api_key: string;
  api_pid: string | number;
  api_url: string;
}
export interface RedcapProjectAPI {
  id: string;
  title: string;
  api_active: boolean;
  api_pid: string | number;
  api_url: string;
}
export interface RedcapReport {
  public: boolean;
  report_has_modules: boolean;
  report_id: string;
  report_key: string;
  report_name: string;
  required: boolean;
}

/*
Dashboard
*/

export interface DashboardConnector {
  id?: string;
  name: string;
  modules: DashboardModuleConnector[];
  public: boolean;
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReport[];
}

export interface DashboardView {
  id: string;
  name: string;
  modules: DashboardModuleView[];
  public: boolean;
  redcap_id: string;
  redcap_pid: string | number;
  reports: RedcapReport[];
}

export type DashboardConnectorEditable = typeof DashboardConnector;
