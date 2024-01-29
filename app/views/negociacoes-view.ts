import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacaoView extends View {
    template(model: Negociacoes): string {
        return `
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
                                <td>${new Intl.DateTimeFormat().format(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                            </tr>
                        `;
                    }).join(' ')}
                </tbody>
            </table>
        `;
    }

    update(model: Negociacoes): void {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}