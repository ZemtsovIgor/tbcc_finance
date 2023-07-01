import React from 'react'
import Page from 'views/Page'
import PoolTable from 'views/Swap/components/InfoTables/PoolsTable'
import { usePoolDatas, usePoolsForToken, useTokenData } from 'state/info/hooks'
import { useTranslation } from 'contexts/Localization'
import { Heading, useMatchBreakpoints } from '../../../uikit'
import { PoolUpdater, TokenUpdater } from '../../../state/info/updaters'

const PoolsOverview: React.FC = () => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const address = '0xf29480344d8e21efeab7fde39f8d8299056a7fea';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tokenData = useTokenData(address)
  const poolsForToken = usePoolsForToken(address)
  const poolDatas = usePoolDatas(poolsForToken ?? [])

  return (
    <>
      <PoolUpdater />
      <TokenUpdater />
      <Page>

        {
          isMobile ? null : (
            <Heading
              scale="lg"
              mb="12px"
              mt="23px"
              fontSize="32px"
              lineHeight="32px"
              color="#505050"
              textAlign="center"
            >
              {t('All Pools')}
            </Heading>
          )
        }

        <PoolTable poolDatas={poolDatas} currentCurrency={address} />
      </Page>
    </>
  )
}

export default PoolsOverview
