import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const chartData = [
  { tool: 'Rsbuild', dev: 410, build: 280, hmr: 80 },
  { tool: 'Vite + SWC', dev: 1290, build: 1390, hmr: 50 },
  { tool: 'webpack + SWC', dev: 2260, build: 2010, hmr: 200 },
  { tool: 'webpack + Babel', dev: 5020, build: 6520, hmr: 200 },
]

const chartConfig = {
  dev: {
    label: 'dev',
    // color: "#2563eb",
    color: 'hsl(var(--chart-1))',
  },
  build: {
    label: 'build',
    // color: "#60a5fa",
    color: 'hsl(var(--chart-2))',
  },
  hmr: {
    label: 'hmr',
    // color: "#0e0e0e",
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig
const HomeChart = React.memo(() => {
  return (
    <div className='px-4 py-4'>
      <h1 className='text-center'>Build Performance</h1>
      <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
        <BarChart accessibilityLayer data={chartData} layout='vertical'>
          {/* <CartesianGrid vertical={false} /> */}
          <XAxis type='number' hide />
          <YAxis
            dataKey='tool'
            type='category'
            tickLine={false}
            tickMargin={6}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator='dashed'
                className='bg-background'
                labelClassName='text-primary'
              />
            }
          />
          {/* <ChartLegend content={<ChartLegendContent />} /> */}
          <Bar
            dataKey='dev'
            fill='var(--color-dev)'
            radius={2}
            barSize={6}
            label={{
              position: 'right',
              fill: 'hsl(var(--foreground))',
              formatter: (value: number) =>
                value > 1000 ? `${value / 1000}s` : `${value}ms`,
              fontSize: 10,
            }}
          />
          <Bar
            dataKey='build'
            fill='var(--color-build)'
            radius={2}
            barSize={6}
            label={{
              position: 'right',
              fill: 'hsl(var(--foreground))',
              formatter: (value: number) =>
                value > 1000 ? `${value / 1000}s` : `${value}ms`,
              fontSize: 10,
            }}
          />
          <Bar
            dataKey='hmr'
            fill='var(--color-hmr)'
            radius={2}
            barSize={6}
            label={{
              position: 'right',
              fill: 'hsl(var(--foreground))',
              formatter: (value: number) =>
                value > 1000 ? `${value / 1000}s` : `${value}ms`,
              fontSize: 10,
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
})

HomeChart.displayName = 'HomeChart'

export { HomeChart }
