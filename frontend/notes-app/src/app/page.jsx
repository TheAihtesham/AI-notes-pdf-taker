import React from 'react'
import HeroSection from './_components/home'
import NavbarContent from './_components/navbar'
import HowToUse from './_components/how-to-use'
import Question from './_components/faqs'


const page = () => {
  return (
    <div>
      <NavbarContent/>
      <HeroSection />
      <HowToUse/>
      <Question/>
    </div>
  )
}

export default page
