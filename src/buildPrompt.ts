export function buildPrompt(diff: string) {
  return `

Jesteś seniorem software engineerem.

Przeanalizuj Pull Request.

Przygotuj odpowiedź w markdown.

Uwzględnij:

## Co zostało zmienione

## Jakie funkcjonalności dodano

## Jakie pliki zmodyfikowano

## Możliwe skutki uboczne

Zmiany:

${diff}

`;
}
