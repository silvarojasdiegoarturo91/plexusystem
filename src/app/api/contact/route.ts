import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  timestamp?: string;
}

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');

function ensureDataDir() {
  const dataDir = path.dirname(CONTACTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function saveContact(contact: ContactForm): void {
  ensureDataDir();
  let contacts: ContactForm[] = [];
  
  if (fs.existsSync(CONTACTS_FILE)) {
    try {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(data);
    } catch {
      contacts = [];
    }
  }
  
  contacts.push({
    ...contact,
    timestamp: new Date().toISOString()
  });
  
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

async function sendEmail(contact: ContactForm): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;

  if (!smtpHost || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
    console.error('Faltan configuraciones de SMTP en variables de entorno');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort || '465'),
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    replyTo: contact.email,
    subject: `Nuevo contacto de ${contact.name} - PlexuSystem`,
    text: `
Nuevo mensaje de contacto desde PlexuSystem

Nombre: ${contact.name}
Email: ${contact.email}
Empresa: ${contact.company || 'No especificada'}

Mensaje:
${contact.message}
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00f5d4, #9b5de5); padding: 20px; border-radius: 10px 10px 0 0; }
    .header h1 { color: #fff; margin: 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .message-box { background: #fff; padding: 15px; border-left: 4px solid #00f5d4; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Contacto - PlexuSystem</h1>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nombre:</span>
        <span class="value"> ${contact.name}</span>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <span class="value"> ${contact.email}</span>
      </div>
      <div class="field">
        <span class="label">Empresa:</span>
        <span class="value"> ${contact.company || 'No especificada'}</span>
      </div>
      <div class="field">
        <span class="label">Mensaje:</span>
        <div class="message-box">${contact.message}</div>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente');
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();
    
    const { name, email, company, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const contact: ContactForm = { name, email, company, message };
    
    saveContact(contact);
    
    const emailSent = await sendEmail(contact);
    
    if (!emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Mensaje guardado pero error al enviar email. Nos contactaremos pronto.',
        warning: true
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente'
    });
    
  } catch (error) {
    console.error('Error al procesar contacto:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
