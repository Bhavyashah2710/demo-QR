// Cloudflare Worker — Shah Cafe menu API
// Set GitHub secrets: GH_TOKEN (fine-grained PAT with Contents: Read/Write), GH_OWNER, GH_REPO, GH_BRANCH
// Deploy this Worker and bind secret/vars in Cloudflare dashboard.
const FILE = "menu.json";
export default {
 async fetch(request, env) {
  const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,PUT,OPTIONS","Access-Control-Allow-Headers":"Content-Type,Authorization"};
  if(request.method==="OPTIONS") return new Response(null,{headers:cors});
  const url="https://api.github.com/repos/"+env.GH_OWNER+"/"+env.GH_REPO+"/contents/"+FILE;
  const headers={Authorization:"Bearer "+env.GH_TOKEN,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
  if(request.method==="GET"){
   const r=await fetch(url,{headers});
   if(!r.ok)return new Response(JSON.stringify({error:"Could not read menu"}),{status:502,headers:{...cors,"Content-Type":"application/json"}});
   const j=await r.json();const raw=atob(j.content.replace(/\n/g,""));return new Response(raw,{headers:{...cors,"Content-Type":"application/json","Cache-Control":"no-store"}});
  }
  if(request.method==="PUT"){
   const auth=request.headers.get("Authorization");
   if(!env.ADMIN_KEY||auth!=="Bearer "+env.ADMIN_KEY)return new Response("Unauthorized",{status:401,headers:cors});
   let body;try{body=await request.json();if(!Array.isArray(body.items))throw 0;}catch{return new Response("Invalid menu JSON",{status:400,headers:cors});}
   const old=await fetch(url,{headers});if(!old.ok)return new Response("GitHub read failed",{status:502,headers:cors});const file=await old.json();
   const content=btoa(unescape(encodeURIComponent(JSON.stringify(body,null,2)+"\n")));
   const save=await fetch(url,{method:"PUT",headers:{...headers,"Content-Type":"application/json"},body:JSON.stringify({message:"Update cafe menu via owner dashboard",content,sha:file.sha,branch:env.GH_BRANCH})});
   return new Response(JSON.stringify({ok:save.ok}),{status:save.ok?200:502,headers:{...cors,"Content-Type":"application/json"}});
  }
  return new Response("Method not allowed",{status:405,headers:cors});
 }
};