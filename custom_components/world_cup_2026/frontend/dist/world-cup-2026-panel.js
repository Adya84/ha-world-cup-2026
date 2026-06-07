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
      this._refreshInterval = null;
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

  goBackToHomeAssistant() {
    window.location.href = "/lovelace/0?refresh=" + Date.now();
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

  cleanTeamName(team) {
    return String(team || "TBC")
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
      .replace(/[🏴🏳️]/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  teamLabel(team) {
    const name = this.cleanTeamName(team);

    const fixes = {
      USA: "United States",
      US: "United States",
      "South Korea": "Korea Republic",
      Türkiye: "Turkey",
      "Bosnia & Herz": "Bosnia and Herzegovina",
      "Bosnia-Herzegovina": "Bosnia and Herzegovina",
      "Ivory Coast": "Côte d'Ivoire",
      Curacao: "Curaçao",
      Uraguay: "Uruguay",
      "DR Congo": "Democratic Republic of Congo",
      "Congo DR": "Democratic Republic of Congo",
      UAE: "United Arab Emirates",
      "Republic of Ireland": "Ireland",
      "Cabo Verde": "Cape Verde",
      "Cape Verde Islands": "Cape Verde",
    };

    return fixes[name] || name || "TBC";
  }

  countryCode(team) {
    const name = this.teamLabel(team).toLowerCase();

    const codes = {
      argentina: "ar",
      australia: "au",
      austria: "at",
      belgium: "be",
      "bosnia and herzegovina": "ba",
      brazil: "br",
      canada: "ca",
      colombia: "co",
      "costa rica": "cr",
      croatia: "hr",
      curaçao: "cw",
      curacao: "cw",
      czechia: "cz",
      "czech republic": "cz",
      denmark: "dk",
      ecuador: "ec",
      egypt: "eg",
      england: "gb-eng",
      france: "fr",
      germany: "de",
      ghana: "gh",
      haiti: "ht",
      honduras: "hn",
      iran: "ir",
      italy: "it",
      "ivory coast": "ci",
      "côte d'ivoire": "ci",
      jamaica: "jm",
      japan: "jp",
      "korea republic": "kr",
      "south korea": "kr",
      mexico: "mx",
      morocco: "ma",
      netherlands: "nl",
      "new zealand": "nz",
      nigeria: "ng",
      norway: "no",
      panama: "pa",
      paraguay: "py",
      poland: "pl",
      portugal: "pt",
      qatar: "qa",
      "saudi arabia": "sa",
      scotland: "gb-sct",
      senegal: "sn",
      serbia: "rs",
      "south africa": "za",
      spain: "es",
      sweden: "se",
      switzerland: "ch",
      tunisia: "tn",
      turkey: "tr",
      ukraine: "ua",
      uruguay: "uy",
      "united states": "us",
      usa: "us",
      wales: "gb-wls",
      algeria: "dz",
      "cape verde": "cv",
      "cabo verde": "cv",
      "cape verde islands": "cv",
      "dr congo": "cd",
      "congo dr": "cd",
      "democratic republic of congo": "cd",
      cameroon: "cm",
      mali: "ml",
      "burkina faso": "bf",
      uzbekistan: "uz",
      jordan: "jo",
      iraq: "iq",
      "united arab emirates": "ae",
      uae: "ae",
      oman: "om",
      china: "cn",
      bolivia: "bo",
      venezuela: "ve",
      peru: "pe",
      chile: "cl",
      "el salvador": "sv",
      "trinidad and tobago": "tt",
      guatemala: "gt",
      "republic of ireland": "ie",
      ireland: "ie",
      romania: "ro",
      slovakia: "sk",
      slovenia: "si",
      albania: "al",
      greece: "gr",
      georgia: "ge",
      hungary: "hu",
    };

    return codes[name] || "";
  }

  flag(team, small = false) {
    const name = this.teamLabel(team);
    const code = this.countryCode(name);

    if (!code || name === "TBC") {
      return small
        ? `<span class="group-flag-missing">🏳️</span>`
        : `<div class="big-flag missing-flag">🏳️</div>`;
    }

    return `
      <img
        class="${small ? "group-flag-img" : "big-flag-img"}"
        src="https://flagcdn.com/w160/${code}.png"
        alt="${this.esc(name)} flag"
        loading="lazy"
      />
    `;
  }

  teamFlagBlock(team) {
    const name = this.teamLabel(team);

    return `
      <div class="team-flag-block">
        ${this.flag(name)}
        <div class="team-flag-name">${this.esc(name)}</div>
      </div>
    `;
  }

  getHomeTeam(m) {
    return m.homeTeam || m.home || m.team1 || m.home_team || "TBC";
  }

  getAwayTeam(m) {
    return m.awayTeam || m.away || m.team2 || m.away_team || "TBC";
  }

  getHomeScore(m) {
    return m.homeScore ?? m.home_score ?? m.score?.fullTime?.home ?? m.score?.home ?? "-";
  }

  getAwayScore(m) {
    return m.awayScore ?? m.away_score ?? m.score?.fullTime?.away ?? m.score?.away ?? "-";
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
            url("/world_cup_2026_frontend/worldcup.png");
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

        .wc-pill,
        .wc-badge {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
          border-radius: 999px;
          padding: 9px 13px;
          font-size: 13px;
          white-space: nowrap;
        }

        .wc-back-button {
          cursor: pointer;
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.20);
          font-weight: 700;
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
          gap: 14px;
        }

        .wc-row {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 8px;
        }

        .fixture-teams-big {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 18px;
          width: 100%;
        }

        .team-flag-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          min-width: 0;
        }

        .big-flag-img {
          width: 96px;
          height: 64px;
          object-fit: cover;
          border-radius: 9px;
          box-shadow: 0 0 14px rgba(0,0,0,0.50);
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
        }

        .big-flag,
        .missing-flag {
          width: 96px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          border-radius: 9px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
        }

        .team-flag-name {
          font-size: 12px;
          font-weight: 900;
          color: #fff;
          text-shadow: 0 2px 7px rgba(0,0,0,0.85);
          line-height: 1.15;
          word-break: normal;
        }

        .fixture-middle {
          text-align: center;
          color: #fff;
          min-width: 72px;
        }

        .wc-score {
          font-size: 18px;
          font-weight: 900;
          text-align: center;
          margin-bottom: 4px;
        }

        .fixture-vs {
          font-size: 22px;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .wc-muted {
          opacity: 0.72;
          font-size: 13px;
          margin-top: 3px;
        }

        .fixture-meta {
          text-align: center;
          margin-top: 12px;
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

        .group-team-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .group-flag-img {
          width: 26px;
          height: 18px;
          object-fit: cover;
          border-radius: 3px;
          box-shadow: 0 0 5px rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.22);
          flex: 0 0 auto;
        }

        .group-flag-missing {
          width: 26px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border-radius: 3px;
          background: rgba(255,255,255,0.10);
          flex: 0 0 auto;
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
          grid-template-columns: repeat(6, minmax(220px, 1fr));
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

        .wc-bracket-match .big-flag-img,
        .wc-bracket-match .big-flag,
        .wc-bracket-match .missing-flag {
          width: 58px;
          height: 38px;
          font-size: 25px;
        }

        .wc-bracket-match .team-flag-name {
          font-size: 12px;
        }

        .wc-bracket-match .fixture-teams-big {
          gap: 8px;
        }

        .wc-bracket-match .fixture-middle {
          min-width: 48px;
        }

        .wc-venue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 14px;
        }

        @media (max-width: 800px) {
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

          .wc-two {
            grid-template-columns: 1fr;
          }

          .fixture-teams-big {
            grid-template-columns: 1fr auto 1fr;
            gap: 10px;
          }

          .big-flag-img,
          .big-flag,
          .missing-flag {
            width: 74px;
            height: 50px;
          }

          .team-flag-name {
            font-size: 12px;
          }

          .fixture-middle {
            min-width: 54px;
          }

          .wc-score {
            font-size: 18px;
          }
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
      return `
        <div class="wc-card">
          <div class="wc-section-title">Live Centre</div>
          <div class="wc-empty">No matches live right now.</div>
        </div>
      `;
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
    const homeTeam = this.getHomeTeam(m);
    const awayTeam = this.getAwayTeam(m);
    const homeScore = this.getHomeScore(m);
    const awayScore = this.getAwayScore(m);
    const status = this.statusLabel(m.status);
    const stage = m.group || this.stageLabel(m.stage) || "";
    const date = this.formatDate(m.utcDate || m.date);

    return `
      <div class="wc-row">
        <div class="fixture-teams-big">
          ${this.teamFlagBlock(homeTeam)}

          <div class="fixture-middle">
            <div class="wc-score">${homeScore} - ${awayScore}</div>
            <div class="fixture-vs">v</div>
          </div>

          ${this.teamFlagBlock(awayTeam)}
        </div>

        <div class="fixture-meta">
          <div class="wc-muted">${this.esc(stage)}</div>
          <div class="wc-muted">${this.esc(date)}</div>
          <div class="wc-muted">${this.esc(status)}</div>
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
                  ${table.map((team, i) => {
                    const teamName = team.team?.name || team.team?.shortName || team.name || team.team || "";
                    return `
                      <tr>
                        <td>${team.position ?? i + 1}</td>
                        <td>
                          <div class="group-team-cell">
                            ${this.flag(teamName, true)}
                            <strong>${this.esc(this.teamLabel(teamName))}</strong>
                          </div>
                        </td>
                        <td>${team.playedGames ?? team.played ?? team.p ?? 0}</td>
                        <td>${team.won ?? team.wins ?? team.w ?? 0}</td>
                        <td>${team.draw ?? team.draws ?? team.d ?? 0}</td>
                        <td>${team.lost ?? team.losses ?? team.l ?? 0}</td>
                        <td>${team.goalsFor ?? team.gf ?? 0}</td>
                        <td>${team.goalsAgainst ?? team.ga ?? 0}</td>
                        <td>${team.goalDifference ?? team.gd ?? 0}</td>
                        <td><strong>${team.points ?? team.pts ?? 0}</strong></td>
                      </tr>
                    `;
                  }).join("")}
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
                    <td>${this.esc(this.teamLabel(s.team?.name || s.team || ""))}</td>
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
                        ${this.matchRowInner(m)}
                        <div class="wc-muted" style="text-align:center;margin-top:8px;">
                          ${this.esc(this.formatDate(m.utcDate || m.date))}
                        </div>
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

  matchRowInner(m) {
    const homeTeam = this.getHomeTeam(m);
    const awayTeam = this.getAwayTeam(m);
    const homeScore = this.getHomeScore(m);
    const awayScore = this.getAwayScore(m);

    return `
      <div class="fixture-teams-big">
        ${this.teamFlagBlock(homeTeam)}

        <div class="fixture-middle">
          <div class="wc-score">${homeScore} - ${awayScore}</div>
        </div>

        ${this.teamFlagBlock(awayTeam)}
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
              ? `<p><strong>${this.esc(this.teamLabel(r.top_scoring_team.team))}</strong></p><p>${r.top_scoring_team.goalsFor} goals</p>`
              : `<div class="wc-empty">No team goal data yet.</div>`
          }
        </div>

        <div class="wc-card">
          <div class="wc-section-title">Best Defence</div>
          ${
            r.best_defence
              ? `<p><strong>${this.esc(this.teamLabel(r.best_defence.team))}</strong></p><p>${r.best_defence.goalsAgainst} conceded</p>`
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

            <div style="display:flex;gap:10px;align-items:center;">
              <button class="wc-pill wc-back-button" id="wc-back-button" type="button">
                ← Back
              </button>

              <div class="wc-pill">
                Updated ${new Date().toLocaleTimeString()}
              </div>
            </div>
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

    const backButton = this.querySelector("#wc-back-button");

    if (backButton) {
      backButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goBackToHomeAssistant();
      };
    }
  }
}

if (!customElements.get("world-cup-2026-panel")) {
  customElements.define("world-cup-2026-panel", WorldCup2026Panel);
}
