/**
 * Implement a class called "Pet", whose constructor accepts "owner" and "petId".
 * The instance should be able to track the pet's health status (properties: "fixed", "vaccinated").
 * The class should have a getter "adoptable" that is true if the pet is fixed and vaccinated.
 */

function Pet() {} // replace this with the class

const p = new Pet('Mr. Foobar', 1441);
console.log(p.owner);
console.log(p.petId);
console.log(p.adoptable);
p.fixed = true;
p.vaccinated = true;
console.log(p.adoptable);
