import { signal, Signal } from "kaioken"
import Muuri, { Item } from "muuri"

export const _internalGridToSignal = new Map<Muuri, Signal<any[]>>()

export const hasLastItemMovedGrid = signal<Item | null>(null)
