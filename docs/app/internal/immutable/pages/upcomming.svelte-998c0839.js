import{S as L,i as F,s as j,e as T,w as P,c as E,a as y,x as O,d as h,g as D,y as B,q as k,o as q,B as N,t as I,h as W,j as C,k as A,m as M,b as m,J as d,n as U,p as G,L as be,E as V,a2 as H,a3 as Y,l as X,M as te,N as le,O as re,P as ne,v as ie,I as x,R as $e,K as Te,Y as ye,_ as Ee}from"../chunks/index-6d6fbed6.js";import{t as ee,e as De,T as ze,P as ae,b as fe}from"../chunks/eventStore-24e1c1fe.js";import{B as ke,I as Qe,P as Ie}from"../chunks/Button-98a8f97b.js";import"../chunks/preload-helper-ed63bd61.js";import"../chunks/userStore-ad134bbc.js";import"../chunks/index-b2bed869.js";function We(n){let e,r,t;return{c(){e=I(n[4]),r=I("-"),t=I(n[3])},l(l){e=W(l,n[4]),r=W(l,"-"),t=W(l,n[3])},m(l,i){D(l,e,i),D(l,r,i),D(l,t,i)},p(l,i){i&16&&C(e,l[4]),i&8&&C(t,l[3])},d(l){l&&h(e),l&&h(r),l&&h(t)}}}function Se(n){let e;return{c(){e=I("All day")},l(r){e=W(r,"All day")},m(r,t){D(r,e,t)},p:V,d(r){r&&h(e)}}}function ce(n){let e,r=n[0].location+"",t;return{c(){e=I("- "),t=I(r)},l(l){e=W(l,"- "),t=W(l,r)},m(l,i){D(l,e,i),D(l,t,i)},p(l,i){i&1&&r!==(r=l[0].location+"")&&C(t,r)},d(l){l&&h(e),l&&h(t)}}}function Ve(n){let e,r,t=n[2].join(", ")+"",l,i;return{c(){e=T("span"),r=I("You are beining notified when the weather is "),l=I(t),i=I("."),this.h()},l(s){e=E(s,"SPAN",{class:!0});var a=y(e);r=W(a,"You are beining notified when the weather is "),l=W(a,t),i=W(a,"."),a.forEach(h),this.h()},h(){m(e,"class","font-light text-xs mt-3")},m(s,a){D(s,e,a),d(e,r),d(e,l),d(e,i)},p(s,a){a&4&&t!==(t=s[2].join(", ")+"")&&C(l,t)},i:V,o:V,d(s){s&&h(e)}}}function Ze(n){let e,r,t,l,i,s,a,o;return a=new ke({props:{$$slots:{default:[Ae]},$$scope:{ctx:n}}}),{c(){e=T("div"),r=T("p"),t=I("Weather is "),l=I(n[1]),i=I("."),s=A(),P(a.$$.fragment),this.h()},l(f){e=E(f,"DIV",{class:!0});var u=y(e);r=E(u,"P",{class:!0});var c=y(r);t=W(c,"Weather is "),l=W(c,n[1]),i=W(c,"."),c.forEach(h),s=M(u),O(a.$$.fragment,u),u.forEach(h),this.h()},h(){m(r,"class","text-sm font-light"),m(e,"class","mt-2 relative")},m(f,u){D(f,e,u),d(e,r),d(r,t),d(r,l),d(r,i),d(e,s),B(a,e,null),o=!0},p(f,u){(!o||u&2)&&C(l,f[1]);const c={};u&64&&(c.$$scope={dirty:u,ctx:f}),a.$set(c)},i(f){o||(k(a.$$.fragment,f),o=!0)},o(f){q(a.$$.fragment,f),o=!1},d(f){f&&h(e),N(a)}}}function Ae(n){let e,r,t,l,i,s,a;return{c(){e=T("span"),r=I("Would you like to reschedule?"),t=A(),l=T("div"),i=T("div"),s=A(),a=T("div"),this.h()},l(o){e=E(o,"SPAN",{class:!0});var f=y(e);r=W(f,"Would you like to reschedule?"),f.forEach(h),t=M(o),l=E(o,"DIV",{class:!0});var u=y(l);i=E(u,"DIV",{class:!0}),y(i).forEach(h),s=M(u),a=E(u,"DIV",{class:!0}),y(a).forEach(h),u.forEach(h),this.h()},h(){m(e,"class","text-sm"),m(i,"class","bg-blue-500 h-full rounded-full"),m(a,"class","animate-ping absolute top-0 w-full bg-blue-500 h-full rounded-full opacity-75"),m(l,"class","w-3 h-3 absolute -top-3 -right-5")},m(o,f){D(o,e,f),d(e,r),D(o,t,f),D(o,l,f),d(l,i),d(l,s),d(l,a)},p:V,d(o){o&&h(e),o&&h(t),o&&h(l)}}}function Me(n){let e,r,t,l,i,s=n[0].title+"",a,o,f,u,c,_;function p(v,Q){return v[0].isAllDay?Se:We}let b=p(n),z=b(n),g=n[0].location&&ce(n);const S=[Ze,Ve],w=[];function $(v,Q){return Q&6&&(f=null),f==null&&(f=!!(v[1]&&v[2].map(Oe).includes(v[1]))),f?0:1}return u=$(n,-1),c=w[u]=S[u](n),{c(){e=T("div"),r=T("span"),z.c(),t=A(),g&&g.c(),l=A(),i=T("span"),a=I(s),o=A(),c.c(),this.h()},l(v){e=E(v,"DIV",{class:!0});var Q=y(e);r=E(Q,"SPAN",{class:!0});var Z=y(r);z.l(Z),t=M(Z),g&&g.l(Z),Z.forEach(h),l=M(Q),i=E(Q,"SPAN",{class:!0});var R=y(i);a=W(R,s),R.forEach(h),o=M(Q),c.l(Q),Q.forEach(h),this.h()},h(){m(r,"class","text-xs font-light"),m(i,"class","font-medium mt-1"),m(e,"class","flex flex-col items-start mb-2 text-left")},m(v,Q){D(v,e,Q),d(e,r),z.m(r,null),d(r,t),g&&g.m(r,null),d(e,l),d(e,i),d(i,a),d(e,o),w[u].m(e,null),_=!0},p(v,Q){b===(b=p(v))&&z?z.p(v,Q):(z.d(1),z=b(v),z&&(z.c(),z.m(r,t))),v[0].location?g?g.p(v,Q):(g=ce(v),g.c(),g.m(r,null)):g&&(g.d(1),g=null),(!_||Q&1)&&s!==(s=v[0].title+"")&&C(a,s);let Z=u;u=$(v,Q),u===Z?w[u].p(v,Q):(U(),q(w[Z],1,1,()=>{w[Z]=null}),G(),c=w[u],c?c.p(v,Q):(c=w[u]=S[u](v),c.c()),k(c,1),c.m(e,null))},i(v){_||(k(c),_=!0)},o(v){q(c),_=!1},d(v){v&&h(e),z.d(),g&&g.d(),w[u].d()}}}function Pe(n){let e,r,t;return r=new ke({props:{focused:!0,$$slots:{default:[Me]},$$scope:{ctx:n}}}),r.$on("click",n[5]),{c(){e=T("div"),P(r.$$.fragment)},l(l){e=E(l,"DIV",{});var i=y(e);O(r.$$.fragment,i),i.forEach(h)},m(l,i){D(l,e,i),B(r,e,null),t=!0},p(l,[i]){const s={};i&95&&(s.$$scope={dirty:i,ctx:l}),r.$set(s)},i(l){t||(k(r.$$.fragment,l),t=!0)},o(l){q(r.$$.fragment,l),t=!1},d(l){l&&h(e),N(r)}}}const Oe=n=>n.toLowerCase();function Be(n,e,r){let t,l,i,{activity:s}=e,{weatherType:a}=e;function o(f){be.call(this,n,f)}return n.$$set=f=>{"activity"in f&&r(0,s=f.activity),"weatherType"in f&&r(1,a=f.weatherType)},n.$$.update=()=>{var f,u;n.$$.dirty&1&&r(4,t=(f=s.time)==null?void 0:f.from.toString({smallestUnit:"minute"})),n.$$.dirty&1&&r(3,l=(u=s.time)==null?void 0:u.to.toString({smallestUnit:"minute"})),n.$$.dirty&1&&r(2,i=Array.from(s.notifyOnWeather))},[s,a,i,l,t,o]}class Ne extends L{constructor(e){super(),F(this,e,Be,Pe,j,{activity:0,weatherType:1})}}function Ce(n){let e,r;return{c(){e=H("svg"),r=H("path"),this.h()},l(t){e=Y(t,"svg",{xmlns:!0,viewBox:!0,fill:!0,height:!0,width:!0});var l=y(e);r=Y(l,"path",{d:!0}),y(r).forEach(h),l.forEach(h),this.h()},h(){m(r,"d","M12.55 40q-4.4 0-7.475-3.075Q2 33.85 2 29.45q0-3.9 2.5-6.85 2.5-2.95 6.35-3.55 1-4.85 4.7-7.925T24.1 8.05q5.6 0 9.45 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40Zm0-3h25q2.25 0 3.85-1.6t1.6-3.85q0-2.25-1.6-3.85t-3.85-1.6H34.4v-4.2q0-4.55-3.05-7.7-3.05-3.15-7.45-3.15t-7.475 3.15q-3.075 3.15-3.075 7.7h-.95q-3.1 0-5.25 2.175T5 29.45q0 3.15 2.2 5.35Q9.4 37 12.55 37ZM24 24Z"),m(e,"xmlns","http://www.w3.org/2000/svg"),m(e,"viewBox","0 0 48 48"),m(e,"fill",n[0]),m(e,"height",n[1]),m(e,"width",n[1])},m(t,l){D(t,e,l),d(e,r)},p(t,[l]){l&1&&m(e,"fill",t[0]),l&2&&m(e,"height",t[1]),l&2&&m(e,"width",t[1])},i:V,o:V,d(t){t&&h(e)}}}function Le(n,e,r){let{color:t="white"}=e,{size:l=16}=e;return n.$$set=i=>{"color"in i&&r(0,t=i.color),"size"in i&&r(1,l=i.size)},[t,l]}class Fe extends L{constructor(e){super(),F(this,e,Le,Ce,j,{color:0,size:1})}}function je(n){let e,r;return{c(){e=H("svg"),r=H("path"),this.h()},l(t){e=Y(t,"svg",{xmlns:!0,viewBox:!0,fill:!0,height:!0,width:!0});var l=y(e);r=Y(l,"path",{d:!0}),y(r).forEach(h),l.forEach(h),this.h()},h(){m(r,"d","M22.5 44v-9.75l-7.45 7.45-2.15-2.1 9.6-9.6v-4.5H18l-9.4 9.4-2.2-2.05 7.35-7.35H4v-3h9.75L6.25 15l2.15-2.15L18 22.5h4.5v-4.55l-9.4-9.4 2.1-2.2 7.3 7.35V4h3v9.7L33 6.2l2.1 2.15-9.6 9.6v4.55h4.55l9.45-9.45 2.15 2.1-7.35 7.35H44v3h-9.7l7.4 7.45-2.05 2.15-9.6-9.6H25.5V30l9.6 9.65-2.05 2.15-7.55-7.55V44Z"),m(e,"xmlns","http://www.w3.org/2000/svg"),m(e,"viewBox","0 0 48 48"),m(e,"fill",n[0]),m(e,"height",n[1]),m(e,"width",n[1])},m(t,l){D(t,e,l),d(e,r)},p(t,[l]){l&1&&m(e,"fill",t[0]),l&2&&m(e,"height",t[1]),l&2&&m(e,"width",t[1])},i:V,o:V,d(t){t&&h(e)}}}function Re(n,e,r){let{color:t="white"}=e,{size:l=16}=e;return n.$$set=i=>{"color"in i&&r(0,t=i.color),"size"in i&&r(1,l=i.size)},[t,l]}class He extends L{constructor(e){super(),F(this,e,Re,je,j,{color:0,size:1})}}function Ye(n){let e,r;return{c(){e=H("svg"),r=H("path"),this.h()},l(t){e=Y(t,"svg",{xmlns:!0,viewBox:!0,fill:!0,height:!0,width:!0});var l=y(e);r=Y(l,"path",{d:!0}),y(r).forEach(h),l.forEach(h),this.h()},h(){m(r,"d","M24 31q2.9 0 4.95-2.05Q31 26.9 31 24q0-2.9-2.05-4.95Q26.9 17 24 17q-2.9 0-4.95 2.05Q17 21.1 17 24q0 2.9 2.05 4.95Q21.1 31 24 31Zm0 3q-4.15 0-7.075-2.925T14 24q0-4.15 2.925-7.075T24 14q4.15 0 7.075 2.925T34 24q0 4.15-2.925 7.075T24 34ZM3.5 25.5q-.65 0-1.075-.425Q2 24.65 2 24q0-.65.425-1.075Q2.85 22.5 3.5 22.5h5q.65 0 1.075.425Q10 23.35 10 24q0 .65-.425 1.075-.425.425-1.075.425Zm36 0q-.65 0-1.075-.425Q38 24.65 38 24q0-.65.425-1.075.425-.425 1.075-.425h5q.65 0 1.075.425Q46 23.35 46 24q0 .65-.425 1.075-.425.425-1.075.425ZM24 10q-.65 0-1.075-.425Q22.5 9.15 22.5 8.5v-5q0-.65.425-1.075Q23.35 2 24 2q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 10 24 10Zm0 36q-.65 0-1.075-.425-.425-.425-.425-1.075v-5q0-.65.425-1.075Q23.35 38 24 38q.65 0 1.075.425.425.425.425 1.075v5q0 .65-.425 1.075Q24.65 46 24 46ZM12 14.1l-2.85-2.8q-.45-.45-.425-1.075.025-.625.425-1.075.45-.45 1.075-.45t1.075.45L14.1 12q.4.45.4 1.05 0 .6-.4 1-.4.45-1.025.45-.625 0-1.075-.4Zm24.7 24.75L33.9 36q-.4-.45-.4-1.075t.45-1.025q.4-.45 1-.45t1.05.45l2.85 2.8q.45.45.425 1.075-.025.625-.425 1.075-.45.45-1.075.45t-1.075-.45ZM33.9 14.1q-.45-.45-.45-1.05 0-.6.45-1.05l2.8-2.85q.45-.45 1.075-.425.625.025 1.075.425.45.45.45 1.075t-.45 1.075L36 14.1q-.4.4-1.025.4-.625 0-1.075-.4ZM9.15 38.85q-.45-.45-.45-1.075t.45-1.075L12 33.9q.45-.45 1.05-.45.6 0 1.05.45.45.45.45 1.05 0 .6-.45 1.05l-2.8 2.85q-.45.45-1.075.425-.625-.025-1.075-.425ZM24 24Z"),m(e,"xmlns","http://www.w3.org/2000/svg"),m(e,"viewBox","0 0 48 48"),m(e,"fill",n[0]),m(e,"height",n[1]),m(e,"width",n[1])},m(t,l){D(t,e,l),d(e,r)},p(t,[l]){l&1&&m(e,"fill",t[0]),l&2&&m(e,"height",t[1]),l&2&&m(e,"width",t[1])},i:V,o:V,d(t){t&&h(e)}}}function Ue(n,e,r){let{color:t="white"}=e,{size:l=16}=e;return n.$$set=i=>{"color"in i&&r(0,t=i.color),"size"in i&&r(1,l=i.size)},[t,l]}class Ge extends L{constructor(e){super(),F(this,e,Ue,Ye,j,{color:0,size:1})}}function Je(n){let e,r;return{c(){e=H("svg"),r=H("path"),this.h()},l(t){e=Y(t,"svg",{xmlns:!0,viewBox:!0,fill:!0,height:!0,width:!0});var l=y(e);r=Y(l,"path",{d:!0}),y(r).forEach(h),l.forEach(h),this.h()},h(){m(r,"d","M24 9.5q-.65 0-1.075-.425Q22.5 8.65 22.5 8V3.5q0-.65.425-1.075Q23.35 2 24 2q.65 0 1.075.425.425.425.425 1.075V8q0 .65-.425 1.075Q24.65 9.5 24 9.5Zm10.25 4.25q-.45-.45-.45-1.075t.45-1.075l3.15-3.15q.5-.5 1.1-.475.6.025 1.05.475.45.45.45 1.05 0 .6-.45 1.05l-3.2 3.2q-.45.45-1.05.45-.6 0-1.05-.45ZM40 25.5q-.65 0-1.075-.425Q38.5 24.65 38.5 24q0-.65.425-1.075Q39.35 22.5 40 22.5h4.5q.65 0 1.075.425Q46 23.35 46 24q0 .65-.425 1.075-.425.425-1.075.425Zm-2.55 14.05L34.3 36.4q-.45-.45-.45-1.075t.45-1.075q.45-.45 1.075-.45t1.075.45l3.15 3.15q.5.5.475 1.1-.025.6-.475 1.05-.45.45-1.05.475-.6.025-1.1-.475Zm-25.8-25.8-3.2-3.2Q8 10.1 8 9.5q0-.6.45-1.05.45-.45 1.025-.475.575-.025 1.075.475l3.2 3.2q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45ZM12 42q-4.25 0-7.125-2.875T2 32q0-4.15 2.95-7.075T12 22H12.15q.7-4.3 4.05-7.15Q19.55 12 24 12q5 0 8.5 3.5T36 24q0 3.75-2.175 6.9-2.175 3.15-5.925 4.45-.25 2.5-2.25 4.575T21 42Zm0-3h9q1.8 0 2.9-1.1Q25 36.8 25 35q0-1.8-1.1-2.925-1.1-1.125-2.85-1.125h-2.2l-.9-2.05q-.75-1.8-2.375-2.85T12 25q-2.85 0-4.925 2.075Q5 29.15 5 32q0 2.95 2.025 4.975Q9.05 39 12 39Zm15.45-6.7q2.55-1 4.05-3.3t1.5-5q0-3.75-2.625-6.375T24 15q-3.25 0-5.825 2.1t-3.025 5.4q1.95.85 3.4 2.25t2.25 3.2q2.05 0 3.875 1.25 1.825 1.25 2.775 3.1Z"),m(e,"xmlns","http://www.w3.org/2000/svg"),m(e,"viewBox","0 0 48 48"),m(e,"fill",n[0]),m(e,"height",n[1]),m(e,"width",n[1])},m(t,l){D(t,e,l),d(e,r)},p(t,[l]){l&1&&m(e,"fill",t[0]),l&2&&m(e,"height",t[1]),l&2&&m(e,"width",t[1])},i:V,o:V,d(t){t&&h(e)}}}function Ke(n,e,r){let{color:t="white"}=e,{size:l=16}=e;return n.$$set=i=>{"color"in i&&r(0,t=i.color),"size"in i&&r(1,l=i.size)},[t,l]}class Xe extends L{constructor(e){super(),F(this,e,Ke,Je,j,{color:0,size:1})}}function xe(n){let e,r;return e=new Xe({props:{color:n[2],size:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&4&&(i.color=t[2]),l&2&&(i.size=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function et(n){let e,r;return e=new Fe({props:{color:n[2],size:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&4&&(i.color=t[2]),l&2&&(i.size=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function tt(n){let e,r;return e=new He({props:{color:n[2],size:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&4&&(i.color=t[2]),l&2&&(i.size=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function lt(n){let e,r;return e=new Ge({props:{color:n[2],size:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&4&&(i.color=t[2]),l&2&&(i.size=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function rt(n){let e,r,t,l;const i=[lt,tt,et,xe],s=[];function a(o,f){return o[0]=="sun"?0:o[0]=="snow"?1:o[0]=="cloudy"?2:o[0]=="partly-cloudy"?3:-1}return~(e=a(n))&&(r=s[e]=i[e](n)),{c(){r&&r.c(),t=X()},l(o){r&&r.l(o),t=X()},m(o,f){~e&&s[e].m(o,f),D(o,t,f),l=!0},p(o,[f]){let u=e;e=a(o),e===u?~e&&s[e].p(o,f):(r&&(U(),q(s[u],1,1,()=>{s[u]=null}),G()),~e?(r=s[e],r?r.p(o,f):(r=s[e]=i[e](o),r.c()),k(r,1),r.m(t.parentNode,t)):r=null)},i(o){l||(k(r),l=!0)},o(o){q(r),l=!1},d(o){~e&&s[e].d(o),o&&h(t)}}}function nt(n,e,r){let{icon:t="sun"}=e,{size:l=14}=e,{color:i="white"}=e;return n.$$set=s=>{"icon"in s&&r(0,t=s.icon),"size"in s&&r(1,l=s.size),"color"in s&&r(2,i=s.color)},[t,l,i]}class it extends L{constructor(e){super(),F(this,e,nt,rt,j,{icon:0,size:1,color:2})}}const st=n=>({forecast:n&1,weatherType:n&2}),ue=n=>({forecast:n[0],weatherType:n[1]});function ot(n){let e,r;return{c(){e=T("div"),r=I("unavailable"),this.h()},l(t){e=E(t,"DIV",{class:!0});var l=y(e);r=W(l,"unavailable"),l.forEach(h),this.h()},h(){m(e,"class","rounded-md min-h-4 p-4 select-none relative italic text-gray-400 text-center ")},m(t,l){D(t,e,l),d(e,r)},p:V,i:V,o:V,d(t){t&&h(e)}}}function at(n){let e,r,t,l=n[0].minimumTemperature+"",i,s,a,o,f=n[0].maximumTemperature+"",u,c,_,p,b,z,g=n[1]&&he(n);return{c(){e=T("div"),r=T("div"),t=T("span"),i=I(l),s=I("\xB0C"),a=I(" - "),o=T("span"),u=I(f),c=I("\xB0C"),_=A(),p=T("div"),b=T("div"),g&&g.c(),this.h()},l(S){e=E(S,"DIV",{class:!0});var w=y(e);r=E(w,"DIV",{class:!0});var $=y(r);t=E($,"SPAN",{});var v=y(t);i=W(v,l),s=W(v,"\xB0C"),v.forEach(h),a=W($," - "),o=E($,"SPAN",{});var Q=y(o);u=W(Q,f),c=W(Q,"\xB0C"),Q.forEach(h),$.forEach(h),_=M(w),p=E(w,"DIV",{class:!0});var Z=y(p);b=E(Z,"DIV",{class:!0});var R=y(b);g&&g.l(R),R.forEach(h),Z.forEach(h),w.forEach(h),this.h()},h(){m(r,"class","flex gap-2"),m(b,"class","absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"),m(p,"class","absolute h-6 aspect-square rounded-full bg-blue-700 -right-1 -top-1"),m(e,"class","bg-blue-100 rounded-md min-h-4 p-4 select-none relative text-slate-800")},m(S,w){D(S,e,w),d(e,r),d(r,t),d(t,i),d(t,s),d(r,a),d(r,o),d(o,u),d(o,c),d(e,_),d(e,p),d(p,b),g&&g.m(b,null),z=!0},p(S,w){(!z||w&1)&&l!==(l=S[0].minimumTemperature+"")&&C(i,l),(!z||w&1)&&f!==(f=S[0].maximumTemperature+"")&&C(u,f),S[1]?g?(g.p(S,w),w&2&&k(g,1)):(g=he(S),g.c(),k(g,1),g.m(b,null)):g&&(U(),q(g,1,1,()=>{g=null}),G())},i(S){z||(k(g),z=!0)},o(S){q(g),z=!1},d(S){S&&h(e),g&&g.d()}}}function he(n){let e,r;return e=new it({props:{icon:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&2&&(i.icon=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function ft(n){let e,r,t,l,i;const s=[at,ot],a=[];function o(c,_){return c[0]?0:1}r=o(n),t=a[r]=s[r](n);const f=n[5].default,u=te(f,n,n[4],ue);return{c(){e=T("div"),t.c(),l=A(),u&&u.c(),this.h()},l(c){e=E(c,"DIV",{class:!0});var _=y(e);t.l(_),_.forEach(h),l=M(c),u&&u.l(c),this.h()},h(){m(e,"class","flex flex-col p-3 min-h-[38] border-b")},m(c,_){D(c,e,_),a[r].m(e,null),D(c,l,_),u&&u.m(c,_),i=!0},p(c,[_]){let p=r;r=o(c),r===p?a[r].p(c,_):(U(),q(a[p],1,1,()=>{a[p]=null}),G(),t=a[r],t?t.p(c,_):(t=a[r]=s[r](c),t.c()),k(t,1),t.m(e,null)),u&&u.p&&(!i||_&19)&&le(u,f,c,c[4],i?ne(f,c[4],_,st):re(c[4]),ue)},i(c){i||(k(t),k(u,c),i=!0)},o(c){q(t),q(u,c),i=!1},d(c){c&&h(e),a[r].d(),c&&h(l),u&&u.d(c)}}}function ct(n,e,r){let{$$slots:t={},$$scope:l}=e,{day:i}=e,{weather:s}=e,a,o;return ie(()=>{if(ee.Now.plainDateISO().until(i).days<0)return;const c=s.getWeatherDataFor(i);!c||(r(0,a=c),a.temperature<0?r(1,o="snow"):a.temperature<=10?r(1,o="cloudy"):a.temperature<=25?r(1,o="partly-cloudy"):r(1,o="sun"))}),n.$$set=f=>{"day"in f&&r(2,i=f.day),"weather"in f&&r(3,s=f.weather),"$$scope"in f&&r(4,l=f.$$scope)},[a,o,i,s,l,t]}class ut extends L{constructor(e){super(),F(this,e,ct,ft,j,{day:2,weather:3})}}const ht=n=>({}),me=n=>({});function mt(n){let e,r;return e=new Qe({props:{src:n[1],size:"16"}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,l){const i={};l&2&&(i.src=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function _t(n){let e;const r=n[4].icon,t=te(r,n,n[3],me);return{c(){t&&t.c()},l(l){t&&t.l(l)},m(l,i){t&&t.m(l,i),e=!0},p(l,i){t&&t.p&&(!e||i&8)&&le(t,r,l,l[3],e?ne(r,l[3],i,ht):re(l[3]),me)},i(l){e||(k(t,l),e=!0)},o(l){q(t,l),e=!1},d(l){t&&t.d(l)}}}function dt(n){let e,r,t,l,i,s,a;const o=[_t,mt],f=[];function u(p,b){return p[2].icon?0:p[1]?1:-1}~(r=u(n))&&(t=f[r]=o[r](n));const c=n[4].default,_=te(c,n,n[3],null);return{c(){e=T("div"),t&&t.c(),l=A(),_&&_.c(),this.h()},l(p){e=E(p,"DIV",{class:!0});var b=y(e);t&&t.l(b),l=M(b),_&&_.l(b),b.forEach(h),this.h()},h(){m(e,"class","rounded-full p-2 h-min flex gap-4 items-center cursor-pointer hover:bg-slate-200 transition-colors svelte-iv6ni4"),x(e,"filled",n[0])},m(p,b){D(p,e,b),~r&&f[r].m(e,null),d(e,l),_&&_.m(e,null),i=!0,s||(a=$e(e,"click",n[5]),s=!0)},p(p,[b]){let z=r;r=u(p),r===z?~r&&f[r].p(p,b):(t&&(U(),q(f[z],1,1,()=>{f[z]=null}),G()),~r?(t=f[r],t?t.p(p,b):(t=f[r]=o[r](p),t.c()),k(t,1),t.m(e,l)):t=null),_&&_.p&&(!i||b&8)&&le(_,c,p,p[3],i?ne(c,p[3],b,null):re(p[3]),null),b&1&&x(e,"filled",p[0])},i(p){i||(k(t),k(_,p),i=!0)},o(p){q(t),q(_,p),i=!1},d(p){p&&h(e),~r&&f[r].d(),_&&_.d(p),s=!1,a()}}}function gt(n,e,r){let{$$slots:t={},$$scope:l}=e;const i=Te(t);let{filled:s=!1}=e,{icon:a=void 0}=e;function o(f){be.call(this,n,f)}return n.$$set=f=>{"filled"in f&&r(0,s=f.filled),"icon"in f&&r(1,a=f.icon),"$$scope"in f&&r(3,l=f.$$scope)},[s,a,i,l,t,o]}class pt extends L{constructor(e){super(),F(this,e,gt,dt,j,{filled:0,icon:1})}}function _e(n,e,r){const t=n.slice();return t[9]=e[r],t}function de(n,e,r){const t=n.slice();return t[14]=e[r],t}function ge(n){let e,r,t=n[2][n[9].toString()],l=[];for(let s=0;s<t.length;s+=1)l[s]=pe(de(n,t,s));const i=s=>q(l[s],1,1,()=>{l[s]=null});return{c(){for(let s=0;s<l.length;s+=1)l[s].c();e=X()},l(s){for(let a=0;a<l.length;a+=1)l[a].l(s);e=X()},m(s,a){for(let o=0;o<l.length;o+=1)l[o].m(s,a);D(s,e,a),r=!0},p(s,a){if(a&8198){t=s[2][s[9].toString()];let o;for(o=0;o<t.length;o+=1){const f=de(s,t,o);l[o]?(l[o].p(f,a),k(l[o],1)):(l[o]=pe(f),l[o].c(),k(l[o],1),l[o].m(e.parentNode,e))}for(U(),o=t.length;o<l.length;o+=1)i(o);G()}},i(s){if(!r){for(let a=0;a<t.length;a+=1)k(l[a]);r=!0}},o(s){l=l.filter(Boolean);for(let a=0;a<l.length;a+=1)q(l[a]);r=!1},d(s){ye(l,s),s&&h(e)}}}function pe(n){let e,r;function t(){return n[8](n[14])}return e=new Ne({props:{weatherType:n[13],activity:n[14]}}),e.$on("click",t),{c(){P(e.$$.fragment)},l(l){O(e.$$.fragment,l)},m(l,i){B(e,l,i),r=!0},p(l,i){n=l;const s={};i&8192&&(s.weatherType=n[13]),i&6&&(s.activity=n[14]),e.$set(s)},i(l){r||(k(e.$$.fragment,l),r=!0)},o(l){q(e.$$.fragment,l),r=!1},d(l){N(e,l)}}}function vt(n){let e,r=n[9].toString()in n[2],t,l=r&&ge(n);return{c(){e=T("div"),l&&l.c(),this.h()},l(i){e=E(i,"DIV",{class:!0});var s=y(e);l&&l.l(s),s.forEach(h),this.h()},h(){m(e,"class","flex flex-col p-3 gap-4")},m(i,s){D(i,e,s),l&&l.m(e,null),t=!0},p(i,s){s&6&&(r=i[9].toString()in i[2]),r?l?(l.p(i,s),s&6&&k(l,1)):(l=ge(i),l.c(),k(l,1),l.m(e,null)):l&&(U(),q(l,1,1,()=>{l=null}),G())},i(i){t||(k(l),t=!0)},o(i){q(l),t=!1},d(i){i&&h(e),l&&l.d()}}}function ve(n){let e,r,t,l=n[4][n[9].dayOfWeek-1]+"",i,s,a,o=n[9].day+"",f,u,c,_,p,b,z,g;function S(){return n[7](n[9])}return _=new pt({props:{icon:Ie}}),_.$on("click",S),b=new ut({props:{weather:n[0],day:n[9],$$slots:{default:[vt,({forecast:w,weatherType:$})=>({12:w,13:$}),({forecast:w,weatherType:$})=>(w?4096:0)|($?8192:0)]},$$scope:{ctx:n}}}),{c(){e=T("div"),r=T("div"),t=T("span"),i=I(l),s=A(),a=T("span"),f=I(o),u=A(),c=T("div"),P(_.$$.fragment),p=A(),P(b.$$.fragment),z=A(),this.h()},l(w){e=E(w,"DIV",{class:!0});var $=y(e);r=E($,"DIV",{class:!0});var v=y(r);t=E(v,"SPAN",{class:!0});var Q=y(t);i=W(Q,l),Q.forEach(h),s=M(v),a=E(v,"SPAN",{class:!0});var Z=y(a);f=W(Z,o),Z.forEach(h),u=M(v),c=E(v,"DIV",{class:!0});var R=y(c);O(_.$$.fragment,R),R.forEach(h),v.forEach(h),p=M($),O(b.$$.fragment,$),z=M($),$.forEach(h),this.h()},h(){m(t,"class","text-gray-400 font-light mr-1"),m(a,"class","font-medium h-8 flex items-center justify-center svelte-8n7y6t"),x(a,"today",n[9].equals(n[3])),m(c,"class","absolute right-2"),m(r,"class","py-2 flex items-center justify-center text-sm border-b"),m(e,"class","relative grow max-w-xs border-r last:border-r-0 flex flex-shrink-0 flex-col w-[14%]")},m(w,$){D(w,e,$),d(e,r),d(r,t),d(t,i),d(r,s),d(r,a),d(a,f),d(r,u),d(r,c),B(_,c,null),d(e,p),B(b,e,null),d(e,z),g=!0},p(w,$){n=w,(!g||$&2)&&l!==(l=n[4][n[9].dayOfWeek-1]+"")&&C(i,l),(!g||$&2)&&o!==(o=n[9].day+"")&&C(f,o),$&10&&x(a,"today",n[9].equals(n[3]));const v={};$&1&&(v.weather=n[0]),$&2&&(v.day=n[9]),$&139270&&(v.$$scope={dirty:$,ctx:n}),b.$set(v)},i(w){g||(k(_.$$.fragment,w),k(b.$$.fragment,w),g=!0)},o(w){q(_.$$.fragment,w),q(b.$$.fragment,w),g=!1},d(w){w&&h(e),N(_),N(b)}}}function wt(n){let e,r,t=n[1],l=[];for(let s=0;s<t.length;s+=1)l[s]=ve(_e(n,t,s));const i=s=>q(l[s],1,1,()=>{l[s]=null});return{c(){e=T("div");for(let s=0;s<l.length;s+=1)l[s].c();this.h()},l(s){e=E(s,"DIV",{class:!0});var a=y(e);for(let o=0;o<l.length;o+=1)l[o].l(a);a.forEach(h),this.h()},h(){m(e,"class","m-4 flex container mx-auto h-full w-full")},m(s,a){D(s,e,a);for(let o=0;o<l.length;o+=1)l[o].m(e,null);r=!0},p(s,[a]){if(a&8255){t=s[1];let o;for(o=0;o<t.length;o+=1){const f=_e(s,t,o);l[o]?(l[o].p(f,a),k(l[o],1)):(l[o]=ve(f),l[o].c(),k(l[o],1),l[o].m(e,null))}for(U(),o=t.length;o<l.length;o+=1)i(o);G()}},i(s){if(!r){for(let a=0;a<t.length;a+=1)k(l[a]);r=!0}},o(s){l=l.filter(Boolean);for(let a=0;a<l.length;a+=1)q(l[a]);r=!1},d(s){s&&h(e),ye(l,s)}}}function bt(n,e,r){let t;Ee(n,De,_=>r(2,t=_));let{startOfWeek:l}=e,{weather:i}=e;const s=ee.Now.plainDateISO(ze),a=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];let o=[];function f(_){fe.set({editMode:!1,activity:ae.new(_)})}ie(()=>{ae.init()});const u=_=>f(_),c=_=>fe.edit(_);return n.$$set=_=>{"startOfWeek"in _&&r(6,l=_.startOfWeek),"weather"in _&&r(0,i=_.weather)},n.$$.update=()=>{n.$$.dirty&64&&l&&r(1,o=a.map((_,p)=>l.add({days:p})))},[i,o,t,s,a,f,l,u,c]}class yt extends L{constructor(e){super(),F(this,e,bt,wt,j,{startOfWeek:6,weather:0})}}function qe(n){if(n.length==0)throw Error(`Array is empty for: ${n}`);return n[0]["@value"]}function J(n){return parseInt(""+qe(n))}function we(n){return parseFloat(""+qe(n))}class se{constructor(e,r,t,l,i,s){this.id=e,this.clouds=r,this.minimumTemperature=t,this.maximumTemperature=l,this.feelsLikeTemperature=i,this.temperature=s}get temporalDate(){const e=new Date(this.id*1e3);return new ee.PlainDate(e.getFullYear(),e.getMonth()+1,e.getDate())}static fromRDF(e){const r=J(e["http://schema.org/identifier"]),t=J(e["ex:clouds"]),l=J(e["ex:minimumTemperature"]),i=J(e["ex:maximumTemperature"]),s=J(e["https://uri.fiware.org/ns/data-models#feelsLikeTemperature"]),a=J(e["https://uri.fiware.org/ns/data-models#temperature"]);return new se(r,t,l,i,s,a)}}class oe{constructor(e,r){this.geoCoordinates=e,this.days=r}getWeatherDataFor(e){return this.days.find(r=>r.temporalDate.equals(e))}static fromRDF(e){const r={longitude:0,latitude:0},t=[];return e.forEach(l=>{const i=l["@type"][0];if(i=="https://uri.fiware.org/ns/data-models#WeatherForcecast"){const s=se.fromRDF(l);t.push(s)}if(i=="http://schema.org/GeoCoordinates"){const s=l;r.latitude=we(s["http://schema.org/latitude"]),r.longitude=we(s["http://schema.org/longitude"])}}),new oe(r,t)}}function kt(n){let e,r;return e=new yt({props:{startOfWeek:n[0],weather:n[1]}}),{c(){P(e.$$.fragment)},l(t){O(e.$$.fragment,t)},m(t,l){B(e,t,l),r=!0},p(t,[l]){const i={};l&1&&(i.startOfWeek=t[0]),l&2&&(i.weather=t[1]),e.$set(i)},i(t){r||(k(e.$$.fragment,t),r=!0)},o(t){q(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}let K;const It=async({fetch:n})=>{if(K)return K;const r=await n("https://idlab.osoc.be/weather/Brussels");return K={status:r.status,props:{rdfWeatherArray:r.ok&&await r.json()}},K};function qt(n,e,r){let{rdfWeatherArray:t=[]}=e;const l=ee.Now.plainDateISO();let i,s;function a(){return r(0,i=l.subtract({days:l.dayOfWeek-1})),i}return ie(async()=>{r(1,s=oe.fromRDF(t)),a()}),n.$$set=o=>{"rdfWeatherArray"in o&&r(2,t=o.rdfWeatherArray)},[i,s,t]}class Wt extends L{constructor(e){super(),F(this,e,qt,kt,j,{rdfWeatherArray:2})}}export{Wt as default,It as load};
