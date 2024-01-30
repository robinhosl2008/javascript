import { View } from "./view.js";

export class MensagemView extends View {
    public update(mensagem: string, tipoMensagem: string): void {
        const template = this.template('alert', null, mensagem, tipoMensagem);
        this.elemento.innerHTML = template;
    }
}