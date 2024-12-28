import { useTranslations } from 'next-intl';
import CheckoutMain from '../../../components/checkout/ChackoutMain';
import Navigation from '../../../components/product/Navigation';

export default function CheckoutPage() {
  const t = useTranslations('CheckoutPage')
  return (
    <div className="main">
      <Navigation
        navigate={[
          { title: t('cart'), link: 'cart' },
          { title: t('checkout'), none: true },
          { title: t('payment'), none: true },
        ]}
        primary={1}
      />
      <CheckoutMain />
    </div>
  );
}
