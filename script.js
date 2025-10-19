const dataUrl = "data.json";
const storageKey = "atomic-checklist-state-v1";
let checklistData = [];

async function fetchChecklistData() {
    const response = await fetch(dataUrl, { cache: "no-cache" });
    if (!response.ok) {
        throw new Error(`Failed to load checklist data (${response.status} ${response.statusText})`);
    }
    return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const checklistContainer = document.getElementById("checklist");
    const overallProgressEl = document.getElementById("overall-progress");
    const resetButton = document.getElementById("reset-progress");

    // Add event listener for search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            filterChecklistItems(e.target.value);
        });
    }

    try {
        checklistData = await fetchChecklistData();
    } catch (error) {
        console.error("Unable to load checklist content", error);
        if (checklistContainer) {
            checklistContainer.innerHTML = "<p class=\"load-error\">Unable to load checklist data. Please refresh or serve the page over a local web server.</p>";
        }
        if (overallProgressEl) {
            overallProgressEl.textContent = "N/A";
        }
        return;
    }

    if (!checklistContainer || !overallProgressEl || !resetButton) {
        return;
    }

    const chaptersMeta = [];
    const state = loadState();

    checklistData.forEach((chapter) => {
        const chapterSlug = slugify(chapter.chapter);
        const chapterCard = document.createElement("article");
        chapterCard.className = "chapter-card";

        const chapterContent = document.createElement("div");
        chapterContent.className = "chapter-content";

        const header = document.createElement("div");
        header.className = "chapter-header";

        const headerText = document.createElement("div");
        headerText.className = "chapter-text";

        const titleEl = document.createElement("h2");
        titleEl.className = "chapter-title";
        titleEl.textContent = chapter.chapter;

        const summaryEl = document.createElement("p");
        summaryEl.className = "chapter-meta";
        summaryEl.textContent = chapter.summary;

        headerText.append(titleEl, summaryEl);

        const progressWrap = document.createElement("div");
        progressWrap.className = "chapter-progress";

        const progressPercent = document.createElement("span");
        progressPercent.className = "chapter-progress-percent";
        progressPercent.textContent = "0%";

        const progressCount = document.createElement("span");
        progressCount.className = "chapter-progress-count";
        progressCount.textContent = "0 of 0 complete";

        progressWrap.append(progressPercent, progressCount);

        header.append(headerText, progressWrap);

        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        const progressFill = document.createElement("div");
        progressFill.className = "progress-bar-fill";
        progressBar.append(progressFill);

        const sectionsWrap = document.createElement("div");
        sectionsWrap.className = "chapter-sections";

        const meta = {
            slug: chapterSlug,
            items: [],
            fillEl: progressFill,
            percentEl: progressPercent,
            countEl: progressCount
        };

        chapter.sections.forEach((section) => {
            const sectionEl = document.createElement("section");
            sectionEl.className = "check-section";

            const sectionTitle = document.createElement("h3");
            sectionTitle.className = "section-title";
            sectionTitle.textContent = section.title;

            const itemsList = document.createElement("div");
            itemsList.className = "checklist-items";

            section.items.forEach((item) => {
                const { element, key, checkbox } = createChecklistItem({
                    chapterSlug,
                    sectionTitle: section.title,
                    item,
                    state
                });
                meta.items.push({ key, checkbox, element });
                itemsList.appendChild(element);
            });

            sectionEl.append(sectionTitle, itemsList);
            sectionsWrap.appendChild(sectionEl);
        });

        chapterContent.append(header, progressBar, sectionsWrap);
        chapterCard.appendChild(chapterContent);
        checklistContainer.appendChild(chapterCard);
        chaptersMeta.push(meta);
    });

    chaptersMeta.forEach((meta) => updateChapterProgress(meta));
    updateOverallProgress();

    if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise().catch((error) => {
            console.warn("MathJax rendering failed", error);
        });
    }

    resetButton.addEventListener("click", () => {
        if (!window.confirm("Reset all checklist progress?")) {
            return;
        }
        clearState();
        stateKeys(state).forEach((key) => delete state[key]);
        chaptersMeta.forEach((meta) => {
            meta.items.forEach(({ key, checkbox, element }) => {
                checkbox.checked = false;
                element.dataset.checked = "false";
                delete state[key];
            });
            updateChapterProgress(meta);
        });
        saveState(state);
        updateOverallProgress();
    });

    const toggleButton = document.getElementById("toggle-colors");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            isAnimating = !isAnimating;
            toggleButton.textContent = isAnimating ? "Pause Colors" : "Resume Colors";
            if (isAnimating) {
                animateColors();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    }

    const slowerButton = document.getElementById("slower-colors");
    if (slowerButton) {
        slowerButton.addEventListener("click", () => {
            shiftSpeed = Math.max(0.1, shiftSpeed - 0.1);
        });
    }

    const fasterButton = document.getElementById("faster-colors");
    if (fasterButton) {
        fasterButton.addEventListener("click", () => {
            shiftSpeed = Math.min(2.0, shiftSpeed + 0.1);
        });
    }

    const exportButton = document.getElementById("export-progress");
    if (exportButton) {
        exportButton.addEventListener("click", () => {
            const progress = {
                date: new Date().toISOString(),
                overall: parseInt(overallProgressEl.textContent),
                chapters: chaptersMeta.map(meta => ({
                    title: meta.slug,
                    progress: parseInt(meta.percentEl.textContent),
                    completed: meta.items.filter(item => item.checkbox.checked).length,
                    total: meta.items.length
                }))
            };
            
            const dataStr = JSON.stringify(progress, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `atomic-checklist-progress-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }

    // Timer controls
    const timerToggle = document.getElementById("timer-toggle");
    if (timerToggle) {
        timerToggle.addEventListener("click", () => {
            if (timerInterval) {
                pauseTimer();
            } else {
                startTimer();
            }
        });
    }

    const timerReset = document.getElementById("timer-reset");
    if (timerReset) {
        timerReset.addEventListener("click", resetTimer);
    }

    function updateOverallProgress() {
        const totals = chaptersMeta.reduce((acc, meta) => {
            const checked = meta.items.filter(({ checkbox }) => checkbox.checked).length;
            acc.checked += checked;
            acc.total += meta.items.length;
            return acc;
        }, { checked: 0, total: 0 });

        const percent = totals.total ? Math.round((totals.checked / totals.total) * 100) : 0;
        overallProgressEl.textContent = `${percent}%`;
    }

    function updateChapterProgress(meta) {
        const total = meta.items.length;
        const checked = meta.items.filter(({ checkbox }) => checkbox.checked).length;
        const percent = total ? Math.round((checked / total) * 100) : 0;

        meta.fillEl.style.width = `${percent}%`;
        meta.percentEl.textContent = `${percent}%`;
        meta.countEl.textContent = `${checked} of ${total} complete`;
        
        // Achievement system
        const chapterCard = meta.fillEl.closest('.chapter-card');
        const isCompleted = percent === 100;
        chapterCard.setAttribute('data-completed', isCompleted);
        
        if (isCompleted && !chapterCard.hasAttribute('data-celebrated')) {
            chapterCard.setAttribute('data-celebrated', 'true');
            // Could add celebration animation here
        }
    }

    function handleToggle(meta, entry) {
        entry.element.dataset.checked = entry.checkbox.checked ? "true" : "false";
        if (entry.checkbox.checked) {
            state[entry.key] = true;
        } else {
            delete state[entry.key];
        }
        saveState(state);
        updateChapterProgress(meta);
        updateOverallProgress();
    }

    chaptersMeta.forEach((meta) => {
        meta.items.forEach((entry) => {
            entry.checkbox.addEventListener("change", () => handleToggle(meta, entry));
        });
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === "INPUT") return;
        
        switch(e.key.toLowerCase()) {
            case "p":
                e.preventDefault();
                document.getElementById("toggle-colors")?.click();
                break;
            case "s":
                e.preventDefault();
                document.getElementById("timer-toggle")?.click();
                break;
            case "r":
                e.preventDefault();
                document.getElementById("timer-reset")?.click();
                break;
            case "/":
                e.preventDefault();
                document.getElementById("search-input")?.focus();
                break;
        }
    });

    // (Duplicate search input event listener removed)
});

function filterChecklistItems(query) {
    const allItems = document.querySelectorAll(".check-item-wrapper");
    const allSections = document.querySelectorAll(".check-section");
    const allChapters = document.querySelectorAll(".chapter-card");
    
    // Trim and prepare query
    query = query.trim().toLowerCase();
    
    if (!query) {
        // Show all items, sections, and chapters
        allItems.forEach(item => item.style.display = "");
        allSections.forEach(section => section.style.display = "");
        allChapters.forEach(chapter => chapter.style.display = "");
        return;
    }
    
    // Hide all items initially
    allItems.forEach(item => item.style.display = "none");
    allSections.forEach(section => section.style.display = "none");
    allChapters.forEach(chapter => chapter.style.display = "none");
    
    // Find matching items and show them
    allItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = "";
        }
    });
    
    // Show sections that have visible items
    allSections.forEach(section => {
        const visibleItems = section.querySelectorAll('.check-item-wrapper[style=""]');
        if (visibleItems.length > 0) {
            section.style.display = "";
        }
    });
    
    // Show chapters that have visible sections
    allChapters.forEach(chapter => {
        const visibleSections = chapter.querySelectorAll('.check-section[style=""]');
        if (visibleSections.length > 0) {
            chapter.style.display = "";
        }
    });
}

function createChecklistItem({ chapterSlug, sectionTitle, item, state }) {
    const key = [chapterSlug, slugify(sectionTitle), slugify(item.label || item.detail || item.text)].join("::");
    const checked = Boolean(state[key]);

    const wrapper = document.createElement("div");
    wrapper.className = "check-item-wrapper";
    wrapper.dataset.checked = checked ? "true" : "false";
    wrapper.dataset.key = key;

    const label = document.createElement("label");
    label.className = "check-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.setAttribute("aria-label", item.label || item.text || "Checklist item");

    const content = document.createElement("span");
    content.innerHTML = formatItemContent(item);

    label.append(checkbox, content);
    wrapper.append(label);

    if (Array.isArray(item.derivation) && item.derivation.length) {
        const details = document.createElement("details");
        details.className = "derivation-details";

        const summary = document.createElement("summary");
        summary.textContent = item.derivationSummary || "Show derivation steps";

        const body = document.createElement("div");
        body.className = "derivation-body";
        body.innerHTML = renderDerivationEntries(item.derivation);

        details.append(summary, body);
        wrapper.append(details);

        details.addEventListener("toggle", () => {
            if (details.open && window.MathJax?.typesetPromise) {
                window.MathJax.typesetPromise([details]).catch((error) => {
                    console.warn("MathJax rendering failed", error);
                });
            }
        });
    }

    return { element: wrapper, key, checkbox };
}

function formatItemContent(item) {
    if (item.type === "equation") {
        const detail = Array.isArray(item.detail)
            ? item.detail.map((eq) => toEquationHTML(eq)).join("<br>")
            : toEquationHTML(item.detail);
        return item.label ? `<strong>${escapeHtml(item.label)}:</strong> ${detail}` : detail;
    }

    if (item.label && item.detail) {
        return `<strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.detail)}`;
    }

    if (item.text) {
        return escapeHtml(item.text);
    }

    return "";
}

function renderDerivationEntries(entries) {
    return entries.map((entry) => {
        if (!entry || typeof entry !== "object") {
            return "";
        }

        switch (entry.type) {
            case "heading":
                return `<h4 class="derivation-heading">${renderTextWithMath(entry.text || "")}</h4>`;
            case "equation":
                return `<div class="derivation-equation">${toEquationHTML(entry.tex || entry.text || "", { display: Boolean(entry.display) })}</div>`;
            case "list":
                if (!Array.isArray(entry.items) || !entry.items.length) {
                    return "";
                }
                return `<ul class="derivation-list">${entry.items.map((itemText) => `<li>${renderTextWithMath(itemText)}</li>`).join("")}</ul>`;
            case "text":
            default:
                return `<p class="derivation-text">${renderTextWithMath(entry.text || "")}</p>`;
        }
    }).join("");
}

function toEquationHTML(value, options = {}) {
    const { display = false } = options;
    const delimiter = display ? ["\\[", "\\]"] : ["\\(", "\\)"];
    const tagName = display ? "div" : "span";
    const element = document.createElement(tagName);
    element.className = display ? "equation equation-display" : "equation";
    element.textContent = `${delimiter[0]}${String(value)}${delimiter[1]}`;
    return element.outerHTML;
}

function renderTextWithMath(text) {
    if (!text) {
        return "";
    }

    const delimiters = [
        { start: "\\\\[", end: "\\\\]" },
        { start: "\\\\(", end: "\\\\)" },
        { start: "$$", end: "$$" },
        { start: "$", end: "$" }
    ];

    let cursor = 0;
    let output = "";

    while (cursor < text.length) {
        let match = null;
        for (const delim of delimiters) {
            if (text.startsWith(delim.start, cursor)) {
                match = delim;
                break;
            }
        }

        if (!match) {
            let next = text.length;
            for (const delim of delimiters) {
                const pos = text.indexOf(delim.start, cursor);
                if (pos !== -1 && pos < next) {
                    next = pos;
                }
            }
            output += escapeHtml(text.slice(cursor, next));
            cursor = next;
            continue;
        }

        const startIndex = cursor + match.start.length;
        const endIndex = text.indexOf(match.end, startIndex);
        if (endIndex === -1) {
            output += escapeHtml(text.slice(cursor));
            break;
        }

        const mathSegment = text.slice(cursor, endIndex + match.end.length);
        output += mathSegment;
        cursor = endIndex + match.end.length;
    }

    return output;
}

function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function loadState() {
    try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.warn("Unable to load checklist progress", error);
        return {};
    }
}

function saveState(state) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
        console.warn("Unable to save checklist progress", error);
    }
}

function clearState() {
    try {
        localStorage.removeItem(storageKey);
    } catch (error) {
        console.warn("Unable to clear checklist progress", error);
    }
}

function stateKeys(state) {
    return Object.keys(state || {});
}

// Color shifting for Tron effect
let hue = 240; // starting with blue
const tronHues = [240, 180, 120, 60, 0, 300]; // blue, cyan, green, yellow, red, magenta
let hueIndex = 0;
let isAnimating = true;
let animationId = null;
let shiftSpeed = 0.5; // degrees per frame

let timerInterval = null;
let startTime = null;
let elapsedTime = 0;

function animateColors() {
    if (!isAnimating) return;
    
    hue = (hue + shiftSpeed) % 360;
    document.documentElement.style.setProperty('--hue', hue);
    
    animationId = requestAnimationFrame(animateColors);
}

function updateTimer() {
    const now = Date.now();
    const diff = elapsedTime + (timerInterval ? now - startTime : 0);
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    const timerEl = document.getElementById("timer");
    if (timerEl) {
        timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function startTimer() {
    if (!timerInterval) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        const toggleBtn = document.getElementById("timer-toggle");
        if (toggleBtn) toggleBtn.textContent = "Pause Study";
    }
}

function pauseTimer() {
    if (timerInterval) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        timerInterval = null;
        const toggleBtn = document.getElementById("timer-toggle");
        if (toggleBtn) toggleBtn.textContent = "Resume Study";
    }
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    elapsedTime = 0;
    startTime = null;
    updateTimer();
    const toggleBtn = document.getElementById("timer-toggle");
    if (toggleBtn) toggleBtn.textContent = "Start Study";
}

// Start animation after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    animateColors();
    
    // Create particles
    const particlesContainer = document.getElementById("particles");
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 8 + "s";
            particlesContainer.appendChild(particle);
        }
    }
});
