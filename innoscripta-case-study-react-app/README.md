# Running in Docker

1. Open CMD or terminal in root directory of the project and run

```bash
docker image build -t <image_name>:<tag> .
```

Replace <image_name> and <tag> as you wish. For the example, we will use

```bash
docker image build -t innoscriptanews-image:latest .
```

2. Run the newly created Docker image

```bash
docker run -dp <host_port>:<container_port> --name innoscriptanews innoscriptanews-image:latest
```

The host port represents the port on the host machine that is mapped to the port inside the container. Since our React app is exposed through port 3000, <container_port> must be 3000. In this case, we will map it to the port 8000 on our localhost:

```bash
docker run -dp 8000:3000 --name innoscriptanews innoscriptanews-image:latest
```

3. We can now access our application in http://localhost:8000
