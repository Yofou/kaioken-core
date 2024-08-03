import { Navbar } from "$/components/Navbar"
import { SideBar } from "$/components/SideBar"
import '@fontsource-variable/cabin';
import '../css/shiki.css'

export function LayoutDefault({ children }: { children: JSX.Children }) {
  return (
    <div className="grid grid-cols-[300px,1fr] grid-rows-[max-content,1fr] items-center m-auto w-full min-h-screen">
      <Navbar />
      <SideBar />
      <div className="max-w-[1100px] justify-self-center w-full h-full p-5">{children}</div>
    </div>
  )
}
