import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { AppKitButtons } from '../../components/AppKitButtons'
import { WagmiTests } from '../../components/Wagmi/WagmiTests'
import { WagmiModalInfo } from '../../components/Wagmi/WagmiModalInfo'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { ConstantsUtil } from '../../utils/ConstantsUtil'
import { ThemeStore } from '../../utils/StoreUtil'

const queryClient = new QueryClient()

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks: ConstantsUtil.EvmNetworks,
  projectId: ConstantsUtil.ProjectId
})

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: ConstantsUtil.EvmNetworks,
  projectId: ConstantsUtil.ProjectId,
  showWallets: false,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'github', 'apple', 'discord']
  },
  termsConditionsUrl: 'https://www.google.com/',
  privacyPolicyUrl: 'https://www.google.com/'
})

ThemeStore.setModal(modal)

export default function Wagmi() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitButtons />
        <WagmiModalInfo />
        <WagmiTests />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
