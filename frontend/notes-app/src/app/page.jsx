import React from 'react'
import HeroSection from './_components/home'
import NavbarContent from './_components/navbar'
import HowToUse from './_components/how-to-use'
import Question from './_components/faqs'
import FeatureShowcase from './_components/featureShowcase'


const page = () => {
  return (
    <div>
      <NavbarContent/>
      <HeroSection />
      <FeatureShowcase/>
      <HowToUse/>
      <Question/>
    </div>
  )
}

export default page
