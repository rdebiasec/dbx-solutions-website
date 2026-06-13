const INTERCOM_APP_ID = 'jqhtr1nj'

/** Boot Intercom Messenger once per page load (all routes). */
export function initIntercom() {
  if (typeof window === 'undefined' || window.__dbxIntercomBooted) return
  window.__dbxIntercomBooted = true

  window.intercomSettings = {
    api_base: 'https://api-iam.intercom.io',
    app_id: INTERCOM_APP_ID
  }

  const w = window
  const ic = w.Intercom
  if (typeof ic === 'function') {
    ic('reattach_activator')
    ic('update', w.intercomSettings)
    return
  }

  const d = document
  const queue = function () {
    queue.c(arguments)
  }
  queue.q = []
  queue.c = function (args) {
    queue.q.push(args)
  }
  w.Intercom = queue

  const load = () => {
    const script = d.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://widget.intercom.io/widget/${INTERCOM_APP_ID}`
    const first = d.getElementsByTagName('script')[0]
    first.parentNode.insertBefore(script, first)
  }

  if (d.readyState === 'complete') {
    load()
  } else {
    w.addEventListener('load', load, false)
  }
}
