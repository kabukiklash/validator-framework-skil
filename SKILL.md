---
name: validator-framework
description: Spec-first, validate before done. Protege código gerado por LLM contra alucinações. Use quando editar código, revisar PRs, gerar componentes, ou quando precisar garantir que código passe em validadores antes de ser considerado concluído.
---

# Validator Framework

## Princípio Central
**Never trust, always validate.** Todo código gerado deve passar por validadores determinísticos antes de ser considerado concluído.

## Fluxo Obrigatório

```
Editar código → Executar validadores → [OK] → Considerar concluído
                           → [FALHA] → Corrigir e revalidar
```

## Checklist Antes de Declarar Edição Concluída

1. **TypeScript**: `npx tsc --noEmit` — sem erros de tipo
2. **Lint**: `npm run lint` — sem violações
3. **Ou use**: `npm run validate` — executa ambos em sequência (se o script estiver configurado)

Se qualquer um falhar, NÃO considere a tarefa concluída. Corrija os erros e revalide.

## Regras de Comportamento

- **Spec-first**: Antes de gerar código, considere as regras do projeto (tsconfig, eslint, RULE.md, .cursor/rules)
- **Fail fast**: Ao detectar erro de validação, pare e corrija — não prossiga com código quebrado
- **Feedback loop**: Use a saída do validador (tsc, eslint) para orientar a correção
- **Não assuma**: APIs, tipos, imports — verifique no código existente antes de inventar

## Script de Validação

O pacote inclui `scripts/validate.mjs`. Para adicionar ao projeto:

1. Copie `scripts/validate.mjs` para o projeto
2. Adicione ao `package.json`: `"validate": "node scripts/validate.mjs"`
3. Execute `npm run validate` antes de considerar edições concluídas

## Contexto (GenesisVision / VibeCode)

Este padrão vem do VibeCode: validadores PER protegem a saída do Council de alucinações. Aqui aplicamos o mesmo conceito: só aceitar código que passa em tsc + lint + build.
