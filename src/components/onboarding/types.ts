export type WizardData = {
  // Paso 1
  businessName: string;
  ownerName: string;
  city: string;
  propertyTypes: string[];
  monthlyLeads: number;
  // Paso 2
  whatsappOption: "existing" | "new" | null;
  whatsappStatus: "idle" | "connecting" | "connected" | "error";
  whatsappNumber: string;
  callsEnabled: boolean;
  callsOption: "forward" | "new" | null;
  formsEnabled: boolean;
  portals: string[];
  websiteUrl: string;
  // Paso 3
  assistantName: string;
  voiceId: string;
  tone: "formal" | "warm" | "direct";
  bilingual: boolean;
  // Paso 4
  inventoryMethod: "file" | "url" | "later" | null;
  inventoryCount: number;
  portalUrl: string;
  // Paso 5
  messages: Record<string, string>;
  // Paso 6 — solo flag de probado
  tested: boolean;
};

export const DEFAULT_MESSAGES: Record<string, string> = {
  welcome:
    "¡Hola! Soy {assistantName}, asistente de {businessName}. Gracias por contactarnos. ¿Estás buscando una propiedad para comprar, rentar o invertir? Con gusto te ayudo a encontrar lo que necesitas.",
  budget:
    "Para mostrarte las mejores opciones disponibles, ¿me podrías decir aproximadamente cuál es el presupuesto que tienes en mente?",
  appointmentConfirm:
    "¡Perfecto! Tu cita está confirmada para el {fecha} a las {hora}. Te veo en {lugar}. Cualquier duda antes, escríbeme aquí mismo.",
  reminder24:
    "Hola {nombre}, te recuerdo que mañana tienes una cita con {businessName} a las {hora}. ¿Confirmamos que todo sigue en pie? Responde SÍ para confirmar.",
  reminder1:
    "¡Nos vemos en una hora! Tu cita es a las {hora}. ¿Tienes alguna pregunta antes de que nos veamos?",
  unconfirmed:
    "Hola {nombre}, quería verificar si nuestra cita de mañana a las {hora} sigue confirmada. Si necesitas cambiar el horario, con gusto te busco otra opción.",
  reactivation:
    "Hola {nombre}, hace unos días platicamos sobre propiedades en {zona}. ¿Cómo va tu búsqueda? Acaba de entrar algo que podría interesarte. ¿Quieres que te comparta los detalles?",
};

export const INITIAL_DATA: WizardData = {
  businessName: "",
  ownerName: "",
  city: "",
  propertyTypes: [],
  monthlyLeads: 80,
  whatsappOption: "existing",
  whatsappStatus: "idle",
  whatsappNumber: "",
  callsEnabled: false,
  callsOption: null,
  formsEnabled: false,
  portals: [],
  websiteUrl: "",
  assistantName: "",
  voiceId: "sofia",
  tone: "warm",
  bilingual: false,
  inventoryMethod: null,
  inventoryCount: 0,
  portalUrl: "",
  messages: { ...DEFAULT_MESSAGES },
  tested: false,
};

export const VOICES = [
  { id: "sofia", name: "Sofía", style: "Cálida", gradient: "from-pink-500 to-rose-500" },
  { id: "carlos", name: "Carlos", style: "Profesional", gradient: "from-blue-500 to-cyan-500" },
  { id: "valeria", name: "Valeria", style: "Natural", gradient: "from-purple-500 to-pink-500" },
  { id: "rodrigo", name: "Rodrigo", style: "Directo", gradient: "from-amber-500 to-orange-500" },
  { id: "ana", name: "Ana", style: "Cálida", gradient: "from-emerald-500 to-teal-500" },
  { id: "miguel", name: "Miguel", style: "Profesional", gradient: "from-indigo-500 to-blue-500" },
];

export const STEP_LABELS = [
  "Negocio",
  "Canal",
  "Asistente",
  "Inventario",
  "Mensajes",
  "Prueba",
  "Activar",
];
