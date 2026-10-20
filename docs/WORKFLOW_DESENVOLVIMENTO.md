# WORKFLOW — DOIS PCs + CODEX + GITHUB

Repositório remoto oficial: `https://github.com/patrickbotarick/underdog_system.git`.
Branch estável: `main`. Exemplo de branch para fundação: `feat/phase-01-foundation`.

## Primeiro PC
Clonar repositório em uma pasta vazia; abrir no VS Code/Codex. Antes de editar, conferir `git status`, `git remote -v` e branch ativa. Criar branch específica para implementar cada fase. Revisar diff, rodar lint/typecheck/testes/build, commitar e dar push. Merge após aprovação.

## Segundo PC
Clonar o **mesmo** remoto. Antes de iniciar, com árvore limpa: `git fetch origin`, `git switch main`, `git pull --ff-only origin main`. Criar branch de trabalho a partir da versão atual ou retomar branch remota adequada. Nunca sobrescrever modificações locais.

## Convenções
Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. Sem force-push e sem reset destrutivo sem autorização. Fases importantes terminam com commit/push e relatório. Releases com changelog, validação, merge e tag `vX.Y.Z`.

## Higiene
Não copiar `.env`, credenciais, dados reais ou backups pelo Git. Usar `.env.example` com placeholders. Ao fim da sessão informar branch, hash, status do push, testes e próximos passos.

## Comandos de sincronização

O GitHub é a fonte oficial compartilhada. No segundo computador, execute em uma pasta de destino ainda inexistente:

```powershell
git clone https://github.com/patrickbotarick/underdog_system.git Underdog_System
Set-Location Underdog_System
git remote -v
git status --short --branch
```

Em qualquer computador, antes de começar, confirme que `git status --porcelain` não retorna alterações. Se retornar, interrompa a sincronização e revise o trabalho local antes de continuar.

```powershell
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c feat/phase-01-foundation
```

Crie a branch uma única vez. Para retomar trabalho já publicado no outro PC, após `git fetch origin`, use `git switch --track origin/feat/phase-01-foundation` se ela ainda não existir localmente. Se já existir, use `git switch feat/phase-01-foundation` e `git pull --ff-only origin feat/phase-01-foundation`.

Ao encerrar uma sessão, revise `git diff` e `git diff --cached`, faça as verificações disponíveis para a fase, crie o commit e publique a branch com `git push -u origin HEAD`. Confirme o sucesso antes de trocar de computador. Evite editar a mesma branch simultaneamente nos dois PCs. Caso o pull ou push seja rejeitado por divergência, pare e revise o histórico; não use force-push nem reset destrutivo.

## Fundação documental

Nesta execução há somente documentação: lint, typecheck, testes da aplicação e build serão configurados na Fase 01. As verificações atuais são integridade dos documentos, links Markdown locais, regras de exclusão, conteúdo do commit e correspondência entre `HEAD` local e `main` no GitHub.

O pacote recebido em `underdog_fase00_documentacao/` permanece preservado localmente e ignorado pelo Git. A documentação oficial versionada fica na raiz e em `docs/`. `.gitattributes` normaliza os documentos em LF entre computadores. `.env.example` contém somente valores vazios; não significa configuração do Supabase.

`.gitignore` reduz o risco de inclusão acidental, mas não identifica dados sensíveis dentro de arquivos permitidos nem deixa de rastrear arquivos já commitados. Revise sempre o conteúdo staged antes de publicar; dados de demonstração devem ser fictícios.
