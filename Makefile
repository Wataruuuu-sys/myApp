build-web:
	container build --tag my-web-app --target ci --file ./infra/web/Dockerfile .

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
	container list -a

delete:
	container delete -a

container-up:
	$(MAKE) run-db
	@until container exec db pg_isready -U myapp > /dev/null 2>&1; do sleep 1; done
	$(MAKE) run-web

container-down:
	container stop db web

run-db:
	container run --name db --detach --rm -p 5432:5432 my-db

run-web:
	container run --name web --detach --rm -p 3000:3000 \
		--env-file .env.ci \
		my-web-app

db-exec:
	container exec -it db bash

web-exec:
	container exec -it web bash
