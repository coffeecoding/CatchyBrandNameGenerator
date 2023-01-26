import { NextApiRequest } from "next";

const vowels = "aeiou";
const consonants = "bcdefghijklmnopqrstuvxyz";

const startingVowels = "a,e,i,o,u,ea";
const endingConsonants =
  "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z,ch,ph,sh,th";
const consonants1 =
  "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z,br,cr,dr,fr,gr,kr,pr,tr,ch,ph,sh,st,sl,bl,pl,th";
const vowels1 = "a,e,i,o,u,y,ar,er,ir,or,ur,ow,ew,oo,ee,ea";
//const vowels1 =
//  "a,e,i,o,u,ea,am,em,im,om,um,an,en,in,on,un,ap,ep,ip,op,up,at,et,it,ot,ut,ar,er,or,ir,ur,al,el,il,ol,ul,ad,ed,id,od,ud,ab,eb,ib,ob,ub,ah,eh,ih,oh,uh,y,ey,oy,ie,ow,ew,oo,ee,ine,yne,ate,ute,ite,are,aire,ire,ore,ure,ere";
const consonants2 =
  "b,c,d,f,g,h,j,k,l,m,n,p,q,r,s,t,v,w,x,y,z,br,cr,dr,fr,gr,kr,pr,tr,th,tl,tc,tm,tn,tp,ch,ph,sh,st,sl,ss,sc,sm,sn,sp,sr,bs,ds,fs,gs,ms,ns,ps,qs,rs,ts,ws,bt,dt,ft,gt,mt,nt,pt,qt,wt,rb,rc,rd,rf,rg,rh,rj,rk,rl,rm,rp,rq,rt,rv,rw,rz,fp,gp,jp,lp,mp,np,pp,rp,sp,tp,wp,zp";
const vowels2 =
  "a,e,i,o,u,ea,am,em,im,om,um,an,en,in,on,un,ap,ep,ip,op,up,at,et,it,ot,ut,ar,er,or,ir,ur,al,el,il,ol,ul,ad,ed,id,od,ud,ab,eb,ib,ob,ub,ah,eh,ih,oh,uh,y,ey,oy,ie,ow,ew,oo,ee,ine,yne,ate,ute,ite,are,aire,ire,ore,ure,ere";

let arrays = [
  startingVowels.split(","),
  consonants1.split(","),
  vowels1.split(","),
  consonants2.split(","),
  vowels2.split(","),
];

const svs = startingVowels.split(",");
const ecs = endingConsonants.split(",");
const cs1 = consonants1.split(",");
const vs1 = vowels1.split(",");
const cs2 = consonants2.split(",");
const vs2 = vowels2.split(",");

function randomFromArr(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const stats = {
  simple: {
    total: 0,
    vcv: 0,
    vcvc: 0,
    cvcv: 0,
    cvcvc: 0,
  },
  complex: {
    total: 0,
    startingVowel: {
      vcv: 0,
      vcvc: 0,
    },
    startingConsonant: {
      cvcv: 0,
      cvcvc: 0,
    },
  },
};

function frac(numb, total) {
  return Math.round((numb / total) * 100) / 100;
}

function printStats() {
  var total = stats.simple.total + stats.complex.total;
  console.log("\n");
  console.log("===  STATS  ===");
  console.log("Simple:  " + stats.simple.total);
  console.log("Complex: " + stats.complex.total);
  console.log("--- DETAILS ---");
  console.log("Simple:");
  console.log("  VCV:   " + stats.simple.vcv);
  console.log("  VCVC:  " + stats.simple.vcvc);
  console.log("  CVCV:  " + stats.simple.cvcv);
  console.log("  CVCVC: " + stats.simple.cvcvc);
  console.log("Complex:");
  console.log("  VCV:   " + stats.complex.startingVowel.vcv);
  console.log("  VCVC:  " + stats.complex.startingVowel.vcvc);
  console.log("  CVCV:  " + stats.complex.startingConsonant.cvcv);
  console.log("  CVCVC: " + stats.complex.startingConsonant.cvcvc);
}

export async function generateName(syllableCount) {
  var nickname = "";
  if (syllableCount === "2") {
    // simple version 50%
    if (Math.random() > 0.5) {
      stats.simple.total++;
      let dice = Math.random();
      if (dice < 1 / 10) {
        // VCV
        stats.simple.vcv++;
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
      } else if (dice < 4 / 10) {
        // VCVC
        stats.simple.vcvc++;
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
      } else if (dice < 7 / 10) {
        // CVCV
        stats.simple.cvcv++;
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
      } else {
        // CVCVC
        stats.simple.cvcvc++;
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
      }
    } else {
      // complex version 50%
      stats.complex.total++;
      // starting vowel 50%
      if (Math.random() > 0.5) {
        nickname += randomFromArr(svs);
        nickname += randomFromArr(cs1);
        nickname += randomFromArr(vs1);
        if (Math.random() > 0.5) {
          stats.complex.startingVowel.vcvc++;
          nickname += randomFromArr(ecs);
        } else {
          stats.complex.startingVowel.vcv++;
        }
      } else {
        nickname += randomFromArr(cs1);
        nickname += randomFromArr(vs1);
        nickname += randomFromArr(cs2);
        if (Math.random() > 0.5) {
          // bc vs2 shouldn't be combined with ecs
          stats.complex.startingConsonant.cvcv++;
          nickname += randomFromArr(vs2);
        } else {
          // the issue is, vs1 often don't go well with ecs
          // possible solution: make it 50/50 between vs1 and svs
          //nickname += randomFromArr(vs1);
          stats.complex.startingConsonant.cvcvc++;
          nickname += randomFromArr(svs);
          nickname += randomFromArr(ecs);
        }
      }
    }
  } else {
    if (Math.random() > 0.5) {
      // simple version
      let dice = Math.random();
      if (dice < 1 / 4) {
        // VCVCV
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
      } else if (dice < 1 / 2) {
        // VCVCVC
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
      } else if (dice < 3 / 4) {
        // CVCVCV
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
      } else {
        // CVCVCVC
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
        nickname += randomFromArr(vowels);
        nickname += randomFromArr(consonants);
      }
    } else {
      // complex version
      if (Math.random() > 0.5) {
        nickname += randomFromArr(svs);
        nickname += randomFromArr(cs1);
        nickname += randomFromArr(vs1);
        nickname += randomFromArr(cs2);
        if (Math.random() > 0.5) {
          // bc vs2 shouldn't be combined with ecs
          nickname += randomFromArr(vs2);
        } else {
          //nickname += randomFromArr(vs1);
          nickname += randomFromArr(svs);
          nickname += randomFromArr(ecs);
        }
      } else {
        nickname += randomFromArr(cs1);
        nickname += randomFromArr(vs1);
        nickname += randomFromArr(cs2);
        nickname += randomFromArr(vs2);
        nickname += randomFromArr(cs1);
        nickname += randomFromArr(vs1);
        if (Math.random() > 0.5) nickname += randomFromArr(ecs);
      }
    }
  }

  // final heuristics:
  // replace rr, yy, ss with single versions
  nickname = nickname.replace("yy", "y");
  nickname = nickname.replace("ss", "s");
  nickname = nickname.replace("rr", "r");

  //printStats();

  if (nickname.startsWith("yy")) return generateName(syllableCount);

  return nickname;
  //const data = nickname;
  //return { props: { data } };
}

export default async function handler(req: NextApiRequest, res) {
  const brandname = await generateName(req.query.sc);
  res.status(200).json({ name: brandname });
}
