# Antigravity Integration Guide

Validator Framework Skill é compatível com os 3 princípios do Antigravity:

## 1. Immutable Ledger

Toda validação é registrada no terminal/log antes de qualquer alteração ser aplicada.
O código só é aceito após passar em todos os validators — sem exceção.

```
npm run validate → [OK] → aplicar
                 → [FAIL] → corrigir → revalidar
```

## 2. Zero-Token

O Validator Framework não consome tokens adicionais do modelo.
A validação é determinística: executa ferramentas locais (`tsc`, `eslint`).
Nenhuma chamada extra à LLM é feita durante a validação.

## 3. Auto-Healing

Quando um validator falha, o erro é reportado ao modelo com o contexto exato:
- Linha do erro
- Tipo de erro
- Sugestão de correção (quando disponível)

O modelo regenera o código respeitando o spec. Após N retries sem sucesso, o sistema para e informa o usuário — sem forçar código inválido.

## Configuração Antigravity

Adicionar ao seu projeto:

```json
// package.json
{
  "scripts": {
    "validate": "node scripts/validate.mjs"
  }
}
```

```yaml
# .antigravity/config.yaml
validators:
  - name: typescript
    command: npx tsc --noEmit
    failOnError: true
  - name: lint
    command: npm run lint
    failOnError: false
  - name: validate
    command: npm run validate
    failOnError: true
retries: 3
failSafe: true
```

## Referências

- [SKILL.md](../SKILL.md)
- [cursor-rules/validator-framework.mdc](../cursor-rules/validator-framework.mdc)
- [scripts/validate.mjs](../scripts/validate.mjs)
