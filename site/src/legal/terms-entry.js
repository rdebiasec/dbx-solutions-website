import '../style.css'
import { mountLegalPage } from './shell.js'
import { getTermsArticleHtml } from './terms-article.js'

mountLegalPage({
  activePage: 'terms',
  innerArticleHtml: getTermsArticleHtml()
})
