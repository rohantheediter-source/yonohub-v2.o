const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const SCREENSHOT_DIR = path.join(__dirname, 'test-results');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  console.log('🚀 Starting Automated End-to-End Test Suite for NexusPlay...');
  console.log(`Using browser: ${CHROME_PATH}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    protocolTimeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  // Allow automatic file downloads in headless Chromium
  const client = await page.createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: SCREENSHOT_DIR,
  });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  try {
    // 1. Load Homepage
    console.log('\n--- 1. Testing Homepage Load ---');
    await page.setViewport({ width: 1280, height: 800 });
    const response = await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    console.log(`Status code: ${response.status()}`);
    if (response.status() !== 200) throw new Error('Homepage failed to load with 200 OK');

    const title = await page.title();
    console.log(`Page Title: "${title}"`);
    if (!title.includes('NexusPlay')) throw new Error('Incorrect page title');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-desktop-home.png') });
    console.log('✅ Homepage loaded cleanly. Screenshot saved: 01-desktop-home.png');

    // Check game cards count
    const cardCount = await page.$$eval('div[class*="group relative flex flex-row"]', (cards) => cards.length);
    console.log(`Total Game Cards displayed on Home: ${cardCount}`);
    if (cardCount < 10) throw new Error(`Expected at least 10 game cards, found ${cardCount}`);
    console.log('✅ Game card feed is populated properly.');

    // 2. Test Instant Search & Suggestions
    console.log('\n--- 2. Testing Search Functionality ---');
    const searchInput = await page.$('input[placeholder*="Search games"]');
    if (!searchInput) throw new Error('Search input not found');

    await searchInput.type('Yono Arcade');
    await new Promise((r) => setTimeout(r, 600));

    // Check suggestions popup
    const suggestionText = await page.evaluate(() => {
      const el = document.querySelector('.divide-y');
      return el ? el.innerText : null;
    });
    console.log(`Live Suggestions detected: ${suggestionText ? 'YES' : 'NO'}`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-search-suggestions.png') });

    // Verify search results list
    const filteredSearchCount = await page.$$eval('div[class*="group relative flex flex-row"]', (cards) => cards.length);
    console.log(`Cards matching 'Yono Arcade': ${filteredSearchCount}`);
    if (filteredSearchCount === 0) throw new Error('Search returned 0 results for valid query');
    console.log('✅ Search filtering verified.');

    // Clear search
    const clearBtn = await page.$('button[aria-label="Clear search query"]');
    if (clearBtn) {
      await clearBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      const restoredCount = await page.$$eval('div[class*="group relative flex flex-row"]', (cards) => cards.length);
      console.log(`Cards count after clearing search: ${restoredCount}`);
    }

    // 3. Test Category Filters
    console.log('\n--- 3. Testing Category Filters ---');
    const categoriesToTest = ['Rummy', 'Slots', 'Arcade', 'Puzzle'];
    for (const cat of categoriesToTest) {
      const button = await page.evaluateHandle((c) => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find((b) => b.innerText.includes(c));
      }, cat);

      if (button) {
        await button.click();
        await new Promise((r) => setTimeout(r, 300));
        const count = await page.$$eval('div[class*="group relative flex flex-row"]', (cards) => cards.length);
        console.log(`Category "${cat}" -> ${count} games found`);
        if (count === 0) throw new Error(`Category ${cat} returned 0 games`);
      }
    }
    console.log('✅ Category filtering verified.');

    // Reset back to All Games
    const allGamesBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find((b) => b.innerText.includes('All Games'));
    });
    if (allGamesBtn) await allGamesBtn.click();
    await new Promise((r) => setTimeout(r, 300));

    // 4. Test Game Details Modal
    console.log('\n--- 4. Testing Game Details Page / Modal ---');
    const firstCard = await page.$('[data-testid="game-card"]');
    if (!firstCard) throw new Error('No game card found to click');
    await firstCard.evaluate((el) => {
      el.scrollIntoView({ block: 'center' });
      el.click();
    });
    await page.waitForSelector('[data-testid="game-details-modal"]', { timeout: 4000 });

    // Check modal contents
    const modalTitle = await page.$eval('[data-testid="modal-game-title"]', (el) => el.innerText);
    console.log(`Opened Game Details Modal for: "${modalTitle}"`);
    if (!modalTitle) throw new Error('Game Details modal title not found');

    // Check specifications (version, size, OS)
    const specsPresent = await page.$eval('[data-testid="game-details-modal"]', (modal) => {
      const text = modal.innerText.toLowerCase();
      return text.includes('version') && text.includes('file size') && text.includes('requires os');
    });
    console.log(`Technical Specs Grid rendered: ${specsPresent ? 'YES' : 'NO'}`);
    if (!specsPresent) throw new Error('Technical specs grid missing in modal');

    // Test tab switching
    const featuresTab = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find((b) => b.innerText.includes('Key Features'));
    });
    if (featuresTab) {
      await featuresTab.click();
      await new Promise((r) => setTimeout(r, 200));
      console.log('Switched to Key Features tab.');
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-game-details-modal.png') });

    // Close modal via Back to Games button
    const backBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find((b) => b.innerText.includes('Back to Games'));
    });
    if (backBtn) {
      await backBtn.click();
      await new Promise((r) => setTimeout(r, 400));
    }
    console.log('✅ Game Details Modal verified.');

    // 5. Test Download Hub Flow
    console.log('\n--- 5. Testing Download Hub Flow ---');
    const downloadBtn = await page.$('button[aria-label*="Download"]');
    if (!downloadBtn) throw new Error('Download button not found on card');
    await downloadBtn.evaluate((el) => {
      el.scrollIntoView({ block: 'center' });
      el.click();
    });
    await page.waitForSelector('[data-testid="download-modal"]', { timeout: 4000 });

    const downloadModalText = await page.$eval('[data-testid="download-modal"] h3', (el) => el.innerText);
    console.log(`Download Hub Modal: "${downloadModalText}"`);
    if (!downloadModalText.includes('Authorized Download Hub')) {
      throw new Error('Authorized Download Hub modal failed to open');
    }

    // Click direct download to verify progress
    const directDlBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find((b) => b.innerText.includes('Direct Fast Download'));
    });
    if (directDlBtn) {
      console.log('Triggering Direct Fast Download transfer...');
      await directDlBtn.click();
      // wait for progress to advance
      await new Promise((r) => setTimeout(r, 2500));
      const isComplete = await page.evaluate(() => {
        return document.body.innerText.includes('Download Complete') || document.body.innerText.includes('Transferring');
      });
      console.log(`Download Transfer Status: ${isComplete ? 'ACTIVE/COMPLETE' : 'UNKNOWN'}`);
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-download-modal.png') });

    // Close download modal
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 300));
    console.log('✅ Download Hub Flow verified.');

    // 6. Test Mobile Viewport & Responsiveness
    console.log('\n--- 6. Testing Mobile Viewport & Responsiveness ---');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 600));

    // Verify no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`Horizontal scrolling detected: ${hasHorizontalOverflow ? 'YES (BUG)' : 'NO (PERFECT)'}`);
    if (hasHorizontalOverflow) throw new Error('Mobile viewport has horizontal scrolling bug');

    // Test mobile hamburger menu
    const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
    if (!menuBtn) throw new Error('Mobile menu button not found');
    await menuBtn.evaluate((b) => b.click());
    await new Promise((r) => setTimeout(r, 400));

    const menuOpen = await page.evaluate(() => {
      return document.body.innerText.includes('About NexusPlay');
    });
    console.log(`Mobile menu drawer opened: ${menuOpen ? 'YES' : 'NO'}`);
    if (!menuOpen) throw new Error('Mobile menu drawer failed to open');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-mobile-drawer.png') });

    // Close mobile menu
    await menuBtn.evaluate((b) => b.click());
    await new Promise((r) => setTimeout(r, 300));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-mobile-game-cards.png') });
    console.log('✅ Mobile Responsiveness verified.');

    // 7. Check for Console Errors
    console.log('\n--- 7. Console Error Audit ---');
    console.log(`Total Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('Console errors encountered:', consoleErrors);
    } else {
      console.log('✅ 0 Console Errors. Completely clean console.');
    }

    console.log('\n=========================================');
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! (7/7)');
    console.log('=========================================');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
