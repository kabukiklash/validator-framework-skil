#!/usr/bin/env node
/**
 * Instala validator-framework-skill no Cursor ou configura VSCode
 * Uso: node scripts/install.mjs cursor | vscode
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..');

const target = process.argv[2] || 'cursor';

if (target === 'cursor') {
  const skillsDir = process.env.CURSOR_SKILLS_PATH || join(process.env.HOME || process.env.USERPROFILE, '.cursor', 'skills', 'validator-framework');
  const rulesDir = process.env.CURSOR_RULES_PATH || join(process.cwd(), '.cursor', 'rules');

  console.log('Instalando Validator Framework Skill no Cursor...\n');

  try {
    mkdirSync(skillsDir, { recursive: true });
    cpSync(join(PKG_ROOT, 'SKILL.md'), join(skillsDir, 'SKILL.md'), { force: true });
    cpSync(join(PKG_ROOT, 'scripts'), join(skillsDir, 'scripts'), { recursive: true, force: true });
    console.log(`✓ Skill instalado em: ${skillsDir}`);
  } catch (e) {
    console.error('Erro ao instalar skill:', e.message);
    process.exit(1);
  }

  try {
    mkdirSync(rulesDir, { recursive: true });
    cpSync(join(PKG_ROOT, 'cursor-rules', 'validator-framework.mdc'), join(rulesDir, 'validator-framework.mdc'), { force: true });
    console.log(`✓ Rule instalada em: ${rulesDir}/validator-framework.mdc`);
  } catch (e) {
    console.warn('Aviso: não foi possível instalar rule (projeto pode não ter .cursor/rules):', e.message);
  }

  console.log('\n✓ Instalação Cursor concluída.');
} else if (target === 'vscode') {
  const vscodeDir = join(process.cwd(), '.vscode');
  const tasksPath = join(vscodeDir, 'tasks.json');

  console.log('Configurando Validator Framework para VSCode...\n');

  const validateTask = {
    label: 'Validator Framework: Validate',
    type: 'shell',
    command: 'npm run validate',
    group: { kind: 'test', isDefault: true },
    presentation: { reveal: 'always' }
  };

  try {
    mkdirSync(vscodeDir, { recursive: true });
    let tasks = { version: '2.0.0', tasks: [] };
    if (existsSync(tasksPath)) {
      try {
        tasks = JSON.parse(readFileSync(tasksPath, 'utf8'));
      } catch (_) {}
    }
    const idx = tasks.tasks?.findIndex(t => t.label === validateTask.label);
    if (idx >= 0) tasks.tasks[idx] = validateTask;
    else tasks.tasks = [...(tasks.tasks || []), validateTask];

    writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
    console.log(`✓ Task "Validator Framework: Validate" adicionada em .vscode/tasks.json`);
  } catch (e) {
    console.warn('Criando tasks.json manualmente...');
    mkdirSync(vscodeDir, { recursive: true });
    writeFileSync(tasksPath, JSON.stringify({
      version: '2.0.0',
      tasks: [validateTask]
    }, null, 2));
    console.log(`✓ tasks.json criado.`);
  }

  console.log('\nPara usar: Ctrl+Shift+B (Run Build Task) ou Terminal > Run Task');
  console.log('\nAdicione ao package.json do projeto: "validate": "node node_modules/validator-framework-skill/scripts/validate.mjs"');
  console.log('\n✓ Instalação VSCode concluída.');
} else {
  console.error('Uso: node scripts/install.mjs cursor | vscode');
  process.exit(1);
}
