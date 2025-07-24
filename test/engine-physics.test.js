const assert = require('assert');
(async () => {
  const mod = await import('../engine/physics.ts');
  const { createBody, stepPhysics } = mod;
  const a = createBody(0, 0, 0, 0, 0, 0, 1);
  const b = createBody(1, 0, 0, 0, 0, 0, 1);
  stepPhysics(1 / 60);
  const vxA = a.linvel().x;
  const vxB = b.linvel().x;
  assert(vxA > 0 && vxB < 0);
  console.log('tests passed');
})();
