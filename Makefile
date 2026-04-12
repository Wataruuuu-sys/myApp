COMPOSE = docker compose -f infra/docker-compose.yaml

compose-up:
	$(COMPOSE) up -d

compose-down:
	$(COMPOSE) down -v

build-web:
	container build --tag my-web-app --target dev --file ./infra/web/Dockerfile .
	
build-db:
	container build --tag my-db --file ./infra/db/Dockerfile .

image:
	container image ls

image-clean:
	container image delete my-web-app my-db

start:
	container system start

status:
	container ls

up:
	$(MAKE) run-db
	@until container exec db pg_isready -U myapp > /dev/null 2>&1; do sleep 1; done
	$(MAKE) migrate
	$(MAKE) run-web

migrate:
	bunx prisma db push

down: 
	container stop db web

run-db:
	container run --name db --detach --rm -p 5432:5432 my-db

run-web:
	container run --name web --detach --rm -p 3000:3000 --env-file .env \
		-v $(PWD)/src:/app/src \
		-v $(PWD)/next.config.ts:/app/next.config.ts \
		-e WATCHPACK_POLLING=true \
		my-web-app
