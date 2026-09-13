const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const addressForm = document.querySelector('#addressForm');
const addressInput = document.querySelector('#addressInput');
const toast = document.querySelector('#toast');
const note = document.querySelector('#note');

const savedNote = window.localStorage.getItem('zuros-note');
if (savedNote) note.innerHTML = savedNote;

note.addEventListener('input', () => {
  window.localStorage.setItem('zuros-note', note.innerHTML);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

function runSearch(value) {
  const query = value.trim();
  if (!query) return;
  const destination = /^(https?:\/\/|www\.)/i.test(query) ? (query.startsWith('http') ? query : `https://${query}`) : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  window.open(destination, '_blank', 'noopener,noreferrer');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  runSearch(searchInput.value);
});

addressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  runSearch(addressInput.value.replace('zuros://home', '').trim());
});

document.querySelector('#reloadButton').addEventListener('click', () => window.location.reload());
document.querySelector('#editLinks').addEventListener('click', () => showToast('Your places are ready to be rearranged.'));
document.querySelector('#addLink').addEventListener('click', () => showToast('A new place can be added here soon.'));
document.querySelector('.address-action').addEventListener('click', () => showToast('Bookmarked in Zuros.'));

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});