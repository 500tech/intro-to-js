const isTopClass = cls => Reflect.getPrototypeOf(cls) === Function.prototype;
const getClass = instance => Reflect.getPrototypeOf(instance).constructor;
function getChain(instance) {
  if (isTopClass(instance)) {
    return [instance];
  }
  if (!(instance instanceof Function)) {
    // let's start with the class itself
    instance = getClass(instance);
  }
  return getChain(Reflect.getPrototypeOf(instance)).concat([instance]);
}

class Animal {
  constructor(biodata) {
    this._biodata = biodata;
  }

  mate(animal) {
    if (!(animal instanceof Animal)) {
      throw new Error('Animal can only mate with other animals');
    }
    const mateChain = getChain(animal);
    const selfChain = getChain(this);
    const mainChain =
      mateChain.length > selfChain.length ? mateChain : selfChain;
    const AnimalType = mainChain.pop();
    return new AnimalType(this._biodata | animal._biodata);
  }
}

class Feline extends Animal {}
class Cat extends Feline {
  constructor(biodata) {
    super(biodata);
    this._isHungry = true;
  }

  get isHungry() {
    return this._isHungry;
  }

  set isHungry(_value) {
    throw new Error('Cats are always hungry');
  }
}
class Fish extends Animal {}

const mitzi = new Cat(0b11101100001);
const nemo = new Fish(0b00111);
console.log(mitzi);
console.log(nemo);
console.log(mitzi.mate(nemo));
