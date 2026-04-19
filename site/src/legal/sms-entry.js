import '../style.css'
import { mountLegalPage } from './shell.js'
import { getSmsTermsArticleHtml } from './sms-article.js'

mountLegalPage({
  activePage: 'sms',
  innerArticleHtml: getSmsTermsArticleHtml()
})
