import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacaoView extends View {
    public update(model: Negociacoes): void {
        let template = this.templateLista(model);
        this.elemento.innerHTML = template;
    }
}