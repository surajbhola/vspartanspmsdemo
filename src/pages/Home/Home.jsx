import React from 'react'
import HomeHero from '../../components/HomeHero/HomeHero'
import ServicesSection from '../../components/ServicesSection/ServicesSection'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import PerformanceMetrics from '../../components/PerformanceMetrics/PerformanceMetrics'
import FAQ from '../../components/FAQ/FAQ'

export const Home = () => {
  return (
    <div>
        <HomeHero></HomeHero>
        <ServicesSection></ServicesSection>
        <WhyChooseUs></WhyChooseUs>
        <PerformanceMetrics></PerformanceMetrics>
        <FAQ></FAQ>
    </div>
  )
}
