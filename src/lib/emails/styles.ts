// Sistema de diseño compartido para todos los emails Brerev
// Compatible con @react-email/components

export const EMAIL_COLORS = {
  background: "#080E1D",
  surface: "#0C1730",
  surfaceAlt: "#0F1E3D",
  border: "#1E2D4F",
  text: "#EEF2FF",
  textMuted: "#7A8DB5",
  accent: "#1E5FFF",
  success: "#00D68F",
  warning: "#FFB020",
  danger: "#FF4757",
};

export const EMAIL_FONT = "'Inter', Helvetica, Arial, sans-serif";

export const main = {
  backgroundColor: EMAIL_COLORS.background,
  fontFamily: EMAIL_FONT,
  margin: 0,
  padding: 0,
  color: EMAIL_COLORS.text,
};

export const container = {
  maxWidth: "600px",
  margin: "0 auto",
  background: EMAIL_COLORS.background,
};

export const header = {
  background: EMAIL_COLORS.surface,
  borderBottom: `1px solid ${EMAIL_COLORS.border}`,
  padding: "24px 40px",
};

export const logo = {
  fontSize: "20px",
  fontWeight: 700,
  color: EMAIL_COLORS.text,
  letterSpacing: "3px",
  margin: 0,
};

export const content = {
  padding: "40px",
};

export const headline = {
  fontSize: "32px",
  fontWeight: 700,
  color: EMAIL_COLORS.text,
  lineHeight: 1.2,
  margin: "0 0 16px",
};

export const headlineLg = {
  fontSize: "40px",
  fontWeight: 700,
  color: EMAIL_COLORS.text,
  lineHeight: 1.15,
  margin: "0 0 16px",
};

export const subtext = {
  fontSize: "16px",
  color: EMAIL_COLORS.textMuted,
  lineHeight: 1.6,
  margin: "0 0 24px",
};

export const paragraph = {
  fontSize: "15px",
  color: EMAIL_COLORS.text,
  lineHeight: 1.6,
  margin: "0 0 16px",
};

export const card = {
  background: EMAIL_COLORS.surface,
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "12px",
  padding: "24px",
  margin: "20px 0",
};

export const buttonPrimary = {
  background: EMAIL_COLORS.accent,
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: "10px",
  display: "inline-block",
  textAlign: "center" as const,
};

export const buttonGhost = {
  background: "transparent",
  color: EMAIL_COLORS.accent,
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  padding: "10px 20px",
  border: `1px solid ${EMAIL_COLORS.border}`,
  borderRadius: "10px",
  display: "inline-block",
};

export const footer = {
  borderTop: `1px solid ${EMAIL_COLORS.border}`,
  padding: "24px 40px",
  textAlign: "center" as const,
};

export const footerText = {
  fontSize: "12px",
  color: EMAIL_COLORS.textMuted,
  margin: "0 0 8px",
};

export const footerLink = {
  color: EMAIL_COLORS.textMuted,
  textDecoration: "underline",
  margin: "0 6px",
};

export const muted = {
  fontSize: "13px",
  color: EMAIL_COLORS.textMuted,
  lineHeight: 1.6,
};

export const divider = {
  border: "none",
  borderTop: `1px solid ${EMAIL_COLORS.border}`,
  margin: "24px 0",
};
