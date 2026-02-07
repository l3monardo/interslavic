import { memo } from 'react'

import { t } from 'translations'

import { expandAbbr, translateAbbr } from 'utils'

import { Hint } from 'components/Hint'

interface IResultsCardPosProps {
    details: string
}

export const ResultsCardPos = memo<IResultsCardPosProps>(({ details }) => (
    <Hint
        title={translateAbbr(t, details)}
        shortTitle={expandAbbr(t, details)}
    />
))

ResultsCardPos.displayName = 'ResultsCardPos'
