
import { Pages } from '$/utils/meta'
import type { PageContext } from 'vike/types'
 
// Overrides the default <title>
export default (pageContext: PageContext) => {
  let title = 'Kaioken-core'
  const name = Pages.get(pageContext.urlParsed.pathname)?.name 
  if (name) {
    title = `${title} - ${name}`
  }

  return title
}
