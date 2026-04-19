import '../style.css'
import { mountLegalPage } from './shell.js'
import { getPrivacyArticleHtml } from './privacy-article.js'

mountLegalPage({
  activePage: 'privacy',
  innerArticleHtml: getPrivacyArticleHtml()
})
