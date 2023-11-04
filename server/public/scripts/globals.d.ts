// So this is the only way I was able to get Axios to have types for VSCode to
// use. I do not like this solution at all, but it breaks the fewest things.

import type { AxiosStatic } from "../../../types/vendor/axios"

declare global {
  const axios: AxiosStatic
}
