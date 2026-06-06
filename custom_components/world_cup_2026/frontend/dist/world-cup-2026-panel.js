class WorldCup2026Panel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._page = "overview";
    this._loaded = false;
    this._refreshInterval = null;
    this._data = {
      overview: null,
      live: [],
      fixtures: [],
      groups: [],
      scorers: [],
      statistics: {},
      records: {},
      venues: {},
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

    this._refreshInterval = setInterval(() => {
      this.loadAll();
    }, 60000);
  }

  disconnectedCallback() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
    }
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

  async safeCall(type, fallback) {
    try {
      return await this.callApi(type);
    } catch {
      return fallback;
    }
  }

  async loadAll() {
    try {
      this._data.overview = await this.callApi("world_cup_2026/get_overview");
      this._data.live = await this.callApi("world_cup_2026/get_live_matches");
      this._data.fixtures = await this.callApi("world_cup_2026/get_fixtures");
      this._data.groups = await this.callApi("world_cup_2026/get_groups");
      this._data.scorers = await this.callApi("world_cup_2026/get_scorers");
      this._data.statistics = await this.safeCall("world_cup_2026/get_statistics", {});
      this._data.records = await this.safeCall("world_cup_2026/get_records", {});
      this._data.venues = await this.safeCall("world_cup_2026/get_venues", {});
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

  statusLabel(status) {
    const labels = {
      TIMED: "Scheduled",
      SCHEDULED: "Scheduled",
      IN_PLAY: "Live",
      LIVE: "Live",
      PAUSED: "Paused",
      FINISHED: "Full Time",
      FT: "Full Time",
      AET: "After Extra Time",
      PEN: "Penalties",
      POSTPONED: "Postponed",
    };
    return labels[status] || status || "";
  }

  stageLabel(stage) {
    const labels = {
      GROUP_STAGE: "Group Stage",
      LAST_32: "Round of 32",
      LAST_16: "Round of 16",
      QUARTER_FINALS: "Quarter Finals",
      SEMI_FINALS: "Semi Finals",
      THIRD_PLACE: "Third Place",
      FINAL: "Final",
    };
    return labels[stage] || String(stage || "").replaceAll("_", " ");
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
    linear-gradient(
      rgba(6,16,31,0.55),
      rgba(16,42,63,0.70)
    ),
    url("/world_cup_2026_static/worldcup.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

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
          grid-template-columns: repeat(6, minmax(180px, 1fr));
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

        .wc-venue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 14px;
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
      ["live", "Live Centre"],
      ["fixtures", "Fixtures"],
      ["groups", "Groups"],
      ["knockout", "Knockout"],
      ["players", "Players"],
      ["records", "Records"],
      ["stats", "Stats Hub"],
      ["venues", "Venues"],
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
        <div class="wc-stat"><strong>${o.total_goals ?? 0}</strong>Total Goals</div>
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
          <p>Progress: <strong>${o.progress ?? 0}%</strong></p>
          <p>Top scorer: <strong>${this.esc(topScorer?.player?.name || topScorer?.name || "Not available")}</strong></p>
        </div>
      </div>
    `;
  }

  livePage() {
    const live = this._data.live || [];

    if (!live.length) {
      return `<div class="wc-card"><div class="wc-section-title">Live Centre</div><div class="wc-empty">No matches live right now.</div></div>`;
    }

    return `
      <div class="wc-card">
        <div class="wc-section-title">Live Centre <span class="wc-badge wc-live">LIVE</span></div>
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
        <div class="wc-section-title">Fixtures & Results</div>
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
          <div class="wc-muted">${this.esc(m.group || this.stageLabel(m.stage) || "")}</div>
        </div>
        <div>
          <div class="wc-score">${homeScore} - ${awayScore}</div>
          <div class="wc-muted">${this.esc(this.formatDate(m.utcDate))}</div>
        </div>
        <div>
          <strong>${this.esc(m.awayTeam || "TBC")}</strong>
          <div class="wc-muted">${this.esc(this.statusLabel(m.status))}</div>
        </div>
      </div>
    `;
  }

  groupsPage() {
    const groups = this._data.groups || [];

    if (!groups.length) {
      return `
        <div class="wc-card">
          <div class="wc-section-title">Groups A-L</div>
          <div class="wc-empty">No group standings loaded yet.</div>
        </div>
      `;
    }

    return groups.map((group, index) => {
      const groupName =
        group.group ||
        group.name ||
        group.stage ||
        `Group ${String.fromCharCode(65 + index)}`;

      const table =
        group.table ||
        group.standings ||
        group.teams ||
        [];

      return `
        <div class="wc-card">
          <div class="wc-section-title">${this.esc(String(groupName).replace("GROUP_", "Group "))}</div>

          ${
            table.length
              ? `
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
                  ${table.map((team, i) => `
                    <tr>
                      <td>${team.position ?? i + 1}</td>
                      <td><strong>${this.esc(team.team?.name || team.team?.shortName || team.name || team.team || "")}</strong></td>
                      <td>${team.playedGames ?? team.played ?? team.p ?? 0}</td>
                      <td>${team.won ?? team.wins ?? team.w ?? 0}</td>
                      <td>${team.draw ?? team.draws ?? team.d ?? 0}</td>
                      <td>${team.lost ?? team.losses ?? team.l ?? 0}</td>
                      <td>${team.goalsFor ?? team.gf ?? 0}</td>
                      <td>${team.goalsAgainst ?? team.ga ?? 0}</td>
                      <td>${team.goalDifference ?? team.gd ?? 0}</td>
                      <td><strong>${team.points ?? team.pts ?? 0}</strong></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `
              : `<div class="wc-empty">No teams loaded for this group yet.</div>`
          }
        </div>
      `;
    }).join("");
  }

  playersPage() {
    const scorers = (this._data.scorers || []).slice(0, 30);

    return `
      <div class="wc-card">
        <div class="wc-section-title">Golden Boot Race</div>
        ${scorers.length ? `
          <div class="wc-table-wrap">
            <table class="wc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Goals</th>
                  <th>Assists</th>
                </tr>
              </thead>
              <tbody>
                ${scorers.map((s, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${this.esc(s.player?.name || s.name || "Unknown")}</strong></td>
                    <td>${this.esc(s.team?.name || s.team || "")}</td>
                    <td><strong>${s.goals ?? 0}</strong></td>
                    <td>${s.assists ?? 0}</td>
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
    const fixtures = this._data.fixtures || [];
    const rounds = [
      ["LAST_32", "Round of 32"],
      ["LAST_16", "Round of 16"],
      ["QUARTER_FINALS", "Quarter Finals"],
      ["SEMI_FINALS", "Semi Finals"],
      ["THIRD_PLACE", "Third Place"],
      ["FINAL", "Final"],
    ];

    return `
      <div class="wc-card">
        <div class="wc-section-title">Knockout Bracket</div>
        <div class="wc-bracket">
          ${rounds.map(([stage, label]) => {
            const matches = fixtures.filter(m => m.stage === stage);
            return `
              <div>
                <div class="wc-round-title">${label}</div>
                ${
                  matches.length
                    ? matches.map(m => `
                      <div class="wc-bracket-match">
                        <strong>${this.esc(m.homeTeam || "TBC")}</strong>
                        <div class="wc-score">${m.homeScore ?? "-"} - ${m.awayScore ?? "-"}</div>
                        <strong>${this.esc(m.awayTeam || "TBC")}</strong>
                        <div class="wc-muted">${this.esc(this.formatDate(m.utcDate))}</div>
                      </div>
                    `).join("")
                    : `<div class="wc-bracket-match">TBC<br><span class="wc-muted">Fixtures not available yet</span></div>`
                }
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  recordsPage() {
    const r = this._data.records || {};

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${r.highest_scoring_match?.totalGoals ?? 0}</strong>Highest Match Goals</div>
        <div class="wc-stat"><strong>${r.biggest_win?.margin ?? 0}</strong>Biggest Margin</div>
        <div class="wc-stat"><strong>${r.top_scoring_team?.goalsFor ?? 0}</strong>Top Team Goals</div>
        <div class="wc-stat"><strong>${r.best_defence?.goalsAgainst ?? 0}</strong>Best Defence GA</div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">Highest Scoring Match</div>
          ${r.highest_scoring_match ? this.matchRow(r.highest_scoring_match) : `<div class="wc-empty">No result yet.</div>`}
        </div>

        <div class="wc-card">
          <div class="wc-section-title">Biggest Win</div>
          ${r.biggest_win ? this.matchRow(r.biggest_win) : `<div class="wc-empty">No result yet.</div>`}
        </div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">Top Scoring Team</div>
          ${
            r.top_scoring_team
              ? `<p><strong>${this.esc(r.top_scoring_team.team)}</strong></p><p>${r.top_scoring_team.goalsFor} goals</p>`
              : `<div class="wc-empty">No team goal data yet.</div>`
          }
        </div>

        <div class="wc-card">
          <div class="wc-section-title">Best Defence</div>
          ${
            r.best_defence
              ? `<p><strong>${this.esc(r.best_defence.team)}</strong></p><p>${r.best_defence.goalsAgainst} conceded</p>`
              : `<div class="wc-empty">No defensive data yet.</div>`
          }
        </div>
      </div>
    `;
  }

  statsPage() {
    const s = this._data.statistics || {};

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${s.matches_played ?? 0}</strong>Matches Played</div>
        <div class="wc-stat"><strong>${s.total_goals ?? 0}</strong>Total Goals</div>
        <div class="wc-stat"><strong>${s.goals_per_match ?? 0}</strong>Goals / Match</div>
        <div class="wc-stat"><strong>${s.progress ?? 0}%</strong>Progress</div>
        <div class="wc-stat"><strong>${s.draws ?? 0}</strong>Draws</div>
        <div class="wc-stat"><strong>${s.draw_rate ?? 0}%</strong>Draw Rate</div>
        <div class="wc-stat"><strong>${s.btts_rate ?? 0}%</strong>BTTS Rate</div>
        <div class="wc-stat"><strong>${s.over_25_rate ?? 0}%</strong>Over 2.5 Rate</div>
      </div>
    `;
  }

  venuesPage() {
    const v = this._data.venues || {};
    const stadiums = v.stadiums || [];
    const finalVenue = v.final_venue;

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${stadiums.length}</strong>Stadiums</div>
        <div class="wc-stat"><strong>${v.country_counts?.USA ?? 0}</strong>USA Venues</div>
        <div class="wc-stat"><strong>${v.country_counts?.Canada ?? 0}</strong>Canada Venues</div>
        <div class="wc-stat"><strong>${v.country_counts?.Mexico ?? 0}</strong>Mexico Venues</div>
      </div>

      ${
        finalVenue
          ? `
          <div class="wc-card">
            <div class="wc-section-title">Final Venue</div>
            <p><strong>${this.esc(finalVenue.flag)} ${this.esc(finalVenue.stadium)}</strong></p>
            <p>${this.esc(finalVenue.city)}, ${this.esc(finalVenue.country)}</p>
            <p>Capacity: <strong>${this.esc(finalVenue.capacity)}</strong></p>
          </div>
        `
          : ""
      }

      <div class="wc-card">
        <div class="wc-section-title">World Cup Stadiums</div>
        <div class="wc-venue-grid">
          ${stadiums.map(venue => `
            <div class="wc-stat">
              <strong>${this.esc(venue.flag)} ${this.esc(venue.stadium)}</strong>
              <div>${this.esc(venue.city)}</div>
              <div class="wc-muted">${this.esc(venue.country)} · Capacity ${this.esc(venue.capacity)}</div>
            </div>
          `).join("") || `<div class="wc-empty">No venue data available.</div>`}
        </div>
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
    if (this._page === "stats") return this.statsPage();
    if (this._page === "venues") return this.venuesPage();
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
            <div class="wc-pill">Updated ${new Date().toLocaleTimeString()}</div>
          </div>

          ${this.nav()}
          ${this.pageContent()}
        </div>
      </div>
    `;

    this.querySelectorAll(".wc-nav button").forEach((button) => {
      button.onclick = () => {
        const page = button.getAttribute("data-page");
        this.changePage(page);
      };
    });
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
