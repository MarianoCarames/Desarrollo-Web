document.addEventListener('DOMContentLoaded', () => {
  const tipoSelect = document.getElementById('tipoTuberia');
  const form       = document.getElementById('caudalForm');
  const resultado  = document.getElementById('resultado');
  const limpiarBtn = document.getElementById('limpiarBtn');

  const groups = {
    circular:    document.getElementById('circularFields'),
    rectangular: document.getElementById('rectangularFields'),
    seccion:     document.getElementById('seccionFields'),
    velocidad:   document.getElementById('velocidadField')
  };

  function mostrarCampos() {
    // Ocultar todos
    Object.values(groups).forEach(g => g.classList.add('hidden'));
    // Borrar atributos required
    document.querySelectorAll('input').forEach(i => (i.required = false));

    switch (tipoSelect.value) {
      case 'circular':
        groups.circular.classList.remove('hidden');
        groups.velocidad.classList.remove('hidden');
        document.getElementById('diametro').required  = true;
        document.getElementById('velocidad').required = true;
        break;
      case 'rectangular':
        groups.rectangular.classList.remove('hidden');
        groups.velocidad.classList.remove('hidden');
        document.getElementById('ladoA').required     = true;
        document.getElementById('ladoB').required     = true;
        document.getElementById('velocidad').required = true;
        break;
      case 'seccion':
        groups.seccion.classList.remove('hidden');
        groups.velocidad.classList.remove('hidden');
        document.getElementById('seccion').required   = true;
        document.getElementById('velocidad').required = true;
        break;
    }
  }

  tipoSelect.addEventListener('change', mostrarCampos);
  mostrarCampos();

  form.addEventListener('submit', e => {
    e.preventDefault();
    resultado.classList.remove('error');
    try {
      const v = +document.getElementById('velocidad').value;
      if (!v) throw new Error('Ingresá velocidad válida.');

      let S = 0;
      switch (tipoSelect.value) {
        case 'circular':
          const D = +document.getElementById('diametro').value;
          if (!D) throw new Error('Ingresá diámetro válido.');
          S = Math.PI * (D ** 2) / 4;
          break;
        case 'rectangular':
          const a = +document.getElementById('ladoA').value;
          const b = +document.getElementById('ladoB').value;
          if (!a || !b) throw new Error('Ingresá lados válidos.');
          S = a * b;
          break;
        case 'seccion':
          S = +document.getElementById('seccion').value;
          if (!S) throw new Error('Ingresá sección válida.');
          break;
      }
      const Q = S * v;
      resultado.textContent = `Caudal: ${Q.toFixed(4)} m³/s`;
    } catch (err) {
      resultado.textContent = err.message;
      resultado.classList.add('error');
    }
  });

  limpiarBtn.addEventListener('click', () => {
    form.reset();
    mostrarCampos();
    resultado.textContent = '';
    resultado.classList.remove('error');
  });
});