import { NextApiRequest } from "next";

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

export async function generateName(syllableCount) {
  var nickname = "";
  if (syllableCount === "2") {
    let sv = Math.random() > 0.5;
    if (sv) {
      nickname += randomFromArr(svs);
      nickname += randomFromArr(cs1);
      nickname += randomFromArr(vs1);
      if (Math.random() > 0.5) nickname += randomFromArr(ecs);
    } else {
      nickname += randomFromArr(cs1);
      nickname += randomFromArr(vs1);
      nickname += randomFromArr(cs2);
      if (Math.random() > 0.5) {
        // bc vs2 shouldn't be combined with ecs
        nickname += randomFromArr(vs2);
      } else {
        // the issue is, vs1 often don't go well with ecs
        // possible solution: make it 50/50 between vs1 and svs
        //nickname += randomFromArr(vs1);
        nickname += randomFromArr(svs);
        nickname += randomFromArr(ecs);
      }
    }
  } else {
    let sv = Math.random() > 0.5;
    if (sv) {
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

  const data = nickname;

  if (nickname.startsWith("yy")) return generateName(syllableCount);

  return nickname;
  //return { props: { data } };
}

export default async function handler(req: NextApiRequest, res) {
  const brandname = await generateName(req.query.sc);
  res.status(200).json({ name: brandname });
}
