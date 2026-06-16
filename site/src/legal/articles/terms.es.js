import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function termsEs() {
  const privacyHref = href('privacy-policy/')
  const smsTermsHref = href('sms-terms/')

  return `
    <h1>Términos de Servicio</h1>
    <p class="legal-effective"><strong>Fecha de vigencia: ${getLegalEffectiveDate('es')}</strong></p>
    <p>Estos Términos de Servicio ("Términos") rigen su acceso y uso del sitio web de ${COMPANY_LEGAL_NAME} ("DBX Solutions", "nosotros" o "nuestro") y materiales relacionados.</p>
    <p>Al acceder o usar este sitio web, usted acepta estos Términos. Si no está de acuerdo, no debe usar este sitio web.</p>

    <h2>1. Propósito del sitio web</h2>
    <p>Este sitio web se proporciona con fines informativos generales y de comunicación comercial. Describe los servicios, el enfoque y las formas de interactuar con DBX Solutions.</p>
    <p>Nada en este sitio web constituye:</p>
    <ul>
      <li>una oferta vinculante</li>
      <li>una garantía de resultados</li>
      <li>asesoría legal, financiera o técnica</li>
      <li>una relación formal de cliente</li>
    </ul>
    <p>Todos los servicios se prestan únicamente bajo acuerdos escritos separados.</p>

    <h2>2. Ausencia de relación de cliente</h2>
    <p>Enviar un formulario, un correo electrónico, agendar una llamada o contactarnos de otra forma no crea una relación de cliente, asesoría o contractual.</p>
    <p>Una relación formal se establece solo mediante un acuerdo firmado entre DBX Solutions y el cliente.</p>

    <h2>3. Servicios y resultados</h2>
    <p>DBX Solutions ofrece servicios de consultoría, implementación y soporte relacionados con experiencia del cliente, automatización e inteligencia artificial.</p>
    <p>Cualquier ejemplo, caso de estudio, métrica o testimonio en este sitio web tiene fines informativos generales.</p>
    <p>Los resultados reales varían según factores como:</p>
    <ul>
      <li>sistemas y herramientas en uso</li>
      <li>calidad y disponibilidad de datos</li>
      <li>procesos internos</li>
      <li>adopción y ejecución del equipo</li>
      <li>alcance y plazos de implementación</li>
    </ul>
    <p>No se garantizan resultados específicos.</p>

    <h2>4. Exactitud de la información</h2>
    <p>Buscamos mantener la información precisa y actualizada, pero no garantizamos que todo el contenido sea completo, vigente o libre de errores.</p>
    <p>Podemos actualizar, modificar o eliminar contenido en cualquier momento sin previo aviso.</p>

    <h2>5. Uso aceptable</h2>
    <p>Usted acepta no:</p>
    <ul>
      <li>usar el sitio web en violación de leyes o regulaciones</li>
      <li>intentar acceder sin autorización a sistemas o datos</li>
      <li>interferir con la funcionalidad o seguridad del sitio</li>
      <li>enviar información falsa o engañosa</li>
      <li>copiar, extraer o explotar contenido más allá del uso normal de evaluación comercial</li>
    </ul>

    <h2>6. Propiedad intelectual</h2>
    <p>Todo el contenido del sitio web, incluidos texto, diseño, estructura y materiales, es propiedad de o está licenciado a DBX Solutions.</p>
    <p>Puede usar el sitio web solo para evaluación interna o consideración comercial. No se permite un uso o distribución más amplia sin consentimiento escrito.</p>

    <h2>7. Servicios de terceros y enlaces</h2>
    <p>Este sitio web puede referenciar o enlazar herramientas, plataformas o sitios de terceros.</p>
    <p>DBX Solutions no controla ni es responsable de:</p>
    <ul>
      <li>contenido de terceros</li>
      <li>disponibilidad o rendimiento</li>
      <li>prácticas de privacidad o seguridad</li>
    </ul>
    <p>El uso de servicios de terceros es bajo su propio riesgo.</p>

    <h2>8. Exención de garantías</h2>
    <p>Este sitio web se proporciona "tal cual" y "según disponibilidad".</p>
    <p>En la máxima medida permitida por la ley, DBX Solutions renuncia a todas las garantías, incluidas:</p>
    <ul>
      <li>exactitud o integridad</li>
      <li>disponibilidad o tiempo de actividad</li>
      <li>idoneidad para un propósito particular</li>
      <li>no infracción</li>
    </ul>

    <h2>9. Limitación de responsabilidad</h2>
    <p>En la máxima medida permitida por la ley, DBX Solutions no será responsable por daños indirectos, incidentales o consecuentes derivados de o relacionados con su uso de este sitio web.</p>
    <p>Esto incluye, entre otros:</p>
    <ul>
      <li>pérdida de datos</li>
      <li>pérdida de negocio o ingresos</li>
      <li>interrupciones del servicio</li>
      <li>confianza en el contenido del sitio</li>
    </ul>

    <h2>10. Indemnización</h2>
    <p>Usted acepta indemnizar y eximir de responsabilidad a DBX Solutions por reclamaciones, daños o gastos derivados de:</p>
    <ul>
      <li>su uso indebido del sitio web</li>
      <li>su violación de estos Términos</li>
      <li>su violación de leyes aplicables o derechos de terceros</li>
    </ul>

    <h2>11. Privacidad y comunicaciones</h2>
    <p>Su uso de este sitio web también está sujeto a nuestra <a href="${privacyHref}">Política de Privacidad</a> y a los <a href="${smsTermsHref}">Términos SMS</a>.</p>
    <p>Si proporciona su información de contacto, acepta que DBX Solutions pueda contactarlo respecto a su consulta, servicios o comunicaciones relacionadas, sujeto a los requisitos de consentimiento aplicables.</p>

    <h2>12. Cambios a estos Términos</h2>
    <p>Podemos actualizar estos Términos periódicamente. Cuando lo hagamos, revisaremos la fecha de vigencia anterior y publicaremos la versión actualizada en esta página.</p>

    <h2>13. Ley aplicable</h2>
    <p>Estos Términos se rigen por las leyes del Estado de Florida y las leyes aplicables de los Estados Unidos, sin tener en cuenta principios de conflicto de leyes.</p>
    <p>Cualquier disputa se resolverá en los tribunales competentes ubicados en Florida, salvo acuerdo escrito en contrario.</p>

    <h2>14. Contacto</h2>
    ${legalContactBlockHtml()}
  `
}
