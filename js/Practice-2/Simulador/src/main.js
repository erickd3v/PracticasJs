export default class Animal {
    constructor(name, alimentation, sound) {
        this.name = name;
        this.alimentation = alimentation;
        this.sound = sound;
    }

    sonidoAnimal(addSound) {
        this.sound.push(addSound)
    }
}