import { customElement } from '@reown/appkit-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { ConnectorController, OptionsController, RouterController } from '@reown/appkit-core'
import { state } from 'lit/decorators/state.js'

@customElement('w3m-connect-view')
export class W3mConnectView extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @state() private connectors = ConnectorController.state.connectors

  @state() private authConnector = this.connectors.find(c => c.type === 'AUTH')

  @state() private features = OptionsController.state.features

  @state() private showGuide = ConnectorController.state.showGuide

  public constructor() {
    super()
    this.unsubscribe.push(
      ConnectorController.subscribeKey('connectors', val => {
        this.connectors = val
        this.authConnector = this.connectors.find(c => c.type === 'AUTH')
      }),
      OptionsController.subscribeKey('features', val => (this.features = val)),
      ConnectorController.subscribeKey('showGuide', val => {
        this.showGuide = val
      })
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex flexDirection="column" .padding=${['3xs', 's', '2l', 's']}>
        <w3m-email-login-widget></w3m-email-login-widget>
        <w3m-social-login-widget></w3m-social-login-widget>
        ${this.walletListTemplate()}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `
  }

  // -- Private ------------------------------------------- //
  private walletListTemplate() {
    const socials = this.features?.socials
    const emailShowWallets = this.features?.emailShowWallets
    const enableWallets = OptionsController.state.enableWallets

    if (!enableWallets) {
      return null
    }

    if (this.authConnector && socials) {
      if (emailShowWallets) {
        if (!this.showGuide) {
          return html`
            <wui-flex flexDirection="column" gap="l" .margin=${['xs', '0', '0', '0'] as const}>
              <w3m-connector-list></w3m-connector-list>
              <wui-flex class="all-wallets">
                <w3m-all-wallets-widget></w3m-all-wallets-widget>
              </wui-flex>
              <w3m-get-started-guide></w3m-get-started-guide>
            </wui-flex>
          `
        }

        return html`
          <wui-flex flexDirection="column" gap="l" .margin=${['xs', '0', 'xs', '0'] as const}>
            <w3m-wallet-guide></w3m-wallet-guide>
          </wui-flex>
        `
      }

      return html`<wui-list-button
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`
    }

    return html`<w3m-wallet-login-list></w3m-wallet-login-list>`
  }

  // -- Private Methods ----------------------------------- //
  private onContinueWalletClick() {
    RouterController.push('ConnectWallets')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-connect-view': W3mConnectView
  }
}
