import { customElement } from '@reown/appkit-ui'
import { LitElement, html } from 'lit'
import styles from './styles.js'
import { ConnectorController } from '@reown/appkit-core'

@customElement('w3m-get-started-guide')
export class W3mGetStartedGuide extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
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
      <wui-link color="blue-100" class="get-started-link" @click=${this.onGetStarted}
        >Get started</wui-link
      >
    </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  private onGetStarted() {
    ConnectorController.setShowGuide(true)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-get-started-guide': W3mGetStartedGuide
  }
}
