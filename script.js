/* =====================================================
   F1 Driver Rankings Website - JavaScript
   
   Handles DOM initialization, data management, rendering,
   animation application, and event listener setup for
   the Formula 1 Driver Rankings single-page application.
   
   Code Organization:
   1. Data Section - Driver standings array and validation
   2. DOM Utilities - Helper functions for DOM manipulation
   3. Rendering Functions - Card generation and initialization
   4. Animation Functions - Animation triggers and timing
   5. Event Listeners & Initialization - Page setup on load
   ===================================================== */

/* =====================================================
   SECTION 1: DATA SECTION
   
   Contains the driver standings array with 20 Formula 1
   drivers, configuration constants, and data validation
   function to ensure data consistency on page load.
   ===================================================== */

/**
 * Driver standings array containing Formula 1 drivers
 * Each driver object contains: id, position, name, team, country, points
 * Array is ordered by championship position (1-20)
 */
const driverStandings = [
  {
    id: 1,
    position: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    country: "🇳🇱 Netherlands",
    points: 437
  },
  {
    id: 2,
    position: 2,
    name: "Lando Norris",
    team: "McLaren",
    country: "🇬🇧 United Kingdom",
    points: 340
  },
  {
    id: 3,
    position: 3,
    name: "Carlos Sainz",
    team: "Ferrari",
    country: "🇪🇸 Spain",
    points: 290
  },
  {
    id: 4,
    position: 4,
    name: "Charles Leclerc",
    team: "Ferrari",
    country: "🇲🇨 Monaco",
    points: 280
  },
  {
    id: 5,
    position: 5,
    name: "Lewis Hamilton",
    team: "Mercedes",
    country: "🇬🇧 United Kingdom",
    points: 275
  },
  {
    id: 6,
    position: 6,
    name: "George Russell",
    team: "Mercedes",
    country: "🇬🇧 United Kingdom",
    points: 231
  },
  {
    id: 7,
    position: 7,
    name: "Oscar Piastri",
    team: "McLaren",
    country: "🇦🇺 Australia",
    points: 213
  },
  {
    id: 8,
    position: 8,
    name: "Fernando Alonso",
    team: "Aston Martin",
    country: "🇪🇸 Spain",
    points: 207
  },
  {
    id: 9,
    position: 9,
    name: "Yuki Tsunoda",
    team: "AlphaTauri",
    country: "🇯🇵 Japan",
    points: 125
  },
  {
    id: 10,
    position: 10,
    name: "Pierre Gasly",
    team: "Alpine",
    country: "🇫🇷 France",
    points: 112
  },
  {
    id: 11,
    position: 11,
    name: "Nico Hulkenberg",
    team: "Haas",
    country: "🇩🇪 Germany",
    points: 87
  },
  {
    id: 12,
    position: 12,
    name: "Lance Stroll",
    team: "Aston Martin",
    country: "🇨🇦 Canada",
    points: 79
  },
  {
    id: 13,
    position: 13,
    name: "Kevin Magnussen",
    team: "Haas",
    country: "🇩🇰 Denmark",
    points: 71
  },
  {
    id: 14,
    position: 14,
    name: "Alexander Albon",
    team: "Williams",
    country: "🇹🇭 Thailand",
    points: 61
  },
  {
    id: 15,
    position: 15,
    name: "Esteban Ocon",
    team: "Alpine",
    country: "🇫🇷 France",
    points: 53
  },
  {
    id: 16,
    position: 16,
    name: "Sergio Perez",
    team: "Red Bull Racing",
    country: "🇲🇽 Mexico",
    points: 45
  },
  {
    id: 17,
    position: 17,
    name: "Logan Sargeant",
    team: "Williams",
    country: "🇺🇸 United States",
    points: 34
  },
  {
    id: 18,
    position: 18,
    name: "Daniel Ricciardo",
    team: "RB",
    country: "🇦🇺 Australia",
    points: 28
  },
  {
    id: 19,
    position: 19,
    name: "Zhou Guanyu",
    team: "Alfa Romeo",
    country: "🇨🇳 China",
    points: 22
  },
  {
    id: 20,
    position: 20,
    name: "Valtteri Bottas",
    team: "Alfa Romeo",
    country: "🇫🇮 Finland",
    points: 20
  }
];

// Configuration constants
const CONFIG = {
    ANIMATION_DELAY_MS: 80,
    CARD_ANIMATION_DURATION: 600,
};

/**
 * Validates driver standings data for consistency
 * Checks: array size, unique positions, required properties, non-negative points
 * Logs warnings if validation fails
 * @returns {boolean} - True if data is valid, false otherwise
 */
function validateDriverData() {
    // Check array exists and has 20 drivers
    if (!Array.isArray(driverStandings) || driverStandings.length !== 20) {
        console.warn(`Driver standings validation failed: expected 20 drivers, found ${driverStandings.length}`);
        return false;
    }

    const positions = new Set();
    let isValid = true;

    // Validate each driver object
    driverStandings.forEach((driver, index) => {
        // Check required properties
        if (!driver.id || !driver.position || !driver.name || !driver.team || !driver.country || driver.points === undefined) {
            console.warn(`Driver at index ${index} missing required properties`);
            isValid = false;
        }

        // Check position is in valid range (1-20)
        if (driver.position < 1 || driver.position > 20) {
            console.warn(`Driver ${driver.name} has invalid position: ${driver.position}`);
            isValid = false;
        }

        // Check position uniqueness
        if (positions.has(driver.position)) {
            console.warn(`Duplicate position ${driver.position} found for drivers`);
            isValid = false;
        }
        positions.add(driver.position);

        // Check points are non-negative
        if (driver.points < 0) {
            console.warn(`Driver ${driver.name} has negative points: ${driver.points}`);
            isValid = false;
        }

        // Verify id matches array index (roughly)
        if (driver.id !== index + 1) {
            console.warn(`Driver ID ${driver.id} at index ${index} - mismatch with position ordering`);
        }
    });

    if (isValid) {
        // Validation successful - all 20 drivers loaded with valid properties
    }

    return isValid;
}

