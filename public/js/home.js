function updateLanguageInButton(e){document.getElementById("start-record").innerText=`START RECORDING IN ${e.toUpperCase()}`}$(document).ready(function(){const e=$("#proceed-box"),t=e.parent(),n=document.querySelectorAll('input[name = "gender"]'),a=document.getElementById("age"),o=document.getElementById("mother-tongue"),r=$("#username"),d=r.next(),s=$("#tnc"),l=/^[6-9]\d{9}$/,i=/^\S+@\S+[\.][0-9a-z]+$/,c=$("#speaker-data"),u=c.find("#loader1,#loader2"),g=c.find("#speakers-wrapper"),m=c.find("#speaker-value"),p=c.find("#hours-wrapper"),h=c.find("#hour-value");let v="Odia";const f=e=>l.test(e)||i.test(e),y=()=>{r.val().length>11?(r.tooltip("enable"),r.tooltip("show")):(r.tooltip("disable"),r.tooltip("hide"))},k=()=>{const e=r.val().trim();f(e)?(r.addClass("is-invalid"),d.removeClass("d-none")):(r.removeClass("is-invalid"),d.addClass("d-none")),s.trigger("change"),y()};r.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto",trigger:"focus"}),y(),s.prop("checked",!1),t.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto"});(()=>{const e=localStorage.getItem("speakerDetails");if(e){const t=JSON.parse(e),n=document.querySelector('input[name = "gender"][value="'+t.gender+'"]');n&&(n.checked=!0,n.previous=!0),a.value=t.age,o.value=t.motherTongue,r.val(t.userName?t.userName.trim().substring(0,12):""),k()}})(),n.forEach(e=>{e.addEventListener("click",e=>{e.target.previous&&(e.target.checked=!1),e.target.previous=e.target.checked})});const E=e=>{f(e)?t.attr("data-original-title","Please validate any error message before proceeding"):t.attr("data-original-title","Please agree to the Terms and Conditions before proceeding")};let I;document.getElementById("languageTop").addEventListener("change",e=>{I=e.target.value,$("#start_recording").removeAttr("disabled")}),document.getElementById("start_recording").addEventListener("click",()=>{v=I});let C="Odia";document.getElementById("language").addEventListener("change",e=>{C=e.target.value,b(C),updateGraph(C)}),document.getElementById("start-record").addEventListener("click",()=>{v=C}),E(r.val().trim()),s.change(function(){const n=r.val().trim();this.checked&&!f(n)?(e.removeAttr("disabled").removeClass("point-none"),t.tooltip("disable")):(E(n),e.prop("disabled","true").addClass("point-none"),t.tooltip("enable"))}),r.on("input focus",k),e.on("click",e=>{if(s.prop("checked")){const e=Array.from(n).filter(e=>e.checked),t=e.length?e[0].value:"",d=r.val().trim().substring(0,12);if(f(d))return;const s={gender:t,age:a.value,motherTongue:o.value,userName:d,language:v};localStorage.setItem("speakerDetails",JSON.stringify(s)),location.href="/record"}});const b=e=>{u.removeClass("d-none"),p.addClass("d-none"),g.addClass("d-none"),updateLanguageInButton(e),fetch(`/getDetails/${e}`).then(e=>{if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(e=>{try{u.addClass("d-none");const t=6*e.find(e=>1===e.index).count,n=Math.floor(t/3600),a=t%3600,o=Math.floor(a/60),r=a%60;h.text(`${n}h ${o}m ${r}s`),m.text(e.find(e=>0===e.index).count),u.addClass("d-none"),p.removeClass("d-none"),g.removeClass("d-none"),localStorage.setItem("speakersData",JSON.stringify(e))}catch(e){console.log(e)}}).catch(e=>{console.log(e)})};b("Odia")}),$("#userModal").on("shown.bs.modal",function(){document.getElementById("resetBtn").addEventListener("click",()=>{const e=document.querySelector('input[name = "gender"]:checked');e&&(e.checked=!1),document.getElementById("age").selectedIndex=0,document.getElementById("mother-tongue").selectedIndex=0,document.getElementById("username").value=""})});