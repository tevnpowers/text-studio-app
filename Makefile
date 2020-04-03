activate:
	conda activate app

clean:
	rm -rf node_modules

install: pip-install npm-install rebuild

pip-install:
	pip install -r requirements.txt

npm-install:
	npm install

code:
	black . --line-length 79

dev:
	conda activate app

rebuild:
	./node_modules/.bin/electron-rebuild

run:
	./node_modules/.bin/electron .