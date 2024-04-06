import { PageContext } from "vike/types"
import { PageShell } from "./PageShell"
import { useRootNode } from "@kaioken-core/hooks"

export function App({ pageContext }: { pageContext: PageContext }) {
  const { Page, data = {} } = pageContext
  console.log(useRootNode());

  return (
    <PageShell pageContext={pageContext}>
      <Page {...data} />
    </PageShell>
  )
}
