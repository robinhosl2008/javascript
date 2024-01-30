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
    private negociacoesView = new NegociacaoView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao();

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

    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
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
