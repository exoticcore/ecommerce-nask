import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SHOP | PODKUB THAILAND',
  description:
    'จำหน่ายบุหรี่ไฟฟ้าราคาส่งและราคาปลีก สำหรับผุ้ที่ต้องการเลิกบุหรี่มวล',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="main">{children}</div>;
}
