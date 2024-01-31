import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacaoView } from '../views/negociacoes-view.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacaoView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView', true);

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.eDiaUtil(negociacao)) {
            this.mensagemView.update("Apenas dias úteis", "warning");
            this.removeMensagem();
            return;
        }

        negociacao.data.setDate(12);
        this.negociacoes.adiciona(negociacao);
        this.atualizaView(this.negociacoes);
        this.limparFormulario(); 
    }

    private eDiaUtil(negociacao: Negociacao): boolean {
        return negociacao.data.getDay() > DiasDaSemana.DOMINGO && negociacao.data.getDay() < DiasDaSemana.SABADO;
    }

    private atualizaView(negociacoes: Negociacoes) {
        this.negociacoesView.update(negociacoes);

        this.mensagemView.update('O novo registro foi guardado!', 'info');

        this.removeMensagem();
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private removeMensagem() {
        setTimeout(() => {
            this.mensagemView.update('', '');
        }, 3000);
    }
}
