# Validator Framework no Antigravity

Integração do padrão Spec-first, validate before done com os invariantes do Antigravity CMS.

## Compatibilidade com os 3 Princípios

| Princípio | Como o Validator Framework respeita |
|-----------|-------------------------------------|
| **Immutable Ledger** | Validadores (tsc, eslint) são determinísticos. O resultado é reprodutível e auditável. Nenhuma operação destrutiva — apenas verificação. |
| **Zero-Token Horizon** | Validação roda 100% local na máquina. Nenhuma chamada à nuvem. tsc e eslint processam o código localmente. |
| **Auto-Healing / Zero Drift** | Código que não passa em validação é rejeitado antes de propagar. O drift é contido na origem — não chega ao deploy. |

## Instalação em projeto Antigravity

1. Copie `cursor-rules/validator-framework.mdc` para o `.cursor/rules/` do projeto
2. Adicione ao `package.json`:

```json
"scripts": {
  "validate": "node scripts/validate.mjs"
}
```

3. Copie `scripts/validate.mjs` do pacote para `scripts/` do projeto
4. Configure o agente/GenesisCore para exigir `npm run validate` passando antes de aceitar edições

## Fluxo com GenesisCore

Se o GenesisCore detectar drift estrutural:

1. O deploy é bloqueado
2. O Validator Framework adiciona uma camada anterior: código que não compila ou não passa em lint nem chega ao GenesisCore
3. Menos anomalias propagam, mais fácil isolar e curar localmente