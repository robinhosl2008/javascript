import { NegociacoesDoDia } from "../interfaces/negociacaoDoDia";
import { Negociacao } from "../models/negociacao";


export class NegociacoesService {
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch("http://localhost:8080/dados")
            .then(res => {
                return res.json()
            })
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dado => {
                    return new Negociacao(
                        new Date(),
                        dado.vezes,
                        dado.montante
                    );
                });
            });
    }
}