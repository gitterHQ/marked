all: clean npm test
	@cp lib/marked.js marked.js
	@uglifyjs --comments '/\*[^\0]+?Copyright[^\0]+?\*/' -o marked.min.js lib/marked.js

npm:
	npm prune
	npm install

clean:
	rm -f marked.js
	rm -f marked.min.js

test:
	./node_modules/.bin/mocha test/gitter/ test/static.js -R spec

bench:
	@node test --bench

.PHONY: clean all test bench test
