export function LayoutDefault({ children }: { children: JSX.Children }) {
  return (
    <div className="flex flex-col items-center m-auto w-full min-h-screen py-[2rem] px-4">
      <div className="p-5 pb-10">{children}</div>
    </div>
  )
}
