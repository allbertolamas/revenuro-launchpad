import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import {
  container,
  content,
  EMAIL_COLORS,
  footer,
  footerLink,
  footerText,
  header,
  logo,
  main,
} from "./styles";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: ReactNode;
}) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>BREREV</Text>
          </Section>
          <Section style={content}>{children}</Section>
          <Hr style={{ borderColor: EMAIL_COLORS.border, margin: 0 }} />
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 Brerev · Todos los derechos reservados
            </Text>
            <Text style={footerText}>
              <Link href="https://brerev.com/app/configuracion" style={footerLink}>
                Configurar notificaciones
              </Link>
              ·
              <Link href="https://brerev.com/unsubscribe" style={footerLink}>
                Cancelar suscripción
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
