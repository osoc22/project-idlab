import{S as R,i as U,s as V,e as r,t as y,k as D,c as d,a as _,h as E,d as i,m as I,b as f,g as W,M as t,O as N,E as S,G as $}from"../chunks/index-c44973d7.js";function q(h){let e,n,v,m,s,l,g,p,a,b,k,T;return{c(){e=r("div"),n=r("h1"),v=y("Welcome to your calendar pod"),m=D(),s=r("div"),l=r("button"),g=y("Sign in"),p=D(),a=r("button"),b=y("Register"),this.h()},l(c){e=d(c,"DIV",{class:!0});var o=_(e);n=d(o,"H1",{});var x=_(n);v=E(x,"Welcome to your calendar pod"),x.forEach(i),m=I(o),s=d(o,"DIV",{class:!0});var u=_(s);l=d(u,"BUTTON",{class:!0});var O=_(l);g=E(O,"Sign in"),O.forEach(i),p=I(u),a=d(u,"BUTTON",{class:!0});var B=_(a);b=E(B,"Register"),B.forEach(i),u.forEach(i),o.forEach(i),this.h()},h(){f(l,"class","signin svelte-1lm0fed"),f(a,"class","register svelte-1lm0fed"),f(s,"class","actions svelte-1lm0fed"),f(e,"class","login svelte-1lm0fed")},m(c,o){W(c,e,o),t(e,n),t(n,v),t(e,m),t(e,s),t(s,l),t(l,g),t(s,p),t(s,a),t(a,b),k||(T=[N(l,"click",h[0]),N(a,"click",h[1])],k=!0)},p:S,i:S,o:S,d(c){c&&i(e),k=!1,$(T)}}}function C(h){return[()=>console.log("sign in"),()=>console.log("register")]}class H extends R{constructor(e){super(),U(this,e,C,q,V,{})}}export{H as default};