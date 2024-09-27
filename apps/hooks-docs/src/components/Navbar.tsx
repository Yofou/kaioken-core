import { signal, useEffect, useRef } from "kaioken"
import { CommandPalette } from "./CommandPallete"
import { useKeyDown } from "@kaioken-core/hooks"
import { usePageContext } from "$/context/pageContext"
import { CMD } from "$/icons/Cmd"
import { Github } from "$/icons/Github"
import { Discord } from "$/icons/Discord"
import { Hamburger } from "$/icons/Hamburger"
import { Dialog } from "@kaioken-core/components"

export function Navbar() {
  const pageCtx = usePageContext() as any
  const showCommandPalette = signal(false)

  useKeyDown(["k"], (e) => {
    e.preventDefault()
    if (e.ctrlKey && !showCommandPalette.value) {
      showCommandPalette.value = true
    }
  })

  useEffect(() => {
    showCommandPalette.value = false
  }, [pageCtx.urlPathname])

  return (
    <Dialog.Root open={showCommandPalette}>
      <nav className="col-span-full text-white relative bg-glass-red rounded-xl">
        <div className="flex justify-between items-center h-[81px] md:h-[97px] w-full gap-4 rounded-xl p-4 border-b border-black/50">
          <a
            className="flex px-2 gap-3 items-center font-cabin font-semibold text-[1.2rem]"
            href="/"
          >
            <img className="w-[32px] h-[32px]" src="/kaioken-hook.svg" alt="" />
            <span className="">Kaioken-Core/Hooks</span>
          </a>
          <Dialog.Trigger asChild>
            <button className="bg-grey-900 p-2 w-full max-w-[500px] items-center text-left hidden md:flex justify-between font-cabin border border-white/30 h-max rounded-md">
              Search
              <span className="text-black flex gap-[0.25ch] bg-white p-[0.1rem] pr-[0.3rem] rounded-md font-cabin font-semibold">
                <CMD /> + K
              </span>
            </button>
          </Dialog.Trigger>
          <CommandPalette />

          <div className="hidden md:flex gap-4">
            <a href="https://github.com/Yofou/kaioken-core" target="_blank">
              <span className="sr-only">Github</span>
              <Github />
            </a>
            <a href="https://discord.gg/yspvgXegvs" target="_blank">
              <span className="sr-only">Discord</span>
              <Discord />
            </a>
          </div>
          <button
            onclick={() => (showCommandPalette.value = true)}
            className="block md:hidden"
          >
            <span className="sr-only">See all routes</span>
            <Hamburger />
          </button>
        </div>
      </nav>
    </Dialog.Root>
  )
}
