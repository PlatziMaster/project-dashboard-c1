docker swarm init
docker node ls
docker swarm leave

docker-compose up --scale api=3

docker service ps
docker service ps pinger
docker service create --name pinger alpine ping www.google.com
docker service scale pinger=5

---


`dashboard-prod-m1`
`dashboard-prod-m2`
`dashboard-prod-m3`


```
apt-get update
apt-get upgrade -y
```

```
ufw allow 22/tcp
ufw allow 2376/tcp
ufw allow 2377/tcp
ufw allow 7946/tcp
ufw allow 7946/udp
ufw allow 4789/udp
ufw reload
ufw enable
systemctl restart docker
```


1. `sh build.sh`
1. `docker swarm init --advertise-addr`
1. `sh deploy.sh`

`docker swarm join-token manager`

docker service create \
  --name=viz \
  --publish=8080:8080/tcp \
  --constraint=node.role==manager \
  --mount=type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  dockersamples/visualizer