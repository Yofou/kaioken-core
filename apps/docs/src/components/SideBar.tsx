import { usePageContext } from "$/context/pageContext"
import { signal, useMemo } from "kaioken"
import { twMerge } from "tailwind-merge"
import { GlowBg } from "./GlowBG"
import { PagesByGroup } from "$/utils/meta"

type GroupProps = {
  title: string
}
export const Group: Kaioken.FC<GroupProps> = (props) => {
  const show = signal(true)
  show.displayName = 'groupShow'

  return <>
    <button className="text-[1.125rem] capitalize text-left font-semibold" onclick={() => show.value = !show.value}>{props.title}</button>
    {show.value && <div className="flex flex-col gap-2 border-l-[2px] border-white/20 px-4">
      {props.children}
    </div>}
  </>
}

type LinkProps = {
  href?: string
}
export const Link: Kaioken.FC<LinkProps> = (props) => {
  const pageCtx = usePageContext() as any
  const isActive = pageCtx!.urlPathname === props.href
  return <a 
    href={props.href} 
    className={twMerge(
      'font-cabin text-white/80 font-medium text-[0.9rem] p-1 rounded-sm',
      isActive && 'text-metalic p-1 font-bold text-[1rem]'
    )}
  >
    {props.children}
  </a>
}

export const SideBar = () => {
  const isFullGlow = signal(false)
  const pages = useMemo(() => PagesByGroup(), [])
  const groups = useMemo(() => [...pages.keys()], [pages])

  return <nav className="w-[300px] text-white hidden md:block self-start sticky top-4 rounded-xl">
    <GlowBg isFullGlow={isFullGlow.value} />
    <aside 
      className="bg-glass flex flex-col gap-2 relative inset-0 py-4 px-4 rounded-xl"
      onmouseover={() => {
        isFullGlow.value = true
      }}
      onmouseout={() => {
        isFullGlow.value = false
      }}
    >
      {groups.map((group) => {
        const groupPages = pages.get(group)!
        return <Group key={group} title={group}>
          {groupPages.map((page) => {
            return <Link key={page.url} href={page.url}>{page.name}</Link>
          })}
        </Group>
      })}
        
    </aside>
  </nav>
}
