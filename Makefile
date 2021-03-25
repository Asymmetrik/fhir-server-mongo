.PHONY:build
build:
	docker build -t imranq2/node-fhir-server-mongo:local .

.PHONY:publish
publish:
	docker push imranq2/node-fhir-server-mongo:latest
	docker push imranq2/node-fhir-server-mongo:1.2.71

.PHONY:up
up:
	docker-compose -f docker-compose.yml  -p fhir-dev build --parallel && \
	docker-compose -p fhir-dev -f docker-compose.yml up --detach && \
	echo FHIR server: http://localhost:3000/stats && \
	echo FHIR server: http://localhost:3000/4_0_0/Practitioner/

.PHONY:down
down:
	docker-compose -p fhir-dev -f docker-compose.yml down

.PHONY:clean
clean: down
	docker image rm imranq2/node-fhir-server-mongo -f
	docker image rm node-fhir-server-mongo_fhir -f
	docker volume rm fhir-dev_mongo_data -f

.PHONY:init
init:
	brew update  # update brew
	#brew upgrade  # upgrade all installed packages
	brew install yarn
	brew install kompose
	#brew install nvm
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.37.2/install.sh | zsh
	nvm install 14.15.4
	make update

# nvm use 15.12.0 && \

.PHONY:update
update:
	echo "NOTE: Run nvm use 15.12.0 if you get node conflicts" && \
	yarn install --no-optional && \
	npm i --package-lock-only

.PHONY:tests
tests:
	npm test

.PHONY:tests_integration
tests_integration:
	npm run test:integration

.PHONY:tests_everything
tests_everything:
	npm run test:everything

.PHONY:generate
generate:
	python3 src/services/generate_services.py

.PHONY:shell
shell: ## Brings up the bash shell in dev docker
	docker-compose -p fhir-dev -f docker-compose.yml run --rm --name fhir fhir /bin/sh
