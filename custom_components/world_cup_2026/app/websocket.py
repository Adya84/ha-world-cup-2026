class WorldCup2026Panel extends HTMLElement {
  set hass(hass) {
    this._hass = hass;

    if (!this._loaded) {
      this._loaded = true;
      this.loadOverview();
    }
  }

  connectedCallback() {
    this.renderLoading();
  }

  async loadOverview() {
    try {
      const data = await this._hass.connection.sendMessagePromise({
        type: "world_cup_2026/get_overview",
      });

      this.render(data);
    } catch (err) {
      this.renderError(err);
    }
  }

  renderLoading() {
    this.innerHTML = `
      <div style="padding:32px;color:white;background:#07111f;min-height:100vh;">
        Loading World Cup 2026...
      </div>
    `;
  }

  renderError(err) {
    this.innerHTML = `
      <div style="padding:32px;color:white;background:#07111f;min-height:100vh;">
        <h1>World Cup 2026</h1>
        <p>Could not load app data.</p>
        <pre>${JSON.stringify(err, null, 2)}</pre>
      </div>
    `;
  }

  render(data) {
    this.innerHTML = `
      <style>
        .wc-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #07111f, #0f2a3d);
          color: white;
          font-family: Arial, sans-serif;
          padding: 24px;
          box-sizing: border-box;
        }

        .wc-card {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          padding: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .wc-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .wc-subtitle {
          opacity: 0.75;
          margin-bottom: 24px;
        }

        .wc-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .wc-nav button {
          background: rgba(255,255,255,0.12);
          color: white;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          padding: 10px 16px;
        }

        .wc-grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .wc-stat {
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 18px;
        }

        .wc-stat strong {
          display: block;
          font-size: 28px;
          margin-bottom: 4px;
        }
      </style>

      <div class="wc-app">
        <div class="wc-card">
          <div class="wc-title">${data.title}</div>
          <div class="wc-subtitle">
            Live application data from the World Cup 2026 integration
          </div>

          <div class="wc-nav">
            <button>Overview</button>
            <button>Live Matches</button>
            <button>Fixtures</button>
            <button>Groups A-L</button>
            <button>Knockout</button>
            <button>Teams</button>
            <button>Players</button>
            <button>Betting</button>
            <button>Records</button>
          </div>

          <div class="wc-grid">
            <div class="wc-stat">
              <strong>${data.matches}</strong>
              Matches
            </div>

            <div class="wc-stat">
              <strong>${data.groups}</strong>
              Groups
            </div>

            <div class="wc-stat">
              <strong>${data.entities}</strong>
              Entities
            </div>

            <div class="wc-stat">
              <strong>${data.languages}</strong>
              Languages
            </div>

            <div class="wc-stat">
              <strong>${data.demo_mode ? "On" : "Off"}</strong>
              Demo Mode
            </div>

            <div class="wc-stat">
              <strong>${data.last_update_success ? "OK" : "Failed"}</strong>
              Last Update
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("world-cup-2026-panel", WorldCup2026Panel);
