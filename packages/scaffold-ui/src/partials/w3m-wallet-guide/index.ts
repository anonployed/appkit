import { customElement } from '@reown/appkit-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { property } from 'lit/decorators.js'

@customElement('w3m-wallet-guide')
export class W3mWalletGuide extends LitElement {
  public static override styles = styles

  @property({ type: Boolean }) public disabled = false

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-flex
        class="wallet-guide"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        rowGap="xs"
      >
        <wui-text variant="small-400" color="fg-200" align="center">
          Looking for a self-custody wallet?
        </wui-text>

        <wui-flex class="chip-box">
          <wui-chip
            imageIcon="walletConnectLightBrown"
            icon="externalLink"
            variant="transparent"
            href="https://explorer.walletconnect.com"
            title="Visit our Explorer"
          ></wui-chip>
        </wui-flex>
      </wui-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-wallet-guide': W3mWalletGuide
  }
}
