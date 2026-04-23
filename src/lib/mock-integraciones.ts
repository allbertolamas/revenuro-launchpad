// Catálogo de integraciones disponibles para Brerev.
// El estado conectado/no conectado se persiste en localStorage hasta tener Supabase.

export type IntegrationCategory =
  | "calendario"
  | "crm"
  | "portales"
  | "comunicacion"
  | "automatizacion";

export type IntegrationStatus = "available" | "coming_soon";

export type Integration = {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  // emoji o initial para evitar dependencias de logos externos
  badge: string;
  badgeColor: string;
};

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  calendario: "Calendarios",
  crm: "CRM y bases de datos",
  portales: "Portales inmobiliarios",
  comunicacion: "Comunicación",
  automatizacion: "Automatización",
};

export const INTEGRATIONS: Integration[] = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sincroniza tus citas automáticamente con tu calendario de Google.",
    category: "calendario",
    status: "available",
    badge: "GC",
    badgeColor: "#4285F4",
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Conecta tu calendario de Outlook para no chocar con otras citas.",
    category: "calendario",
    status: "available",
    badge: "O",
    badgeColor: "#0078D4",
  },
  {
    id: "apple-calendar",
    name: "Apple Calendar",
    description: "Compatibilidad con iCloud Calendar para usuarios Apple.",
    category: "calendario",
    status: "coming_soon",
    badge: "",
    badgeColor: "#000000",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Permite a tus leads agendar directo desde tus disponibilidades.",
    category: "calendario",
    status: "available",
    badge: "Cy",
    badgeColor: "#006BFF",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Envía cada lead calificado a tu CRM con todos los datos completos.",
    category: "crm",
    status: "available",
    badge: "Hs",
    badgeColor: "#FF7A59",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Crea contactos y oportunidades en Salesforce automáticamente.",
    category: "crm",
    status: "available",
    badge: "Sf",
    badgeColor: "#00A1E0",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Cada lead nuevo entra a tu pipeline con la etapa correcta.",
    category: "crm",
    status: "available",
    badge: "Pd",
    badgeColor: "#1A1A1A",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Exporta tus leads en tiempo real a una hoja de cálculo.",
    category: "crm",
    status: "available",
    badge: "Sh",
    badgeColor: "#0F9D58",
  },
  {
    id: "inmuebles24",
    name: "Inmuebles24",
    description: "Recibe los contactos del portal directo en tu sistema.",
    category: "portales",
    status: "available",
    badge: "I24",
    badgeColor: "#E73C7E",
  },
  {
    id: "vivanuncios",
    name: "Vivanuncios",
    description: "Centraliza los leads de Vivanuncios en una sola bandeja.",
    category: "portales",
    status: "available",
    badge: "Vn",
    badgeColor: "#FFB700",
  },
  {
    id: "mercadolibre",
    name: "MercadoLibre Inmuebles",
    description: "Captura los mensajes de MercadoLibre sin perder un solo lead.",
    category: "portales",
    status: "coming_soon",
    badge: "ML",
    badgeColor: "#FFE600",
  },
  {
    id: "easybroker",
    name: "EasyBroker",
    description: "Sincroniza tu inventario de propiedades con EasyBroker.",
    category: "portales",
    status: "available",
    badge: "Eb",
    badgeColor: "#0066CC",
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business",
    description: "Conexión oficial con la API de WhatsApp Business.",
    category: "comunicacion",
    status: "available",
    badge: "Wa",
    badgeColor: "#25D366",
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    description: "Responde leads desde tus anuncios de Facebook automáticamente.",
    category: "comunicacion",
    status: "available",
    badge: "Fb",
    badgeColor: "#0084FF",
  },
  {
    id: "instagram",
    name: "Instagram Direct",
    description: "Convierte mensajes de Instagram en leads calificados.",
    category: "comunicacion",
    status: "coming_soon",
    badge: "Ig",
    badgeColor: "#E1306C",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Conecta Brerev con más de 5,000 apps usando Zapier.",
    category: "automatizacion",
    status: "available",
    badge: "Zp",
    badgeColor: "#FF4A00",
  },
  {
    id: "make",
    name: "Make (Integromat)",
    description: "Crea automatizaciones avanzadas sin código.",
    category: "automatizacion",
    status: "available",
    badge: "Mk",
    badgeColor: "#6D00CC",
  },
  {
    id: "webhooks",
    name: "Webhooks personalizados",
    description: "Envía cada evento a tu propio endpoint para automatización custom.",
    category: "automatizacion",
    status: "available",
    badge: "Wh",
    badgeColor: "#1E5FFF",
  },
];

const STORAGE_KEY = "brerev_integrations_v1";

export function loadConnectedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function saveConnectedIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  window.dispatchEvent(new Event("brerev:state-change"));
}

export function toggleConnected(id: string): boolean {
  const ids = loadConnectedIds();
  if (ids.has(id)) {
    ids.delete(id);
  } else {
    ids.add(id);
  }
  saveConnectedIds(ids);
  return ids.has(id);
}
