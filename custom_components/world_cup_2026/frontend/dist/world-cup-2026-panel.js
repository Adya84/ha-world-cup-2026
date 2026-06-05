class WorldCup2026Panel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._page = "overview";
    this._loaded = false;
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

  esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
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

  formatDate(value) {
    if (!value) return "";
    try {
      return new Date(value).toLocaleString([], {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return value;
    }
  }

  renderLoading() {
    this.innerHTML = `
      ${this.styles()}
      <div class="wc-app">
        <div class="wc-shell">
          <div class="wc-card">Loading World Cup 2026...</div>
        </div>
      </div>
    `;
  }

  renderError(err) {
    this.innerHTML = `
      ${this.styles()}
      <div class="wc-app">
        <div class="wc-shell">
          <div class="wc-card">
            <h1>World Cup 2026</h1>
            <p>Could not load app data.</p>
            <pre>${this.esc(JSON.stringify(err, null, 2))}</pre>
          </div>
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
            radial-gradient(circle at top left, rgba(0,180,255,0.25), transparent 28%),
            radial-gradient(circle at bottom right, rgba(0,255,180,0.12), transparent 26%),
            linear-gradient(135deg, #06101f, #102a3f);
          color: white;
          font-family: Arial, sans-serif;
          padding: 22px;
          box-sizing: border-box;
        }

        .wc-shell {
          max-width: 1320px;
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
          font-size: 36px;
          font-weight: 900;
        }

        .wc-subtitle {
          opacity: 0.72;
          margin-top: 5px;
        }

        .wc-pill, .wc-badge {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
          border-radius: 999px;
          padding: 9px 13px;
          font-size: 13px;
          white-space: nowrap;
        }

        .wc-live {
          background: rgba(255,40,40,0.25);
          border-color: rgba(255,80,80,0.55);
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
          font-weight: 700;
        }

        .wc-nav button.active {
          background: rgba(45,190,255,0.34);
          border-color: rgba(120,220,255,0.7);
        }

        .wc-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 22px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.20);
          margin-bottom: 16px;
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
          font-size: 30px;
          margin-bottom: 5px;
        }

        .wc-section-title {
          font-size: 23px;
          font-weight: 900;
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
          text-align: center;
        }

        .wc-muted {
          opacity: 0.7;
          font-size: 13px;
          margin-top: 3px;
        }

        .wc-table-wrap {
          overflow-x: auto;
        }

        .wc-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        .wc-table th,
        .wc-table td {
          padding: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          text-align: left;
        }

        .wc-table th {
          opacity: 0.75;
          font-size: 12px;
          text-transform: uppercase;
        }

        .wc-empty {
          opacity: 0.72;
          padding: 18px;
          background: rgba(255,255,255,0.06);
          border-radius: 16px;
        }

        .wc-two {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 16px;
        }

        .wc-bracket {
          display: grid;
          grid-template-columns: repeat(5, minmax(180px, 1fr));
          gap: 14px;
          overflow-x: auto;
        }

        .wc-round-title {
          font-weight: 900;
          margin-bottom: 10px;
        }

        .wc-bracket-match {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 12px;
          margin-bottom: 10px;
        }

        @media (max-width: 800px) {
          .wc-app { padding: 14px; }
          .wc-header { display: block; }
          .wc-title { font-size: 28px; }
          .wc-pill { display: inline-block; margin-top: 12px; }
          .wc-row { grid-template-columns: 1fr; text-align: center; }
          .wc-two { grid-template-columns: 1fr; }
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
    const fixtures = this._data.fixtures || [];
    const nextMatch = fixtures.find(m => ["TIMED", "SCHEDULED"].includes(m.status)) || fixtures[0];
    const topScorer = (this._data.scorers || [])[0];

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${o.matches_total ?? 104}</strong>Total Matches</div>
        <div class="wc-stat"><strong>${o.matches_loaded ?? 0}</strong>Loaded</div>
        <div class="wc-stat"><strong>${o.matches_played ?? 0}</strong>Played</div>
        <div class="wc-stat"><strong>${o.matches_remaining ?? 104}</strong>Remaining</div>
        <div class="wc-stat"><strong>${o.live_matches ?? 0}</strong>Live Now</div>
        <div class="wc-stat"><strong>${o.top_scorers ?? 0}</strong>Scorers</div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">Next Match</div>
          ${nextMatch ? this.matchRow(nextMatch) : `<div class="wc-empty">No upcoming match loaded.</div>`}
        </div>

        <div class="wc-card">
          <div class="wc-section-title">Tournament Status</div>
          <p>Demo mode: <strong>${o.demo_mode ? "On" : "Off"}</strong></p>
          <p>Last update: <strong>${o.last_update_success ? "OK" : "Failed"}</strong></p>
          <p>Top scorer: <strong>${this.esc(topScorer?.player?.name || topScorer?.name || "Not available")}</strong></p>
        </div>
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
        <div class="wc-section-title">Live Matches <span class="wc-badge wc-live">LIVE</span></div>
        <div class="wc-list">
          ${live.map(m => this.matchRow(m)).join("")}
        </div>
      </div>
    `;
  }

  fixturesPage() {
    const fixtures = this._data.fixtures || [];

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
          <strong>${this.esc(m.homeTeam || "TBC")}</strong>
          <div class="wc-muted">${this.esc(m.group || m.stage || "")}</div>
        </div>
        <div>
          <div class="wc-score">${homeScore} - ${awayScore}</div>
          <div class="wc-muted">${this.esc(this.formatDate(m.utcDate))}</div>
        </div>
        <div>
          <strong>${this.esc(m.awayTeam || "TBC")}</strong>
          <div class="wc-muted">${this.esc(m.status || "")}</div>
        </div>
      </div>
    `;
  }

  groupsPage() {
    const groups = this._data.groups || [];

    if (!groups.length) {
      return `<div class="wc-card"><div class="wc-section-title">Groups A-L</div><div class="wc-empty">No group standings loaded yet.</div></div>`;
    }

    return groups.map(group => `
      <div class="wc-card">
        <div class="wc-section-title">${this.esc(group.group || "Group")}</div>
        <div class="wc-table-wrap">
          <table class="wc-table">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              ${(group.table || []).map(team => `
                <tr>
                  <td>${team.position ?? ""}</td>
                  <td><strong>${this.esc(team.team?.name || "")}</strong></td>
                  <td>${team.playedGames ?? 0}</td>
                  <td>${team.won ?? 0}</td>
                  <td>${team.draw ?? 0}</td>
                  <td>${team.lost ?? 0}</td>
                  <td>${team.goalsFor ?? 0}</td>
                  <td>${team.goalsAgainst ?? 0}</td>
                  <td>${team.goalDifference ?? 0}</td>
                  <td><strong>${team.points ?? 0}</strong></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `).join("");
  }

  playersPage() {
    const scorers = (this._data.scorers || []).slice(0, 30);

    return `
      <div class="wc-card">
        <div class="wc-section-title">Top Scorers</div>
        ${scorers.length ? `
          <div class="wc-table-wrap">
            <table class="wc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Goals</th>
                </tr>
              </thead>
              <tbody>
                ${scorers.map((s, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${this.esc(s.player?.name || s.name || "Unknown")}</strong></td>
                    <td>${this.esc(s.team?.name || s.team || "")}</td>
                    <td><strong>${s.goals ?? "-"}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="wc-empty">No player statistics loaded yet.</div>`}
      </div>
    `;
  }

  knockoutPage() {
    const rounds = [
      "Round of 32",
      "Round of 16",
      "Quarter Finals",
      "Semi Finals",
      "Final",
    ];

    return `
      <div class="wc-card">
        <div class="wc-section-title">Knockout Bracket</div>
        <div class="wc-bracket">
          ${rounds.map(round => `
            <div>
              <div class="wc-round-title">${round}</div>
              <div class="wc-bracket-match">TBC<br><span class="wc-muted">v</span><br>TBC</div>
              <div class="wc-bracket-match">TBC<br><span class="wc-muted">v</span><br>TBC</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  recordsPage() {
    const fixtures = this._data.fixtures || [];
    const finished = fixtures.filter(m => m.homeScore !== null && m.awayScore !== null);
    const highest = [...finished].sort((a, b) =>
      ((b.homeScore || 0) + (b.awayScore || 0)) - ((a.homeScore || 0) + (a.awayScore || 0))
    )[0];

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${fixtures.length}</strong>Fixtures Loaded</div>
        <div class="wc-stat"><strong>${finished.length}</strong>Completed</div>
        <div class="wc-stat"><strong>${this._data.scorers?.length || 0}</strong>Scorers</div>
      </div>

      <div class="wc-card">
        <div class="wc-section-title">Tournament Records</div>
        ${highest ? this.matchRow(highest) : `<div class="wc-empty">Records will populate once matches are played.</div>`}
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
      button.addEventListener("click", () => this.changePage(button.dataset.page));
    });
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
