import {
  computed,
  createContext,
  ElementProps,
  signal,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "kaioken"
import { Slot, Slottable } from "../Slot"
import { styleObjectToCss } from "kaioken/utils"

const RootContext = createContext<{
  name: string
  value: Kaioken.Signal<string | null>
  ref: Kaioken.MutableRefObject<HTMLDivElement | null>
  loop: boolean
} | null>(null)
RootContext.displayName = "RadioGroup.Context"

//////////////////
// RadioGroup Root
//////////////////

type RootProps = ElementProps<"div"> & {
  name?: string
  value?: Kaioken.Signal<string | null>
  asChild?: boolean
  loop?: boolean
}

export const Root: Kaioken.FC<RootProps> = (props) => {
  const internalName = useMemo(() => {
    return crypto.randomUUID()
  }, [])
  const internalValue = signal(null)
  const { name: propsName, value: propsValue, asChild, ...rest } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const loop = props.loop ?? true

  const value = useMemo(() => {
    return {
      name: propsName ?? internalName,
      value: propsValue ?? internalValue,
      ref,
      loop,
    }
  }, [propsName, propsValue, loop])

  const Container = asChild ? Slot : "div"

  return (
    <RootContext.Provider value={value}>
      <Container ref={ref} role="radiogroup" {...rest}>
        {props.children}
      </Container>
    </RootContext.Provider>
  )
}
Root.displayName = "RadioGroup.Root"

//////////////////
// RadioGroup Item
//////////////////

type ItemProps = ElementProps<"label"> & {
  asChild?: boolean
  value: string
  id?: string
  disabled?: boolean
  required?: boolean
}
export const Item: Kaioken.FC<ItemProps> = (props) => {
  const { asChild, value, required, disabled, id, ...rest } = props
  const radioGroupContext = useContext(RootContext)
  const Container = asChild ? Slot : "label"
  const inputStyles = useMemo(() => {
    return styleObjectToCss({
      pointerEvents: "none",
      opacity: "0",
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    })
  }, [])
  const isChecked = computed(() => {
    if (!radioGroupContext) return false

    return radioGroupContext.value.value === value
  })

  const onInput = useCallback(() => {
    if (!radioGroupContext) return
    radioGroupContext.value.value = value
  }, [value])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!radioGroupContext) return

      if (radioGroupContext.loop === false) {
        const items = radioGroupContext.ref.current?.querySelectorAll(
          `input[type="radio"][name="${radioGroupContext.name}"]`
        )
        if (e.target == items?.item(0) && e.key === "ArrowUp") {
          e.preventDefault()
        } else if (
          e.key === "ArrowDown" &&
          e.target === items?.item(items.length - 1)
        ) {
          e.preventDefault()
        }
      }
    },
    [radioGroupContext?.ref?.current]
  )

  if (!radioGroupContext) {
    console.log("RadioGroup.Root context was not found in RadioGroup.Item")
    return null
  }

  return (
    <Container {...rest}>
      <input
        id={id}
        type="radio"
        name={radioGroupContext.name}
        value={value}
        ariaHidden={"true"}
        style={inputStyles}
        oninput={onInput}
        checked={isChecked}
        disabled={disabled}
        required={required}
        onkeydown={onKeyDown}
      />
      <Slottable>{props.children}</Slottable>
    </Container>
  )
}
Item.displayName = "RadioGroup.Item"
