#!/usr/bin/env node
/**
 * install.mjs — Validator Framework Skill Installer
 * Usage: node install.mjs [cursor|vscode]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');

const target = process.argv[2];

if (!target || !['cursor', 'vscode'].includes(target)) {
  console.error('Usage: node install.mjs [cursor|vscode]');
  process.exit(1);
}

if (target === 'cursor') {
  installCursor();
} else {
  installVscode();
}

function installCursor() {
  // Install skill to ~/.cursor/skills/validator-framework/
  const skillDest = path.join(os.homedir(), '.cursor', 'skills', 'validator-framework');
  fs.mkdirSync(skillDest, { recursive: true });

  const skillMd = path.join(skillRoot, 'SKILL.md');
  const validateMjs = path.join(skillRoot, 'scripts', 'validate.mjs');

  fs.copyFileSync(skillMd, path.join(skillDest, 'SKILL.md'));
  fs.mkdirSync(path.join(skillDest, 'scripts'), { recursive: true });
  fs.copyFileSync(validateMjs, path.join(skillDest, 'scripts', 'validate.mjs'));

  console.log(`✅ Skill installed to: ${skillDest}`);

  // Install rule to .cursor/rules/ in cwd
  const rulesDir = path.join(process.cwd(), '.cursor', 'rules');
  fs.mkdirSync(rulesDir, { recursive: true });

  const ruleSrc = path.join(skillRoot, 'cursor-rules', 'validator-framework.mdc');
  const ruleDest = path.join(rulesDir, 'validator-framework.mdc');
  fs.copyFileSync(ruleSrc, ruleDest);

  console.log(`✅ Rule installed to: ${ruleDest}`);
  console.log('\n✅ Cursor installation complete.');
}

function installVscode() {
  // Create/update .vscode/tasks.json in cwd
  const vscodeDir = path.join(process.cwd(), '.vscode');
  fs.mkdirSync(vscodeDir, { recursive: true });

  const tasksSrc = path.join(skillRoot, 'vscode', 'tasks.json');
  const tasksDest = path.join(vscodeDir, 'tasks.json');

  const newTask = JSON.parse(fs.readFileSync(tasksSrc, 'utf8'));

  if (fs.existsSync(tasksDest)) {
    const existing = JSON.parse(fs.readFileSync(tasksDest, 'utf8'));
    const alreadyExists = (existing.tasks || []).some(
      (t) => t.label === newTask.tasks[0].label
    );
    if (!alreadyExists) {
      existing.tasks = [...(existing.tasks || []), ...newTask.tasks];
      fs.writeFileSync(tasksDest, JSON.stringify(existing, null, 2) + '\n');
      console.log(`✅ Task added to: ${tasksDest}`);
    } else {
      console.log(`ℹ️  Task already exists in: ${tasksDest}`);
    }
  } else {
    fs.copyFileSync(tasksSrc, tasksDest);
    console.log(`✅ tasks.json created at: ${tasksDest}`);
  }

  console.log('\n✅ VSCode installation complete. Use Ctrl+Shift+B to run validation.');
}
