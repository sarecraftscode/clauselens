MARP = docker run --rm \
	-v "$(PWD)":/home/marp/app \
	-e MARP_USER="$(shell id -u):$(shell id -g)" \
	marpteam/marp-cli

MMDC = npx --yes @mermaid-js/mermaid-cli

DIAGRAMS_DIR  = docs/diagrams
DIAGRAMS_SRC  = $(wildcard $(DIAGRAMS_DIR)/*.mmd)
DIAGRAMS_PNG  = $(DIAGRAMS_SRC:.mmd=.png)

PRESENTATION_SRC  = docs/presentation.md
PRESENTATION_PDF  = docs/presentation.pdf
PRESENTATION_HTML = docs/presentation.html

.PHONY: presentation presentation-pdf presentation-html diagrams

## Pré-rend tous les diagrammes Mermaid en PNG (nécessite Node.js)
diagrams: $(DIAGRAMS_PNG)

$(DIAGRAMS_DIR)/%.png: $(DIAGRAMS_DIR)/%.mmd
	$(MMDC) -i $< -o $@ -w 1400 --backgroundColor white
	@echo "✓ Diagramme généré : $@"

## Génère le PDF et le HTML de la présentation (avec diagrammes pré-rendus)
presentation: diagrams presentation-pdf presentation-html

## Génère le PDF de la présentation
presentation-pdf: diagrams
	$(MARP) $(PRESENTATION_SRC) --pdf --html --allow-local-files -o $(PRESENTATION_PDF)
	@echo "✓ PDF généré : $(PRESENTATION_PDF)"

## Génère le HTML de la présentation
presentation-html: diagrams
	$(MARP) $(PRESENTATION_SRC) --html --allow-local-files -o $(PRESENTATION_HTML)
	@echo "✓ HTML généré : $(PRESENTATION_HTML)"