// Validate data on script load
validateDriverData();

/* =====================================================
   SECTION 2: DOM UTILITIES
   
   Helper functions for common DOM selection and element
   creation operations to reduce code duplication.
   ===================================================== */

/**
 * Utility function to query DOM elements
 * @param {string} selector - CSS selector string
 * @returns {Element} - Found element or null
 */
function querySelector(selector) {
    return document.querySelector(selector);
}

/**
 * Utility function to query all DOM elements
 * @param {string} selector - CSS selector string
 * @returns {NodeList} - Collection of found elements
 */
function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Utility function to create DOM element
 * @param {string} tag - HTML tag name
 * @param {string} className - CSS class name(s)
 * @param {string} textContent - Optional text content
 * @returns {Element} - Created element
 */
function createElement(tag, className = '', textContent = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

/* =====================================================
   SECTION 3: RENDERING FUNCTIONS
   
   Functions to render individual driver cards and
   initialize the complete driver rankings display
   from the data array.
   ===================================================== */

/**
 * Render a single driver card
 * Creates an article element with driver information
 * @param {Object} driver - Driver data object
 * @param {number} index - Array index for animation delay calculation
 * @returns {Element} - Driver card article element
 */
function renderDriverCard(driver, index) {
    const card = createElement('article', 'driver-card');
    card.setAttribute('data-driver-id', driver.id);
    card.setAttribute('data-position', driver.position);

    // Position/Rank
    const position = createElement('div', 'driver-position', driver.position);
    card.appendChild(position);

    // Driver Info Container
    const info = createElement('div', 'driver-info');
    
    const name = createElement('div', 'driver-name', driver.name);
    info.appendChild(name);

    const team = createElement('div', 'driver-team', driver.team);
    info.appendChild(team);

    const country = createElement('div', 'driver-country', driver.country);
    info.appendChild(country);

    card.appendChild(info);

    // Points
    const points = createElement('div', 'driver-points', driver.points);
    card.appendChild(points);

    // Add animation delay
    const delayMs = index * CONFIG.ANIMATION_DELAY_MS;
    card.style.animationDelay = `${delayMs}ms`;
    card.classList.add('fade-in-animation');

    return card;
}

/**
 * Initialize and populate driver rankings
 * Iterates through driverStandings array and renders each driver
 * Called on page load via DOMContentLoaded event
 */
function initializeRankings() {
    const driverList = querySelector('.driver-list');
    
    if (!driverList) {
        console.error('Driver list container not found');
        return;
    }

    // Clear existing content
    driverList.innerHTML = '';

    // Render each driver card
    driverStandings.forEach((driver, index) => {
        const card = renderDriverCard(driver, index);
        driverList.appendChild(card);
    });
}

/* =====================================================
   SECTION 4: ANIMATION FUNCTIONS
   
   Functions to apply CSS animation classes to page
   elements on load to trigger hero, car, and card
   animations with appropriate timing and delays.
   ===================================================== */

/**
 * Apply CSS animation classes to trigger page load animations
 * Adds animation classes to hero section, F1 car, and driver cards
 */
function applyAnimations() {
    // Animate hero elements
    const heroTitle = querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.animation = 'slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    const heroSubtitle = querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeIn 0.6s ease-out 0.2s both';
    }

    // Animate F1 car
    const f1Car = querySelector('.f1-car');
    if (f1Car) {
        f1Car.style.animation = 'carDrive 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    }

    // Trigger driver card fade-in animations
    const driverCards = querySelectorAll('.driver-card');
    driverCards.forEach((card, index) => {
        const delayMs = index * CONFIG.ANIMATION_DELAY_MS;
        card.style.animation = `fadeIn ${CONFIG.CARD_ANIMATION_DURATION}ms ease-out ${delayMs}ms both`;
    });
}

/* =====================================================
   SECTION 5: EVENT LISTENERS & INITIALIZATION
   
   DOMContentLoaded event listener that orchestrates
   page initialization including data loading, rendering,
   animations, and event listener setup.
   ===================================================== */

/**
 * DOMContentLoaded event listener
 * Initializes page content and animations when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize driver rankings data and rendering
    initializeRankings();

    // Apply animations to page elements
    applyAnimations();

    // Set up hover event listeners for driver cards
    setupDriverCardHoverListeners();
});

/**
 * Setup hover event listeners for driver cards
 * Allows CSS :hover to handle visual effects
 */
function setupDriverCardHoverListeners() {
    const driverCards = querySelectorAll('.driver-card');
    
    driverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });

        // Touch support for mobile devices
        card.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });

        card.addEventListener('touchend', function() {
            this.classList.remove('hover');
        });
    });
}
