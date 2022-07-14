import{S as O,i as W,s as J,l as M,g as U,o as f,p as K,q as h,d as y,v as V,n as G,I as N,J as Y,e as C,t as A,k as z,w as $,c as P,a as q,h as F,m as I,x as S,b as B,K as x,y as j,L as R,B as L,M as Q,N as T,O as Z,P as tt}from"../chunks/index-d13a8d77.js";import{d as v,I as X,B as et}from"../chunks/Input-1fd2cfc8.js";function rt(n){let t,e,o,a,s,p,l,r,c,d,g,u;function k(i){n[7](i)}let b={label:"pod url",error:n[2]};n[1]!==void 0&&(b.value=n[1]),s=new X({props:b}),N.push(()=>Y(s,"value",k));function H(i){n[8](i)}let D={label:"webId",error:n[4]};return n[3]!==void 0&&(D.value=n[3]),r=new X({props:D}),N.push(()=>Y(r,"value",H)),g=new et({props:{focused:!0,$$slots:{default:[at]},$$scope:{ctx:n}}}),g.$on("click",n[5]),{c(){t=C("div"),e=C("h1"),o=A("Welcome to the pod"),a=z(),$(s.$$.fragment),l=z(),$(r.$$.fragment),d=z(),$(g.$$.fragment),this.h()},l(i){t=P(i,"DIV",{class:!0});var w=q(t);e=P(w,"H1",{class:!0});var m=q(e);o=F(m,"Welcome to the pod"),m.forEach(y),a=I(w),S(s.$$.fragment,w),l=I(w),S(r.$$.fragment,w),d=I(w),S(g.$$.fragment,w),w.forEach(y),this.h()},h(){B(e,"class","text-2xl"),B(t,"class","max-w-lg my-16 mx-auto")},m(i,w){U(i,t,w),x(t,e),x(e,o),x(t,a),j(s,t,null),x(t,l),j(r,t,null),x(t,d),j(g,t,null),u=!0},p(i,w){const m={};w&4&&(m.error=i[2]),!p&&w&2&&(p=!0,m.value=i[1],R(()=>p=!1)),s.$set(m);const _={};w&16&&(_.error=i[4]),!c&&w&8&&(c=!0,_.value=i[3],R(()=>c=!1)),r.$set(_);const E={};w&512&&(E.$$scope={dirty:w,ctx:i}),g.$set(E)},i(i){u||(h(s.$$.fragment,i),h(r.$$.fragment,i),h(g.$$.fragment,i),u=!0)},o(i){f(s.$$.fragment,i),f(r.$$.fragment,i),f(g.$$.fragment,i),u=!1},d(i){i&&y(t),L(s),L(r),L(g)}}}function ot(n){let t;const e=n[6].default,o=Q(e,n,n[9],null);return{c(){o&&o.c()},l(a){o&&o.l(a)},m(a,s){o&&o.m(a,s),t=!0},p(a,s){o&&o.p&&(!t||s&512)&&T(o,e,a,a[9],t?tt(e,a[9],s,null):Z(a[9]),null)},i(a){t||(h(o,a),t=!0)},o(a){f(o,a),t=!1},d(a){o&&o.d(a)}}}function at(n){let t;return{c(){t=A("Login with pod")},l(e){t=F(e,"Login with pod")},m(e,o){U(e,t,o)},d(e){e&&y(t)}}}function it(n){let t,e,o,a;const s=[ot,rt],p=[];function l(r,c){var d;return(d=r[0])!=null&&d.info.isLoggedIn?0:1}return t=l(n),e=p[t]=s[t](n),{c(){e.c(),o=M()},l(r){e.l(r),o=M()},m(r,c){p[t].m(r,c),U(r,o,c),a=!0},p(r,[c]){let d=t;t=l(r),t===d?p[t].p(r,c):(G(),f(p[d],1,1,()=>{p[d]=null}),K(),e=p[t],e?e.p(r,c):(e=p[t]=s[t](r),e.c()),h(e,1),e.m(o.parentNode,o))},i(r){a||(h(e),a=!0)},o(r){f(e),a=!1},d(r){p[t].d(r),r&&y(o)}}}function nt(n,t,e){let{$$slots:o={},$$scope:a}=t,s,p,l="http://localhost:3000",r="",c="johndoe",d="";V(async()=>{await v.handleIncomingRedirect({restorePreviousSession:!0}),e(0,s=v.getDefaultSession()),p=window.location.href,e(1,l=localStorage.getItem("podUrl")||"http://localhost:3000"),e(3,c=localStorage.getItem("webID")||"johndoe")});async function g(){if(e(4,d=""),e(2,r=""),!l)return e(2,r="Please enter a pod URL");if(!c)return e(4,d="Please enter a web ID");l.indexOf("//")<0&&e(1,l="http://"+l),localStorage.setItem("podUrl",l),localStorage.setItem("webID",c),v.getDefaultSession().info.isLoggedIn||await v.login({oidcIssuer:l,clientName:"Project-IDLab",redirectUrl:p})}function u(b){l=b,e(1,l)}function k(b){c=b,e(3,c)}return n.$$set=b=>{"$$scope"in b&&e(9,a=b.$$scope)},[s,l,r,c,d,g,o,u,k,a]}class ct extends O{constructor(t){super(),W(this,t,nt,it,J,{})}}export{ct as default};
