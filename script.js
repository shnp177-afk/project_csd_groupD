document.addEventListener("DOMContentLoaded", () => {
    setupTopicPanels();
    setupCodeTabs();
    setupTryItRunners();
});

function setupTopicPanels() {
    const pills = document.querySelectorAll(".topic-pill[data-topic]");
    const panels = document.querySelectorAll(".topic-panel[data-panel]");

    if (!pills.length || !panels.length) {
        return;
    }

    pills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const topic = pill.dataset.topic;

            pills.forEach((item) => item.classList.remove("active"));
            panels.forEach((panel) => panel.classList.remove("active"));

            pill.classList.add("active");

            const matchingPanel = document.querySelector(`.topic-panel[data-panel="${topic}"]`);
            if (matchingPanel) {
                matchingPanel.classList.add("active");
            }
        });
    });
}

function setupCodeTabs() {
    const tabs = document.querySelectorAll(".code-tab[data-target]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const tabGroup = tab.closest(".example-panel, .lesson-panel, .section-card");
            if (!tabGroup) {
                return;
            }

            tabGroup.querySelectorAll(".code-tab[data-target]").forEach((item) => {
                item.classList.remove("active");
            });

            tabGroup.querySelectorAll(".code-content").forEach((content) => {
                content.classList.remove("active");
            });

            tab.classList.add("active");

            const target = document.getElementById(tab.dataset.target);
            if (target) {
                target.classList.add("active");
            }
        });
    });
}

function setupTryItRunners() {
    document.querySelectorAll("[data-runner]").forEach((button) => {
        button.addEventListener("click", () => {
            const runner = button.dataset.runner;

            if (runner === "html") {
                runHtmlCode();
            }

            if (runner === "css") {
                runCssCode();
            }

            if (runner === "js") {
                runJsCode();
            }
        });
    });
}

function runHtmlCode() {
    const code = document.getElementById("htmlCode");
    const output = document.getElementById("htmlOutput");

    if (!code || !output) {
        return;
    }

    output.innerHTML = code.value;
}

function runCssCode() {
    const code = document.getElementById("cssCode");
    const output = document.getElementById("cssOutput");

    if (!code || !output) {
        return;
    }

    output.innerHTML = `
        <style>${code.value}</style>
        <div class="box">This box is styled by your CSS.</div>
    `;
}

function runJsCode() {
    const code = document.getElementById("jsCode");
    const output = document.getElementById("jsOutput");

    if (!code || !output) {
        return;
    }

    output.innerHTML = `
        <div id="counter" style="font-size: 2rem; font-weight: 800; color: #0f766e; margin-bottom: 14px;">0</div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="button" id="incrementBtn" class="button button-primary small-button">Increment</button>
            <button type="button" id="decrementBtn" class="button small-button" style="background:#e2e8f0;color:#0f172a;">Decrement</button>
        </div>
    `;

    try {
        const userFunctions = new Function(`${code.value}; return { increment, decrement };`);
        const functions = userFunctions();

        document.getElementById("incrementBtn").addEventListener("click", () => functions.increment());
        document.getElementById("decrementBtn").addEventListener("click", () => functions.decrement());
    } catch (error) {
        output.innerHTML = `<div class="output-card">JavaScript error: ${error.message}</div>`;
    }
}
