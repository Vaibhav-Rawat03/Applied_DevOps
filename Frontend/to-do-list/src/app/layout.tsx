import './globals.css'
import { TodosProvider } from "@/store/todos";

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TodosProvider>
          {children}
        </TodosProvider>
      </body>
    </html>
  )
}