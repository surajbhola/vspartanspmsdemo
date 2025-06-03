import React from 'react'
import TeamHero from '../../components/TeamHero/TeamHero'
import TeamOverview from '../../components/TeamOverview/TeamOverview'
import LeadershipTeam from '../../components/LeadershipTeam/LeadershipTeam'
import TeamCulture from '../../components/TeamCulture/TeamCulture'
import ContactSection from '../../components/ContactSection/ContactSection'
import CtaSection from '../../components/CtaSectionTeams/CtaSection'

export const Team = () => {
  return (
    <div>
        <TeamHero></TeamHero>
        <TeamOverview></TeamOverview>
        <LeadershipTeam></LeadershipTeam>
        <TeamCulture></TeamCulture>
        <ContactSection></ContactSection>
        <CtaSection></CtaSection>
    </div>
  )
}
