# MINI BRANDBOOK — UNDERDOG SYSTEM

## Conceito

**Dark Premium Barbershop**: linguagem urbana, contundente e sofisticada. A marca oficial tem logo com lobo e tipografia expressiva branca em fundo preto. O software deve preservar a logo sem redesenho, distorção ou alteração estrutural.

## Paleta proposta (a aprovar)

| Token      | Hex       | Aplicação                        |
| ---------- | --------- | -------------------------------- |
| Black      | `#080808` | Fundo principal                  |
| Surface    | `#151515` | Cards e painéis                  |
| Elevated   | `#202020` | Seções elevadas                  |
| White      | `#F5F4F0` | Conteúdo principal               |
| Muted      | `#A6A49F` | Conteúdo secundário              |
| Gold       | `#C4A46A` | Ações primárias, foco e detalhes |
| Gold Hover | `#D6B77E` | Hover                            |
| Border     | `#353330` | Divisores                        |
| Danger     | `#DB6666` | Erros                            |
| Success    | `#69B892` | Sucesso                          |

O dourado é **acento**, não fundo predominante. Cores acima são sugestões para interface, não certificação das cores oficiais.

## Tipografia e elementos

- Interface: Inter ou Manrope (a escolher com licença verificada).
- Logo: usar sempre o arquivo oficial, não recriar lettering com fonte aproximada.
- Títulos fortes, texto legível, métricas hierarquizadas.
- Botão primário dourado e texto escuro; botões secundários de alto contraste.
- Calendário com estados claramente diferentes (disponível, escolhido, bloqueado).
- Tabelas compactas no desktop; cards e controles adaptados no mobile.

## Responsividade e acessibilidade

Mobile-first, suporte de 360px a desktop; contraste WCAG AA como alvo, foco visível, teclado, áreas de toque confortáveis e redução de movimento.

## Arquivos oficiais

Colocar imagem autorizada em `public/brand/` após validação. SVG original é preferível; PNG pode ser usado sem falsa vetorização. Registrar permissão de uso.

## Evitar

Dashboard azul genérico, brilho metálico exagerado, excesso de gradientes, ornamentos supérfluos, texto minúsculo e perda de contraste.

## Aplicação na Fase 01

Tokens da paleta proposta vivem no `@theme` de `src/shared/styles/theme.css`. Preto é predominante, superfícies têm bordas discretas, branco organiza conteúdo e dourado marca ações/foco. A home usa composição editorial tipográfica; espaços de trabalho usam navegação numerada e estados vazios, sem métricas inventadas.

Tipografia de sistema (`Segoe UI`, Arial, sans-serif) dispensa downloads e rastreamento externo. Inter/Manrope continuam opções sujeitas a escolha/licença; nenhuma fonte foi copiada. Títulos têm peso e espaçamento próprios; texto de apoio mantém contraste. Foco, link de salto, landmark principal, botões de 44px ou mais, menu móvel com `aria-expanded`, rotas com foco no título e redução de movimento fazem parte da fundação.

Layout é verificado a partir de 360px, em viewport móvel e desktop. Axe faz revisão automatizada WCAG A/AA; auditoria humana com leitor de tela, dispositivos reais e homologação da marca continua necessária.

Não foi encontrada logo oficial no repositório. Solicitar ao proprietário o arquivo original e a autorização para uso. `public/brand/README.md` reserva o local. Não criar lobo, lettering substituto ou ilustração fictícia. O nome aparece como texto comum; o painel editorial usa apenas o número da fase, sem símbolo de marca. Ícones técnicos geométricos da PWA são provisórios e deverão ser substituídos por exportações oficiais autorizadas.
