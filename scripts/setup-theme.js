#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const themes = {
  red: {
    name: 'Empresa A (Vermelho)',
    color: 'red',
    primary: '#dc2626'
  },
  orange: {
    name: 'Empresa B (Laranja)',
    color: 'orange',
    primary: '#ea580c'
  },
  green: {
    name: 'Empresa C (Verde)',
    color: 'green',
    primary: '#16a34a'
  }
};

console.log('\n🎨 Theme Configuration Setup\n');
console.log('Qual empresa este template irá atender?\n');
console.log('1. Empresa A (Vermelha)');
console.log('2. Empresa B (Laranja)');
console.log('3. Empresa C (Verde)\n');

rl.question('Digite o número da opção (1-3): ', (answer) => {
  const choice = parseInt(answer);
  
  if (choice < 1 || choice > 3 || isNaN(choice)) {
    console.log('\n❌ Opção inválida. Por favor, escolha 1, 2 ou 3.');
    rl.close();
    process.exit(1);
  }

  const themeKeys = Object.keys(themes);
  const selectedTheme = themes[themeKeys[choice - 1]];

  const envPath = path.join(__dirname, '..', '.env');
  let envContent = '';

  try {
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
  } catch (error) {
    console.log('\n⚠️  Arquivo .env não encontrado, criando novo...');
  }

  const themeRegex = /VITE_APP_THEME=.*/;
  if (themeRegex.test(envContent)) {
    envContent = envContent.replace(themeRegex, `VITE_APP_THEME=${selectedTheme.color}`);
  } else {
    envContent += `\n# Theme Configuration\nVITE_APP_THEME=${selectedTheme.color}\n`;
  }

  fs.writeFileSync(envPath, envContent.trim() + '\n');

  console.log(`\n✅ Tema configurado para ${selectedTheme.name}`);
  console.log(`   Cor primária: ${selectedTheme.primary}`);
  console.log(`\n💡 O tema ${selectedTheme.color} está ativo!`);
  console.log('   Dark mode e light mode disponíveis automaticamente.\n');
  console.log('Para iniciar o projeto, execute: npm run dev\n');

  rl.close();
});
