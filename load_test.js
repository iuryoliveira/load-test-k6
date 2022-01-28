import { sleep } from "k6";
import http from "k6/http";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '10m', target: 30000 }, 
        { duration: '20m', target: 30000 }, 
        { duration: '10m', target: 0 } 
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