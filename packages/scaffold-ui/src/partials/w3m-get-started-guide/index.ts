import { EventsController, RouterController } from '@reown/appkit-core'
import { customElement } from '@reown/appkit-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'

@customElement('w3m-get-started-guide')
export class W3mGetStartedGuide extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  public constructor() {
    super()
    /*
     * This.unsubscribe.push(
     *   ConnectorController.subscribeKey('connectors', val => (this.connectors = val)),
     *   ApiController.subscribeKey('count', val => (this.count = val))
     * )
     */
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  public connected() {
    console.log('clicked')
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`<wui-flex
      columnGap="4xs"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <wui-text variant="small-400" class="title" color="fg-200">Haven't got a wallet?</wui-text>
      <wui-link color="blue-100" class="get-started-link" @click=${this.connected}
        >Get started</wui-link
      >
    </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  private onAllWallets() {
    EventsController.sendEvent({ type: 'track', event: 'CLICK_ALL_WALLETS' })
    RouterController.push('AllWallets')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-get-started-guide': W3mGetStartedGuide
  }
}
