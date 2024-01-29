import { View } from "./view";

export class MensagemView extends View {
    template(mensagem: string, tipoMensagem: string): string {
        return `
            <p class="alert alert-${tipoMensagem}">
                ${mensagem}
            </p>
        `;
    }

    update(mensagem: string, tipoMensagem: string): void {
        const template = this.template(mensagem, tipoMensagem);
        this.elemento.innerHTML = template;
    }
}