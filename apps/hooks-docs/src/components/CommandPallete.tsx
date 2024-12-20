import { useSignal, signal, useEffect, useMemo, useRef } from "kaioken"
import { DemoContainer } from "./DemoContainer"
import { Input } from "./Input"
import { useKeyDown, useStartTyping } from "@kaioken-core/hooks"
import { Pages } from "$/utils/meta"
import Fuse from "fuse.js"
import { MoveUp } from "$/icons/MoveUp"
import { MoveDown } from "$/icons/MoveDown"
import { CornerDownLeft } from "$/icons/CornerLeft"
import { Github } from "$/icons/Github"
import { Discord } from "$/icons/Discord"
import { Dialog } from "@kaioken-core/components"

const keyboardList = signal(
  new Map<
    string,
    {
      name: string
      elm: Kaioken.MutableRefObject<HTMLElement | null>
    }
  >()
)
const keyboardIndex = signal<number | null>(null)

export const CommandPaletteItem: Kaioken.FC<{ name: string; href: string }> = (
  props
) => {
  const elm = useRef<HTMLAnchorElement | null>(null)
  const id = useMemo(() => crypto.randomUUID(), [])

  useEffect(() => {
    keyboardList.value.set(id, {
      name: props.name,
      elm,
    })

    return () => {
      if (keyboardList.value.has(id)) {
        keyboardList.value.delete(id)
      }
    }
  })

  return (
    <a
      ref={elm}
      href={props.href}
      className="w-full focus:outline-0 focus:border-red p-4 bg-black rounded-lg border border-white/30"
    >
      {props.name}
    </a>
  )
}

export const CommandPalette: Kaioken.FC = () => {
  const searchValue = useSignal("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const pageList = useMemo(() => {
    const pages = [...Pages.entries()].map(([href, item]) => ({
      ...item,
      href,
    }))
    if (searchValue.value === "") {
      return pages
    }

    const fuse = new Fuse(pages, {
      keys: ["name"],
    })
    return fuse.search(searchValue.value).map(({ item }) => item)
  }, [searchValue.value])

  const keyboardKeys = useMemo(
    () => [...keyboardList.value.keys()],
    [...keyboardList.value.keys()]
  )

  useEffect(() => {
    keyboardIndex.value = null
  }, [])

  useStartTyping(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  useKeyDown(["ArrowUp", "ArrowDown", "Home", "End"], (e) => {
    e.preventDefault()

    if (keyboardIndex.value == null || e.key === "Home") {
      keyboardIndex.value = 0
      return
    } else if (e.key === "End") {
      keyboardIndex.value = keyboardList.value.size - 1
      return
    }

    if (e.key === "ArrowUp" && keyboardIndex.value === 0) {
      keyboardIndex.value = keyboardList.value.size - 1
    } else if (e.key === "ArrowUp") {
      keyboardIndex.value -= 1
    } else if (
      e.key === "ArrowDown" &&
      keyboardIndex.value === keyboardList.value.size - 1
    ) {
      keyboardIndex.value = 0
    } else {
      keyboardIndex.value += 1
    }
  })

  useEffect(() => {
    if (keyboardIndex.value === null) {
      return
    }

    const id = keyboardKeys[keyboardIndex.value]
    const value = keyboardList.value.get(id)
    if (value) {
      value.elm.current?.focus()
    }
  }, [keyboardIndex.value, ...keyboardList.value.keys()])

  return (
    <Dialog.Container
      className={`flex justify-center p-12 items-start text-white bg-black/50 w-full h-full min-h-full max-w-full backdrop:hidden`}
      ariaLabel={"Escape to close"}
      ariaLive={"polite"}
    >
      <Dialog.Content asChild>
        <DemoContainer className="w-[750px] p-4">
          <Input
            ref={inputRef}
            value={searchValue.value}
            oninput={(e) => (searchValue.value = e.target.value)}
            onfocus={() => (keyboardIndex.value = null)}
            placeholder="Search to find hook"
          />
          <div className="w-full p-2 flex flex-col rounded-lg  mt-4 gap-4 h-[500px] md:h-[300px] overflow-y-auto mb-12">
            {pageList.map((item) => (
              <CommandPaletteItem key={item.href} {...item} />
            ))}
          </div>
          <div className="flex justify-end md:justify-start w-full h-[59px] bg-black bottom-0 p-4 mt-2 absolute inset-x-0 border-t border-white/20 rounded-b-xl  gap-4">
            <span className="hidden md:flex gap-2 items-center">
              <CornerDownLeft /> to select
            </span>
            <span className="hidden md:flex gap-2 items-center">
              <MoveUp /> <MoveDown /> to navigate
            </span>
            <span className="hidden md:flex gap-2 items-center">
              <span className="font-semibold text-[1.1rem] uppercase">esc</span>{" "}
              to close
            </span>
            <a
              className="md:hidden"
              href="https://github.com/Yofou/kaioken-core"
              target="_blank"
            >
              <Github />
            </a>
            <a
              className="md:hidden"
              href="https://discord.gg/yspvgXegvs"
              target="_blank"
            >
              <Discord />
            </a>
          </div>
        </DemoContainer>
      </Dialog.Content>
    </Dialog.Container>
  )
}
