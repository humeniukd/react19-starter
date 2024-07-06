// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react'

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-24 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Hello world!
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
          <div className="relative flex lg:col-span-5 items-center justify-center pt-24">
          </div>
        </div>
    </div>
  )
}
