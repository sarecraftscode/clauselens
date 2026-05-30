MARP = docker run --rm \
	-v "$(PWD)":/home/marp/app \
	-e MARP_USER="$(shell id -u):$(shell id -g)" \
	marpteam/marp-cli

PRESENTATION_SRC = docs/presentation.md
PRESENTATION_PDF = docs/presentation.pdf
PRESENTATION_HTML = docs/presentation.html

.PHONY: presentation presentation-pdf presentation-html

## Génère le PDF et le HTML de la présentation
presentation: presentation-pdf presentation-html

## Génère le PDF de la présentation
presentation-pdf:
	$(MARP) $(PRESENTATION_SRC) --pdf --html --allow-local-files -o $(PRESENTATION_PDF)
	@echo "✓ PDF généré : $(PRESENTATION_PDF)"

## Génère le HTML de la présentation
presentation-html:
	$(MARP) $(PRESENTATION_SRC) --html --allow-local-files -o $(PRESENTATION_HTML)
	@echo "✓ HTML généré : $(PRESENTATION_HTML)"
