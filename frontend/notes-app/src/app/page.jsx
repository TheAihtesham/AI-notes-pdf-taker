import React from 'react'
import HeroSection from './_components/home'
import NavbarContent from './_components/navbar'
import HowToUse from './_components/how-to-use'
import PricingSection from './_components/pricing'
import Question from './_components/faqs'

const page = () => {
  return (
    <div>
      <NavbarContent/>
      <HeroSection />
      <HowToUse/>
      <PricingSection/>
      <Question/>
    </div>
  )
}

export default page
