import { View } from "./view.js";

export class MensagemView extends View {
    public update(mensagem: string, tipoMensagem: string): void {
        let template = this.templateMensagem(mensagem, tipoMensagem);
        this.elemento.innerHTML = template;
    }
}