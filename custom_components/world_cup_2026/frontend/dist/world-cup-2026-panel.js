class WorldCup2026Panel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._page = "overview";
    this._data = {
      overview: null,
      live: [],
      fixtures: [],
      groups: [],
      scorers: [],
    };
  }

  set hass(hass) {
    this._hass = hass;

    if (!this._loaded) {
      this._loaded = true;
      this.loadAll();
    }
  }

  connectedCallback() {
    this.renderLoading();
  }

  async callApi(type) {
    return await this._hass.connection.sendMessagePromise({ type });
  }

  async loadAll() {
    try {
      this._data.overview = await this.callApi("world_cup_2026/get_overview");
      this._data.live = await this.callApi("world_cup_2026/get_live_matches");
      this._data.fixtures = await this.callApi("world_cup_2026/get_fixtures");
      this._data.groups = await this.callApi("world_cup_2026/get_groups");
      this._data.scorers = await this.callApi("world_cup_2026/get_scorers");

      this.render();
    } catch (err) {
      this.renderError(err);
    }
  }

  changePage(page) {
    this._page = page;
    this.render();
  }

  renderLoading() {
    this.innerHTML = `
      <div class="wc-app">
        <div class="wc-loading">Loading World Cup 2026...</div>
      </div>
    `;
  }

  renderError(err) {
    this.innerHTML = `
      <div class="wc-app">
        <div class="wc-card">
          <h1>World Cup 2026</h1>
          <p>Could not load app data.</p>
          <pre>${JSON.stringify(err, null, 2)}</pre>
        </div>
      </div>
    `;
  }

  styles() {
    return `
      <style>
        .wc-app {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(0,180,255,0.22), transparent 30%),
            linear-gradient(135deg, #07111f, #102a3f);
          color: white;
          font-family: Arial, sans-serif;
          padding: 22px;
          box-sizing: border-box;
        }

        .wc-shell {
          max-width: 1280px;
          margin: 0 auto;
        }

        .wc-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-bottom: 18px;
        }

        .wc-title {
          font-size: 34px;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        .wc-subtitle {
          opacity: 0.72;
          margin-top: 5px;
        }

        .wc-pill {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 13px;
          white-space: nowrap;
        }

        .wc-nav {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 14px;
        }

        .wc-nav button {
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 10px 16px;
          cursor: pointer;
          white-space: nowrap;
        }

        .wc-nav button.active {
          background: rgba(255,255,255,0.28);
          border-color: rgba(255,255,255,0.42);
        }

        .wc-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.20);
        }

        .wc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          margin-bottom: 16px;
        }

        .wc-stat {
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 18px;
          padding: 16px;
        }

        .wc-stat strong {
          display: block;
          font-size: 28px;
          margin-bottom: 5px;
        }

        .wc-section-title {
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 14px;
        }

        .wc-list {
          display: grid;
          gap: 10px;
        }

        .wc-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 12px;
          align-items: center;
          background: rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 12px;
        }

        .wc-score {
          font-size: 22px;
          font-weight: 900;
        }

        .wc-muted {
          opacity: 0.7;
          font-size: 13px;
        }

        .wc-table {
          width: 100%;
          border-collapse: collapse;
        }

        .wc-table th,
        .wc-table td {
          padding: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          text-align: left;
        }

        .wc-empty {
          opacity: 0.72;
          padding: 18px;
          background: rgba(255,255,255,0.06);
          border-radius: 16px;
        }

        @media (max-width: 700px) {
          .wc-app {
            padding: 14px;
          }

          .wc-header {
            display: block;
          }

          .wc-title {
            font-size: 28px;
          }

          .wc-pill {
            display: inline-block;
            margin-top: 12px;
          }

          .wc-row {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .wc-table {
            font-size: 13px;
          }
        }
      </style>
    `;
  }

  nav() {
    const items = [
      ["overview", "Overview"],
      ["live", "Live Matches"],
      ["fixtures", "Fixtures"],
      ["groups", "Groups"],
      ["knockout", "Knockout"],
      ["players", "Players"],
      ["records", "Records"],
    ];

    return `
      <div class="wc-nav">
        ${items.map(([key, label]) => `
          <button class="${this._page === key ? "active" : ""}" data-page="${key}">
            ${label}
          </button>
        `).join("")}
      </div>
    `;
  }

  overviewPage() {
    const o = this._data.overview || {};

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${o.matches_total ?? 104}</strong>Total Matches</div>
        <div class="wc-stat"><strong>${o.matches_loaded ?? 0}</strong>Loaded Matches</div>
        <div class="wc-stat"><strong>${o.matches_played ?? 0}</strong>Played</div>
        <div class="wc-stat"><strong>${o.matches_remaining ?? 104}</strong>Remaining</div>
        <div class="wc-stat"><strong>${o.live_matches ?? 0}</strong>Live Now</div>
        <div class="wc-stat"><strong>${o.top_scorers ?? 0}</strong>Scorers</div>
      </div>

      <div class="wc-card">
        <div class="wc-section-title">Tournament Status</div>
        <p>Demo mode: <strong>${o.demo_mode ? "On" : "Off"}</strong></p>
        <p>Last update: <strong>${o.last_update_success ? "OK" : "Failed"}</strong></p>
      </div>
    `;
  }

  livePage() {
    const live = this._data.live || [];

    if (!live.length) {
      return `<div class="wc-card"><div class="wc-section-title">Live Matches</div><div class="wc-empty">No matches live right now.</div></div>`;
    }

    return `
      <div class="wc-card">
        <div class="wc-section-title">Live Matches</div>
        <div class="wc-list">
          ${live.map(m => this.matchRow(m)).join("")}
        </div>
      </div>
    `;
  }

  fixturesPage() {
    const fixtures = (this._data.fixtures || []).slice(0, 40);

    return `
      <div class="wc-card">
        <div class="wc-section-title">Fixtures</div>
        ${fixtures.length ? `
          <div class="wc-list">
            ${fixtures.map(m => this.matchRow(m)).join("")}
          </div>
        ` : `<div class="wc-empty">No fixtures loaded yet.</div>`}
      </div>
    `;
  }

  matchRow(m) {
    const homeScore = m.homeScore ?? "-";
    const awayScore = m.awayScore ?? "-";

    return `
      <div class="wc-row">
        <div>
          <strong>${m.homeTeam || "TBC"}</strong>
          <div class="wc-muted">${m.group || m.stage || ""}</div>
        </div>
        <div class="wc-score">${homeScore} - ${awayScore}</div>
        <div>
          <strong>${m.awayTeam || "TBC"}</strong>
          <div class="wc-muted">${m.status || ""}</div>
        </div>
      </div>
    `;
  }

  groupsPage() {
    const groups = this._data.groups || [];

    return `
      <div class="wc-card">
        <div class="wc-section-title">Groups A-L</div>
        ${groups.length ? `
          <pre style="white-space:pre-wrap;overflow:auto;">${JSON.stringify(groups, null, 2)}</pre>
        ` : `
          <div class="wc-empty">No group standings loaded yet.</div>
        `}
      </div>
    `;
  }

  playersPage() {
    const scorers = (this._data.scorers || []).slice(0, 20);

    return `
      <div class="wc-card">
        <div class="wc-section-title">Top Scorers</div>
        ${scorers.length ? `
          <table class="wc-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Team</th>
                <th>Goals</th>
              </tr>
            </thead>
            <tbody>
              ${scorers.map(s => `
                <tr>
                  <td>${s.player?.name || s.name || "Unknown"}</td>
                  <td>${s.team?.name || s.team || ""}</td>
                  <td>${s.goals ?? "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `<div class="wc-empty">No player statistics loaded yet.</div>`}
      </div>
    `;
  }

  knockoutPage() {
    return `
      <div class="wc-card">
        <div class="wc-section-title">Knockout Bracket</div>
        <div class="wc-empty">Bracket view ready. We’ll wire this to knockout-stage fixtures next.</div>
      </div>
    `;
  }

  recordsPage() {
    return `
      <div class="wc-card">
        <div class="wc-section-title">Tournament Records</div>
        <div class="wc-empty">Records screen ready. Next we can connect this to your tournament record entities/data.</div>
      </div>
    `;
  }

  pageContent() {
    if (this._page === "overview") return this.overviewPage();
    if (this._page === "live") return this.livePage();
    if (this._page === "fixtures") return this.fixturesPage();
    if (this._page === "groups") return this.groupsPage();
    if (this._page === "knockout") return this.knockoutPage();
    if (this._page === "players") return this.playersPage();
    if (this._page === "records") return this.recordsPage();
    return this.overviewPage();
  }

  render() {
    this.innerHTML = `
      ${this.styles()}
      <div class="wc-app">
        <div class="wc-shell">
          <div class="wc-header">
            <div>
              <div class="wc-title">FIFA World Cup 2026</div>
              <div class="wc-subtitle">Home Assistant dedicated tournament application</div>
            </div>
            <div class="wc-pill">App API Connected</div>
          </div>

          ${this.nav()}

          ${this.pageContent()}
        </div>
      </div>
    `;

    this.querySelectorAll("[data-page]").forEach((button) => {
      button.addEventListener("click", () => {
        this.changePage(button.dataset.page);
      });
    });
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
