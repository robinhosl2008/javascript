import { Negociacoes } from "../models/negociacoes.js";

export class View {
    protected elemento: HTMLElement;
    private escapar: boolean = false;

    constructor(seletor: string, escapar?: boolean) {
        const elemento = document.querySelector(seletor);

        if (!elemento) {
            throw new Error(`O elemento '${seletor}' não foi encontrado no DOM.`);
        }

        this.elemento = elemento as HTMLElement;
        
        if (escapar) {
            this.escapar = escapar;
        }
    } 

    protected templateMensagem(mensagem: string, tipoMensagem: string): string {
        let template = `
            <p class="alert alert-${tipoMensagem}">
                ${mensagem}
            </p>
        `;

        template = this.escaparTemplate(template);

        return template;
    }

    protected templateLista(model: Negociacoes): string {
        let template = `
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
        
        template = this.escaparTemplate(template);

        return template;
    }

    private formataData(data: Date): string {
        return new Intl.DateTimeFormat().format(data)
    }

    private escaparTemplate(template: string): string {
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        return template;
    }
}