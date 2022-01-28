import { sleep } from "k6";
import http from "k6/http";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '5m', target: 300 }, /* escala lentamente até a quantidade normal de usuários esperada */
        { duration: '10m', target: 300 }, /* mantém a carga de usuários ativas no sistema por um período considerável de tempo */
        { duration: '5m', target: 0 } /* desescala a quantidade de usuários */
        // { duration: '10m', target: 30000 }, 
        // { duration: '20m', target: 30000 }, 
        // { duration: '10m', target: 0 } 
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], //99% requests must complete before 150ms
    },
};

export default () => {
    http.get('http://localhost:3333/api/v1/users');
    
    //Garante que cada usuário realiza no máximo uma requisição por segundo. Opcional.
    sleep(1);
}