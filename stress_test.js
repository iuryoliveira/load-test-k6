import { sleep } from "k6";
import http from "k6/http";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '2m', target: 100 },
        { duration: '4m', target: 100 }, 
        { duration: '2m', target: 1000 },
        { duration: '4m', target: 1000 },
        { duration: '2m', target: 2000 },
        { duration: '4m', target: 2000 }, 
        { duration: '2m', target: 5000 }, 
        { duration: '4m', target: 5000 }, 
        /* pode continuar até o número desejado (3000) */
        { duration: '10m', target: 0 } 
    ],
};

export default () => {
    /* 
    permite fazer requisição para vários endpoints de uma única vez.
    1 usuário consome N endpoints
    */
    http.batch([
        ['GET', 'http://localhost:3333/api/v1/users']
    ]);
    //Garante que cada usuário realiza no máximo uma requisição por segundo. Opcional.
    sleep(1);
}