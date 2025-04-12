import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CryptoPriceComponent from '../../../src/components/CryptoPriceComponent.vue';

installQuasarPlugin();

describe('Crypto Price Component', () => {
  it('should mount component with display ticker data', async () => {
    const wrapper = mount(CryptoPriceComponent, {
      props: {
        ticker: {
          pair: 'TON/USDT',
          price: 2.94,
          source: 'Binance',
          timestamp: Date.now(),
        },
      },
    });
    expect(wrapper.text()).toContain('TON/USDT');
    expect(wrapper.text()).toContain('2.94');
    expect(wrapper.text()).toContain('Binance');
  })
});
