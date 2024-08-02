import { useEventListener } from "./useEventListener"
import { useEffect } from "kaioken"

type TextAreaResizeOptions = {
  onResize?: () => void
  styleTarget?: Kaioken.Ref<HTMLElement | null>
  styleProp?: "height" | "minHeight"
}

export const useTextareaAutoSize = (
  ref: Kaioken.Ref<HTMLTextAreaElement | null>,
  options: TextAreaResizeOptions = {}
) => {
  const styleProps = options.styleProp ?? "height"

  const update = () => {
    const textarea = ref?.current
    if (!textarea) {
      return
    }

    let height = ""
    textarea.style[styleProps] = "1px"

    if (options?.styleTarget?.current)
      options.styleTarget.current.style[styleProps] =
        `${textarea?.scrollHeight}px`
    else height = `${textarea?.scrollHeight}px`

    textarea.style[styleProps] = height

    options?.onResize?.()
  }

  useEventListener("resize", update, {
    passive: true,
  })
  useEventListener("input", update, {
    ref: () => ref.current,
  })

  useEffect(update, [])

  return {
    update,
  }
}
