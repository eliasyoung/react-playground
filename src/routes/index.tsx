import { createFileRoute } from '@tanstack/react-router'
import AnimatedBorderTrail from '@/components/animata/container/animated-border-trail'
import { Button } from '@/components/ui/button'
import { SectionContainer } from '@/components/ui/section-container'
import { HomeChart } from '@/components/home-chart'
import Marquee from '@/components/animata/container/marquee'
import TestServer from '@/features/go-server-frontend/components/test'

export const Route = createFileRoute('/')({
  component: () => (
    <div className='relative w-full'>
      <SectionContainer>
        <div className='grid grid-cols-2 pt-28 gap-x-4'>
          <div className='flex gap-y-6 flex-col'>
            <span className='uppercase opacity-50 tracking-[9px] font-display'>
              The Rspack Powered Build Tool
            </span>
            <h1 className='text-6xl font-extralight font-display tracking-tight'>
              Rsbuild the React
              <br />
              <span className='font-semibold'>Rsbuild Everything</span>
            </h1>
            <p className='font-text max-w-xl'>
              Rsbuild is a high-performance build tool powered by Rspack. It
              provides a set of thoughtfully designed default build configs,
              offering an out-of-the-box development experience and can fully
              unleash the performance advantages of Rspack.
            </p>
            <div className='flex flex-row mt-4 mb-10 gap-x-4'>
              <Button className='rounded-none px-10 font-light relative bg-primary text-primary-foreground hover:text-primary hover:bg-background gradient-border-t gradient-border-b after:hidden before:hidden hover:after:block hover:before:block'>
                Introduction
              </Button>
              <Button className='rounded-none px-10 font-light relative bg-background text-primary hover:text-primary-foreground hover:bg-primary gradient-border-t gradient-border-b hover:before:hidden before:block hover:after:hidden after:block'>
                Quick Start
              </Button>
            </div>
          </div>
          <div>
            <AnimatedBorderTrail
              trailSize='sm'
              contentClassName='rounded-none size-full bg-background border border-border'
              trailColor='hsl(var(--foreground))'
              className='rounded-none size-full bg-border'
            >
              <HomeChart />
            </AnimatedBorderTrail>
          </div>
        </div>
      </SectionContainer>

      <div className='border-y my-24'>
        <Marquee applyMask={false} className='[--duration:20s]'>
          <div className='text-xl py-8 flex flex-row gap-x-16 text-foreground/85 mr-16 font-medium'>
            <h1>Rspack-based</h1>
            <h1>Batteries Included</h1>
            <h1>Framework Agnostic</h1>
            <h1>Deep Optimization</h1>
            <h1>Highly Pluggable</h1>
            <h1>Easy to Configure</h1>
          </div>
        </Marquee>
      </div>

      {/* <SectionContainer>
        <TestServer />
      </SectionContainer> */}
    </div>
  ),
})
