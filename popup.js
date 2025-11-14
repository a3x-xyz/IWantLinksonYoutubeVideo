document.addEventListener('DOMContentLoaded', () => {
  const backIcon = document.getElementById('back-icon');
  const settingsIcon = document.getElementById('settings');
  const headerTitle = document.getElementById('header-title');
  const homeView = document.getElementById('home-view');
  const settingsView = document.getElementById('settings-view');

  const jsonNameInput = document.getElementById('json-name');
  const jsonInput = document.getElementById('json-url');
  const addJsonBtn = document.getElementById('add-json');
  const jsonListDiv = document.getElementById('json-list');
  const saveJsonBtn = document.getElementById('save-json');

  const OFFICIAL_JSON = { name: "A3X", url: "https://iwantlinksonyoutubevideo.pages.dev/index.json", official: true };

  let jsonUrls = [];
  let videoData = {};

  settingsIcon.addEventListener('click', () => {
    homeView.classList.remove('show');
    settingsView.classList.add('show');
    headerTitle.textContent = 'Settings';
    backIcon.style.display = 'block';
    settingsIcon.style.visibility = 'hidden';
  });

  backIcon.addEventListener('click', () => {
    settingsView.classList.remove('show');
    homeView.classList.add('show');
    headerTitle.textContent = 'I Want Links on YouTube Video';
    backIcon.style.display = 'none';
    settingsIcon.style.visibility = 'visible';
    loadHome();
  });

  chrome.storage.sync.get(['jsonUrls'], ({jsonUrls: saved}) => {
    if (!saved) jsonUrls = [];
    else jsonUrls = saved;

    if (!jsonUrls.find(j => j.url === OFFICIAL_JSON.url)) {
      jsonUrls.unshift(OFFICIAL_JSON);
      chrome.storage.sync.set({jsonUrls});
    }

    updateJsonList();
    loadAllJsonData();
  });

  function updateJsonList() {
    jsonListDiv.innerHTML = '';
    if (jsonUrls.length === 0) {
      jsonListDiv.innerHTML = '<i>No JSON saved yet.</i>';
      return;
    }

    jsonUrls.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'json-item';
      div.innerHTML = `<span>${item.name}</span>`;
      if (!item.official) {
        div.innerHTML += `<span class="json-delete" data-index="${index}">🗑️</span>`;
      } else {
        div.innerHTML += `<span style="color:#666;font-size:12px;">Official</span>`;
      }
      jsonListDiv.appendChild(div);
    });

    document.querySelectorAll('.json-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        jsonUrls.splice(i, 1);
        chrome.storage.sync.set({jsonUrls});
        updateJsonList();
        loadAllJsonData();
      });
    });
  }

  addJsonBtn.addEventListener('click', () => {
    const name = jsonNameInput.value.trim();
    const url = jsonInput.value.trim();
    if (!name || !url) return;

    if (!jsonUrls.find(j => j.url === url)) {
      jsonUrls.push({ name, url, official: false });
      jsonNameInput.value = '';
      jsonInput.value = '';
      updateJsonList();
      chrome.storage.sync.set({jsonUrls});
      loadAllJsonData();
    }
  });

  saveJsonBtn.addEventListener('click', () => {
    chrome.storage.sync.set({jsonUrls}, () => {
      alert('JSON saved!');
    });
  });

  function loadAllJsonData() {
    videoData = {};
    jsonUrls.forEach(item => {
      fetch(item.url)
        .then(res => res.json())
        .then(data => {
          videoData = {...videoData, ...data};
          loadHome();
        })
        .catch(err => console.warn('Failed to load JSON:', item.url));
    });
  }

  function loadHome() {
    homeView.innerHTML = 'Loading...';
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0];
      const url = tab?.url || '';

      if (!url.includes('youtube.com')) {
        homeView.innerHTML = "<span style='font-size:20px; font-weight:bold;'>You're not visiting YouTube!</span>";
        return;
      }

      const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
      if (match) {
        const videoId = match[1];
        const links = videoData[videoId];
        if (links && links.length > 0) {
          let html = '<b style="font-size:18px;">Found video! Here are the links:</b><br>';
          links.forEach(l => {
            html += `<a href="${l.url}" target="_blank" class="link-button">${l.name}</a>`;
          });
          homeView.innerHTML = html;
        } else {
          homeView.innerHTML = "<span style='font-size:20px; font-weight:bold;'>No found video.</span>";
        }
      } else {
        homeView.innerHTML = "<span style='font-size:20px; font-weight:bold;'>No found video.</span>";
      }
    });
  }

  loadHome();
});


