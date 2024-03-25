//  import { useEffect } from "kaioken"
import { useResizeObserver } from "./useResizeObserver"
import { useEventListener } from "./useEventListener"

type TextAreaResizeOptions = {
  onResize?: () => void
  styleTarget?: Kaioken.Ref<HTMLElement>
  styleProp?: "height" | "minHeight"
}

export const useTextareaAutoSize = (
  ref: Kaioken.Ref<HTMLTextAreaElement>,
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

  useResizeObserver(ref, update)
  useEventListener('input', update, {
    ref: () => ref.current
  })

  return {
    update,
  }
}
