// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (numID, arrDNA) => {
  return {
    specimenNum: numID,
    dna: arrDNA,
    mutate() {
      let strand = this.dna;
      let baseIndex = Math.floor(Math.random() * strand.length)
      let oldBase = strand[baseIndex];
      let newBase = returnRandBase();
      while (oldBase === newBase){
        newBase = returnRandBase();
      }
      strand[baseIndex] = newBase;
      this.dna = strand;
      return this.dna;
    },
    compareDNA(obj) {
      let counter = 0;
      for (let i=0; i<this.dna.length; i++){
        if (this.dna[i] === obj.dna[i]) {
          counter++;
        }
      }
      console.log(`${this.specimenNum} and ${obj.specimenNum} have ${(((counter/this.dna.length).toFixed(2))*100).toFixed(0)}% DNA in common.`)
    },
    willLikelySurvive(){
      const filterArray = this.dna.filter(base => base === "C" || base === "G")
      //console.log(filterArray);
      //console.log(filterArray.length/this.dna.length);
      if (filterArray.length/this.dna.length >= .60) {
        return true;
      }
      else {
        return false;
      }
    }
  };
}



let pAequor = pAequorFactory(001, mockUpStrand());
// console.log(pAequor.dna);
// pAequor.mutate();
console.log(pAequor.dna);
console.log(pAequor.willLikelySurvive());


let pAequor2 = pAequorFactory(002, mockUpStrand());
console.log(pAequor.dna);
//pAequor2.compareDNA(pAequor);

console.log(pAequor2.willLikelySurvive());

let survivalArray = [];
let id = 1;
while (survivalArray.length < 30){
  let tempOrg = pAequorFactory(id, mockUpStrand());
  if (tempOrg.willLikelySurvive()){
    survivalArray.push(tempOrg)
  }
  id++;
}

console.log(survivalArray);
console.log(survivalArray.length);


