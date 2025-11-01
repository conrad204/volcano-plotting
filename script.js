const API = "http://localhost:8000";

// unwrap scalar-like arrays from the R JSON (e.g. [true] -> true)
function unwrap(v){
  if (Array.isArray(v) && v.length === 1) return v[0];
  return v;
}

async function addGene(){
  const gene = document.getElementById('gene').value.trim();
  const res = await fetch(`${API}/genes`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({gene})
  });
  const data = await res.json();

  // user-friendly summary (fall back to full JSON if unexpected)
  const ok = unwrap(data.ok);
  const found = unwrap(data.found);
  const added = unwrap(data.added);
  let msg = '';

  if (ok === true) {
    if (added) msg = `Added: ${added}`;
    else if (found === false) msg = `Not found: ${gene}`;
    else msg = 'OK';
  } else {
    // show full JSON if something unexpected happened
    msg = JSON.stringify(data, null, 2);
  }

  document.getElementById('out').textContent = msg;
  refreshPlot();

  // clear the input and return focus
  const input = document.getElementById('gene');
  input.value = '';
  input.focus();

  // also keep full response in console for debugging
  console.debug('addGene response:', data);
}


async function resetGenes(){
  if (!confirm("Clear all interesting genes?")) return;
  const res = await fetch(`${API}/genes/reset`, { method: 'POST' });
  const data = await res.json();

  const cleared = unwrap(data.cleared);
  let msg = cleared ? 'All interesting genes cleared.' : JSON.stringify(data, null, 2);

  document.getElementById('out').textContent = msg;
  refreshPlot();
  console.debug('resetGenes response:', data);
}

// Refresh plot using slider values (lfc and minlogp) as query params
function refreshPlot(){
  const lfc = encodeURIComponent(document.getElementById('lfc').value);
  const minlogp = encodeURIComponent(document.getElementById('minlogp').value);
  // cache-bust and include thresholds and whether threshold labels should be shown
  const show = (typeof window.showThresholdLabels === 'undefined') ? true : !!window.showThresholdLabels;
  document.getElementById('plot').src = `${API}/plot?lfc=${lfc}&minlogp=${minlogp}&show_threshold_labels=${show}&ts=${Date.now()}`;
}

// Wire sliders: update displayed numeric value and refresh the plot on change
function initSliders(){
  const lfcEl = document.getElementById('lfc');
  const lfcVal = document.getElementById('lfc_val');
  const minlogpEl = document.getElementById('minlogp');
  const minlogpVal = document.getElementById('minlogp_val');

  if (lfcEl && lfcVal) {
    lfcVal.textContent = lfcEl.value;
    lfcEl.addEventListener('input', function(){
      lfcVal.textContent = this.value;
      refreshPlot();
    });
  }

  if (minlogpEl && minlogpVal) {
    minlogpVal.textContent = minlogpEl.value;
    minlogpEl.addEventListener('input', function(){
      minlogpVal.textContent = this.value;
      refreshPlot();
    });
  }
}

// initial
// default toggle state (false = hide threshold-derived labels by default)
window.showThresholdLabels = false;

function toggleThresholdLabels(){
  window.showThresholdLabels = !window.showThresholdLabels;
  const btn = document.getElementById('toggleLabelsBtn');
  if (btn) btn.textContent = `Threshold labels: ${window.showThresholdLabels ? 'On' : 'Off'}`;
  refreshPlot();
}

// wire the toggle button if present
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('toggleLabelsBtn');
  if (btn) {
    btn.addEventListener('click', toggleThresholdLabels);
    btn.textContent = `Threshold labels: ${window.showThresholdLabels ? 'On' : 'Off'}`;
  }
});

initSliders();
refreshPlot();

// call addGene() when Enter is pressed in the input
document.getElementById('gene').addEventListener('keydown', function(e){
  if (e.key === 'Enter') {
    e.preventDefault();
    addGene();
  }
});