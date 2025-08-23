import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create users with different roles
  const hashedPassword = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      email: 'admin@university.edu',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
      matriculation: 'ADM001'
    }
  });

  const coordenador = await prisma.user.upsert({
    where: { email: 'coordenador@university.edu' },
    update: {},
    create: {
      email: 'coordenador@university.edu',
      password: hashedPassword,
      name: 'Professor Coordenador',
      role: 'COORDENADOR',
      matriculation: 'COORD001'
    }
  });

  const orientador = await prisma.user.upsert({
    where: { email: 'orientador@university.edu' },
    update: {},
    create: {
      email: 'orientador@university.edu',
      password: hashedPassword,
      name: 'Professor Orientador',
      role: 'ORIENTADOR',
      matriculation: 'ORIENT001'
    }
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@university.edu' },
    update: {},
    create: {
      email: 'student@university.edu',
      password: hashedPassword,
      name: 'João Silva',
      role: 'STUDENT',
      matriculation: '20230001',
      course: 'Engenharia de Software'
    }
  });

  // Create sample proposals
  const proposal1 = await prisma.proposal.create({
    data: {
      title: 'Sistema de Gestão de Projetos Acadêmicos',
      description: 'Desenvolvimento de uma plataforma web para gerenciamento de projetos de TCC com acompanhamento de orientadores.',
      studentId: student.id,
      orientadorId: orientador.id,
      status: 'APPROVED',
      deadline: new Date('2024-06-30')
    }
  });

  const proposal2 = await prisma.proposal.create({
    data: {
      title: 'Aplicativo Mobile para Controle de Frequência',
      description: 'Desenvolvimento de aplicativo para registro de frequência em aulas usando geolocalização.',
      studentId: student.id,
      status: 'PENDING'
    }
  });

  const proposal3 = await prisma.proposal.create({
    data: {
      title: 'Análise de Dados Educacionais com Machine Learning',
      description: 'Estudo e implementação de modelos preditivos para análise de desempenho estudantil.',
      studentId: student.id,
      orientadorId: orientador.id,
      status: 'REVISION',
      feedback: 'Necessita melhorar a metodologia e incluir mais referências bibliográficas.'
    }
  });

  console.log('✅ Seed completed!');
  console.log('📋 Created data:');
  console.log(`   Users: 4 (Admin, Coordenador, Orientador, Student)`);
  console.log(`   Proposals: 3`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
