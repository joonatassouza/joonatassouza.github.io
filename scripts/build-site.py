"""Build the two static CV pages: python3 scripts/build-site.py (standard library only)."""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent.parent


def inline(text):
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html.escape(text))


def render(markdown):
    output = []
    section = entry = False
    for block in markdown.strip().split('\n\n'):
        if block.startswith('## '):
            if entry:
                output.append('</article>')
                entry = False
            if section:
                output.append('</section>')
            output.append(f'<section>\n<h2>{inline(block[3:])}</h2>')
            section = True
        elif block.startswith('### '):
            if entry:
                output.append('</article>')
            output.append(f'<article>\n<h3>{inline(block[4:])}</h3>')
            entry = True
        elif block.startswith('- '):
            output.append('<ul>\n' + '\n'.join(f'<li>{inline(line[2:])}</li>' for line in block.splitlines()) + '\n</ul>')
        elif ' | ' in block and entry:
            parts = block.split(' | ')
            output.append(f'<p class="details"><span>{inline(" · ".join(parts[:-1]))}</span><span>{inline(parts[-1])}</span></p>')
        else:
            output.append(f'<p>{inline(block)}</p>')
    if entry:
        output.append('</article>')
    if section:
        output.append('</section>')
    return '\n'.join(output)


sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
moon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z"/></svg>'
# Fixed black and white artwork keeps the flags monochrome in both themes.
us = '<svg class="flag" viewBox="0 0 38 26" aria-hidden="true"><path fill="white" d="M0 0h38v26H0z"/><path stroke="black" stroke-width="2" d="M0 1h38M0 5h38M0 9h38M0 13h38M0 17h38M0 21h38M0 25h38"/><path fill="black" d="M0 0h17v14H0z"/><path fill="white" d="' + ' '.join(f'M{x} {y}h1.4v1.4h-1.4z' for y in (2,5,8,11) for x in (2,5,8,11,14)) + '"/></svg>'
br = '<svg class="flag" viewBox="0 0 38 26" aria-hidden="true"><path fill="black" d="M0 0h38v26H0z"/><path fill="white" d="m19 3 16 10-16 10L3 13Z"/><circle fill="black" cx="19" cy="13" r="6"/><path fill="none" stroke="white" stroke-width="1.2" d="M13.5 11.5q6-1 11 4"/><g fill="white"><circle cx="17" cy="15" r=".5"/><circle cx="20" cy="16" r=".5"/><circle cx="21" cy="10" r=".5"/></g></svg>'

for lang, filename in [('en', 'index.html'), ('pt-BR', 'pt.html')]:
    en = lang == 'en'
    title = 'Senior Full Stack Engineer' if en else 'Engenheiro de Software Full Stack Sênior'
    description = ('Jonatas Souza — Senior Full Stack Engineer. 10+ years building web applications, APIs and browser extensions. Node.js, TypeScript, AWS and AI-assisted engineering.' if en else 'Jonatas Souza — Engenheiro de Software Full Stack Sênior. Mais de 10 anos de experiência em aplicações web, APIs e extensões. Node.js, TypeScript, AWS e engenharia com IA.')
    light, dark = ('Light theme', 'Dark theme') if en else ('Tema claro', 'Tema escuro')
    current_en = ' aria-current="page"' if en else ''
    current_pt = '' if en else ' aria-current="page"'
    page = f'''<!doctype html>
<html lang="{lang}" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{html.escape(description)}">
  <meta name="color-scheme" content="light dark">
  <title>Jonatas Souza — {title}</title>
  <link rel="canonical" href="https://joonatassouza.github.io/{'' if en else 'pt.html'}">
  <link rel="alternate" hreflang="en" href="https://joonatassouza.github.io/">
  <link rel="alternate" hreflang="pt-BR" href="https://joonatassouza.github.io/pt.html">
  <link rel="alternate" hreflang="x-default" href="https://joonatassouza.github.io/">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#cv">{'Skip to CV' if en else 'Ir para o currículo'}</a>
  <div class="page">
    <nav class="controls" aria-label="{'Appearance and language' if en else 'Aparência e idioma'}">
      <div class="theme-controls" hidden>
        <button type="button" data-set-theme="light" aria-label="{light}" title="{light}" aria-pressed="true">{sun}</button>
        <button type="button" data-set-theme="dark" aria-label="{dark}" title="{dark}" aria-pressed="false">{moon}</button>
      </div>
      <a href="index.html" lang="en" hreflang="en" aria-label="English" title="English"{current_en}>{us}</a>
      <a href="pt.html" lang="pt-BR" hreflang="pt-BR" aria-label="Português brasileiro" title="Português brasileiro"{current_pt}>{br}</a>
    </nav>
    <main id="cv">
      <header>
        <h1>Jonatas Souza</h1>
        <p class="subtitle">{title}</p>
        <p class="location">{'Toledo, Paraná, Brazil · Open to remote roles worldwide' if en else 'Toledo, Paraná, Brasil · Disponível para oportunidades remotas'}</p>
        <ul class="contact" aria-label="{'Contact' if en else 'Contato'}">
          <li><a href="mailto:jonatasfelipe2@hotmail.com">jonatasfelipe2@hotmail.com</a></li>
          <li><a href="https://wa.me/5545999295418">+55 45 99929-5418</a></li>
          <li><a href="https://www.linkedin.com/in/joonatassouza/">LinkedIn</a></li>
          <li><a href="https://github.com/joonatassouza">GitHub</a></li>
        </ul>
      </header>
      {render((ROOT / 'content' / f'{lang}.md').read_text())}
    </main>
    <footer>
      <span>{'Updated September 2026' if en else 'Atualizado em setembro de 2026'}</span>
      <button class="print-link" type="button" hidden>{'Print / save PDF' if en else 'Imprimir / salvar PDF'}</button>
    </footer>
  </div>
</body>
</html>
'''
    (ROOT / filename).write_text(page)
