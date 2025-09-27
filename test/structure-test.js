const fs = require('fs');
const path = require('path');

// Simple test to verify the application structure
function testAppStructure() {
    console.log('Testing MyApp structure...');
    
    const requiredFiles = [
        'package.json',
        'src/main.js',
        'src/preload.js',
        'src/index.html',
        'src/styles.css',
        'src/renderer.js'
    ];
    
    const missing = [];
    
    requiredFiles.forEach(file => {
        if (!fs.existsSync(path.join(__dirname, '..', file))) {
            missing.push(file);
        }
    });
    
    if (missing.length > 0) {
        console.error('Missing files:', missing);
        process.exit(1);
    }
    
    // Test package.json content
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    
    if (packageJson.main !== 'src/main.js') {
        console.error('Incorrect main entry point in package.json');
        process.exit(1);
    }
    
    if (!packageJson.scripts.start || !packageJson.scripts.build) {
        console.error('Missing required scripts in package.json');
        process.exit(1);
    }
    
    console.log('✓ All required files exist');
    console.log('✓ Package.json structure is correct');
    console.log('✓ Application structure test passed');
    
    return true;
}

if (require.main === module) {
    testAppStructure();
}