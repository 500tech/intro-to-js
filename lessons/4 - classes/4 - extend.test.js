/**
 * (simplified biology)
 * - Virus
 *  - DNAVirus
 *    - Parvoviridae
 *      - B19
 *    - Poxviridae
 *      - Smallpox
 *      - CowPox
 *    - Hepadnaviridae
 *      - HepititisB
 *  - RNAVirus
 *    - Picornaviridae
 *      - Rhinovirus
 *      - Hepatovirus
 *      - Cardiovirus
 *    - Flaviviridae
 *      - HepitisC
 *      - Zika
 *
 * Implement this hierarchy. Implement the function canVaccinate(Virus weakened, VirusClass active).
 * A weakened virus can vaccinate an active virus if it is up to 4 steps from it in the hierarchy.
 *
 * You can use the getStepCount function with both prototype chains to get the distance, e.g.
 * getStepCount([Virus, DNAVirus, Parvoviridae, B19], [Virus, RNAVirus, Flaviviridae, Zika]) === 6
 */

function getStepCount(arr1, arr2) {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x))).length;
}

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

class Virus {}
class DNAVirus extends Virus {}
class Parvoviridae extends DNAVirus {}
class B19 extends Parvoviridae {}
class Poxviridae extends DNAVirus {}
class Smallpox extends Poxviridae {}
class CowPox extends Poxviridae {}
class Hepadnaviridae extends DNAVirus {}
class HepititisB extends Hepadnaviridae {}
class RNAVirus extends Virus {}
class Picornaviridae extends RNAVirus {}
class Rhinovirus extends Picornaviridae {}
class Hepatovirus extends Picornaviridae {}
class Cardiovirus extends Picornaviridae {}
class Flaviviridae extends RNAVirus {}
class HepitisC extends Flaviviridae {}
class Zika extends Flaviviridae {}

function canVaccinate(weakened, active) {
  return getStepCount(getChain(weakened), getChain(active)) <= 4;
}

console.log(canVaccinate(B19, Smallpox)); // true
console.log(canVaccinate(Smallpox, Rhinovirus)); // false
