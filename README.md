# Validator Framework Skill

**Spec-first, validate before done.** Protege código gerado por LLM contra alucinações.

Pacote reutilizável para Cursor e VSCode, baseado no padrão VibeCode do GenesisVision.

---

## Instalação

### Via Git

```bash
git clone https://github.com/kabukiklash/validator-framework-skil.git
cd validator-framework-skill
```

### Cursor (Skill + Rule)

```bash
# Na raiz do seu projeto
npm install ./validator-framework-skill   # ou caminho do clone
npx validator-framework-install cursor
```

Ou manualmente:
- Copie `SKILL.md` e `scripts/` para `~/.cursor/skills/validator-framework/`
- Copie `cursor-rules/validator-framework.mdc` para `.cursor/rules/` do seu projeto

### VSCode

```bash
cd validator-framework-skill
npm run install:vscode
```

Isso adiciona a task "Validator Framework: Validate" em `.vscode/tasks.json`.

Use **Ctrl+Shift+B** ou **Terminal > Run Task** para executar.

### Como dependência npm

```bash
npm install validator-framework-skill   # quando publicado
# ou: npm install git+https://github.com/kabukiklash/validator-framework-skil.git
```

Depois:

```bash
npx validator-framework-install cursor   # ou vscode
```

Adicione ao `package.json` do seu projeto:

```json
{
  "scripts": {
    "validate": "node node_modules/validator-framework-skill/scripts/validate.mjs"
  }
}
```

---

## Uso no Antigravity

Ver [docs/ANTIGRAVITY.md](docs/ANTIGRAVITY.md).

---

## O que o validador faz

1. **TypeScript**: `npx tsc --noEmit`
2. **Lint**: `npm run lint`

Se algum falhar, o script sai com código 1.

---

## Estrutura

```
validator-framework-skill/
├── SKILL.md
├── scripts/
│   ├── validate.mjs
│   └── install.mjs
├── cursor-rules/
│   └── validator-framework.mdc
├── vscode/
│   └── tasks.json
├── docs/
│   └── ANTIGRAVITY.md
├── package.json
└── README.md
```

---

## Licença

MIT
