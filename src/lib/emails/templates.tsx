import { Button, Section, Text } from "@react-email/components";
import { EmailLayout } from "./EmailLayout";
import {
  buttonGhost,
  buttonPrimary,
  card,
  divider,
  EMAIL_COLORS,
  headline,
  headlineLg,
  muted,
  paragraph,
  subtext,
} from "./styles";

const APP_URL = "https://brerev.com";

// ────────────────────────────────────────────────────────────────
// 1. BIENVENIDA
// ────────────────────────────────────────────────────────────────
export function WelcomeEmail({ name = "Juan" }: { name?: string } = {}) {
  return (
    <EmailLayout preview="Empieza a configurar tu sistema en 5 minutos">
      <Text style={headlineLg}>Bienvenido a Brerev, {name}.</Text>
      <Text style={subtext}>
        Ya tienes acceso a tu sistema de gestión de leads. Ahora solo falta
        configurarlo.
      </Text>

      <Section style={card}>
        <Text
          style={{
            ...paragraph,
            fontSize: "13px",
            color: EMAIL_COLORS.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 16px",
          }}
        >
          Próximos pasos
        </Text>
        <Text style={paragraph}>1. Conecta tu WhatsApp</Text>
        <Text style={paragraph}>2. Sube tus propiedades</Text>
        <Text style={{ ...paragraph, margin: 0 }}>
          3. Personaliza tus mensajes
        </Text>
      </Section>

      <Button href={`${APP_URL}/onboarding`} style={{ ...buttonPrimary, width: "100%", boxSizing: "border-box" }}>
        Comenzar configuración →
      </Button>

      <Text style={{ ...muted, marginTop: 24 }}>
        Tienes 5 días de prueba gratuita. No se hace ningún cobro hasta que el
        periodo termine.
      </Text>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 2. TRIAL ACTIVADO
// ────────────────────────────────────────────────────────────────
export function TrialActivatedEmail({ endDate = "28 abril 2026" }: { endDate?: string } = {}) {
  return (
    <EmailLayout preview="5 días para descubrir todo lo que puede hacer tu sistema">
      <Text style={headline}>Tu sistema está en prueba por 5 días.</Text>

      <Section
        style={{
          ...card,
          background: "rgba(0,214,143,0.08)",
          border: `1px solid ${EMAIL_COLORS.success}`,
        }}
      >
        <Text style={{ ...paragraph, color: EMAIL_COLORS.success, margin: 0 }}>
          ✓ Prueba gratuita activa hasta el {endDate}
        </Text>
      </Section>

      <Text style={paragraph}>3 cosas para hacer esta semana:</Text>
      <Text style={paragraph}>☐ Conecta tu WhatsApp y sube 5 propiedades</Text>
      <Text style={paragraph}>☐ Comparte tu número con leads existentes</Text>
      <Text style={paragraph}>☐ Revisa el reporte al final de los 5 días</Text>

      <hr style={divider} />

      <Text style={{ ...paragraph, fontWeight: 600 }}>Lo que incluye tu plan:</Text>
      <Text style={muted}>
        Conversaciones ilimitadas · Calificación automática · Agendado de citas ·
        Reportes en tiempo real
      </Text>

      <Button href={`${APP_URL}/app/dashboard`} style={{ ...buttonPrimary, marginTop: 16 }}>
        Ir a mi dashboard →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 3. SISTEMA ACTIVO
// ────────────────────────────────────────────────────────────────
export function SystemLiveEmail({
  assistantName = "Sofía",
  whatsapp = "+52 55 1234 5678",
  properties = 12,
}: { assistantName?: string; whatsapp?: string; properties?: number } = {}) {
  return (
    <EmailLayout preview="Tu sistema Brerev está activo y funcionando">
      <Text style={headline}>Tu sistema está activo.</Text>

      <Section
        style={{
          ...card,
          borderLeft: `3px solid ${EMAIL_COLORS.success}`,
        }}
      >
        <Text style={paragraph}>✓ {assistantName} está configurado</Text>
        <Text style={paragraph}>✓ WhatsApp conectado: {whatsapp}</Text>
        <Text style={paragraph}>✓ {properties} propiedades cargadas</Text>
        <Text style={{ ...paragraph, margin: 0 }}>✓ Seguimiento automático activado</Text>
      </Section>

      <Text style={paragraph}>
        A partir de ahora, ningún lead queda sin atención. El sistema responde,
        califica y agenda mientras tú te dedicas a cerrar.
      </Text>

      <Button href={`${APP_URL}/app/dashboard`} style={buttonPrimary}>
        Ver mi dashboard →
      </Button>

      <Section
        style={{
          ...card,
          background: "rgba(30,95,255,0.06)",
          border: `1px solid rgba(30,95,255,0.2)`,
        }}
      >
        <Text style={{ ...paragraph, margin: 0 }}>
          💡 Tip: Comparte tu número de WhatsApp con tus leads actuales para que
          empieces a ver resultados desde hoy.
        </Text>
      </Section>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 4. TRIAL TERMINANDO (DÍA 3)
// ────────────────────────────────────────────────────────────────
export function TrialDay3Email({
  leads = 18,
  appointments = 6,
  hoursSaved = 24,
}: { leads?: number; appointments?: number; hoursSaved?: number } = {}) {
  return (
    <EmailLayout preview="¿Ya viste cómo el sistema responde tus leads?">
      <Text style={headline}>Tu prueba termina en 2 días.</Text>

      <Section style={card}>
        <Text
          style={{
            ...muted,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0 0 16px",
          }}
        >
          Tus primeros 3 días en Brerev
        </Text>
        <Text style={{ fontSize: 28, fontWeight: 700, color: EMAIL_COLORS.text, margin: "0 0 4px" }}>
          {leads}
        </Text>
        <Text style={{ ...muted, margin: "0 0 16px" }}>leads atendidos automáticamente</Text>

        <Text style={{ fontSize: 28, fontWeight: 700, color: EMAIL_COLORS.text, margin: "0 0 4px" }}>
          {appointments}
        </Text>
        <Text style={{ ...muted, margin: "0 0 16px" }}>citas agendadas</Text>

        <Text style={{ fontSize: 28, fontWeight: 700, color: EMAIL_COLORS.success, margin: "0 0 4px" }}>
          {hoursSaved}h
        </Text>
        <Text style={{ ...muted, margin: 0 }}>ahorradas</Text>
      </Section>

      <Text style={paragraph}>
        Si tienes dudas antes de decidir, responde a este email. Nuestro equipo
        responde en minutos.
      </Text>

      <Button href={`${APP_URL}/app/dashboard`} style={buttonPrimary}>
        Ver mi sistema →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 5. TRIAL TERMINANDO (DÍA 5)
// ────────────────────────────────────────────────────────────────
export function TrialDay5Email() {
  return (
    <EmailLayout preview="Tu sistema seguirá activo si confirmas tu plan">
      <Section
        style={{
          background: "rgba(255,176,32,0.1)",
          border: `1px solid ${EMAIL_COLORS.warning}`,
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 24,
        }}
      >
        <Text style={{ ...paragraph, color: EMAIL_COLORS.warning, margin: 0, fontWeight: 600 }}>
          ⚠ Tu prueba gratuita termina hoy
        </Text>
      </Section>

      <Text style={headline}>¿Continúas con Brerev?</Text>

      <Section style={card}>
        <Text style={paragraph}>📊 Resumen de tus 5 días:</Text>
        <Text style={muted}>
          27 leads atendidos · 11 citas agendadas · 38h ahorradas · $4.2M en pipeline
        </Text>
      </Section>

      <Text style={{ ...paragraph, fontWeight: 600 }}>Elige tu plan:</Text>

      <Section style={card}>
        <Text style={{ ...paragraph, fontWeight: 600, margin: "0 0 4px" }}>Starter</Text>
        <Text style={muted}>$99 USD/mes · Hasta 100 leads/mes</Text>
        <Button href={`${APP_URL}/app/facturacion?plan=starter`} style={{ ...buttonGhost, marginTop: 12 }}>
          Activar Starter
        </Button>
      </Section>

      <Section
        style={{
          ...card,
          borderColor: EMAIL_COLORS.accent,
        }}
      >
        <Text style={{ ...paragraph, fontWeight: 600, margin: "0 0 4px" }}>
          Revenue Engine ⭐ Recomendado
        </Text>
        <Text style={muted}>$199 USD/mes · Leads ilimitados</Text>
        <Button href={`${APP_URL}/app/facturacion?plan=revenue`} style={{ ...buttonPrimary, marginTop: 12 }}>
          Continuar con Revenue Engine →
        </Button>
      </Section>

      <Text style={muted}>
        Si no haces nada, tu sistema se pausa hoy. Puedes reactivarlo en cualquier
        momento desde tu dashboard sin perder ninguna configuración.
      </Text>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 6. PRIMER LEAD ATENDIDO
// ────────────────────────────────────────────────────────────────
export function FirstLeadEmail({
  leadName = "Mariana López",
  channel = "WhatsApp",
  time = "10:47 PM",
  responseSeconds = 8,
  outcome = "Cita agendada",
}: {
  leadName?: string;
  channel?: string;
  time?: string;
  responseSeconds?: number;
  outcome?: string;
} = {}) {
  return (
    <EmailLayout preview={`${leadName} contactó tu negocio y fue atendido al instante`}>
      <Text style={headline}>🎯 Tu primer lead fue atendido.</Text>

      <Section style={card}>
        <Text style={{ ...paragraph, fontWeight: 600, fontSize: 18, margin: "0 0 12px" }}>
          {leadName}
        </Text>
        <Text style={muted}>Canal: por {channel}</Text>
        <Text style={muted}>Hora: a las {time}</Text>
        <Text style={muted}>Tiempo de respuesta: en {responseSeconds} segundos</Text>
        <Text style={{ ...muted, color: EMAIL_COLORS.success, margin: "8px 0 0", fontWeight: 600 }}>
          ✓ {outcome}
        </Text>
      </Section>

      <Text style={paragraph}>
        Sin el sistema, ese lead habría llegado a las {time} sin que nadie
        contestara. Ya trabajaste mientras dormías.
      </Text>

      <Button href={`${APP_URL}/app/conversaciones`} style={buttonPrimary}>
        Ver la conversación completa →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 7. PRIMERA CITA
// ────────────────────────────────────────────────────────────────
export function FirstAppointmentEmail({
  leadName = "Carlos Ruiz",
  date = "Mañana 10:30 AM",
  property = "Departamento en Roma Norte",
  scheduledAt = "11:42 PM",
}: {
  leadName?: string;
  date?: string;
  property?: string;
  scheduledAt?: string;
} = {}) {
  return (
    <EmailLayout preview="El sistema agendó una cita sin que movieras un dedo">
      <Text style={headline}>📅 Primera cita generada por el sistema.</Text>

      <Section style={card}>
        <Text style={{ ...paragraph, fontWeight: 600, fontSize: 18, margin: "0 0 12px" }}>
          {leadName}
        </Text>
        <Text style={muted}>📅 {date}</Text>
        <Text style={muted}>🏠 {property}</Text>
        <Text style={{ ...muted, color: EMAIL_COLORS.success, margin: "8px 0 0", fontWeight: 600 }}>
          ✓ Cita en tu calendario
        </Text>
      </Section>

      <Text style={paragraph}>
        Esta cita fue agendada automáticamente a las {scheduledAt} después de que
        {" "}{leadName} contactó tu sistema. No necesitaste intervenir.
      </Text>

      <Button href={`${APP_URL}/app/citas`} style={buttonPrimary}>
        Ver en mi calendario →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 8. RESUMEN SEMANAL
// ────────────────────────────────────────────────────────────────
export function WeeklySummaryEmail({
  weekStart = "14 abril",
  weekEnd = "20 abril",
  leads = 47,
  appointments = 12,
  pipeline = "$8.4M",
  responseSec = 9,
}: {
  weekStart?: string;
  weekEnd?: string;
  leads?: number;
  appointments?: number;
  pipeline?: string;
  responseSec?: number;
} = {}) {
  const kpiBlock = (label: string, value: string | number, accent?: string) => (
    <Section
      style={{
        ...card,
        margin: "0 0 12px",
        padding: "20px 24px",
      }}
    >
      <Text style={{ fontSize: 32, fontWeight: 700, color: accent ?? EMAIL_COLORS.text, margin: 0 }}>
        {value}
      </Text>
      <Text style={{ ...muted, margin: "4px 0 0" }}>{label}</Text>
    </Section>
  );

  return (
    <EmailLayout preview={`${leads} leads · ${appointments} citas · ${pipeline} en pipeline`}>
      <Text
        style={{
          ...muted,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          margin: "0 0 8px",
        }}
      >
        Resumen semanal · {weekStart} — {weekEnd}
      </Text>
      <Text style={headline}>Tu semana en Brerev</Text>

      {kpiBlock("leads atendidos", leads)}
      {kpiBlock("citas agendadas", appointments, EMAIL_COLORS.accent)}
      {kpiBlock("en pipeline generado", pipeline, EMAIL_COLORS.success)}
      {kpiBlock("tiempo de respuesta promedio", `${responseSec}s`)}

      <Section
        style={{
          ...card,
          background: "rgba(30,95,255,0.06)",
        }}
      >
        <Text style={{ ...paragraph, margin: "0 0 8px", fontWeight: 600 }}>
          ⭐ Destacado de la semana
        </Text>
        <Text style={{ ...muted, margin: 0 }}>
          Tu lead más activo: Mariana López — 14 mensajes intercambiados,
          calificada con intención alta y cita agendada para el sábado.
        </Text>
      </Section>

      <Text style={paragraph}>
        Sigue así. Cada semana que el sistema trabaja por ti, tu pipeline crece.
      </Text>

      <Button href={`${APP_URL}/app/reporte`} style={buttonPrimary}>
        Ver reporte completo →
      </Button>

      <Text style={{ ...muted, marginTop: 16 }}>
        <a href={`${APP_URL}/app/configuracion`} style={{ color: EMAIL_COLORS.textMuted }}>
          Pausar estos resúmenes
        </a>
      </Text>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 9. COBRO EXITOSO
// ────────────────────────────────────────────────────────────────
export function PaymentSuccessEmail({
  amount = "$199.00 USD",
  period = "Abril 2026",
  card4 = "4242",
  date = "23 abril 2026",
}: {
  amount?: string;
  period?: string;
  card4?: string;
  date?: string;
} = {}) {
  const row = (label: string, value: string) => (
    <Text style={{ ...paragraph, margin: "0 0 8px", display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: EMAIL_COLORS.textMuted }}>{label}</span>
      <span style={{ color: EMAIL_COLORS.text, fontWeight: 600 }}>{value}</span>
    </Text>
  );

  return (
    <EmailLayout preview={`${amount} cobrado exitosamente`}>
      <Text style={headline}>Pago recibido</Text>

      <Section style={card}>
        {row("Plan", "Revenue Engine")}
        {row("Periodo", period)}
        {row("Monto", amount)}
        {row("Tarjeta", `VISA ****${card4}`)}
        {row("Fecha", date)}
      </Section>

      <Button href={`${APP_URL}/app/facturacion`} style={buttonGhost}>
        Descargar factura PDF →
      </Button>

      <Text style={{ ...muted, marginTop: 24 }}>
        ¿Alguna pregunta sobre tu cobro? Responde a este email.
      </Text>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 10. COBRO FALLIDO
// ────────────────────────────────────────────────────────────────
export function PaymentFailedEmail({
  amount = "$199.00 USD",
  date = "23 abril 2026",
  card4 = "4242",
}: { amount?: string; date?: string; card4?: string } = {}) {
  return (
    <EmailLayout preview="Tu sistema Brerev podría pausarse — actualiza tu tarjeta">
      <Text style={{ ...headline, color: EMAIL_COLORS.danger }}>
        ⚠ No pudimos procesar tu pago.
      </Text>

      <Text style={paragraph}>
        Intentamos cobrar {amount} el {date} a tu tarjeta VISA ****{card4} pero
        no fue posible.
      </Text>

      <Section style={card}>
        <Text style={{ ...paragraph, fontWeight: 600, margin: "0 0 12px" }}>
          Causas comunes:
        </Text>
        <Text style={muted}>· Fondos insuficientes</Text>
        <Text style={muted}>· Tarjeta vencida o bloqueada</Text>
        <Text style={muted}>· Límite de transacciones internacionales</Text>
      </Section>

      <Button href={`${APP_URL}/app/facturacion`} style={{ ...buttonPrimary, background: EMAIL_COLORS.danger }}>
        Actualizar mi tarjeta →
      </Button>

      <Text style={{ ...muted, marginTop: 24 }}>
        Tienes 3 días para actualizar la tarjeta antes de que tu sistema se pause.
        No perderás ninguna configuración.
      </Text>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 11. CANCELACIÓN
// ────────────────────────────────────────────────────────────────
export function CancellationEmail({
  date = "23 abril 2026",
}: { date?: string } = {}) {
  return (
    <EmailLayout preview="Lamentamos verte ir — puedes reactivar cuando quieras">
      <Text style={headline}>Tu suscripción ha sido cancelada.</Text>

      <Text style={paragraph}>Tu sistema se pausó el {date}.</Text>

      <Text style={paragraph}>
        Guardamos toda tu configuración durante 90 días. Si decides volver, todo
        estará exactamente como lo dejaste — canales, mensajes, historial de leads.
      </Text>

      <Section style={card}>
        <Text style={{ ...paragraph, fontWeight: 600, margin: "0 0 12px" }}>
          ¿Podemos saber por qué te fuiste?
        </Text>
        <Text style={{ ...muted, margin: "0 0 8px" }}>
          <a href={`${APP_URL}/feedback?reason=expensive`} style={{ color: EMAIL_COLORS.accent }}>
            · Muy caro
          </a>
        </Text>
        <Text style={{ ...muted, margin: "0 0 8px" }}>
          <a href={`${APP_URL}/feedback?reason=unused`} style={{ color: EMAIL_COLORS.accent }}>
            · No lo usé suficiente
          </a>
        </Text>
        <Text style={{ ...muted, margin: "0 0 8px" }}>
          <a href={`${APP_URL}/feedback?reason=competitor`} style={{ color: EMAIL_COLORS.accent }}>
            · Encontré otra solución
          </a>
        </Text>
        <Text style={{ ...muted, margin: 0 }}>
          <a href={`${APP_URL}/feedback?reason=other`} style={{ color: EMAIL_COLORS.accent }}>
            · Otra razón
          </a>
        </Text>
      </Section>

      <Button href={`${APP_URL}/app/facturacion`} style={buttonGhost}>
        Si cambias de opinión, reactiva aquí →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// 12. LEAD CALIENTE
// ────────────────────────────────────────────────────────────────
export function HotLeadEmail({
  business = "Tu inmobiliaria",
  leadName = "Andrés Vega",
  property = "Casa en Coyoacán",
  budget = "$8.5M MXN",
  minutesAgo = 4,
}: {
  business?: string;
  leadName?: string;
  property?: string;
  budget?: string;
  minutesAgo?: number;
} = {}) {
  return (
    <EmailLayout preview={`${leadName} mostró alta intención. Actúa ahora.`}>
      <Text
        style={{
          ...muted,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: EMAIL_COLORS.danger,
          margin: "0 0 8px",
          fontWeight: 600,
        }}
      >
        🔥 Lead caliente · {business}
      </Text>
      <Text style={headline}>Lead con alta intención detectado</Text>

      <Section
        style={{
          ...card,
          borderLeft: `4px solid ${EMAIL_COLORS.danger}`,
        }}
      >
        <Text style={{ ...paragraph, fontWeight: 700, fontSize: 22, margin: "0 0 16px" }}>
          {leadName}
        </Text>
        <Text style={muted}>Buscando: {property}</Text>
        <Text style={muted}>Presupuesto: {budget}</Text>
        <Text style={muted}>Contactó: hace {minutesAgo} minutos</Text>
        <Text style={{ ...muted, margin: "12px 0 0", color: EMAIL_COLORS.danger, fontWeight: 600 }}>
          Intención: ████████░░ Alta
        </Text>
      </Section>

      <Button
        href={`${APP_URL}/app/conversaciones`}
        style={{ ...buttonPrimary, width: "100%", boxSizing: "border-box", fontSize: 16, padding: "16px 24px" }}
      >
        Ver conversación →
      </Button>
    </EmailLayout>
  );
}

// ────────────────────────────────────────────────────────────────
// REGISTRY
// ────────────────────────────────────────────────────────────────
export type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  trigger: string;
  component: React.ComponentType;
};

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "welcome",
    name: "1. Bienvenida",
    subject: "Tu cuenta de Brerev está lista",
    trigger: "Webhook · usuario creado",
    component: WelcomeEmail,
  },
  {
    id: "trial-activated",
    name: "2. Trial activado",
    subject: "Tu prueba gratuita de Brerev está activa",
    trigger: "Stripe · trial_start",
    component: TrialActivatedEmail,
  },
  {
    id: "system-live",
    name: "3. Sistema activo",
    subject: "🎉 Tu asistente ya está respondiendo tus leads",
    trigger: "Wizard completado",
    component: SystemLiveEmail,
  },
  {
    id: "trial-day3",
    name: "4. Trial día 3",
    subject: "Te quedan 2 días de prueba gratuita",
    trigger: "Cron · día 3",
    component: TrialDay3Email,
  },
  {
    id: "trial-day5",
    name: "5. Trial día 5",
    subject: "Hoy termina tu prueba de Brerev",
    trigger: "Cron · día 5",
    component: TrialDay5Email,
  },
  {
    id: "first-lead",
    name: "6. Primer lead atendido",
    subject: "🎯 Tu sistema atendió su primer lead",
    trigger: "conversations.count = 1",
    component: FirstLeadEmail,
  },
  {
    id: "first-appointment",
    name: "7. Primera cita",
    subject: "📅 Tu primera cita fue agendada automáticamente",
    trigger: "appointments.count = 1",
    component: FirstAppointmentEmail,
  },
  {
    id: "weekly-summary",
    name: "8. Resumen semanal",
    subject: "Tu semana en Brerev",
    trigger: "Cron · lunes 7AM",
    component: WeeklySummaryEmail,
  },
  {
    id: "payment-success",
    name: "9. Cobro exitoso",
    subject: "Recibo de pago — Brerev",
    trigger: "Stripe · invoice.payment_succeeded",
    component: PaymentSuccessEmail,
  },
  {
    id: "payment-failed",
    name: "10. Cobro fallido",
    subject: "⚠ Hay un problema con tu pago",
    trigger: "Stripe · invoice.payment_failed",
    component: PaymentFailedEmail,
  },
  {
    id: "cancellation",
    name: "11. Cancelación",
    subject: "Tu sistema Brerev ha sido pausado",
    trigger: "Stripe · subscription.deleted",
    component: CancellationEmail,
  },
  {
    id: "hot-lead",
    name: "12. Lead caliente",
    subject: "🔥 Lead caliente detectado",
    trigger: "intent_score >= 4",
    component: HotLeadEmail,
  },
];
