import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function smsEs() {
  const privacyHref = href('privacy-policy/')

  return `
    <h1>Términos SMS</h1>
    <p class="legal-effective"><strong>Fecha de vigencia: ${getLegalEffectiveDate('es')}</strong></p>
    <p>Estos Términos SMS describen cómo ${COMPANY_LEGAL_NAME}, sociedad de responsabilidad limitada constituida en el estado de Florida, Estados Unidos ("DBX Solutions", "nosotros" o "nuestro"), se comunica con personas mediante <strong>mensajes de texto automatizados</strong> en relación con consultas comerciales, reuniones y servicios.</p>

    <h2>1. Descripción del programa</h2>
    <p>Si usted proporciona su número móvil y acepta el opt-in cuando sea requerido, puede recibir mensajes SMS de DBX Solutions relacionados con su interacción comercial con nosotros.</p>
    <p>Los mensajes pueden incluir:</p>
    <ul>
      <li>recordatorios de citas</li>
      <li>coordinación de consultas o demostraciones</li>
      <li>comunicaciones de soporte</li>
      <li>actualizaciones relacionadas con servicios</li>
    </ul>
    <p>No enviamos mensajes no solicitados ni utilizamos listas de contactos compradas, alquiladas o de terceros.</p>

    <h2>2. Suscripción y consentimiento</h2>
    <p>Al marcar la casilla de consentimiento SMS en nuestro sitio web (o al proporcionar su número móvil y confirmar el consentimiento cuando sea requerido), usted otorga <strong>consentimiento expreso previo por escrito</strong> conforme a la Telephone Consumer Protection Act (TCPA) de EE. UU. y a la Florida Telemarketing Act (FTSA) para recibir <strong>mensajes de texto automatizados</strong> de DBX Solutions al número que proporcione.</p>
    <p>Usted otorga consentimiento para recibir mensajes SMS al enviar su número de teléfono a través de nuestro sitio web u otros canales de comunicación y, cuando corresponda, al seleccionar la casilla de opt-in. Las firmas electrónicas y el consentimiento electrónico bajo la E-SIGN Act de EE. UU. satisfacen el requisito de consentimiento por escrito cuando usted marca la casilla de consentimiento.</p>
    <p>El consentimiento no es condición de compra.</p>

    <h2>3. Frecuencia de mensajes</h2>
    <p>La frecuencia de los mensajes varía según su interacción con nosotros, sus solicitudes y cualquier compromiso de servicio activo.</p>

    <h2>4. Tarifas de mensajes y datos</h2>
    <p>Pueden aplicar tarifas de mensajes y datos según el plan de su operador inalámbrico. DBX Solutions no es responsable de estos cargos.</p>

    <h2>5. Cancelación (opt-out)</h2>
    <p>Puede cancelar los mensajes SMS en cualquier momento respondiendo STOP a cualquier mensaje.</p>
    <p>Después de cancelar, puede recibir un mensaje final de confirmación.</p>

    <h2>6. Ayuda y soporte</h2>
    <p>Para asistencia, responda HELP a cualquier mensaje o contáctenos directamente:</p>
    ${legalContactBlockHtml()}

    <h2>7. Proveedores de terceros y operadores</h2>
    <p>La entrega de SMS es respaldada por proveedores de servicios de terceros y operadores inalámbricos.</p>
    <p>Los operadores no son responsables por mensajes retrasados o no entregados.</p>
    <p>DBX Solutions no es responsable por retrasos o fallas de transmisión causados por redes de operadores o plataformas de terceros.</p>

    <h2>8. Privacidad</h2>
    <p>La información recopilada en relación con comunicaciones SMS se maneja conforme a nuestra <a href="${privacyHref}">Política de Privacidad</a>.</p>
    <p>No compartimos información móvil con terceros o afiliados para sus propios fines de marketing o promoción.</p>

    <h2>9. Cambios a estos Términos</h2>
    <p>Podemos actualizar estos Términos SMS periódicamente. Cuando lo hagamos, revisaremos la fecha de vigencia anterior y publicaremos la versión actualizada en esta página.</p>
  `
}
