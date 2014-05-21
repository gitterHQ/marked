all: clean test
	@cp lib/marked.js marked.js
	@uglifyjs --comments '/\*[^\0]+?Copyright[^\0]+?\*/' -o marked.min.js lib/marked.js

clean:
	@rm marked.js
	@rm marked.min.js

test:
	node test/
	./node_modules/.bin/mocha test/mocha/ -R spec

bench:
	@node test --bench

.PHONY: clean all test
