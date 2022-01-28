# Instalar o K6
[Installation](https://k6.io/docs/getting-started/installation/)

# Teste de carga
O objetivo do teste de carga é verificar como o sistema irá se comportar quando tiver uma taxa elevada de usuários ativos por uma quantidade considerável de tempo, e como responderá quando a quantidade de usuários começar a baixar.

1. No primeiro stage é feito um ramp up suavemente até o número de usuários desejado (ou esperado no sistema);
2. No segundo stage o número de usuários ativos é mantido por uma quantidade considerável de tempo;
3. No terceiro stage, a quantidade do usuários deve ser desescalada até zero.

#### Script
npm: ```npm run load```
Yarn: ```yarn load```

# Teste de stress
O objetivo do teste de estresse é verificar como a aplicação irá se comportar, considerando que teremos um ramp up na quantidade de usuários, seguido de um período de estabilização, várias vezes,
até que a quantidade de usuários ativos ultrapasse o ponto de quebra do sistema, quando os resultados são colhidos.

#### Script
npm: ```npm run stress```
Yarn: ```yarn stress```

# Relatório
[Documentação](https://k6.io/docs/results-visualization/influxdb-+-grafana/)