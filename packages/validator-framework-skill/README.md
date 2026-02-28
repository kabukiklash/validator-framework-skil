# Validator Framework Skill

Validator Framework Skill for **Cursor** and **VSCode** — spec-first, validate before done.

## Installation

### Cursor

```bash
cd packages/validator-framework-skill
npm run install:cursor
```

Installs:
- Skill: `~/.cursor/skills/validator-framework/`
- Rule: `.cursor/rules/validator-framework.mdc` (in the current directory)

### VSCode

```bash
cd packages/validator-framework-skill
npm run install:vscode
```

Creates/appends a task in `.vscode/tasks.json`. Use `Ctrl+Shift+B` to run validation.

### Project with npm

```bash
npm install ./packages/validator-framework-skill
npx validator-framework-install cursor   # or vscode
```

### Publishing to npm

```bash
cd packages/validator-framework-skill
npm publish
```

Then anyone can use:

```bash
npm install validator-framework-skill
npx validator-framework-install cursor
```

## Usage

Run validation manually:

```bash
npm run validate
```

## Antigravity Integration

See: [docs/ANTIGRAVITY.md](docs/ANTIGRAVITY.md)

## License

MIT
