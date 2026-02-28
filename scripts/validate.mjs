#!/usr/bin/env node
/**
 * validate.mjs — Validator Framework
 * Runs: tsc --noEmit → lint
 * Exits with code 1 if any validator fails.
 */

import { execSync } from 'child_process';

const validators = [
  {
    name: 'TypeScript (tsc --noEmit)',
    command: 'npx tsc --noEmit',
    optional: true,
  },
  {
    name: 'Lint (npm run lint)',
    command: 'npm run lint --if-present',
    optional: true,
  },
];

let failed = false;

for (const validator of validators) {
  console.log(`\n▶ Running: ${validator.name}`);
  try {
    execSync(validator.command, { stdio: 'inherit' });
    console.log(`✅ ${validator.name} passed`);
  } catch (err) {
    if (validator.optional) {
      console.warn(`⚠️  ${validator.name} skipped or not configured`);
    } else {
      console.error(`❌ ${validator.name} FAILED`);
      failed = true;
    }
  }
}

if (failed) {
  console.error('\n❌ Validation failed. Fix the errors above before applying changes.');
  process.exit(1);
} else {
  console.log('\n✅ All validators passed. Safe to apply changes.');
  process.exit(0);
}
