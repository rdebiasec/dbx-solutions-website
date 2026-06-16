import { COMPANY_LEGAL_NAME, getLegalEffectiveDate, legalContactBlockHtml } from '../constants.js'

export default function privacyEs() {
  return `
    <h1>Política de Privacidad</h1>
    <p class="legal-effective"><strong>Fecha de vigencia: ${getLegalEffectiveDate('es')}</strong></p>
    <p>${COMPANY_LEGAL_NAME}, sociedad de responsabilidad limitada constituida en el estado de Florida, Estados Unidos ("DBX Solutions", "nosotros" o "nuestro"), ofrece servicios de consultoría e implementación en experiencia del cliente, automatización e inteligencia artificial para empresas. Respetamos su privacidad y nos comprometemos a tratar la información personal de forma responsable.</p>
    <p>Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y conservamos información cuando usted visita nuestro sitio web, envía una consulta, agenda una reunión o interactúa con nosotros de cualquier otra forma.</p>

    <h2>1. Información que recopilamos</h2>
    <p>Podemos recopilar las siguientes categorías de información:</p>

    <h3>Información que usted proporciona directamente</h3>
    <ul>
      <li>nombre</li>
      <li>correo electrónico</li>
      <li>número de teléfono</li>
      <li>nombre de la empresa y datos comerciales relacionados</li>
      <li>contenido de la consulta e información del proyecto</li>
    </ul>

    <h3>Información recopilada automáticamente</h3>
    <p>Cuando visita nuestro sitio web, podemos recopilar datos técnicos y de uso, como:</p>
    <ul>
      <li>dirección IP</li>
      <li>tipo y versión del navegador</li>
      <li>tipo de dispositivo y sistema operativo</li>
      <li>páginas visitadas y tiempo de permanencia</li>
      <li>URLs de referencia e interacciones generales</li>
    </ul>

    <h3>Datos de comunicaciones</h3>
    <p>Podemos conservar registros de comunicaciones cuando usted nos contacta por correo electrónico, teléfono, SMS o herramientas de mensajería en el sitio.</p>

    <h2>2. Cómo usamos la información</h2>
    <p>Utilizamos la información para:</p>
    <ul>
      <li>responder consultas y solicitudes</li>
      <li>agendar consultas, demostraciones y seguimientos</li>
      <li>enviar comunicaciones relacionadas con servicios</li>
      <li>mejorar nuestro sitio web, servicios y operaciones</li>
      <li>mantener registros internos y flujos de trabajo</li>
      <li>proteger nuestro negocio y a los usuarios</li>
      <li>cumplir obligaciones legales o regulatorias</li>
    </ul>
    <p>También podemos usar datos agregados o desidentificados para análisis interno y mejora.</p>

    <h2>3. Comunicaciones SMS</h2>
    <p>Si usted proporciona su número de teléfono y otorga el consentimiento correspondiente cuando sea requerido, DBX Solutions puede enviar mensajes SMS relacionados con su interacción comercial con nosotros.</p>
    <p>Estos mensajes pueden incluir:</p>
    <ul>
      <li>recordatorios de citas</li>
      <li>coordinación de consultas o demostraciones</li>
      <li>respuestas de soporte</li>
      <li>actualizaciones relacionadas con servicios</li>
    </ul>
    <p>La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. El consentimiento no es condición de compra.</p>
    <p>Puede cancelar en cualquier momento respondiendo <strong>STOP</strong>. Para asistencia, responda <strong>HELP</strong> o contáctenos directamente.</p>
    <p>No compartiremos información móvil con terceros o afiliados para sus propios fines de marketing o promoción.</p>
    <p>El formulario de contacto de nuestro sitio web envía consultas por correo electrónico y no almacena envíos en nuestros servidores. Si usted acepta SMS mediante la casilla correspondiente, su preferencia de consentimiento se incluye en el mensaje que envía. Podemos conservar evidencia del opt-in SMS en nuestras comunicaciones comerciales cuando corresponda, pero no afirmamos retención sistemática de registros de consentimiento para formularios que solo utilizan correo electrónico.</p>

    <h2>4. Cookies y analítica</h2>
    <p>Podemos usar cookies y tecnologías similares para entender cómo los visitantes usan nuestro sitio web y mejorar el rendimiento y la usabilidad.</p>
    <p>Puede controlar las cookies desde la configuración de su navegador. Desactivarlas puede afectar ciertas funciones.</p>

    <h2>5. Cómo compartimos la información</h2>
    <p><strong>No vendemos información personal</strong>.</p>
    <p>Podemos compartir información con proveedores de servicios que apoyan nuestras operaciones, incluyendo:</p>
    <ul>
      <li>proveedores de alojamiento e infraestructura</li>
      <li>herramientas de analítica</li>
      <li>plataformas de comunicaciones y mensajería</li>
      <li>sistemas de CRM y flujos de trabajo</li>
    </ul>
    <p>Estos proveedores procesan información en nuestro nombre como parte de la prestación de servicios.</p>
    <p>También podemos divulgar información:</p>
    <ul>
      <li>cuando la ley o un proceso legal lo exija</li>
      <li>para proteger nuestros derechos, usuarios u operaciones</li>
      <li>en relación con una fusión, adquisición o venta de activos</li>
    </ul>

    <h2>6. Encargados del tratamiento</h2>
    <p>Utilizamos encargados de confianza para operar nuestro sitio web y comunicaciones. Las categorías actuales incluyen:</p>
    <ul>
      <li><strong>Intercom</strong> — plataforma de mensajería y soporte al cliente</li>
      <li><strong>Google Fonts</strong> — entrega de fuentes web al cargar nuestro sitio</li>
      <li>proveedores de alojamiento, correo e infraestructura que soportan la entrega del sitio</li>
    </ul>
    <p>Estos encargados procesan información personal solo en la medida necesaria para prestar sus servicios y están sujetos a obligaciones contractuales o de política acordes a su función.</p>

    <h2>7. Transferencias internacionales de datos</h2>
    <p>DBX Solutions tiene sede en Estados Unidos. Su información puede procesarse en Estados Unidos y en otros países donde operamos nosotros o nuestros proveedores. Esos países pueden tener leyes de protección de datos distintas a las de su jurisdicción.</p>
    <p>Cuando sea requerido, adoptamos medidas razonables diseñadas para proteger la información transferida internacionalmente, incluidas salvaguardas contractuales con proveedores cuando corresponda.</p>

    <h2>8. Conservación de datos</h2>
    <p>Conservamos la información solo el tiempo razonablemente necesario para:</p>
    <ul>
      <li>responder consultas</li>
      <li>mantener registros comerciales</li>
      <li>apoyar operaciones en curso</li>
      <li>cumplir obligaciones legales</li>
      <li>resolver disputas y hacer cumplir acuerdos</li>
    </ul>
    <p>Los plazos de conservación pueden variar según la naturaleza de la información.</p>

    <h2>9. Seguridad de los datos</h2>
    <p>Implementamos medidas administrativas y técnicas razonables diseñadas para proteger la información. No obstante, ningún método de transmisión o almacenamiento es completamente seguro y no podemos garantizar seguridad absoluta.</p>

    <h2>10. Sus opciones</h2>
    <p>Puede contactarnos para:</p>
    <ul>
      <li>solicitar acceso o corrección de su información</li>
      <li>solicitar eliminación de información, cuando aplique</li>
      <li>cancelar comunicaciones no esenciales</li>
    </ul>
    <p>Responderemos conforme a las leyes aplicables y requisitos operativos.</p>

    <h2>11. Derechos bajo la Ley 1581 de 2012 (Colombia)</h2>
    <p>Si usted es titular de datos personales en Colombia, esta sección complementa lo anterior conforme a la Ley 1581 de 2012 y normas concordantes.</p>
    <ul>
      <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
      <li><strong>Responsable del tratamiento:</strong> ${COMPANY_LEGAL_NAME}, quien decide sobre la base de datos y/o el tratamiento de datos personales.</li>
      <li><strong>Autorización:</strong> salvo excepciones legales, el tratamiento requiere su autorización previa, expresa e informada, la cual puede otorgarse por medios electrónicos, incluido el opt-in SMS cuando corresponda.</li>
      <li><strong>Derechos del titular:</strong> conocer, actualizar, rectificar y suprimir sus datos; revocar la autorización; y presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
      <li><strong>Consultas y reclamos:</strong> puede ejercer sus derechos contactándonos. Responderemos consultas en un plazo máximo de diez (10) días hábiles y reclamos en un plazo máximo de quince (15) días hábiles, prorrogables conforme a la ley.</li>
      <li><strong>Canal de la SIC:</strong> si no obtiene respuesta satisfactoria, puede acudir a la Superintendencia de Industria y Comercio (<a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">www.sic.gov.co</a>).</li>
    </ul>

    <h2>12. Servicios de terceros y enlaces</h2>
    <p>Nuestro sitio web puede contener enlaces a sitios o servicios de terceros. No somos responsables de sus prácticas de privacidad ni de su contenido. Le recomendamos revisar sus políticas por separado.</p>

    <h2>13. Cambios a esta política</h2>
    <p>Podemos actualizar esta Política de Privacidad periódicamente. Cuando lo hagamos, revisaremos la fecha de vigencia anterior y publicaremos la versión actualizada en esta página.</p>

    <h2>14. Contacto</h2>
    ${legalContactBlockHtml()}
  `
}
