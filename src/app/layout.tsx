import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task Valley',
  description: '현실의 일일 과제를 완료해 어두운 도트 마을을 회복시키는 작은 자기계발 RPG',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
