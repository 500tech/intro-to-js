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
 * A weakened virus can vaccinate an active virus if it is up to 4 steps from it in the hierachy.
 *
 * You can use the getStepCount function with both prototype chains to get the distance, e.g.
 * getStepCount([Virus, DNAVirus, Parvoviridae, B19], [Virus, RNAVirus, Flaviviridae, Zika]) === 6
 */

function getStepCount(arr1, arr2) {
  return arr1
    .filter(x => !arr2.includes(x))
    .concat(arr2.filter(x => !arr1.includes(x))).length;
}

function canVaccinate(weakened, active) {
  // implement this
}

// Delete these (used for testing)
function B19() {}
function Smallpox() {}
function Rhinovirus() {}

console.log(canVaccinate(new B19(), Smallpox)); // true
console.log(canVaccinate(new Smallpox(), Rhinovirus)); // false
