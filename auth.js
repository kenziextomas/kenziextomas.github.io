(function() {
  // GTA Avatars
  const avatars = [
    { name: 'CJ', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=CJ&backgroundColor=b6e3f4' },
    { name: 'Ryder', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Ryder&backgroundColor=c0aede' },
    { name: 'Smoke', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Smoke&backgroundColor=d1d4f9' },
    { name: 'Sweet', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Sweet&backgroundColor=ffdfbf' },
    { name: 'Caesar', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Caesar&backgroundColor=ffd5dc' },
    { name: 'Tenpenny', url: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Tenpenny&backgroundColor=c1f4e5' }
  ];

  // Inject Auth Modal HTML
  const authModalHTML = `
    <div id="auth-modal" class="auth-modal-overlay">
      <div class="auth-modal-container">
        <button class="auth-modal-close" id="close-auth"><i class="fas fa-times"></i></button>
        
        <div class="auth-tabs">
          <button class="auth-tab active" data-tab="login">Masuk</button>
          <button class="auth-tab" data-tab="register">Daftar</button>
        </div>

        <!-- Login Form -->
        <form id="login-form" class="auth-form active">
          <h3 class="pricedownbl-text">Selamat Datang Kembali</h3>
          <div class="form-group">
            <label><i class="fas fa-user"></i> Username</label>
            <input type="text" id="login-username" placeholder="Masukkan username..." required>
          </div>
          <div class="form-group">
            <label><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="login-password" placeholder="Masukkan password..." required>
          </div>
          <button type="submit" class="btn-gta-style auth-submit">MASUK</button>
        </form>

        <!-- Register Form -->
        <form id="register-form" class="auth-form">
          <h3 class="pricedownbl-text">Buat Akun Baru</h3>
          <div class="form-group">
            <label><i class="fas fa-user"></i> Username</label>
            <input type="text" id="reg-username" placeholder="Pilih username..." required>
          </div>
          <div class="form-group">
            <label><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="reg-email" placeholder="Masukkan email..." required>
          </div>
          <div class="form-group">
            <label><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="reg-password" placeholder="Buat password..." required>
          </div>
          <button type="submit" class="btn-gta-style auth-submit">DAFTAR</button>
        </form>

        <!-- Profile View -->
        <div id="profile-view" class="auth-form profile-view-enhanced">
          <div class="profile-main-header">
            <h3 class="pricedownbl-text">Profil Saya</h3>
            <button class="edit-profile-btn" title="Edit Profil"><i class="fas fa-edit"></i></button>
          </div>
          
          <div class="profile-header">
            <div class="profile-avatar-container">
              <img id="profile-img" src="${avatars[0].url}" alt="Avatar" class="profile-img-large">
              <div class="avatar-edit-overlay"><i class="fas fa-camera"></i></div>
            </div>
            <div class="profile-info">
              <h2 id="profile-username">User</h2>
              <p id="profile-email">user@example.com</p>
              <div class="profile-badge">MEMBER SILVER</div>
            </div>
          </div>

          <!-- Avatar Picker (Hidden by default) -->
          <div id="avatar-picker" class="avatar-picker-section" style="display: none;">
            <div class="profile-section-title">PILIH FOTO PROFIL</div>
            <div class="avatar-grid">
              ${avatars.map((av, index) => `
                <div class="avatar-option" data-url="${av.url}">
                  <img src="${av.url}" alt="${av.name}">
                </div>
              `).join('')}
            </div>
          </div>

          <div class="profile-section-title">STATISTIK KARAKTER</div>
          <div class="profile-stats-grid">
            <div class="p-stat-card"><i class="fas fa-level-up-alt"></i><div class="p-stat-info"><span>Level</span><span id="p-level" class="p-stat-val">1</span></div></div>
            <div class="p-stat-card"><i class="fas fa-fist-raised"></i><div class="p-stat-info"><span>Respect</span><span id="p-respect" class="p-stat-val">+0</span></div></div>
            <div class="p-stat-card"><i class="fas fa-money-bill-wave"></i><div class="p-stat-info"><span>Cash</span><span id="p-cash" class="p-stat-val">$0</span></div></div>
            <div class="p-stat-card"><i class="fas fa-university"></i><div class="p-stat-info"><span>Bank</span><span id="p-bank" class="p-stat-val">$0</span></div></div>
            <div class="p-stat-card"><i class="fas fa-briefcase"></i><div class="p-stat-info"><span>Pekerjaan</span><span id="p-job" class="p-stat-val">Pengangguran</span></div></div>
            <div class="p-stat-card"><i class="fas fa-phone"></i><div class="p-stat-info"><span>No. HP</span><span id="p-phone" class="p-stat-val">None</span></div></div>
          </div>

          <div class="profile-section-title">AKTIVITAS TERBARU</div>
          <div class="profile-activity">
            <div class="activity-item"><i class="fas fa-user-plus"></i><div class="activity-info"><span>Baru Bergabung</span><small>Baru saja</small></div></div>
          </div>

          <button id="logout-btn" class="btn-gta-style auth-submit logout-btn">KELUAR DARI SESI</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', authModalHTML);

  // Auth Elements
  const authModal = document.getElementById('auth-modal');
  const closeAuth = document.getElementById('close-auth');
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const profileView = document.getElementById('profile-view');
  const logoutBtn = document.getElementById('logout-btn');
  const avatarPicker = document.getElementById('avatar-picker');
  const avatarEditOverlay = document.querySelector('.avatar-edit-overlay');

  // Check login state on load
  const checkAuthState = () => {
    const user = JSON.parse(localStorage.getItem('tomas_user'));
    const currentAuthBtn = document.getElementById('auth-btn');
    const currentAuthBtnText = document.getElementById('auth-btn-text');
    
    if (user && currentAuthBtnText) {
      currentAuthBtnText.innerText = user.username;
      currentAuthBtn.classList.add('active');
      
      // Update Profile Fields
      const pUser = document.getElementById('profile-username');
      const pEmail = document.getElementById('profile-email');
      const pImg = document.getElementById('profile-img');
      
      if (pUser) pUser.innerText = user.username;
      if (pEmail) pEmail.innerText = user.email || (user.username + '@tomas.com');
      if (pImg) pImg.src = user.avatar || avatars[0].url;

      if (user.stats) {
        if (document.getElementById('p-level')) document.getElementById('p-level').innerText = user.stats.level;
        if (document.getElementById('p-respect')) document.getElementById('p-respect').innerText = '+' + user.stats.respect;
        if (document.getElementById('p-cash')) document.getElementById('p-cash').innerText = '$' + user.stats.cash.toLocaleString();
        if (document.getElementById('p-bank')) document.getElementById('p-bank').innerText = '$' + user.stats.bank.toLocaleString();
        if (document.getElementById('p-job')) document.getElementById('p-job').innerText = user.stats.job;
        if (document.getElementById('p-phone')) document.getElementById('p-phone').innerText = user.stats.phone;
      }
    } else if (currentAuthBtnText) {
      currentAuthBtnText.innerText = 'Akun';
      currentAuthBtn.classList.remove('active');
    }
  };

  // Initial Check
  checkAuthState();

  // Delegation for auth triggers
  document.addEventListener('click', (e) => {
    if (e.target.closest('#auth-btn')) {
      e.preventDefault();
      authModal.classList.add('active');
      const user = JSON.parse(localStorage.getItem('tomas_user'));
      if (user) {
        showAuthView('profile');
      } else {
        showAuthView('login');
      }
    }
  });

  if (closeAuth) {
    closeAuth.addEventListener('click', () => authModal.classList.remove('active'));
  }

  // Tab Switching
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showAuthView(tab.dataset.tab);
    });
  });

  function showAuthView(viewId) {
    authForms.forEach(form => form.classList.remove('active'));
    if (viewId === 'login') loginForm.classList.add('active');
    if (viewId === 'register') registerForm.classList.add('active');
    if (viewId === 'profile') {
      profileView.classList.add('active');
      avatarPicker.style.display = 'none'; // Ensure picker is closed on view switch
    }
    
    const tabsContainer = document.querySelector('.auth-tabs');
    if (tabsContainer) {
      tabsContainer.style.display = (viewId === 'profile') ? 'none' : 'flex';
    }
  }

  // Avatar Edit
  if (avatarEditOverlay) {
    avatarEditOverlay.addEventListener('click', () => {
      avatarPicker.style.display = (avatarPicker.style.display === 'none') ? 'block' : 'none';
    });
  }

  // Select Avatar
  document.addEventListener('click', (e) => {
    const option = e.target.closest('.avatar-option');
    if (option) {
      const url = option.dataset.url;
      const user = JSON.parse(localStorage.getItem('tomas_user'));
      if (user) {
        user.avatar = url;
        localStorage.setItem('tomas_user', JSON.stringify(user));
        
        // Update in DB
        const users = JSON.parse(localStorage.getItem('tomas_users_db')) || [];
        const index = users.findIndex(u => u.username === user.username);
        if (index !== -1) {
          users[index].avatar = url;
          localStorage.setItem('tomas_users_db', JSON.stringify(users));
        }

        document.getElementById('profile-img').src = url;
        avatarPicker.style.display = 'none';
        alert('Foto profil berhasil diperbarui!');
      }
    }
  });

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const users = JSON.parse(localStorage.getItem('tomas_users_db')) || [];
      const user = users.find(u => u.username === username);

      if (user) {
        localStorage.setItem('tomas_user', JSON.stringify(user));
        checkAuthState();
        authModal.classList.remove('active');
        alert('Selamat datang kembali, ' + username + '!');
      } else {
        alert('User tidak ditemukan! Silakan daftar terlebih dahulu.');
      }
    });
  }

  // Handle Register
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-username').value;
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;

      const users = JSON.parse(localStorage.getItem('tomas_users_db')) || [];
      if (users.some(u => u.username === username)) {
        alert('Username sudah terdaftar!');
        return;
      }

      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)].url;
      const newUser = { 
        username, 
        email, 
        password,
        avatar: randomAvatar,
        stats: {
          level: Math.floor(Math.random() * 50) + 1,
          respect: Math.floor(Math.random() * 1000),
          cash: Math.floor(Math.random() * 50000) + 500,
          bank: Math.floor(Math.random() * 1000000) + 5000,
          job: ['Supir Truk', 'Mekanik', 'Petani', 'Penambang', 'Polisi', 'Medis'][Math.floor(Math.random() * 6)],
          phone: '555-' + Math.floor(1000 + Math.random() * 9000)
        }
      };
      
      users.push(newUser);
      localStorage.setItem('tomas_users_db', JSON.stringify(users));
      localStorage.setItem('tomas_user', JSON.stringify(newUser));

      checkAuthState();
      authModal.classList.remove('active');
      alert('Akun berhasil dibuat! Selamat bergabung, ' + username + '.');
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('tomas_user');
      checkAuthState();
      authModal.classList.remove('active');
      alert('Anda telah keluar.');
    });
  }

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('active');
  });
})();
