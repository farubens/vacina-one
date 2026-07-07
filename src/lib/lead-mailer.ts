import fs from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  coupon: string;
  vaccine: string;
};

const logoPath = path.join(process.cwd(), "public", "assets", "images", "brand", "logo-vacina-one.png");
const mascotPath = path.join(process.cwd(), "public", "assets", "images", "landing", "robo-transparente.png");
const siteUrl = "https://lp.vacinaone.com.br";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildField(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 0 0 8px; color: #234a67; font-size: 13px; font-weight: 800;">${label}</td>
      <td style="padding: 0 0 8px; color: #355a78; font-size: 13px; line-height: 1.5;">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

async function getTransporter() {
  const host = process.env.SMTP_HOST ?? "mail.vacinaone.com.br";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

async function getBrandAttachments() {
  const [logoContent, mascotContent] = await Promise.all([fs.readFile(logoPath), fs.readFile(mascotPath)]);

  return [
    {
      filename: "logo-vacina-one.png",
      content: logoContent,
      cid: "vacinaone-logo",
    },
    {
      filename: "robo-transparente.png",
      content: mascotContent,
      cid: "vacinaone-mascot",
    },
  ];
}

function getNotificationRecipient() {
  return process.env.LEAD_NOTIFICATION_TO ?? "atendimento@vacinaone.com.br";
}

function getReplyAddress() {
  return process.env.LEAD_REPLY_TO ?? "atendimento@vacinaone.com.br";
}

function createLeadNotificationHtml(lead: LeadPayload) {
  return `
    <div style="margin: 0; padding: 32px 16px; background: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid rgba(35, 74, 103, 0.1);">
        <tr>
          <td style="padding: 28px 32px; background: #ffffff; border-bottom: 1px solid rgba(35, 74, 103, 0.08);">
            <img src="cid:vacinaone-logo" alt="VacinaOne" width="170" style="display: block; width: 170px; height: auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 32px;">
            <p style="margin: 0 0 8px; color: #5eb9b8; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Novo lead</p>
            <h1 style="margin: 0 0 14px; color: #18314c; font-size: 30px; line-height: 1.1; font-weight: 800;">Novo cadastro recebido no site</h1>
            <p style="margin: 0 0 24px; color: #355a78; font-size: 15px; line-height: 1.65;">
              Um novo lead acabou de entrar pela landing page da VacinaOne.
            </p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
              ${buildField("Nome", lead.name)}
              ${buildField("Email", lead.email)}
              ${buildField("WhatsApp", lead.phone)}
              ${buildField("Cupom", lead.coupon)}
              ${buildField("Vacina de interesse", lead.vaccine)}
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function createLeadNotificationText(lead: LeadPayload) {
  return [
    "Novo cadastro recebido no site da VacinaOne",
    "",
    `Nome: ${lead.name}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.phone || "-"}`,
    `Cupom: ${lead.coupon || "-"}`,
    `Vacina de interesse: ${lead.vaccine || "-"}`,
  ].join("\n");
}

function createAutoReplyHtml(lead: LeadPayload) {
  const couponBlock = lead.coupon
    ? `
      <tr>
        <td style="padding: 0 32px 24px;">
          <div style="padding: 18px 20px; border-radius: 18px; background: #ffffff; border: 1px solid rgba(35, 74, 103, 0.12);">
            <p style="margin: 0 0 8px; color: #234a67; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Seu cupom</p>
            <p style="margin: 0; color: #1c3551; font-size: 28px; font-weight: 900; letter-spacing: 0.04em;">${escapeHtml(lead.coupon)}</p>
          </div>
        </td>
      </tr>
    `
    : "";

  return `
    <div style="margin: 0; padding: 32px 16px; background: #ffffff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid rgba(35, 74, 103, 0.1);">
        <tr>
          <td style="padding: 32px 32px 18px; background: #ffffff; border-bottom: 1px solid rgba(35, 74, 103, 0.08);">
            <img src="cid:vacinaone-logo" alt="VacinaOne" width="184" style="display: block; width: 184px; height: auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding: 0 32px 18px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align: top; padding-right: 18px;">
                  <p style="margin: 0 0 10px; color: #5eb9b8; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">Cadastro recebido</p>
                  <h1 style="margin: 0 0 14px; color: #18314c; font-size: 32px; line-height: 1.08; font-weight: 800;">
                    Obrigado, ${escapeHtml(lead.name.split(" ")[0] || lead.name)}.
                  </h1>
                  <p style="margin: 0 0 16px; color: #355a78; font-size: 16px; line-height: 1.7;">
                    Seu pré-cadastro na <strong>VacinaOne</strong> foi recebido com sucesso. Em breve, teremos a inauguração oficial da VacinaOne
                    e você já garantiu um benefício exclusivo de lançamento.
                  </p>
                  <p style="margin: 0; color: #355a78; font-size: 16px; line-height: 1.7;">
                    Uma escolha consciente pela sua proteção e bem-estar. Parabéns por esse cuidado! <strong>VacinaOne - Proteção em Primeiro Lugar</strong>
                  </p>
                </td>
                <td width="170" style="vertical-align: top; text-align: right;">
                  <img src="cid:vacinaone-mascot" alt="Mascote VacinaOne" width="150" style="display: inline-block; width: 150px; height: auto;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ${couponBlock}
        <tr>
          <td style="padding: 0 32px 12px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
              <tr>
                <td style="padding: 16px 0; border-top: 1px solid rgba(35, 74, 103, 0.08);">
                  <p style="margin: 0 0 6px; color: #234a67; font-size: 13px; font-weight: 800;">Resumo do seu envio</p>
                  <p style="margin: 0; color: #355a78; font-size: 14px; line-height: 1.7;">
                    Email: ${escapeHtml(lead.email)}<br />
                    WhatsApp: ${escapeHtml(lead.phone || "-")}<br />
                    Vacina de interesse: ${escapeHtml(lead.vaccine || "-")}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 32px 32px;">
            <a
              href="${siteUrl}/"
              style="display: inline-block; padding: 14px 24px; border-radius: 999px; background: #1c3551; color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none;"
            >
              Acessar o site da VacinaOne
            </a>
            <p style="margin: 18px 0 0; color: #6b8498; font-size: 12px; line-height: 1.6;">
              Esta é uma mensagem automática enviada por <strong>no-reply@vacinaone.com.br</strong>. Se precisar falar com o nosso time,
              responda para o canal de atendimento oficial.
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function createAutoReplyText(lead: LeadPayload) {
  return [
    `Obrigado pelo seu cadastro, ${lead.name}.`,
    "",
    "Recebemos seu pré-cadastro na VacinaOne com sucesso.",
    "Em breve, teremos a inauguração oficial da VacinaOne e você já garantiu um benefício exclusivo de lançamento.",
    "Uma escolha consciente pela sua proteção e bem-estar. Parabéns por esse cuidado!",
    "VacinaOne - Proteção em Primeiro Lugar",
    "",
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.phone || "-"}`,
    `Vacina de interesse: ${lead.vaccine || "-"}`,
    `Cupom: ${lead.coupon || "-"}`,
    "",
    `Site: ${siteUrl}/`,
  ].join("\n");
}

export async function sendLeadEmails(lead: LeadPayload) {
  const transporter = await getTransporter();
  const from = getRequiredEnv("MAIL_FROM");
  const replyTo = getReplyAddress();
  const notificationTo = getNotificationRecipient();
  const brandAttachments = await getBrandAttachments();

  await transporter.sendMail({
    from,
    to: notificationTo,
    replyTo: lead.email,
    subject: `Novo lead VacinaOne | ${lead.name}`,
    text: createLeadNotificationText(lead),
    html: createLeadNotificationHtml(lead),
    attachments: brandAttachments,
  });

  await transporter.sendMail({
    from,
    to: lead.email,
    replyTo,
    subject: "Recebemos seu cadastro | VacinaOne",
    text: createAutoReplyText(lead),
    html: createAutoReplyHtml(lead),
    attachments: brandAttachments,
  });
}
