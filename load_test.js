import { sleep, check } from "k6";
import { Rate } from 'k6/metrics';
import http from "k6/http";

const errorRate = new Rate('errorRate');

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    /* discardResponseBodies: true, Otimiza consumo de memória descartando o responseBody */
    stages: [
        { duration: '0.5m', target: 100 }, /* escala lentamente até a quantidade normal de usuários esperada */
        { duration: '1m', target: 100 }, /* mantém a carga de usuários ativas no sistema por um período considerável de tempo */
        { duration: '0.5m', target: 0 } /* desescala a quantidade de usuários */
    ],
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)', 'p(99.99)'],
    thresholds: {
        http_req_duration: ['p(99)<150'], //99% requests must complete before 150ms
    },
};

export default () => {
    const response = http.get('http://localhost:3333/api/v1/users');
    const success = check(response, {
        'response code was 200': (res) => res && res.status == 200,
    });
    //se success retornar false, tivemos um erro no assert, ou seja, o status foi diferente de 200
    if(!success) {
        /*  adciona um erro
        0 = false (não tem erro) 
        1 = true (tem erro) */
        errorRate.add(1);
    }
    //Garante que cada usuário realiza no máximo uma requisição por segundo. Opcional.
    sleep(1);
}