import { useTranslations } from 'next-intl';
import PaymentMain from '../../../components/payment/PaymentMain';
import Navigation from '../../../components/product/Navigation';

export default function CheckoutPage() {
  const t = useTranslations('CheckoutPage');
  return (
    <div className="main">
      <Navigation
        navigate={[
          { title: t('cart'), link: 'cart' },
          { title: t('checkout'), link: 'checkout' },
          { title: t('payment'), none: true },
        ]}
        primary={2}
      />
      <PaymentMain />
    </div>
  );
}
