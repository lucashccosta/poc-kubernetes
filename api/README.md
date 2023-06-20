# Kubernetes - API

Rest API utilizada para o estudo de Kubernetes.

# Rodando a aplicação

Execute no terminal os comandos abaixo:

```sh
# cria a imagem docker
docker build -t poc-kubernetes-api:latest .
```

```sh
# roda container utilizando a imagem criada
docker run -p 9080:9080 --name poc-kubernetes-api poc-kubernetes-api:latest
```

Acesse o navegador ou um cliente Rest e informe a URL:

```sh
http://localhost:9080/api/v1/health
```

# Rest API
## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Utilizado para recuperar um registro. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|

### Visualizar Status da Aplicação
+ Endpoint: [GET] http://localhost:9080/api/v1/health
+ Request (application/json)
+ Response (application/json)
    + Body
        ```json
            {
                "srv": "kubernetes-api",
                "status": "OK",
                "statusHttp": 200
            }
        ```