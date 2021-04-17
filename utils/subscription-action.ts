import { interval as rxjsInterval } from "rxjs"

export async function subscriptionAction (
  { dispatch }: any,
  type: string,
  payload?: any
) {
  await dispatch(type, payload, { root: true })
  return rxjsInterval(5000).subscribe(() =>
    dispatch(type, payload, { root: true })
  )
}
