#!/usr/bin/env node
/**
 * Validator Framework - Spec-first, validate before done.
 * Executa validadores determinísticos antes de considerar código pronto.
 * Uso: node scripts/validate.mjs  ou  npm run validate
 */
import { spawnSync } from 'child_process';

const steps = [
  { name: 'TypeScript', cmd: 'npx', args: ['tsc', '--noEmit'] },
  { name: 'Lint', cmd: 'npm', args: ['run', 'lint'] },
];

let failed = false;

for (const step of steps) {
  console.log(`\n▶ ${step.name}...`);
  const result = spawnSync(step.cmd, step.args, {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
  });

  if (result.status !== 0) {
    console.error(`\n❌ ${step.name} falhou (exit ${result.status})`);
    failed = true;
    break;
  }
  console.log(`✓ ${step.name} OK`);
}

if (failed) {
  process.exit(1);
}

console.log('\n✅ Validação concluída. Código aprovado.');
process.exit(0);
