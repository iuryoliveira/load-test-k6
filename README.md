# Instalar o K6
[Installation](https://k6.io/docs/getting-started/installation/)

# Teste de carga
O objetivo do teste de carga é verificar como o sistema irá se comportar quando tiver uma taxa elevada de usuários ativos por uma quantidade considerável de tempo, e como responderá quando a quantidade de usuários começar a baixar.

1. No primeiro stage é feito um ramp up suavemente até o número de usuários desejado (ou esperado no sistema);
2. No segundo stage o número de usuários ativos é mantido por uma quantidade considerável de tempo;
3. No terceiro stage, a quantidade do usuários deve ser desescalada até zero.

### Script de execução
Na raiz do projeto: 

npm: ```npm run load``` 

ou

Yarn: ```yarn load```

# Teste de stress
O objetivo do teste de estresse é verificar como a aplicação irá se comportar, considerando que teremos um ramp up na quantidade de usuários, seguido de um período de estabilização, várias vezes,
até que a quantidade de usuários ativos ultrapasse o ponto de quebra do sistema, quando os resultados são colhidos.

### Script
npm: ```npm run stress```

ou

Yarn: ```yarn stress```

# Relatório
#### CLI

Exemplo de um teste sendo executado:
```
$ k6 run load_test.js

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: load_test.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 20m30s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 20m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (20m01.0s), 000/300 VUs, 258343 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  20m0s

     data_received..................: 162 MB 135 kB/s
     data_sent......................: 24 MB  20 kB/s
     http_req_blocked...............: avg=7.12µs  min=1µs    med=5µs    max=4.17ms  p(90)=8µs     p(95)=10µs   
     http_req_connecting............: avg=687ns   min=0s     med=0s     max=2.09ms  p(90)=0s      p(95)=0s     
   ✗ http_req_duration..............: avg=46.14ms min=1.13ms med=4.65ms max=9.63s   p(90)=29.08ms p(95)=85.42ms
       { expected_response:true }...: avg=46.14ms min=1.13ms med=4.65ms max=9.63s   p(90)=29.08ms p(95)=85.42ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 258343
     http_req_receiving.............: avg=86.33µs min=12µs   med=73µs   max=8.07ms  p(90)=120µs   p(95)=155µs  
     http_req_sending...............: avg=28.91µs min=5µs    med=22µs   max=11.77ms p(90)=39µs    p(95)=56µs   
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=46.03ms min=1.04ms med=4.53ms max=9.63s   p(90)=28.94ms p(95)=85.32ms
     http_reqs......................: 258343 215.110849/s
     iteration_duration.............: avg=1.04s   min=1s     med=1s     max=10.63s  p(90)=1.02s   p(95)=1.08s  
     iterations.....................: 258343 215.110849/s
     vus............................: 1      min=1        max=300 
     vus_max........................: 300    min=300      max=300 
```

#### Detalhes

* **execution: local** -> Indica que o teste está sendo executado na máquina local. A outra opção é "cloud".
* **script: load_test.js** -> Indica que o K6 está rodando o script do arquivo ```load_test.js```
* **scenarios** -> Detalha a quantidade de testes que existem no script, quantidade máxima de usuários confirmado em um estágio e tempo máximo de duração do script (soma do tempo conigurado para cada estágio).
* **default** -> Indica que o teste sendo executado foi uma função default (quando apensas um teste existe no script).
* **running** -> Tempo de execução do script, detalhando quantidade de usuários ativo e quantidade máximas, bem como a quantidade de requisições feitas e quantidade de requisições que foram interrompidas/falharam.
* **barra de progresso** -> Outra visualização para que o usuário acompanhe o percentual de conclusão do teste de carga

#### Métricas
* **http_req_duration** -> Análise de tendência do tempo de resposta das requisições (avg = média, min = mínimo, max = máximo)
* **http_req_failed** -> Percentual de requisições que falharam
* **iteration_duration** -> Análise de tendência do tempo de duração de cada iteração
* **iterations** -> Quantas iterações foram realizadas
* **vus** -> Quantidade mínima de usuários
* **vus_max** -> Quantidade máxima de usuários

[Definições das métricas](https://k6.io/docs/using-k6/metrics/)

# Integração com InfluxDB para acompanhar o report através de gráficos
[Documentação](https://k6.io/docs/results-visualization/influxdb-+-grafana/)

## Instalar InfluxDB 1
Mac OS: 

```brew install influxdb@1```

Windows:

```To Do```

Por default, o InfluxDB rodará no endereço ```http://localhost:8086/```

## Instalar o Grafana
Mac OS:

```brew install grafana```

Windows:

```To Do```

Por default, o InfluxDB rodará no endereço ```http://localhost:3000/```

## Confirmar que o serviço do InfluxDB e Grafana estão rodando
Na raiz do projeto execute o comando:

npm: ```npm run restart-services```

ou

Yarn: ```yarn restart-services```

## Configurando o relatório pela primeira vez
1. Acessar o endereço do Grafana http://localhost:3000/.

2. Logar com o usuário padrão do Grafana: ```user: admin password: admin```

3. Executar um teste de carga/stress para gerar dados de relatório (Influxdb deve estar rodando).

     npm: ```npm run load-report``` ou ```npm run stress-report```

     ou

     Yarn: ```yarn load-report``` ou ```yarn stress-report```

4. No Grafana, acessar o menu lateral > Configurations > Data Source 
5. Selecionar "InfluxDB" como tipo da fonte de dados;
6. Configurar "myk6db" como nome do data source;
7. Configurar "myk6db" como database;
8. Configurar "GET" como http method;
9. Clicar em "Save and Test". Se a configuração do Data Source estiver estiver correta, o data source será criado;
10. Acessar o menu Lateral > Create > Import;
11. No campo "import via Grafana.com", informar o ID do relatório "10660" e clicar em Load. Outros relatórios estão disponíveis em [Grafana](https://grafana.com/grafana/dashboards/?search=k6);
12. Selecionar o data srouce "myk6db" que foi criado anteriormente;
13. Salvar.

# Consultando o dashboard

Ao executar um teste que gera dados de relatório (scripts
```npm run load-report``` ou ```npm run stress-report```), a base de dados do InfluxDB será populada e com estes dados poderemos consultar o painel criado no Grafana. Para isto, basta acessar o grafana em ```http://localhost:3000/``` e, em seguida, navegar no "Menu lateral > Dashboards" e selecionar o dashboard criado.


# Otimizando o script
[Documentação K6](https://k6.io/docs/testing-guides/running-large-tests/)