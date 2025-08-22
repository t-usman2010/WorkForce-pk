export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-white/70 dark:bg-gray-800/70 shadow-lg p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children }) {
  return <div className="mt-2 text-gray-700 dark:text-gray-300">{children}</div>
}
