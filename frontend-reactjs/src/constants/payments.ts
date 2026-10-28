export interface PaymentMethodProps {
  id: string;
  name: string;
  urlImage?: string;
  link?: string;
  accountNumber?: string;
  accountName?: string;
  description: string;
  qrImage?: string;
}

export const PAYMENT_METHODS: PaymentMethodProps[] = [
  {
    id: "paypal",
    name: "Paypal",
    urlImage: "/images/logo/paypal.png",
    description: "Donasi via Paypal",
    link: "https://paypal.me/maddlabs",
  },
  {
    id: "dana",
    name: "Dana",
    urlImage: "/images/logo/dana.png",
    description: "E-Wallet Transfer",
    accountNumber: "089630507889",
    accountName: "Maddlabs | Ahmad Januar Amriyansah",
    qrImage: "/images/payments/qris-payments.jpeg",
  },
  {
    id: "bca",
    name: "BCA",
    urlImage: "/images/logo/bca.png",
    description: "Bank Transfer",
    accountNumber: "888-139-7773",
    accountName: "AHMAD JANUAR AMRIYANSAH",
  },
];
