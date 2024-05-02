import { ReactElement } from 'react'

import { GoBack, Page } from '@/components'
import { LearnCard } from '@/features'

export const LearnPage = (): ReactElement => {
  return (
    <Page>
      <GoBack title={'Back to Decks List'} />
      <LearnCard />
    </Page>
  )
}
