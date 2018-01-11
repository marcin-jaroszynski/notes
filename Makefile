install:
	npm install
	
dev:
	npm run dev

prod:
	npm run build

testing:
	npm run test-unit && npm run test-api && npm run test-db

test-unit:
	npm run test-unit

test-api:
	npm run test-api

test-db:
	npm run test-db