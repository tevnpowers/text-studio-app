build:
	pip install -r requirements.txt

install:
	npm install

code:
	black . --line-length 79

dev:
	conda activate app

rebuild:
	./node_modules/.bin/electron-rebuild

run:
	./node_modules/.bin/electron .