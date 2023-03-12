(function(){"use strict";function r(t,...e){const n=getTranslation(t)||t;return e.length===0?n:e.reduce((s,i,a)=>s.replace(`{${a}}`,i),n)}function u(t){return gradioApp().querySelector(t)}function ee(t){return!!u(t)}function _(t){return Array.from(gradioApp().querySelectorAll(t))}function H(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function P(t,e,...n){e?t.classList.add(...n):t.classList.remove(...n)}function Ie(t,...e){e.forEach(n=>{t.classList.toggle(n)})}function x(t,e){t==null||t.classList.toggle("!hidden",e)}function Ge(t,e){const n=opts[t];typeof n=="boolean"&&e(n)}function te(t){const e=u(`#${t}_gallery > div > img`);if(!(e instanceof HTMLImageElement))return k();const n=()=>e.src.substring(e.src.indexOf("file=")+5);return{get:n,getOrDefault:n,with:s=>s(n())}}function U(){const t=u("#sd_checkpoint_hash");if(!(t instanceof HTMLAnchorElement))return k();const e=()=>t.title;return{get:e,getOrDefault:e,with:n=>n(e())}}function ne(t){return ve(`#${t}_prompt textarea`)}function se(t){return ve(`#${t}_neg_prompt textarea`)}function re(t){return xe(`#${t}_sampling select`)}function ie(t){return L(`#${t}_steps input[type='number']`)}function le(t){return L(`#${t}_cfg_scale input[type='number']`)}function ae(t){return L(`#${t}_seed input[type='number']`)}function ce(t){return R(`#${t}_restore_faces input[type='checkbox']`)}function oe(t){return R(`#${t}_tiling input[type='checkbox']`)}function de(t){return R(`#${t}_enable_hr input[type='checkbox']`)}function ue(t){return xe(`#${t}_hr_upscaler select`)}function pe(t){return L(`#${t}_hires_steps input[type='number']`)}function ge(t){return L(`#${t}_denoising_strength input[type='number']`)}function me(t){return L(`#${t}_hr_scale input[type='number']`)}function he(){return L("#setting_CLIP_stop_at_last_layers input[type='number']")}function fe(){return L("#setting_eta_noise_seed_delta input[type='number']")}function B(t,e){if(e==="input")updateInput(t);else if(e==="change"){const n=new Event(e);Object.defineProperty(n,"target",{value:t}),t.dispatchEvent(n)}}function $(){const t=get_uiCurrentTab();if(t&&t.textContent)switch(t.textContent.trim()){case r("txt2img"):return"txt2img";case r("img2img"):return"img2img"}return"other"}function k(){return{get:()=>null,getOrDefault:t=>t,with:()=>{},set:()=>!1}}function b(t){return{...t,getOrDefault:()=>t.get(),with:e=>e(t.get())}}function ve(t){const e=u(t);return e instanceof HTMLTextAreaElement?b({get:()=>e.value,set:n=>(e.value=n,B(e,"input"),!0)}):k()}function xe(t){const e=u(t);return e instanceof HTMLSelectElement?{index:b({get:()=>e.selectedIndex,set:n=>(e.selectedIndex=n,B(e,"change"),!0)}),value:b({get:()=>{var n;return((n=e.selectedOptions[0])==null?void 0:n.value)||""},set:n=>{const s=e.querySelector(`option[value='${n}']`);let i=-1;return s instanceof HTMLOptionElement&&(i=s.index),i>=0?(e.selectedIndex=i,B(e,"change"),!0):!1}})}:{index:k(),value:k()}}function L(t){const e=u(t);return e instanceof HTMLInputElement?b({get:()=>e.valueAsNumber,set:n=>(e.valueAsNumber=n,B(e,"input"),!0)}):k()}function R(t){const e=u(t);return e instanceof HTMLInputElement?b({get:()=>e.checked,set:n=>(e.checked!=n&&e.click(),!0)}):k()}const je=/,(\s+)?$/g,He=/^(\s+)?,/g;function be(t,e){return!t||je.test(t)||He.test(e)?t+e:`${t}, ${e}`}function Ue(t,e){if(e.prompt){const n=ne(t);n.set(be(n.getOrDefault(""),e.prompt))}if(e.negativePrompt){const n=se(t);n.set(be(n.getOrDefault(""),e.negativePrompt))}e.samplingMethod&&re(t).value.set(e.samplingMethod),e.samplingSteps&&ie(t).set(e.samplingSteps),e.cfgScale&&le(t).set(e.cfgScale),e.seed&&ae(t).set(e.seed),e.restoreFaces&&ce(t).set(e.restoreFaces),e.tiling&&oe(t).set(e.tiling),e.hiresFix&&de(t).set(e.hiresFix),e.upscaler&&ue(t).value.set(e.upscaler),e.hiresSteps&&pe(t).set(e.hiresSteps),e.denoisingStrength&&ge(t).set(e.denoisingStrength),e.upscaleBy&&me(t).set(e.upscaleBy),e.clipSkip&&he().set(e.clipSkip),e.etaNoiseSeedDelta&&fe().set(e.etaNoiseSeedDelta)}function ye(t,e){fetch("/better-style-api/v1/register-style",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(n=>n.json()).then(n=>{e(n)})}function Re(t,e){fetch("/better-style-api/v1/delete-styles",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then(n=>n.json()).then(n=>{e(n)})}let Ce=[];const w=b({get:()=>Ce,set:t=>(Ce=[...t],!0)});let Se="";const Le=b({get:()=>Se,set:t=>(Se=t,!0)});let Ee="";const ke=b({get:()=>Ee,set:t=>(Ee=t,!0)});let we="default";const m=b({get:()=>we,set:t=>(we=t,!0)});let v=null,D=-1;function ze(){return v||(v=document.createElement("div"),v.classList.add("better-styles","toast"),v.addEventListener("click",t=>{z()}),gradioApp().appendChild(v),v)}function T(t,e="info",n=3e3){z();const s=ze();s.classList.remove("toast-info","toast-success","toast-warning","toast-error"),s.classList.add(`toast-${e}`),s.textContent=t,D=setTimeout(()=>{s.classList.remove("fade-out"),s.classList.add("show"),D=setTimeout(()=>{s.classList.remove("show"),s.classList.add("fade-out"),D=setTimeout(()=>{z()},300)},n)},50)}function z(){D>=0&&clearTimeout(D),v&&(gradioApp().removeChild(v),v=null)}let p=null;function Ve(){return p?(P(p,ee(".gradio-container.dark"),"dark"),p):(p=document.createElement("div"),p.id="better-styles-modal",p.classList.add("better-styles","gradio-container","modal","fixed","w-full","h-full","inset-0","bg-black/50","flex","items-center","justify-center","!hidden"),p.addEventListener("mousedown",t=>{t.target===p&&(t.preventDefault(),x(p,!0))}),gradioApp().appendChild(p),P(p,ee(".gradio-container.dark"),"dark"),p)}function V(t){const e=Ve();H(e),e.appendChild(t),x(e,!1)}function A(t){p!=null&&p.removeChild(t)&&x(p,!p.hasChildNodes())}function qe(){const t=$();if(t==="other")return;const e=Je(t),n=document.createElement("div");n.classList.add("gr-compact","gr-block","gr-box","!m-auto","flex","flex-col","py-6","px-4","gap-y-6","select-none"),n.style.width="clamp(20rem, 70vw, 42.5rem)",n.style.boxShadow="0px 0px 4px 0.25rem rgb(8 8 8 / 50%)";const s=_e(r("Style name"),"");n.appendChild(s.element);const i=_e(r("Group"),r(m.getOrDefault("default")));n.appendChild(i.element);const a=$e(r("Prompt"),e.prompt||"");n.appendChild(a.element);const c=$e(r("Negative prompt"),e.negativePrompt||"");n.appendChild(c.element);const l=document.createElement("div");l.classList.add("flex","flex-wrap","gap-2","pt-4","relative"),n.appendChild(l);const o=document.createElement("span");o.classList.add("text-gray-500","text-[0.855rem]","mb-2","block","dark:text-gray-200","!border-0"),o.textContent=r("Save these parameters as style"),l.appendChild(o);const g=h(r("Sampling method"));l.appendChild(g.element);const f=h(r("Sampling steps"));l.appendChild(f.element);const y=h(r("CFG Scale"));l.appendChild(y.element);const C=h(r("Seed"));l.appendChild(C.element);const E=h(r("Restore faces"));l.appendChild(E.element);const O=h(r("Tiling"));l.appendChild(O.element);const Be=h(r("Hires. fix"));l.appendChild(Be.element);const W=h(r("Upscaler"));l.appendChild(W.element);const X=h(r("Hires steps"));l.appendChild(X.element);const Y=h(r("Denoising strength"));l.appendChild(Y.element);const K=h(r("Upscale by"));l.appendChild(K.element),e.hiresFix||(W.element.classList.add("!hidden"),X.element.classList.add("!hidden"),Y.element.classList.add("!hidden"),K.element.classList.add("!hidden"));const Q=h(r("Clip skip"));l.appendChild(Q.element);const Z=h(r("Eta noise seed delta"));l.appendChild(Z.element),e.clipSkip==null&&Q.element.classList.add("!hidden"),e.etaNoiseSeedDelta==null&&Z.element.classList.add("!hidden");const Fe=De(r("Make this style exclusive to the current checkpoint"));n.appendChild(Fe.element);const M=De(r("Use the current image as a thumbnail"));e.image||(M.element.classList.remove("text-gray-700","cursor-pointer"),M.element.classList.add("text-gray-400"),M.input.disabled=!0),n.appendChild(M.element);const I=document.createElement("div");I.classList.add("flex","gap-x-2"),n.appendChild(I);const nt=()=>{const d={};return Fe.input.checked&&(d.checkpoint=e.checkpoint),M.input.checked&&(d.image=e.image),a.textarea.value&&(d.prompt=a.textarea.value),c.textarea.value&&(d.negativePrompt=c.textarea.value),g.input.checked&&(d.samplingMethod=e.samplingMethod),f.input.checked&&(d.samplingSteps=e.samplingSteps),y.input.checked&&(d.cfgScale=e.cfgScale),C.input.checked&&(d.seed=e.seed),E.input.checked&&(d.restoreFaces=e.restoreFaces),O.input.checked&&(d.tiling=e.tiling),Be.input.checked&&(d.hiresFix=e.hiresFix),W.input.checked&&(d.upscaler=e.upscaler),X.input.checked&&(d.hiresSteps=e.hiresSteps),Y.input.checked&&(d.denoisingStrength=e.denoisingStrength),K.input.checked&&(d.upscaleBy=e.upscaleBy),Q.input.checked&&(d.clipSkip=e.clipSkip),Z.input.checked&&(d.etaNoiseSeedDelta=e.etaNoiseSeedDelta),d},S=document.createElement("button");S.classList.add("gr-button","gr-button-lg","grow"),S.textContent=r("Save with this content"),S.addEventListener("click",d=>{ye({group:(j=>j===r("default")?"default":j)(i.input.value),style:{name:s.input.value,...nt()}},j=>{A(n),w.set(j),q(),T(r("Style registered"),"success")})}),I.appendChild(S);const G=document.createElement("button");G.classList.add("gr-button","gr-button-lg"),G.textContent=r("Close without saving"),G.addEventListener("click",d=>{A(n)}),I.appendChild(G);const N=()=>{const d=!s.input.value||!i.input.value;S.disabled=d,d?(S.classList.remove("gr-button","gr-button-primary"),S.classList.add("gr-box","gr-check-radio")):(S.classList.remove("gr-box","gr-check-radio"),S.classList.add("gr-button","gr-button-primary"))};N(),s.input.addEventListener("input",d=>{N()}),i.input.addEventListener("input",d=>{N()}),V(n)}const _e=(t,e)=>{const n=document.createElement("label");n.classList.add("inline-flex","flex-col","relative");const s=document.createElement("span");s.classList.add("text-gray-500","text-[0.855rem]","mb-2","block","dark:text-gray-200"),s.textContent=t;const i=document.createElement("input");return i.classList.add("gr-box","gr-input","gr-text-input"),i.value=e,n.appendChild(s),n.appendChild(i),{element:n,input:i}},$e=(t,e)=>{const n=document.createElement("label");n.classList.add("inline-flex","flex-col","relative");const s=document.createElement("span");s.classList.add("text-gray-500","text-[0.855rem]","mb-2","block","dark:text-gray-200"),s.textContent=t;const i=document.createElement("textarea");return i.classList.add("gr-box","gr-input","gr-text-input","scroll-hide","!overflow-y-scroll","resize-none"),i.rows=3,i.value=e,n.appendChild(s),n.appendChild(i),{element:n,textarea:i}},h=t=>{const e=document.createElement("label");e.classList.add("gr-input-label","flex","items-center","text-gray-700","text-sm","space-x-2","border","py-1.5","px-3","rounded-lg","cursor-pointer","bg-white","shadow-sm","checked:shadow-inner");const n=document.createElement("input");n.type="checkbox",n.classList.add("gr-check-radio","gr-checkbox"),n.addEventListener("change",i=>{e.dataset.checked=String(n.checked)});const s=document.createElement("span");return s.classList.add("ml-2"),s.textContent=t,e.appendChild(n),n.after(s),{element:e,input:n}},De=t=>{const e=document.createElement("label");e.classList.add("flex","items-center","text-gray-700","text-sm","space-x-2","rounded-lg","cursor-pointer","dark:bg-transparent");const n=document.createElement("input");n.type="checkbox",n.classList.add("gr-check-radio","gr-checkbox"),n.addEventListener("change",i=>{e.dataset.checked=String(n.checked)});const s=document.createElement("span");return s.classList.add("ml-2"),s.textContent=t,e.appendChild(n),n.after(s),{element:e,input:n}};function Je(t){const e={};return te(t).with(n=>e.image=n),U().with(n=>e.checkpoint=n),ne(t).with(n=>e.prompt=n),se(t).with(n=>e.negativePrompt=n),re(t).value.with(n=>e.samplingMethod=n),ie(t).with(n=>e.samplingSteps=n),le(t).with(n=>e.cfgScale=n),ae(t).with(n=>e.seed=n),ce(t).with(n=>e.restoreFaces=n),oe(t).with(n=>e.tiling=n),de(t).with(n=>e.hiresFix=n),ue(t).value.with(n=>e.upscaler=n),pe(t).with(n=>e.hiresSteps=n),ge(t).with(n=>e.denoisingStrength=n),me(t).with(n=>e.upscaleBy=n),he().with(n=>e.clipSkip=n),fe().with(n=>e.etaNoiseSeedDelta=n),e}function We(t){const e=document.createElement("div");e.classList.add("gr-compact","gr-block","gr-box","!m-auto","flex","flex-col","py-6","px-4","gap-y-6"),e.style.width="clamp(20rem, 70vw, 42.5rem)",e.style.boxShadow="0px 0px 4px 0.25rem rgb(8 8 8 / 50%)";const n=document.createElement("p");n.classList.add("text-xl"),n.textContent=r("Delete all selected styles. This action cannot be undone. Are you sure?"),e.appendChild(n);const s=document.createElement("div");s.classList.add("flex","justify-end","gap-x-2"),e.appendChild(s);const i=document.createElement("button");i.classList.add("gr-button","gr-button-lg","gr-button-primary"),i.textContent=r("Execute the deletion"),i.addEventListener("click",c=>{const l=_(`#better-styles-${t}-style-container .selected`);Re({group:m.getOrDefault(""),styles:[...l.map(o=>o.dataset.style||"").filter(o=>o.length>0)]},o=>{A(e),w.set(o),q(),T(r("Styles deleted"),"success")})}),s.appendChild(i);const a=document.createElement("button");a.classList.add("gr-button","gr-button-lg"),a.textContent=r("Close without deleting"),a.addEventListener("click",c=>{A(e)}),s.appendChild(a),V(e)}const Xe=t=>{var a,c,l,o,g,f,y,C;const e=document.createElement("div");e.classList.add("gr-compact","gr-block","gr-box","!m-auto","flex","flex-col","py-6","px-4","gap-y-6"),e.style.width="clamp(20rem, 70vw, 42.5rem)",e.style.boxShadow="0px 0px 4px 0.25rem rgb(8 8 8 / 50%)",e.classList.add("relative");const n=document.createElement("div");n.classList.add("grid","grid-cols-[max-content_1fr]","gap-2"),e.appendChild(n),[{label:r("Style name"),value:r(t.name)},{label:r("Exclusive"),value:t.checkpoint?r("Yes"):r("No")},{label:r("Prompt"),value:t.prompt},{label:r("Negative prompt"),value:t.negativePrompt},{label:r("Sampling method"),value:t.samplingMethod},{label:r("Sampling steps"),value:(a=t.samplingSteps)==null?void 0:a.toString()},{label:r("CFG Scale"),value:(c=t.cfgScale)==null?void 0:c.toString()},{label:r("Seed"),value:(l=t.seed)==null?void 0:l.toString()},{label:r("Restore faces"),value:t.restoreFaces?r("Enabled"):void 0},{label:r("Tiling"),value:t.tiling?r("Enabled"):void 0},{label:r("Hires. fix"),value:t.hiresFix?r("Enabled"):void 0},{label:r("Upscaler"),value:t.upscaler},{label:r("Hires steps"),value:(o=t.hiresSteps)==null?void 0:o.toString()},{label:r("Denoising strength"),value:(g=t.denoisingStrength)==null?void 0:g.toString()},{label:r("Upscale by"),value:(f=t.upscaleBy)==null?void 0:f.toString()},{label:r("Clip skip"),value:(y=t.clipSkip)==null?void 0:y.toString()},{label:r("Eta noise seed delta"),value:(C=t.etaNoiseSeedDelta)==null?void 0:C.toString()}].forEach(({label:E,value:O})=>{O!=null&&n.appendChild(Ye(E,O))});const i=document.createElement("button");i.classList.add("gr-box","gr-button","gr-button-lg"),i.textContent=r("Close style detail"),i.addEventListener("click",()=>{A(e)}),e.appendChild(i),V(e)},Ye=(t,e)=>{const n=document.createElement("div");n.classList.add("contents");const s=document.createElement("span");s.textContent=t,s.classList.add("text-right","pt-3"),s.style.overflowWrap="anywhere",n.appendChild(s);const i=document.createElement("p");return i.textContent=e,i.classList.add("gr-box","gr-padded","border-gray-200"),i.style.overflowWrap="anywhere",n.appendChild(i),n};function q(){const t=$();t!=="other"&&(ke.set(`?ts=${new Date().getTime()}`),F(t))}function Ke(t){var l,o,g;if(u(`#better-styles-${t}-styles`))return;const e=document.createElement("div");e.id=`better-styles-${t}-styles`,e.classList.add("better-styles","flex","flex-col","w-full","gap-4","gr-compact","!hidden"),(l=u(`div#${t}_extra_networks`))==null||l.after(e);const n=Qe(t);e.appendChild(n);const s=document.createElement("div");e.appendChild(s);const i=document.createElement("div");i.id=`better-styles-${t}-group-container`,i.classList.add("!border-x-2","border-gray-200","flex","px-2","pb-0","pt-4"),s.appendChild(i),i.appendChild(J("default")),Te(t);const a=document.createElement("div");a.id=`better-styles-${t}-style-container`,a.classList.add("tabitem","p-2","!border-x-2","!border-b-2","border-gray-200","relative","flex","flex-wrap","gap-x-2","block"),i.after(a),a.appendChild(Ae()),(o=u("#setting_sd_model_checkpoint select"))==null||o.addEventListener("change",()=>{const f=U().get(),y=setInterval(()=>{U().get()!==f&&(F(t),clearInterval(y))},250)});const c=document.createElement("button");c.id=`better-styles-${t}-toggle`,c.textContent="🏷",c.classList.add("gr-button","gr-button-lg","gr-button-tool"),c.title=r("Show Better Styles"),c.addEventListener("click",()=>{x(e)}),(g=u(`#${t}_tools`))==null||g.appendChild(c)}function Qe(t){const e=document.createElement("div");e.classList.add("flex","!border-b-2","flex-wrap","dark:border-gray-700");const n=document.createElement("p");n.classList.add("bg-white","px-4","pb-2","pt-1.5","rounded-t-lg","border-gray-200","-mb-[2px]","border-2","border-b-0","flex","items-center"),n.textContent=r("Better Styles"),e.appendChild(n);const s=document.createElement("textarea");s.classList.add("scroll-hide","inline-block","gr-box","gr-input","w-full","gr-text-input","search","overflow-y-scroll","max-w-[16rem]","m-[0.3rem]","self-center","resize-none"),s.placeholder=r("Search styles..."),s.rows=1,s.addEventListener("input",()=>{_(`#better-styles-${t}-style-container [data-style]`).forEach(o=>{const g=o.dataset.style||"";x(o,!g.includes(s.value))})}),n.after(s);const i=document.createElement("button");i.id=`better-styles-${t}-apply`,i.classList.add("gr-button","gr-button-lg","gr-button-secondary","m-[0.3rem]"),i.textContent=r("Apply style"),i.addEventListener("click",o=>{const g=[..._(`#better-styles-${t}-style-container .selected`)];if(g.length<=0){T(r("Style is not selected"),"warning");return}g.filter(f=>{const y=f.dataset.style;return w.getOrDefault([]).filter(C=>C.name===m.get()).some(C=>C.styles.filter(E=>E.name===y).some(E=>(Ue(t,E),!0)))}).forEach(f=>f.click())}),s.after(i);const a=document.createElement("button");a.id=`better-styles-${t}-save`,a.classList.add("gr-button","gr-button-lg","gr-button-secondary","m-[0.3rem]"),a.textContent=r("Save style"),a.addEventListener("click",o=>{qe()}),i.after(a);const c=document.createElement("button");c.id=`better-styles-${t}-delete`,c.classList.add("gr-button","gr-button-lg","gr-button-secondary","m-[0.3rem]"),c.textContent=r("Delete style"),c.addEventListener("click",o=>{if([..._(`#better-styles-${t}-style-container .selected`)].length<=0){T(r("Style is not selected"),"warning");return}We(t)}),a.after(c);const l=document.createElement("button");return l.id=`better-styles-${t}-close`,l.classList.add("gr-button","gr-button-lg","gr-button-secondary","m-[0.3rem]"),l.textContent=r("Close Better Styles"),l.addEventListener("click",()=>{x(u(`#better-styles-${t}-styles`),!0)}),c.after(l),e}function J(t){const e=document.createElement("button");return e.textContent=r(t),e.classList.add("gr-box-sm","gr-button-lg","m-[0.3rem]"),e.dataset.group=t,t===m.get()&&(e.disabled=!0),e.addEventListener("click",n=>{m.set(t);const s=$();s!=="other"&&F(s)}),e}function Te(t){_(`#better-styles-${t}-group-container > button`).forEach(e=>{const n=e.dataset.group===m.get();P(e,n,"gr-button-primary"),P(e,!n,"gr-button-secondary"),e instanceof HTMLInputElement&&(e.disabled=n)})}function Ae(){const t=document.createElement("div");t.classList.add("m-2","mt-5");const e=document.createElement("p");return e.classList.add("text-2xl","dark:text-white"),e.textContent=r('Style not yet registered. "Save style" button for register a new style.'),t.appendChild(e),t}function F(t){var a;const e=u(`#better-styles-${t}-group-container`),n=u(`#better-styles-${t}-style-container`);if(!e||!n)return;H(e),H(n);const s=((a=u("#sd_checkpoint_hash"))==null?void 0:a.title)||"",i=Ze(s);i.some(({styles:c})=>c.length>0)?i.sort((c,l)=>c.name.localeCompare(l.name)).forEach(c=>{m.get()===""&&m.set(c.name),e.appendChild(J(c.name)),c.name===m.get()&&c.styles.sort((l,o)=>l.name.localeCompare(o.name)).forEach(l=>{n.appendChild(Ne(l))})}):(m.set("default"),e.appendChild(J("default")),n.appendChild(Ae())),Te(t)}function Ze(t){const e=[];let n=!1;return w.getOrDefault([]).forEach(s=>{const i=s.styles.filter(a=>!a.checkpoint||t===a.checkpoint);i.length>0?e.push({name:s.name,styles:i}):s.name===m.get()&&(n=!0)}),n&&m.set(""),e}function Ne(t){const e=document.createElement("div");e.dataset.style=t.name,e.classList.add("inline-block","m-2","w-64","h-64","rounded","!overflow-hidden","cursor-pointer","relative","select-none"),e.addEventListener("contextmenu",l=>{l.preventDefault(),Xe(t)});const n=l=>{l?e.style.boxShadow="0 0 2px 0.3em rgb(0 128 255 / 35%)":e.style.boxShadow=""};e.addEventListener("mouseenter",l=>{n(!e.classList.contains("selected"))}),e.addEventListener("mouseleave",l=>{n(!1)});const s=document.createElement("img");t.image?s.src=`file=${Le.get()}/${t.image}${ke.get()}`:s.src="file=html/card-no-preview.png",s.classList.add("absolute","object-cover","w-full","h-full","transition-transform","ease-out","duration-500","hover:scale-105"),s.setAttribute("draggable","false"),e.appendChild(s);const i=document.createElement("div");i.classList.add("absolute","bottom-0","inset-x-0","p-2","flex","flex-col","text-white","bg-black/50"),i.style.boxShadow="0 0 0.25em 0.25em rgb(0 0 0 / 50%)",i.style.textShadow="0 0 0.2em black",e.appendChild(i);const a=document.createElement("a");a.classList.add("mt-1","mb-3","ml-1","!hidden","hover:text-red","text-sm"),a.href="#",a.text=r("replace thumbnail"),a.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const o=$();if(o==="other")throw new Error("Calls from non-valid tabs");const g=te(o);if(g.get()==null){T(r("Image is not selected"),"warning");return}ye({group:m.getOrDefault("default"),style:{...t,image:g.getOrDefault("")}},f=>{w.set(f),q()})}),i.appendChild(a);const c=document.createElement("span");return c.classList.add("text-xl","truncate"),c.textContent=t.name,c.title=t.name,i.appendChild(c),c.addEventListener("mouseenter",l=>{a.classList.remove("!hidden")}),i.addEventListener("mouseleave",l=>{a.classList.add("!hidden")}),e.addEventListener("click",l=>{Ie(e,"selected","outline","outline-2","outline-offset-2","outline-[#ff7c00]"),n(!e.classList.contains("selected"))}),e}let Oe=null,Me=null,Pe=null;onUiLoaded(()=>{const t=new Date().getTime();Oe=fetch(`/better-style-api/v1/get-localization?ts=${t}`).then(e=>e.json()).then(e=>(Object.assign(localization,e),Promise.resolve())),Pe=fetch(`/better-style-api/v1/images-dir?ts=${t}`).then(e=>e.json()).then(e=>(Le.set(e.imagesDir),Promise.resolve())),Me=fetch(`/better-style-api/v1/all-style?ts=${t}`).then(e=>e.json()).then(e=>(w.set(e),Promise.resolve()))}),onUiTabChange(()=>{const t=$();t!=="other"&&et(t)});function et(t){tt(t),Promise.all([Oe]).then(()=>{Ke(t)}),Promise.all([Pe,Me]).then(()=>{F(t)})}function tt(t){Ge("better_styles_hide_original_styles",e=>{e&&(x(u(`#${t}_style_apply`),!0),x(u(`#${t}_style_create`),!0),x(u(`#${t}_styles_row`),!0))})}})();
