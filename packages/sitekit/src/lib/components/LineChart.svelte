<script lang="ts">
type DataPoint = {
  date: string;
  value: number;
};

type DataSet = {
  data: DataPoint[];
  color: string;
  label?: string;
};

let {
  datasets = [] as DataSet[],
  currentIndex = -1,
  yMin = 0,
  yMax = 100,
  aspectRatio = 1.5
}: {
  datasets?: DataSet[];
  currentIndex?: number;
  yMin?: number;
  yMax?: number;
  aspectRatio?: number;
} = $props();

let containerWidth = $state(0);
const width = $derived(containerWidth);
const height = $derived(containerWidth / aspectRatio);
const padding = 10;

function createPath(data: DataPoint[]): string {
  if (data.length === 0) return '';

  const xScale = (width - 2 * padding) / (data.length - 1);
  const yScale = (height - 2 * padding) / (yMax - yMin);

  return data.map((point, i) => {
    const x = padding + i * xScale;
    const y = height - padding - (point.value - yMin) * yScale;
    return (i === 0 ? 'M' : 'L') + x + ',' + y;
  }).join(' ');
}

const currentX = $derived(() => {
  if (currentIndex < 0 || datasets.length === 0 || datasets[0].data.length === 0) {
    return null;
  }
  const xScale = (width - 2 * padding) / (datasets[0].data.length - 1);
  return padding + currentIndex * xScale;
});
</script>

<div class="chart-container" bind:clientWidth={containerWidth}>
  {#if width > 0}
    <svg class="chart" {width} {height}>
      <!-- Y axis -->
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#666"
      />

      <!-- X axis -->
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#666"
      />

      <!-- Line paths -->
      {#each datasets as dataset}
        <path
          d={createPath(dataset.data)}
          stroke={dataset.color}
          stroke-width="2"
          fill="none"
        />
      {/each}

      <!-- Current index line -->
      {#if currentX() !== null}
        <line
          x1={currentX()}
          y1={padding}
          x2={currentX()}
          y2={height - padding}
          stroke="#666"
          stroke-width="1"
          stroke-dasharray="4,4"
        />
      {/if}
    </svg>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
    /*border: 1px solid #ccc;*/
  }

  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }
</style>
