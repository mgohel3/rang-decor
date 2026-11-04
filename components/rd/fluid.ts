// WebGL2 fluid ("cursor smoke") ported from the Claude Design reference (Rang Decor Home.dc.html, fluid()).
// Navier-Stokes dye simulation, premultiplied alpha so the smoke is transparent over the page.
// Returns null when WebGL2 or float render targets are unavailable; the static colour wash stays.

export type Fluid = {
  splat(x: number, y: number, dx: number, dy: number, c: [number, number, number]): void;
  step(): void;
  clear(): void;
};

type Tex = { t: WebGLTexture; f: WebGLFramebuffer; w: number; h: number; tx: number; ty: number };
type Dbl = { r: Tex; w: Tex; swap(): void };

export function createFluid(cv: HTMLCanvasElement): Fluid | null {
  const gl = cv.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) return null;
  gl.getExtension("OES_texture_float_linear");

  const VS = `#version 300 es
precision highp float;
in vec2 aPosition; out vec2 vUv,vL,vR,vT,vB; uniform vec2 texelSize;
void main(){vUv=aPosition*.5+.5;vL=vUv-vec2(texelSize.x,0.);vR=vUv+vec2(texelSize.x,0.);vT=vUv+vec2(0.,texelSize.y);vB=vUv-vec2(0.,texelSize.y);gl_Position=vec4(aPosition,0.,1.);}`;
  const HD = "#version 300 es\nprecision highp float;precision highp sampler2D;in vec2 vUv,vL,vR,vT,vB;out vec4 o;\n";
  const FS: Record<string, string> = {
    adv: "uniform sampler2D uV,uS;uniform vec2 texelSize;uniform float dt,diss;void main(){vec2 c=vUv-dt*texture(uV,vUv).xy*texelSize;o=texture(uS,c)/(1.+diss*dt);}",
    div: "uniform sampler2D uV;void main(){float L=texture(uV,vL).x,R=texture(uV,vR).x,T=texture(uV,vT).y,B=texture(uV,vB).y;vec2 C=texture(uV,vUv).xy;if(vL.x<0.)L=-C.x;if(vR.x>1.)R=-C.x;if(vT.y>1.)T=-C.y;if(vB.y<0.)B=-C.y;o=vec4(.5*(R-L+T-B),0.,0.,1.);}",
    curl: "uniform sampler2D uV;void main(){float L=texture(uV,vL).y,R=texture(uV,vR).y,T=texture(uV,vT).x,B=texture(uV,vB).x;o=vec4(.5*(R-L-T+B),0.,0.,1.);}",
    vort: "uniform sampler2D uV,uC;uniform float curl,dt;void main(){float L=texture(uC,vL).x,R=texture(uC,vR).x,T=texture(uC,vT).x,B=texture(uC,vB).x,C=texture(uC,vUv).x;vec2 f=.5*vec2(abs(T)-abs(B),abs(R)-abs(L));f/=length(f)+.0001;f*=curl*C;f.y*=-1.;vec2 v=texture(uV,vUv).xy+f*dt;o=vec4(clamp(v,-1000.,1000.),0.,1.);}",
    pres: "uniform sampler2D uP,uD;void main(){float L=texture(uP,vL).x,R=texture(uP,vR).x,T=texture(uP,vT).x,B=texture(uP,vB).x;float d=texture(uD,vUv).x;o=vec4((L+R+B+T-d)*.25,0.,0.,1.);}",
    grad: "uniform sampler2D uP,uV;void main(){float L=texture(uP,vL).x,R=texture(uP,vR).x,T=texture(uP,vT).x,B=texture(uP,vB).x;vec2 v=texture(uV,vUv).xy;v-=vec2(R-L,T-B);o=vec4(v,0.,1.);}",
    splat: "uniform sampler2D uT;uniform float ar,radius;uniform vec3 color;uniform vec2 point;void main(){vec2 p=vUv-point;p.x*=ar;vec3 s=exp(-dot(p,p)/radius)*color;o=vec4(texture(uT,vUv).xyz+s,1.);}",
    clr: "uniform sampler2D uT;uniform float value;void main(){o=value*texture(uT,vUv);}",
    disp: "uniform sampler2D uT;void main(){vec3 c=max(texture(uT,vUv).rgb,0.);float a=clamp(max(c.r,max(c.g,c.b))*1.15,0.,.92);c=min(c*1.15,vec3(a));o=vec4(c,a);}",
  };

  const shader = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const vs = shader(gl.VERTEX_SHADER, VS);
  const P: Record<string, { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }> = {};
  Object.keys(FS).forEach(k => {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs); gl.attachShader(p, shader(gl.FRAGMENT_SHADER, HD + FS[k]));
    gl.bindAttribLocation(p, 0, "aPosition"); gl.linkProgram(p);
    const u: Record<string, WebGLUniformLocation | null> = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < n; i++) { const nm = gl.getActiveUniform(p, i)!.name; u[nm] = gl.getUniformLocation(p, nm); }
    P[k] = { p, u };
  });

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0); gl.enableVertexAttribArray(0);

  const mk = (w: number, h: number): Tex => {
    const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    const f = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    return { t, f, w, h, tx: 1 / w, ty: 1 / h };
  };
  const dbl = (w: number, h: number): Dbl => { let a = mk(w, h), b = mk(w, h); return { get r() { return a; }, get w() { return b; }, swap() { const x = a; a = b; b = x; } }; };

  let vel: Dbl, dye: Dbl, prs: Dbl, dvg: Tex, crl: Tex, W = 0, H = 0, ready = false;
  const res = (short: number, ar: number): [number, number] => ar > 1 ? [Math.round(short * ar), short] : [short, Math.round(short / ar)];
  const build = () => { const ar = W / H, s = res(128, ar), d = res(480, ar); vel = dbl(s[0], s[1]); dye = dbl(d[0], d[1]); prs = dbl(s[0], s[1]); dvg = mk(s[0], s[1]); crl = mk(s[0], s[1]); ready = true; };
  const blit = (target: Tex | null) => {
    if (target) { gl.viewport(0, 0, target.w, target.h); gl.bindFramebuffer(gl.FRAMEBUFFER, target.f); } else { gl.viewport(0, 0, W, H); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
  const prog = (k: string, tex: Tex | null) => { const q = P[k]; gl.useProgram(q.p); if (q.u.texelSize && tex) gl.uniform2f(q.u.texelSize, tex.tx, tex.ty); return q.u; };
  const bind = (loc: WebGLUniformLocation | null, tex: Tex, n: number) => { gl.activeTexture(gl.TEXTURE0 + n); gl.bindTexture(gl.TEXTURE_2D, tex.t); gl.uniform1i(loc, n); };
  const fit = () => {
    const w = Math.round(cv.clientWidth), h = Math.round(cv.clientHeight);
    if (w < 8 || h < 8) return false;
    if (w !== W || h !== H || !ready) { W = cv.width = w; H = cv.height = h; build(); }
    return true;
  };
  gl.disable(gl.BLEND);

  return {
    splat(x, y, dx, dy, c) {
      if (!fit()) return;
      const ar = W / H, k = 5200;
      const pass = (tgt: Dbl, vx: number, vy: number, vz: number, rad: number) => {
        const u = prog("splat", null); bind(u.uT, tgt.r, 0); gl.uniform1f(u.ar, ar); gl.uniform2f(u.point, x, y); gl.uniform3f(u.color, vx, vy, vz); gl.uniform1f(u.radius, rad); blit(tgt.w); tgt.swap();
      };
      const rad = (ar > 1 ? 0.22 * ar : 0.22) / 100;
      pass(vel, dx * (ar < 1 ? ar : 1) * k, dy * (ar > 1 ? 1 / ar : 1) * k, 0, rad);
      pass(dye, c[0] * 0.5, c[1] * 0.5, c[2] * 0.5, rad * 1.1);
    },
    step() {
      if (!fit()) return;
      const dt = 0.0166;
      let u = prog("curl", vel.r); bind(u.uV, vel.r, 0); blit(crl);
      u = prog("vort", vel.r); bind(u.uV, vel.r, 0); bind(u.uC, crl, 1); gl.uniform1f(u.curl, 22); gl.uniform1f(u.dt, dt); blit(vel.w); vel.swap();
      u = prog("div", vel.r); bind(u.uV, vel.r, 0); blit(dvg);
      u = prog("clr", prs.r); bind(u.uT, prs.r, 0); gl.uniform1f(u.value, 0.8); blit(prs.w); prs.swap();
      u = prog("pres", vel.r); bind(u.uD, dvg, 1); for (let i = 0; i < 18; i++) { bind(u.uP, prs.r, 0); blit(prs.w); prs.swap(); }
      u = prog("grad", vel.r); bind(u.uP, prs.r, 0); bind(u.uV, vel.r, 1); blit(vel.w); vel.swap();
      u = prog("adv", vel.r); bind(u.uV, vel.r, 0); bind(u.uS, vel.r, 1); gl.uniform1f(u.dt, dt); gl.uniform1f(u.diss, 1.6); blit(vel.w); vel.swap();
      u = prog("adv", vel.r); bind(u.uV, vel.r, 0); bind(u.uS, dye.r, 1); gl.uniform1f(u.dt, dt); gl.uniform1f(u.diss, 1.1); blit(dye.w); dye.swap();
      u = prog("disp", null); bind(u.uT, dye.r, 0); blit(null);
    },
    clear() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, cv.width, cv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      if (ready) [vel, dye, prs].forEach(d => [d.r, d.w].forEach(x => { gl.bindFramebuffer(gl.FRAMEBUFFER, x.f); gl.clear(gl.COLOR_BUFFER_BIT); }));
    },
  };
}
