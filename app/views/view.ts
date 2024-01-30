import { Negociacoes } from "../models/negociacoes.js";

export class View {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.querySelector(seletor);
    }

    protected template(tpTemplate: string, model?: Negociacoes, mensagem?: string, tipoMensagem?: string): string {
        let template;

        switch (tpTemplate) {
            case 'alert':
                template = `
                    <p class="alert alert-${tipoMensagem}">
                        ${mensagem}
                    </p>
                `;
                break;
        
            case 'lista':
                template = `
                    <table class="table table-hover table-bordered">
                        <thead>
                            <td>DATA</td>
                            <td>QUANTIDADE</td>
                            <td>VALOR</td>
                        </thead>
                        <tbody>
                            ${model.lista().map(negociacao => {
                                return `
                                    <tr>
                                        <td>${this.formataData(negociacao.data)}</td>
                                        <td>${negociacao.quantidade}</td>
                                        <td>${negociacao.valor}</td>
                                    </tr>
                                `;
                            }).join(' ')}
                        </tbody>
                    </table>
                `;
                break;
        }
        return template;
    }

    private formataData(data: Date): string {
        return new Intl.DateTimeFormat().format(data)
    }
}