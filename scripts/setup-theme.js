#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const themes = {
    herval: {
        name: 'Herval',
        color: 'herval',
        primary: '#E10000'
    },
    taqi: {
        name: 'Taqi',
        color: 'taqi',
        primary: '#eb5c2e'
    },
    iplace: {
        name: 'iPlace',
        color: 'iplace',
        primary: '#c6d30d'
    }
};

console.log('\n🚀 Project Setup\n');

// Step 1: Ask for project name
rl.question('Digite o nome do projeto: ', (projectName) => {
    if (!projectName || projectName.trim() === '') {
        console.log('\n❌ Nome do projeto é obrigatório.');
        rl.close();
        process.exit(1);
    }

    console.log('\n🎨 Theme Configuration\n');
    console.log('Qual empresa este template irá atender?\n');
    console.log('1. Herval');
    console.log('2. Taqi');
    console.log('3. iPlace\n');

    rl.question('Digite o número da opção (1-3): ', (answer) => {
        const choice = parseInt(answer);

        if (choice < 1 || choice > 3 || isNaN(choice)) {
            console.log('\n❌ Opção inválida. Por favor, escolha 1, 2 ou 3.');
            rl.close();
            process.exit(1);
        }

        const themeKeys = Object.keys(themes);
        const selectedTheme = themes[themeKeys[choice - 1]];

        // Update .env file
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
            envContent += `\n# Theme Configuration (herval, taqi, iplace)\nVITE_APP_THEME=${selectedTheme.color}\n`;
        }

        fs.writeFileSync(envPath, envContent.trim() + '\n');

        // Update package.json
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
            packageJson.description = `${projectName} - ${selectedTheme.name} themed application`;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
            console.log(`\n✅ package.json atualizado com nome: ${packageJson.name}`);
        } catch (error) {
            console.log('\n⚠️  Erro ao atualizar package.json:', error.message);
        }

        // Update index.html
        const indexHtmlPath = path.join(__dirname, '..', 'index.html');
        try {
            let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
            htmlContent = htmlContent.replace(/<title>.*<\/title>/, `<title>${projectName}</title>`);
            fs.writeFileSync(indexHtmlPath, htmlContent);
            console.log(`✅ index.html atualizado com título: ${projectName}`);
        } catch (error) {
            console.log('\n⚠️  Erro ao atualizar index.html:', error.message);
        }

        // Update src/config/project.ts
        const projectConfigPath = path.join(__dirname, '..', 'src', 'config', 'project.ts');
        try {
            let configContent = fs.readFileSync(projectConfigPath, 'utf8');
            configContent = configContent.replace(
                /name:\s*["'].*["']/,
                `name: "${projectName}"`
            );
            fs.writeFileSync(projectConfigPath, configContent);
            console.log(`✅ project.ts atualizado com nome: ${projectName}`);
        } catch (error) {
            console.log('\n⚠️  Erro ao atualizar project.ts:', error.message);
        }

        console.log(`\n✅ Tema configurado para ${selectedTheme.name}`);
        console.log(`   Cor primária: ${selectedTheme.primary}`);
        console.log(`\n💡 O tema ${selectedTheme.color} está ativo!`);
        console.log('   Dark mode e light mode disponíveis automaticamente.\n');
        console.log('Para iniciar o projeto, execute: npm run dev\n');

        rl.close();
    });
});
