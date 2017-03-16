PHASE      := IDB1
DOC_TARGET := models
DOC_SRC    := models.html
DOC_DEST   := ../$(PHASE).html

html:
	pydoc3 -w $(DOC_TARGET)
	cp $(DOC_SRC) $(DOC_DEST)
	rm $(DOC_SRC)
