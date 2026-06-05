class WorldCup2026Panel extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this._rendered) return;
    this._rendered = true;

    this.innerHTML = `
      <style>
        .wc-app {
          min-height: 100vh;
          padding: 24px;
          background: radial-gradient(circle at top, #113b75, #020712 70%);
          color: white;
          font-family: var(--primary-font-family);
        }

        .wc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .wc-title {
          font-size: 32px;
          font-weight: 800;
        }

        .wc-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .wc-tab {
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          color: white;
          padding: 10px 14px;
          border-radius: 999px;
          cursor: pointer;
        }

        .wc-card {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 22px;
          padding: 20px;
          backdrop-filter: blur(12px);
        }

        .wc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
        }
      </style>

      <div class="wc-app">
        <div class="wc-header">
          <div>
            <div class="wc-title">World Cup 2026</div>
            <div>Home Assistant Tournament App</div>
          </div>
          <div>v3.0.0</div>
        </div>

        <div class="wc-tabs">
          <button class="wc-tab">Overview</button>
          <button class="wc-tab">Fixtures</button>
          <button class="wc-tab">Groups</button>
          <button class="wc-tab">Knockout</button>
          <button class="wc-tab">Stats</button>
          <button class="wc-tab">Settings</button>
        </div>

        <div class="wc-grid">
          <div class="wc-card">
            <h2>Overview</h2>
            <p>Live tournament status, next match, latest results and demo mode.</p>
          </div>

          <div class="wc-card">
            <h2>Fixtures</h2>
            <p>All 104 matches with filtering by team, group and stage.</p>
          </div>

          <div class="wc-card">
            <h2>Groups A-L</h2>
            <p>Group tables, points, goals and qualification status.</p>
          </div>

          <div class="wc-card">
            <h2>Knockout Bracket</h2>
            <p>Last 32 through to the final.</p>
          </div>

          <div class="wc-card">
            <h2>Stats Hub</h2>
            <p>Player stats, betting stats and tournament records.</p>
          </div>

          <div class="wc-card">
            <h2>Languages</h2>
            <p>12 language dashboard selector support.</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
