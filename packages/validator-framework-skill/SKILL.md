# Validator Framework — Cursor Skill

## Skill ID

`validator-framework`

## Descrição

Trata o validator como camada obrigatória entre qualquer saída do modelo e o código final.

## Comportamento

Ao editar código neste projeto, sempre:

1. Rodar `npm run validate` antes de considerar a tarefa concluída
2. Em caso de falha, ajustar o código e revalidar
3. Não tratar como concluído código que não passe na validação

## Fluxo

```
Usuário pede alteração
  → Cursor gera diff/código
  → Validators (tsc, lint, ...)
  → [OK]   → aplicar
  → [FAIL] → corrigir → revalidar → (após 3 retries: não aplicar, informar usuário)
```

## Validators por contexto

| Contexto           | Spec / Regras               | Validator              |
|--------------------|-----------------------------|------------------------|
| TypeScript/React   | Tipos, imports, sintaxe     | `tsc --noEmit`         |
| Estilo/formatação  | Prettier, ESLint            | Linter                 |
| Arquitetura        | `.cursor/rules`, `AGENTS.md`| Regras customizadas    |
| APIs               | OpenAPI / tipos do projeto  | Checagem de assinaturas|
| SQL                | Schema do banco             | Parser/validador       |
| Configs            | JSON Schema / YAML schema   | Validação de schema    |

## Princípios

1. **Specs explícitos por projeto** — `.cursor/rules`, `tsconfig`, `eslintrc` definem o aceitável.
2. **Run validators antes de aceitar edits** — compilação, lint, testes antes de aplicar diff.
3. **Feedback para correção** — se falhar, enviar erro ao modelo e pedir nova geração.
4. **Fail-safe** — após N retries, não aplicar e informar o usuário.

## Instalação

```bash
npm run install:cursor   # instala para Cursor
npm run install:vscode   # instala para VSCode
```
