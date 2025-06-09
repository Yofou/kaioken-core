export function LayoutDefault({ children }: { children: JSX.Children }) {
  return (
    <div className="grid items-center w-full min-h-screen py-[2rem] px-4 bg-white">
      {children}
    </div>
  )
}
