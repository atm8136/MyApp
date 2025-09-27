// DOM Elements
const platformElement = document.getElementById('platform');
const versionElement = document.getElementById('version');
const statusElement = document.getElementById('status');

// Button elements
const btnNew = document.getElementById('btn-new');
const btnOpen = document.getElementById('btn-open');
const btnSettings = document.getElementById('btn-settings');
const btnHelp = document.getElementById('btn-help');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Update platform information
    if (window.electronAPI) {
        platformElement.textContent = formatPlatformName(window.electronAPI.platform);
    } else {
        platformElement.textContent = 'Web Browser';
    }
    
    // Set status to ready
    statusElement.textContent = 'Ready';
    statusElement.style.color = '#28a745';
    
    console.log('MyApp initialized successfully');
}

function setupEventListeners() {
    // New project button
    btnNew.addEventListener('click', () => {
        handleNewProject();
    });
    
    // Open file button
    btnOpen.addEventListener('click', () => {
        handleOpenFile();
    });
    
    // Settings button
    btnSettings.addEventListener('click', () => {
        handleSettings();
    });
    
    // Help button
    btnHelp.addEventListener('click', () => {
        handleHelp();
    });
}

function formatPlatformName(platform) {
    const platformNames = {
        'win32': 'Windows',
        'darwin': 'macOS',
        'linux': 'Linux'
    };
    
    return platformNames[platform] || platform;
}

function handleNewProject() {
    updateStatus('Creating new project...', 'info');
    
    // Simulate project creation
    setTimeout(() => {
        showNotification('New project created successfully!', 'success');
        updateStatus('Ready', 'success');
        
        // You can add actual project creation logic here
        console.log('New project created');
    }, 1000);
}

function handleOpenFile() {
    updateStatus('Opening file...', 'info');
    
    // If running in Electron, use the native file dialog
    if (window.electronAPI && window.electronAPI.openFile) {
        window.electronAPI.openFile().then(result => {
            if (result) {
                showNotification('File opened successfully!', 'success');
                updateStatus('Ready', 'success');
            }
        }).catch(error => {
            console.error('Error opening file:', error);
            showNotification('Error opening file', 'error');
            updateStatus('Ready', 'success');
        });
    } else {
        // Fallback for web version
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                showNotification(`Opened: ${file.name}`, 'success');
                updateStatus('Ready', 'success');
                console.log('File selected:', file.name);
            }
        };
        input.click();
    }
}

function handleSettings() {
    updateStatus('Opening settings...', 'info');
    
    // Create a simple settings modal
    const settingsModal = createSettingsModal();
    document.body.appendChild(settingsModal);
    
    updateStatus('Ready', 'success');
}

function handleHelp() {
    updateStatus('Opening help...', 'info');
    
    const helpContent = `
        <div style="max-width: 500px; margin: 0 auto; text-align: left;">
            <h3 style="margin-bottom: 15px;">MyApp Help</h3>
            <p style="margin-bottom: 10px;"><strong>New Project:</strong> Create a new project or workspace</p>
            <p style="margin-bottom: 10px;"><strong>Open File:</strong> Open existing files using the system file dialog</p>
            <p style="margin-bottom: 10px;"><strong>Settings:</strong> Configure application preferences</p>
            <p style="margin-bottom: 15px;"><strong>Help:</strong> Show this help dialog</p>
            <p style="color: #666;">This application is designed to work with dhadon.com UI or similar platforms, providing a seamless desktop experience.</p>
        </div>
    `;
    
    showModal('Help', helpContent);
    updateStatus('Ready', 'success');
}

function createSettingsModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 20px;">Settings</h3>
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Theme:</label>
            <select style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
            </select>
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" style="margin-right: 8px;" checked>
                Enable notifications
            </label>
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button id="settings-cancel" style="padding: 8px 16px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">Cancel</button>
            <button id="settings-save" style="padding: 8px 16px; border: none; background: #667eea; color: white; border-radius: 4px; cursor: pointer;">Save</button>
        </div>
    `;
    
    modal.appendChild(content);
    
    // Event listeners for modal
    modal.querySelector('#settings-cancel').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('#settings-save').addEventListener('click', () => {
        showNotification('Settings saved successfully!', 'success');
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

function showModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
    `;
    
    modalContent.innerHTML = `
        <h2 style="margin-bottom: 20px; text-align: center;">${title}</h2>
        ${content}
        <div style="text-align: center; margin-top: 20px;">
            <button id="modal-close" style="padding: 10px 20px; border: none; background: #667eea; color: white; border-radius: 4px; cursor: pointer;">Close</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => document.body.removeChild(modal);
    modal.querySelector('#modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function updateStatus(message, type = 'info') {
    statusElement.textContent = message;
    
    const colors = {
        'info': '#007bff',
        'success': '#28a745',
        'warning': '#ffc107',
        'error': '#dc3545'
    };
    
    statusElement.style.color = colors[type] || colors.info;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}