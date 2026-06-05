class WorldCup2026Panel extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  connectedCallback() {
    this.page = this.page || "overview";
    this.render();
  }

  setPage(page) {
    this.page = page;
    this.render();
  }

  render() {
    if (!this._hass) return;

    const pages = {
      overview: "Overview",
      fixtures: "Fixtures",
      groups: "Groups",
      knockout: "Knockout",
      stats: "Stats",
      records: "Records",
      languages: "Languages",
    };

    this.innerHTML = `
      <style>
        .wc-app {
          min-height: 100vh;
          padding: 24px;
          box-sizing: border-box;
          background: radial-gradient(circle at top, #0b4ea2 0%, #06172f 45%, #020814 100%);
          color: white;
          font-family: var(--primary-font-family, Arial, sans-serif);
        }

        .wc-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-bottom: 22px;
        }

        .wc-title {
          font-size: 34px;
          font-weight: 900;
        }

        .wc-subtitle {
          opacity: .85;
          margin-top: 5px;
        }

        .wc-badge {
          border-radius: 999px;
          padding: 10px 14px;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.22);
          font-weight: 800;
          white-space: nowrap;
        }

        .wc-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .wc-tab {
          border: 1px solid rgba(255,255,255,.25);
          background: rgba(255,255,255,.10);
          color: white;
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 800;
          cursor: pointer;
        }

        .wc-tab.active {
          background: white;
          color: #06172f;
        }

        .wc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .wc-card {
          background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.20);
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 12px 30px rgba(0,0,0,.25);
          backdrop-filter: blur(12px);
        }

        .wc-card h2, .wc-card h3 {
          margin-top: 0;
        }

        .wc-big {
          font-size: 38px;
          font-weight: 900;
        }

        .wc-muted {
          opacity: .8;
        }

        .wc-table {
          width: 100%;
          border-collapse: collapse;
          overflow: hidden;
          border-radius: 16px;
        }

        .wc-table th, .wc-table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,.14);
          text-align: left;
        }

        .wc-table th {
          background: rgba(255,255,255,.12);
        }

        .wc-bracket {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 14px;
        }

        .wc-match {
          padding: 14px;
          border-radius: 16px;
          background: rgba(0,0,0,.22);
          border: 1px solid rgba(255,255,255,.14);
          margin-bottom: 10px;
        }

        @media (max-width: 700px) {
          .wc-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .wc-title {
            font-size: 28px;
          }
        }
      </style>

      <div class="wc-app">
        <div class="wc-header">
          <div>
            <div class="wc-title">World Cup 2026</div>
            <div class="wc-subtitle">Home Assistant Tournament App</div>
          </div>
          <div class="wc-badge">104 Match Support</div>
        </div>

        <div class="wc-tabs">
          ${Object.entries(pages).map(([key, label]) => `
            <button class="wc-tab ${this.page === key ? "active" : ""}" data-page="${key}">
              ${label}
            </button>
          `).join("")}
        </div>

        ${this.renderPage()}
      </div>
    `;

    this.querySelectorAll(".wc-tab").forEach((btn) => {
      btn.addEventListener("click", () => this.setPage(btn.dataset.page));
    });
  }

  renderPage() {
    if (this.page === "fixtures") return this.renderFixtures();
    if (this.page === "groups") return this.renderGroups();
    if (this.page === "knockout") return this.renderKnockout();
    if (this.page === "stats") return this.renderStats();
    if (this.page === "records") return this.renderRecords();
    if (this.page === "languages") return this.renderLanguages();
    return this.renderOverview();
  }

  renderOverview() {
    return `
      <div class="wc-grid">
        <div class="wc-card">
          <h2>Tournament</h2>
          <div class="wc-big">2026</div>
          <div class="wc-muted">FIFA World Cup</div>
        </div>

        <div class="wc-card">
          <h2>Matches</h2>
          <div class="wc-big">104</div>
          <div class="wc-muted">Full expanded tournament support</div>
        </div>

        <div class="wc-card">
          <h2>Groups</h2>
          <div class="wc-big">A-L</div>
          <div class="wc-muted">12 group layout ready</div>
        </div>

        <div class="wc-card">
          <h2>Status</h2>
          <div class="wc-big">Ready</div>
          <div class="wc-muted">Sidebar app loaded successfully</div>
        </div>
      </div>
    `;
  }

  renderFixtures() {
    return `
      <div class="wc-card">
        <h2>Fixtures</h2>
        <table class="wc-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Match</th>
              <th>Stage</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>11 Jun 2026</td><td>Match 1</td><td>Group Stage</td></tr>
            <tr><td>12 Jun 2026</td><td>Match 2</td><td>Group Stage</td></tr>
            <tr><td>Final</td><td>Match 104</td><td>Final</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }

  renderGroups() {
    const groups = "ABCDEFGHIJKL".split("");
    return `
      <div class="wc-grid">
        ${groups.map(group => `
          <div class="wc-card">
            <h2>Group ${group}</h2>
            <table class="wc-table">
              <tbody>
                <tr><td>Team 1</td><td>0 pts</td></tr>
                <tr><td>Team 2</td><td>0 pts</td></tr>
                <tr><td>Team 3</td><td>0 pts</td></tr>
                <tr><td>Team 4</td><td>0 pts</td></tr>
              </tbody>
            </table>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderKnockout() {
    return `
      <div class="wc-bracket">
        <div class="wc-card">
          <h2>Round of 32</h2>
          <div class="wc-match">Winner Group A v Runner-up Group B</div>
          <div class="wc-match">Winner Group C v Runner-up Group D</div>
        </div>

        <div class="wc-card">
          <h2>Round of 16</h2>
          <div class="wc-match">Winner Match 1 v Winner Match 2</div>
        </div>

        <div class="wc-card">
          <h2>Quarter Finals</h2>
          <div class="wc-match">Quarter Final 1</div>
        </div>

        <div class="wc-card">
          <h2>Semi Finals</h2>
          <div class="wc-match">Semi Final 1</div>
        </div>

        <div class="wc-card">
          <h2>Final</h2>
          <div class="wc-match">World Cup Final</div>
        </div>
      </div>
    `;
  }

  renderStats() {
    return `
      <div class="wc-grid">
        <div class="wc-card"><h2>Top Scorers</h2><p>Coming next.</p></div>
        <div class="wc-card"><h2>Assists</h2><p>Coming next.</p></div>
        <div class="wc-card"><h2>Clean Sheets</h2><p>Coming next.</p></div>
        <div class="wc-card"><h2>Cards</h2><p>Coming next.</p></div>
        <div class="wc-card"><h2>Betting Stats</h2><p>Coming next.</p></div>
        <div class="wc-card"><h2>Team Stats</h2><p>Coming next.</p></div>
      </div>
    `;
  }

  renderRecords() {
    return `
      <div class="wc-card">
        <h2>Tournament Records</h2>
        <p>Biggest win, fastest goal, most goals, clean sheets and historic records will go here.</p>
      </div>
    `;
  }

  renderLanguages() {
    const langs = [
      "English", "Spanish", "French", "German", "Italian", "Portuguese",
      "Dutch", "Arabic", "Japanese", "Korean", "Chinese", "Hindi"
    ];

    return `
      <div class="wc-grid">
        ${langs.map(lang => `
          <div class="wc-card">
            <h2>${lang}</h2>
            <p>Language ready.</p>
          </div>
        `).join("")}
      </div>
    `;
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
