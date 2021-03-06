.DEFAULT_GOAL := test

PHASE       := IDB1
APP         := app/eklogi.py
CONFIG      := app/config.py
MODELS      := app/models.py
TESTS       := app/tests.py
TEST_DEST   := eklogi-test.out
DOC_TARGET  := app/models.py
DOC_SRC     := models.html
DOC_DEST    := $(PHASE).html
LOG_DEST    := $(PHASE).log
MODEL_PAGES := app/routes/modelpages.py
MODEL_API   := app/routes/models.py
HTML_PAGES  := app/routes/pages.py
UTILITY     := app/routes/utility.py
IGNORE      := "app/templates/*"

FILES :=               \
    $(PHASE).html      \
    $(PHASE).log       \
    $(APP)             \
    $(MODELS)          \
    $(TESTS)

ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
    USR_LIBS := "/usr/*"
else ifeq ($(CI), true)                # Travis CI
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3
    AUTOPEP8 := autopep8
    USR_LIBS := "$(VIRTUAL_ENV)*"
else ifeq ($(shell uname -p), unknown) # Docker
    PYTHON   := python3.5
    PIP      := pip3.5
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
    USR_LIBS := "/usr/*"
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    PYLINT   := pylint
    COVERAGE := coverage-3.5
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
    USR_LIBS := "/usr/*"
endif

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

build:
	$(PIP) install -e .

check:
	@not_found=0;                                 \
    for i in $(FILES);                            \
    do                                            \
        if [ -e $$i ];                            \
        then                                      \
            echo "$$i found";                     \
        else                                      \
            echo "$$i NOT FOUND";                 \
            not_found=`expr "$$not_found" + "1"`; \
        fi                                        \
    done;                                         \
    if [ $$not_found -ne 0 ];                     \
    then                                          \
        echo "$$not_found failures";              \
        exit 1;                                   \
    fi;                                           \
    echo "success";

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  $(DOC_DEST)
	rm -f  $(LOG_DEST)
	rm -f  $(TEST_DEST)
	rm -rf __pycache__

config:
	git config -l

debug:
	start-debug

eklogi.html: $(MODELS)
	$(PYDOC) -w $(DOC_TARGET)
	cp $(DOC_SRC) $(DOC_DEST)
	rm $(DOC_SRC)

eklogi.log:
	git log > $(LOG_DEST)

format:
	$(AUTOPEP8) -i $(APP)
	$(AUTOPEP8) -i $(CONFIG)
	$(AUTOPEP8) -i $(MODELS)
	$(AUTOPEP8) -i $(TESTS)
	$(AUTOPEP8) -i $(MODEL_PAGES)
	$(AUTOPEP8) -i $(MODEL_API)
	$(AUTOPEP8) -i $(HTML_PAGES)
	$(AUTOPEP8) -i $(UTILITY)

inspect:
	-$(PYLINT) $(APP)
	-$(PYLINT) $(CONFIG)
	-$(PYLINT) $(MODELS)
	-$(PYLINT) $(TESTS)
	-$(PYLINT) $(MODEL_PAGES)
	-$(PYLINT) $(MODEL_API)
	-$(PYLINT) $(HTML_PAGES)
	-$(PYLINT) $(UTILITY)

server:
	start-server

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

submit: eklogi.html eklogi.log
	make check

test: inspect
	make versions
	-$(COVERAGE) run --omit $(IGNORE),$(USR_LIBS) --branch $(TESTS) > $(TEST_DEST) 2>&1
	-$(COVERAGE) report -m >> $(TEST_DEST)
	cat $(TEST_DEST)

versions:
	which make
	make --version
	@echo
	which git
	git --version
	@echo
	which $(PYTHON)
	$(PYTHON) --version
	@echo
	which $(PIP)
	$(PIP) --version
	@echo
	which $(PYLINT)
	$(PYLINT) --version
	@echo
	which $(COVERAGE)
	$(COVERAGE) --version
	@echo
	which $(PYDOC)
	$(PYDOC) --version
	@echo
	which $(AUTOPEP8)
	$(AUTOPEP8) --version
	@echo
	which flask
	flask --version
	@echo
	$(PIP) list