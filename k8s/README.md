# Kubernetes

Arquivos de configurações do Kubernetes.

# Criando recursos

Para criar recursos no cluster k8s, execute no terminal o comando abaixo com o nome do arquivo desejado:

```sh
# roda arquivo .yaml
kubectl apply -f <FILE.yaml>
```

# Removendo recursos

Para remover recursos no cluster k8s, execute no terminal o comando abaixo com o nome do arquivo desejado:

```sh
# roda arquivo .yaml
kubectl delete -f <FILE.yaml>
```

# Rollout e Revisões

Para voltar a versão do deployment, execute os comandos abaixo:

```sh
# visualizar versões do deployment
kubectl rollout history deployment poc-k8s

# volta para a versão anterior do deployment
kubectl rollout undo deployment poc-k8s

# volta para uma versão específica do deployment
kubectl rollout undo deployment poc-k8s --to-revision=<VERSION_NUMBER>
```

# Comandos K8s

```sh
# visualizar nós do cluster
kubectl get nodes

# visualizar pods
kubectl get pods

# visualizar replica sets
kubectl get replicasets

# visualizar informações dos pods
kubectl describe <POD_NAME>

# visualizar deployments (Deployment > ReplicaSet > Pods)
kubectl get deployments

# visualizar versões dos deployments
kubectl rollout history deployment <DEPLOYMENT_NAME>

# visualizar consumo dos recursos do pod
kubectl top pod <POD_NAME>

# visualizar clusters disponíveis para acesso (minikube, kind, digital ocean, aws, etc)
kubectl config get-contexts 

# utilizar cluster disponível nos comandos kubectl
kubectl config use-context <CONTEXT_NAME>
```

# Utilizando proxy para acessar a API do K8s

Para acessar a API do Kubernetes, execute o comando no terminal:

```sh
kubectl proxy --port=9000
```

Acesse o navegador ou um cliente Rest e informe a URL:

```sh
http://localhost:9000
```

# Utilizando Port-Forward para acessar a API do backend (utilizar o service.yaml)
 
Para acessar a API no seu ambiente local, execute o comando abaixo para criar um port-forward para gerar um 
redirecionamento de portas entre o cluster k8s e o ambiente local:

```sh
# redireciona portas do pod para acesso via localhost
kubectl port-forward pod/k8s-api 9080:9080

# redireciona portas do service para acesso via localhost
kubectl port-forward svc/poc-k8s 9080:9080
```

Acesse o navegador ou um cliente Rest e informe a URL:

```sh
http://localhost:9080/api/v1/health
```

# Utilizando NodePort para acessar a API do backend (utilizar o service-nodeport.yaml)

Para acessar a API do backend (`/api`), execute o comando no terminal:

```sh
# listar nós do cluster
kubectl get nodes

# visualizar informações do nó
kubectl describe nodes <NODE_NAME>
```

Identificar a informação `Addresses.InternalIP` para identificar o IP do nó:

```
Addresses:
  InternalIP:  192.168.49.2
  Hostname:    minikube
```

Acesse o navegador ou um cliente Rest e informe a URL:

```sh
http://<192.168.49.2>:<30001>/api/v1/health
```

* A porta _30001_ foi definida no arquivo `service-nodeport.yaml` em `spec.ports.nodePort`.

# Teste de stress com fortio (verificar funcionamento do hpa - horizontal pod autoscaler)

```sh
# cria pod rodando comando de teste de stress
# "http://poc-k8s/api/v1/health": service.yaml => metadata.name
kubectl run -it --generator=run-pod/v1 fortio -rm --image=fortio/fortio -- load -qps 800 -t 120s -c 100 "http://poc-k8s/api/v1/health" 
```