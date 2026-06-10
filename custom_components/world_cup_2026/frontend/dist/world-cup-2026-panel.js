if (!customElements.get("world-cup-2026-panel")) {
class WorldCup2026Panel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._page = "overview";
    this._loaded = false;
    this._refreshInterval = null;
    this._countdownInterval = null;
    this._language = localStorage.getItem("world_cup_2026_language") || "en";
    this._data = {
      overview: null,
      live: [],
      fixtures: [],
      groups: [],
      scorers: [],
      statistics: {},
      records: {},
      venues: {},
      supporters: [],
    };
  }

  translations() {
    return {
      en: {
        title: "FIFA World Cup 2026",
        subtitle: "Home Assistant Tournament App",
        back: "← Back",
        updated: "Updated",
        loading: "Loading World Cup 2026...",
        errorTitle: "World Cup 2026",
        errorText: "Could not load app data.",
        overview: "Overview",
        live: "Live Centre",
        fixtures: "Fixtures",
        results: "Results",
        groups: "Groups",
        knockout: "Knockout",
        players: "Golden Boot",
        records: "Records",
        stats: "Stats Hub",
        venues: "Venues",
        totalMatches: "Total Matches",
        loaded: "Loaded",
        played: "Played",
        remaining: "Remaining",
        liveNow: "Live Now",
        totalGoals: "Total Goals",
        nextMatch: "Next Match",
        tournamentStatus: "Tournament Status",
        demoMode: "Demo mode",
        on: "On",
        off: "Off",
        lastUpdate: "Last update",
        ok: "OK",
        failed: "Failed",
        progress: "Progress",
        topScorer: "Top scorer",
        notAvailable: "Not available",
        noUpcomingMatch: "No upcoming match loaded.",
        noLiveMatches: "No matches live right now.",
        fixturesResults: "Fixtures & Results",
        noFixtures: "No fixtures loaded yet.",
        groupLabel: "Group",
        groupsAL: "Groups A-L",
        noGroups: "No group standings loaded yet.",
        noTeamsGroup: "No teams loaded for this group yet.",
        goldenBoot: "Golden Boot Race",
        noPlayerStats: "No player statistics loaded yet.",
        knockoutBracket: "Knockout Bracket",
        fixturesNotAvailable: "Fixtures not available yet",
        highestMatchGoals: "Highest Match Goals",
        biggestMargin: "Biggest Margin",
        topTeamGoals: "Top Team Goals",
        bestDefenceGA: "Best Defence GA",
        highestScoringMatch: "Highest Scoring Match",
        biggestWin: "Biggest Win",
        topScoringTeam: "Top Scoring Team",
        bestDefence: "Best Defence",
        noResult: "No result yet.",
        noTeamGoalData: "No team goal data yet.",
        noDefensiveData: "No defensive data yet.",
        matchesPlayed: "Matches Played",
        yellowCards: "Yellow Cards",
        redCards: "Red Cards",
        minutes: "Minutes",
        goalsPerMatch: "Goals / Match",
        draws: "Draws",
        drawRate: "Draw Rate",
        bttsRate: "BTTS Rate",
        over25Rate: "Over 2.5 Rate",
        stadiums: "Stadiums",
        usaVenues: "USA Venues",
        canadaVenues: "Canada Venues",
        mexicoVenues: "Mexico Venues",
        finalVenue: "Final Venue",
        capacity: "Capacity",
        worldCupStadiums: "World Cup Stadiums",
        noVenueData: "No venue data available.",
        scheduled: "Upcoming",
        liveStatus: "Live",
        paused: "Paused",
        fullTime: "Full Time",
        aet: "After Extra Time",
        penalties: "Penalties",
        postponed: "Postponed",
        groupStage: "Group Stage",
        round32: "Round of 32",
        round16: "Round of 16",
        quarterFinals: "Quarter Finals",
        semiFinals: "Semi Finals",
        thirdPlace: "Third Place",
        final: "Final",
        tbc: "TBC",
        unknown: "Unknown",
        pos: "Pos",
        team: "Team",
        player: "Player",
        goals: "Goals",
        assists: "Assists",
        language: "Dashboard Language",
        controlCentre: 'World Cup 2026 Control Centre',
        overviewSubtitle: 'Live tournament dashboard with fixtures, results, groups, player stats, venues, records and knockout tracking in one place.',
        tournamentIntelligence: 'Tournament Intelligence',
        goldenBootCentre: 'Golden Boot Centre',
        leaderSpotlight: 'Leader Spotlight',
        playersTracked: 'Players Tracked',
        totalAssists: 'Total Assists',
        totalYellowCards: 'Total Yellow Cards',
        totalRedCards: 'Total Red Cards',
        upNext: 'Up next',
        matchSpotlight: 'Match Spotlight',
        upcomingFixtures: 'Upcoming Fixtures',
        latest: 'Latest',
        recentResults: 'Recent Results',
        playerWatch: 'Player Watch',
        fixturesSubtitle: 'A cleaner World Cup match centre with match-day sections, bold score cards, flags, venue details and clearer live/result badges.',
        days: 'Days',
        versus: 'v',
        supportersNav: '🙏 Supporters',
        supportersThankYouTitle: '🙏 Supporters & Thank You',
        supportersIntro: 'This project started as a personal Home Assistant dashboard and has grown thanks to feedback, testing, ideas and support from the community.',
        supportersSpecialThanks: 'Special thanks to everyone who has supported development of the World Cup 2026 integration.',
        supportersTitle: '🍺 Supporters',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Thank you for supporting development.',
        anonymousSupporter: 'Anonymous Supporter',
        noSupporters: 'No supporters added yet. Be the first to Buy Me a Beer and get your name listed here.',
        wantNameAdded: 'Want your name added here?',
        supportFutureUpdates: 'Support future updates, bug fixes and new World Cup features.',
        supporterBeerMessage: '🍺 Want your name featured on the Supporters page? Buy me a beer via PayPal and your name can be added to the World Cup 2026 Supporters list as a thank you for supporting development.',
        donateBuyBeer: '🍺 Donate / Buy Me a Beer',
        enjoyingIntegration: '🍺 Enjoying this integration?',
        supportIntegration: 'Support this integration',
        conceded: "conceded",
      },

      fr: {
        title: "Coupe du Monde FIFA 2026",
        subtitle: "Application dédiée du tournoi pour Home Assistant",
        back: "← Retour",
        updated: "Mis à jour",
        loading: "Chargement Coupe du Monde 2026...",
        errorTitle: "Coupe du Monde 2026",
        errorText: "Impossible de charger les données.",
        overview: "Aperçu",
        live: "Centre en Direct",
        fixtures: "Matchs",
        groups: "Groupes",
        knockout: "Phase Finale",
        players: "Soulier d'Or",
        records: "Records",
        stats: "Stats",
        venues: "Stades",
        totalMatches: "Matchs Totaux",
        loaded: "Chargés",
        played: "Joués",
        remaining: "Restants",
        liveNow: "En Direct",
        totalGoals: "Buts Totaux",
        nextMatch: "Prochain Match",
        tournamentStatus: "État du Tournoi",
        demoMode: "Mode démo",
        on: "Activé",
        off: "Désactivé",
        lastUpdate: "Dernière mise à jour",
        ok: "OK",
        failed: "Échec",
        progress: "Progression",
        topScorer: "Meilleur buteur",
        notAvailable: "Non disponible",
        noUpcomingMatch: "Aucun prochain match chargé.",
        noLiveMatches: "Aucun match en direct actuellement.",
        fixturesResults: "Matchs et Résultats",
        noFixtures: "Aucun match chargé.",
        groupLabel: "Groupe",
        groupsAL: "Groupes A-L",
        noGroups: "Aucun classement chargé.",
        noTeamsGroup: "Aucune équipe chargée.",
        goldenBoot: "Soulier d'Or",
        noPlayerStats: "Aucune statistique joueur.",
        knockoutBracket: "Tableau Final",
        fixturesNotAvailable: "Matchs non disponibles",
        highestMatchGoals: "Match le Plus Prolifique",
        biggestMargin: "Plus Grand Écart",
        topTeamGoals: "Meilleure Attaque",
        bestDefenceGA: "Meilleure Défense",
        highestScoringMatch: "Match le Plus Prolifique",
        biggestWin: "Plus Grande Victoire",
        topScoringTeam: "Meilleure Attaque",
        bestDefence: "Meilleure Défense",
        noResult: "Aucun résultat.",
        noTeamGoalData: "Aucune donnée de buts.",
        noDefensiveData: "Aucune donnée défensive.",
        matchesPlayed: "Matchs Joués",
        yellowCards: "Cartons Jaunes",
        redCards: "Cartons Rouges",
        minutes: "Minutes",
        goalsPerMatch: "Buts / Match",
        draws: "Nuls",
        drawRate: "Taux de Nuls",
        bttsRate: "Les Deux Marquent",
        over25Rate: "Plus de 2,5",
        stadiums: "Stades",
        usaVenues: "Stades USA",
        canadaVenues: "Stades Canada",
        mexicoVenues: "Stades Mexique",
        finalVenue: "Stade de la Finale",
        capacity: "Capacité",
        worldCupStadiums: "Stades de la Coupe du Monde",
        noVenueData: "Aucune donnée de stade.",
        scheduled: "Programmé",
        liveStatus: "En Direct",
        paused: "Pause",
        fullTime: "Terminé",
        aet: "Après Prolongation",
        penalties: "Tirs au But",
        postponed: "Reporté",
        groupStage: "Phase de Groupes",
        round32: "Seizièmes",
        round16: "Huitièmes",
        quarterFinals: "Quarts",
        semiFinals: "Demi-finales",
        thirdPlace: "Troisième Place",
        final: "Finale",
        tbc: "À confirmer",
        unknown: "Inconnu",
        pos: "Pos",
        team: "Équipe",
        player: "Joueur",
        goals: "Buts",
        assists: "Passes",
        language: "Langue du Tableau de Bord",
        controlCentre: 'Centre de Contrôle Coupe du Monde 2026',
        overviewSubtitle: 'Tableau de bord du tournoi avec matchs, résultats, groupes, statistiques joueurs, stades, records et phase finale au même endroit.',
        tournamentIntelligence: 'Analyse du Tournoi',
        goldenBootCentre: 'Centre du Soulier d’Or',
        leaderSpotlight: 'Leader à la Une',
        playersTracked: 'Joueurs Suivis',
        totalAssists: 'Total Passes',
        totalYellowCards: 'Total Cartons Jaunes',
        totalRedCards: 'Total Cartons Rouges',
        upNext: 'À venir',
        matchSpotlight: 'Match à la Une',
        upcomingFixtures: 'Prochains Matchs',
        latest: 'Dernier',
        recentResults: 'Résultats Récents',
        playerWatch: 'Suivi des Joueurs',
        fixturesSubtitle: 'Un centre des matchs plus clair avec journées, cartes de score, drapeaux, stades et badges de statut lisibles.',
        days: 'Jours',
        versus: 'v',
        supportersNav: '🙏 Soutiens',
        supportersThankYouTitle: '🙏 Soutiens et remerciements',
        supportersIntro: 'Ce projet a commencé comme un tableau de bord Home Assistant personnel et a grandi grâce aux retours, tests, idées et au soutien de la communauté.',
        supportersSpecialThanks: 'Merci à toutes les personnes qui ont soutenu le développement de l\'intégration World Cup 2026.',
        supportersTitle: '🍺 Soutiens',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Merci de soutenir le développement.',
        anonymousSupporter: 'Soutien anonyme',
        noSupporters: 'Aucun soutien ajouté pour le moment. Soyez le premier à offrir une bière et à faire apparaître votre nom ici.',
        wantNameAdded: 'Vous voulez ajouter votre nom ici ?',
        supportFutureUpdates: 'Soutenez les futures mises à jour, corrections de bugs et nouvelles fonctions de la Coupe du Monde.',
        supporterBeerMessage: '🍺 Vous voulez que votre nom apparaisse sur la page des soutiens ? Offrez-moi une bière via PayPal et votre nom pourra être ajouté à la liste des soutiens World Cup 2026 pour vous remercier de votre aide au développement.',
        donateBuyBeer: '🍺 Faire un don / Offrir une bière',
        enjoyingIntegration: '🍺 Vous aimez cette intégration ?',
        supportIntegration: 'Soutenir cette intégration',
        conceded: "encaissés",
      },

      de: {
        title: "FIFA Weltmeisterschaft 2026",
        subtitle: "Home Assistant Turnier-Anwendung",
        back: "← Zurück",
        updated: "Aktualisiert",
        loading: "Weltmeisterschaft 2026 wird geladen...",
        errorTitle: "Weltmeisterschaft 2026",
        errorText: "App-Daten konnten nicht geladen werden.",
        overview: "Übersicht",
        live: "Live-Zentrum",
        fixtures: "Spiele",
        groups: "Gruppen",
        knockout: "K.o.-Runde",
        players: "Goldener Schuh",
        records: "Rekorde",
        stats: "Statistiken",
        venues: "Stadien",
        totalMatches: "Spiele Gesamt",
        loaded: "Geladen",
        played: "Gespielt",
        remaining: "Verbleibend",
        liveNow: "Live Jetzt",
        totalGoals: "Tore Gesamt",
        nextMatch: "Nächstes Spiel",
        tournamentStatus: "Turnierstatus",
        demoMode: "Demo-Modus",
        on: "Ein",
        off: "Aus",
        lastUpdate: "Letztes Update",
        ok: "OK",
        failed: "Fehlgeschlagen",
        progress: "Fortschritt",
        topScorer: "Top-Torschütze",
        notAvailable: "Nicht verfügbar",
        noUpcomingMatch: "Kein kommendes Spiel geladen.",
        noLiveMatches: "Derzeit keine Live-Spiele.",
        fixturesResults: "Spiele & Ergebnisse",
        noFixtures: "Noch keine Spiele geladen.",
        groupLabel: "Gruppe",
        groupsAL: "Gruppen A-L",
        noGroups: "Noch keine Gruppentabellen.",
        noTeamsGroup: "Keine Teams geladen.",
        goldenBoot: "Goldener Schuh",
        noPlayerStats: "Noch keine Spielerstatistiken.",
        knockoutBracket: "K.o.-Baum",
        fixturesNotAvailable: "Spiele noch nicht verfügbar",
        highestMatchGoals: "Torreichstes Spiel",
        biggestMargin: "Höchster Vorsprung",
        topTeamGoals: "Beste Offensive",
        bestDefenceGA: "Beste Defensive",
        highestScoringMatch: "Torreichstes Spiel",
        biggestWin: "Höchster Sieg",
        topScoringTeam: "Beste Offensive",
        bestDefence: "Beste Defensive",
        noResult: "Noch kein Ergebnis.",
        noTeamGoalData: "Noch keine Tordaten.",
        noDefensiveData: "Noch keine Defensivdaten.",
        matchesPlayed: "Gespielte Spiele",
        yellowCards: "Gelbe Karten",
        redCards: "Rote Karten",
        minutes: "Minuten",
        goalsPerMatch: "Tore / Spiel",
        draws: "Unentschieden",
        drawRate: "Remis-Quote",
        bttsRate: "Beide Treffen",
        over25Rate: "Über 2,5",
        stadiums: "Stadien",
        usaVenues: "USA-Stadien",
        canadaVenues: "Kanada-Stadien",
        mexicoVenues: "Mexiko-Stadien",
        finalVenue: "Finalstadion",
        capacity: "Kapazität",
        worldCupStadiums: "WM-Stadien",
        noVenueData: "Keine Stadiondaten.",
        scheduled: "Geplant",
        liveStatus: "Live",
        paused: "Pause",
        fullTime: "Abpfiff",
        aet: "Nach Verlängerung",
        penalties: "Elfmeterschießen",
        postponed: "Verschoben",
        groupStage: "Gruppenphase",
        round32: "Runde der 32",
        round16: "Achtelfinale",
        quarterFinals: "Viertelfinale",
        semiFinals: "Halbfinale",
        thirdPlace: "Dritter Platz",
        final: "Finale",
        tbc: "Offen",
        unknown: "Unbekannt",
        pos: "Pos",
        team: "Team",
        player: "Spieler",
        goals: "Tore",
        assists: "Vorlagen",
        language: "Dashboard-Sprache",
        controlCentre: 'WM 2026 Kontrollzentrum',
        overviewSubtitle: 'Live-Turnierdashboard mit Spielen, Ergebnissen, Gruppen, Spielerstatistiken, Stadien, Rekorden und K.o.-Runde an einem Ort.',
        tournamentIntelligence: 'Turnieranalyse',
        goldenBootCentre: 'Zentrum Goldener Schuh',
        leaderSpotlight: 'Führender Spieler',
        playersTracked: 'Verfolgte Spieler',
        totalAssists: 'Vorlagen Gesamt',
        totalYellowCards: 'Gelbe Karten Gesamt',
        totalRedCards: 'Rote Karten Gesamt',
        upNext: 'Als Nächstes',
        matchSpotlight: 'Spiel im Fokus',
        upcomingFixtures: 'Kommende Spiele',
        latest: 'Neueste',
        recentResults: 'Aktuelle Ergebnisse',
        playerWatch: 'Spielerüberblick',
        fixturesSubtitle: 'Ein übersichtlicheres WM-Spielzentrum mit Spieltagen, starken Ergebniskarten, Flaggen, Stadiondetails und klaren Statusanzeigen.',
        days: 'Tage',
        versus: 'gegen',
        supportersNav: '🙏 Unterstützer',
        supportersThankYouTitle: '🙏 Unterstützer & Danke',
        supportersIntro: 'Dieses Projekt begann als persönliches Home Assistant Dashboard und ist dank Feedback, Tests, Ideen und Unterstützung der Community gewachsen.',
        supportersSpecialThanks: 'Besonderer Dank gilt allen, die die Entwicklung der World Cup 2026 Integration unterstützt haben.',
        supportersTitle: '🍺 Unterstützer',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Danke für die Unterstützung der Entwicklung.',
        anonymousSupporter: 'Anonymer Unterstützer',
        noSupporters: 'Noch keine Unterstützer hinzugefügt. Sei der Erste, der ein Bier spendiert, und lass deinen Namen hier anzeigen.',
        wantNameAdded: 'Möchtest du deinen Namen hier sehen?',
        supportFutureUpdates: 'Unterstütze zukünftige Updates, Fehlerbehebungen und neue World-Cup-Funktionen.',
        supporterBeerMessage: '🍺 Möchtest du deinen Namen auf der Unterstützerseite sehen? Gib mir über PayPal ein Bier aus und dein Name kann als Dank für deine Unterstützung bei der Entwicklung zur World Cup 2026 Unterstützerliste hinzugefügt werden.',
        donateBuyBeer: '🍺 Spenden / Ein Bier ausgeben',
        enjoyingIntegration: '🍺 Gefällt dir diese Integration?',
        supportIntegration: 'Diese Integration unterstützen',
        conceded: "kassiert",
      },

      es: {
        title: "Copa Mundial FIFA 2026",
        subtitle: "Aplicación dedicada del torneo para Home Assistant",
        back: "← Volver",
        updated: "Actualizado",
        loading: "Cargando Copa Mundial 2026...",
        errorTitle: "Copa Mundial 2026",
        errorText: "No se pudieron cargar los datos.",
        overview: "Resumen",
        live: "Centro en Vivo",
        fixtures: "Partidos",
        groups: "Grupos",
        knockout: "Eliminatorias",
        players: "Bota de Oro",
        records: "Récords",
        stats: "Estadísticas",
        venues: "Sedes",
        totalMatches: "Partidos Totales",
        loaded: "Cargados",
        played: "Jugados",
        remaining: "Restantes",
        liveNow: "En Vivo",
        totalGoals: "Goles Totales",
        nextMatch: "Próximo Partido",
        tournamentStatus: "Estado del Torneo",
        demoMode: "Modo demo",
        on: "Activado",
        off: "Desactivado",
        lastUpdate: "Última actualización",
        ok: "OK",
        failed: "Falló",
        progress: "Progreso",
        topScorer: "Máximo goleador",
        notAvailable: "No disponible",
        noUpcomingMatch: "No hay próximo partido cargado.",
        noLiveMatches: "No hay partidos en vivo ahora.",
        fixturesResults: "Partidos y Resultados",
        noFixtures: "No hay partidos cargados.",
        groupLabel: "Grupo",
        groupsAL: "Grupos A-L",
        noGroups: "No hay clasificación de grupos.",
        noTeamsGroup: "No hay equipos cargados.",
        goldenBoot: "Bota de Oro",
        noPlayerStats: "No hay estadísticas de jugadores.",
        knockoutBracket: "Cuadro Eliminatorio",
        fixturesNotAvailable: "Partidos no disponibles",
        highestMatchGoals: "Más Goles en un Partido",
        biggestMargin: "Mayor Diferencia",
        topTeamGoals: "Equipo Más Goleador",
        bestDefenceGA: "Mejor Defensa",
        highestScoringMatch: "Partido con Más Goles",
        biggestWin: "Mayor Victoria",
        topScoringTeam: "Equipo Más Goleador",
        bestDefence: "Mejor Defensa",
        noResult: "Aún no hay resultado.",
        noTeamGoalData: "No hay datos de goles.",
        noDefensiveData: "No hay datos defensivos.",
        matchesPlayed: "Partidos Jugados",
        yellowCards: "Tarjetas Amarillas",
        redCards: "Tarjetas Rojas",
        minutes: "Minutos",
        goalsPerMatch: "Goles / Partido",
        draws: "Empates",
        drawRate: "Porcentaje de Empates",
        bttsRate: "Ambos Marcan",
        over25Rate: "Más de 2.5",
        stadiums: "Estadios",
        usaVenues: "Sedes USA",
        canadaVenues: "Sedes Canadá",
        mexicoVenues: "Sedes México",
        finalVenue: "Sede de la Final",
        capacity: "Capacidad",
        worldCupStadiums: "Estadios del Mundial",
        noVenueData: "No hay datos de sedes.",
        scheduled: "Programado",
        liveStatus: "En Vivo",
        paused: "Pausado",
        fullTime: "Final",
        aet: "Prórroga",
        penalties: "Penaltis",
        postponed: "Aplazado",
        groupStage: "Fase de Grupos",
        round32: "Dieciseisavos",
        round16: "Octavos",
        quarterFinals: "Cuartos",
        semiFinals: "Semifinales",
        thirdPlace: "Tercer Puesto",
        final: "Final",
        tbc: "Por confirmar",
        unknown: "Desconocido",
        pos: "Pos",
        team: "Equipo",
        player: "Jugador",
        goals: "Goles",
        assists: "Asistencias",
        language: "Idioma del Panel",
        controlCentre: 'Centro de Control Mundial 2026',
        overviewSubtitle: 'Panel en vivo del torneo con partidos, resultados, grupos, estadísticas de jugadores, sedes, récords y eliminatorias en un solo lugar.',
        tournamentIntelligence: 'Análisis del Torneo',
        goldenBootCentre: 'Centro Bota de Oro',
        leaderSpotlight: 'Líder Destacado',
        playersTracked: 'Jugadores Seguidos',
        totalAssists: 'Asistencias Totales',
        totalYellowCards: 'Tarjetas Amarillas Totales',
        totalRedCards: 'Tarjetas Rojas Totales',
        upNext: 'Próximo',
        matchSpotlight: 'Partido Destacado',
        upcomingFixtures: 'Próximos Partidos',
        latest: 'Último',
        recentResults: 'Resultados Recientes',
        playerWatch: 'Seguimiento de Jugadores',
        fixturesSubtitle: 'Un centro de partidos más claro con jornadas, tarjetas de marcador, banderas, sedes y estados más legibles.',
        days: 'Días',
        versus: 'v',
        supporterBeerMessage: '🍺 ¿Quieres que tu nombre aparezca en la página de seguidores? Invítame a una cerveza por PayPal y tu nombre podrá añadirse a la lista de seguidores de World Cup 2026 como agradecimiento por apoyar el desarrollo.',
        conceded: "encajados",
      },

      it: {
        title: "Coppa del Mondo FIFA 2026",
        subtitle: "Applicazione torneo dedicata per Home Assistant",
        back: "← Indietro",
        updated: "Aggiornato",
        loading: "Caricamento Coppa del Mondo 2026...",
        errorTitle: "Coppa del Mondo 2026",
        errorText: "Impossibile caricare i dati.",
        overview: "Panoramica",
        live: "Centro Live",
        fixtures: "Partite",
        groups: "Gruppi",
        knockout: "Eliminazione",
        players: "Scarpa d'Oro",
        records: "Record",
        stats: "Statistiche",
        venues: "Stadi",
        totalMatches: "Partite Totali",
        loaded: "Caricate",
        played: "Giocate",
        remaining: "Rimanenti",
        liveNow: "Live Ora",
        totalGoals: "Gol Totali",
        nextMatch: "Prossima Partita",
        tournamentStatus: "Stato Torneo",
        demoMode: "Modalità demo",
        on: "Attiva",
        off: "Disattiva",
        lastUpdate: "Ultimo aggiornamento",
        ok: "OK",
        failed: "Fallito",
        progress: "Progresso",
        topScorer: "Capocannoniere",
        notAvailable: "Non disponibile",
        noUpcomingMatch: "Nessuna prossima partita caricata.",
        noLiveMatches: "Nessuna partita live ora.",
        fixturesResults: "Partite e Risultati",
        noFixtures: "Nessuna partita caricata.",
        groupLabel: "Gruppo",
        groupsAL: "Gruppi A-L",
        noGroups: "Nessuna classifica caricata.",
        noTeamsGroup: "Nessuna squadra caricata.",
        goldenBoot: "Scarpa d'Oro",
        noPlayerStats: "Nessuna statistica giocatore.",
        knockoutBracket: "Tabellone Eliminazione",
        fixturesNotAvailable: "Partite non disponibili",
        highestMatchGoals: "Partita con Più Gol",
        biggestMargin: "Margine Maggiore",
        topTeamGoals: "Squadra con Più Gol",
        bestDefenceGA: "Miglior Difesa",
        highestScoringMatch: "Partita con Più Gol",
        biggestWin: "Vittoria Maggiore",
        topScoringTeam: "Squadra con Più Gol",
        bestDefence: "Miglior Difesa",
        noResult: "Nessun risultato.",
        noTeamGoalData: "Nessun dato gol squadra.",
        noDefensiveData: "Nessun dato difensivo.",
        matchesPlayed: "Partite Giocate",
        yellowCards: "Cartellini Gialli",
        redCards: "Cartellini Rossi",
        minutes: "Minuti",
        goalsPerMatch: "Gol / Partita",
        draws: "Pareggi",
        drawRate: "Percentuale Pareggi",
        bttsRate: "Entrambe Segnano",
        over25Rate: "Over 2.5",
        stadiums: "Stadi",
        usaVenues: "Stadi USA",
        canadaVenues: "Stadi Canada",
        mexicoVenues: "Stadi Messico",
        finalVenue: "Stadio Finale",
        capacity: "Capienza",
        worldCupStadiums: "Stadi Mondiali",
        noVenueData: "Nessun dato stadio.",
        scheduled: "Programmata",
        liveStatus: "Live",
        paused: "Pausa",
        fullTime: "Fine Partita",
        aet: "Dopo Supplementari",
        penalties: "Rigori",
        postponed: "Rinviata",
        groupStage: "Fase a Gironi",
        round32: "Sedicesimi",
        round16: "Ottavi",
        quarterFinals: "Quarti",
        semiFinals: "Semifinali",
        thirdPlace: "Terzo Posto",
        final: "Finale",
        tbc: "Da confermare",
        unknown: "Sconosciuto",
        pos: "Pos",
        team: "Squadra",
        player: "Giocatore",
        goals: "Gol",
        assists: "Assist",
        language: "Lingua Dashboard",
        controlCentre: 'Centro di Controllo Mondiale 2026',
        overviewSubtitle: 'Dashboard live del torneo con partite, risultati, gruppi, statistiche giocatori, stadi, record e fase finale in un unico posto.',
        tournamentIntelligence: 'Analisi Torneo',
        goldenBootCentre: 'Centro Scarpa d’Oro',
        leaderSpotlight: 'Leader in Evidenza',
        playersTracked: 'Giocatori Monitorati',
        totalAssists: 'Assist Totali',
        totalYellowCards: 'Cartellini Gialli Totali',
        totalRedCards: 'Cartellini Rossi Totali',
        upNext: 'Prossimo',
        matchSpotlight: 'Partita in Evidenza',
        upcomingFixtures: 'Prossime Partite',
        latest: 'Ultimi',
        recentResults: 'Risultati Recenti',
        playerWatch: 'Osservati Speciali',
        fixturesSubtitle: 'Un centro partite più chiaro con giornate, schede punteggio, bandiere, stadi e badge di stato leggibili.',
        days: 'Giorni',
        versus: 'v',
        supportersNav: '🙏 Sostenitori',
        supportersThankYouTitle: '🙏 Sostenitori e ringraziamenti',
        supportersIntro: 'Questo progetto è nato come dashboard personale per Home Assistant ed è cresciuto grazie a feedback, test, idee e supporto della community.',
        supportersSpecialThanks: 'Un ringraziamento speciale a tutti coloro che hanno sostenuto lo sviluppo dell\'integrazione World Cup 2026.',
        supportersTitle: '🍺 Sostenitori',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Grazie per sostenere lo sviluppo.',
        anonymousSupporter: 'Sostenitore anonimo',
        noSupporters: 'Nessun sostenitore ancora aggiunto. Sii il primo a offrirmi una birra e a far comparire il tuo nome qui.',
        wantNameAdded: 'Vuoi aggiungere il tuo nome qui?',
        supportFutureUpdates: 'Sostieni futuri aggiornamenti, correzioni di bug e nuove funzioni della Coppa del Mondo.',
        supporterBeerMessage: '🍺 Vuoi che il tuo nome compaia nella pagina dei sostenitori? Offrimi una birra tramite PayPal e il tuo nome potrà essere aggiunto alla lista dei sostenitori World Cup 2026 come ringraziamento per il supporto allo sviluppo.',
        donateBuyBeer: '🍺 Dona / Offrimi una birra',
        enjoyingIntegration: '🍺 Ti piace questa integrazione?',
        supportIntegration: 'Sostieni questa integrazione',
        conceded: "subiti",
      },

      nl: {
        title: "FIFA Wereldbeker 2026",
        subtitle: "Toegewijde toernooi-app voor Home Assistant",
        back: "← Terug",
        updated: "Bijgewerkt",
        loading: "Wereldbeker 2026 laden...",
        errorTitle: "Wereldbeker 2026",
        errorText: "Kon appgegevens niet laden.",
        overview: "Overzicht",
        live: "Live Centrum",
        fixtures: "Wedstrijden",
        groups: "Groepen",
        knockout: "Knock-out",
        players: "Gouden Schoen",
        records: "Records",
        stats: "Statistieken",
        venues: "Stadions",
        totalMatches: "Totaal Wedstrijden",
        loaded: "Geladen",
        played: "Gespeeld",
        remaining: "Resterend",
        liveNow: "Nu Live",
        totalGoals: "Totaal Doelpunten",
        nextMatch: "Volgende Wedstrijd",
        tournamentStatus: "Toernooistatus",
        demoMode: "Demomodus",
        on: "Aan",
        off: "Uit",
        lastUpdate: "Laatste update",
        ok: "OK",
        failed: "Mislukt",
        progress: "Voortgang",
        topScorer: "Topscorer",
        notAvailable: "Niet beschikbaar",
        noUpcomingMatch: "Geen komende wedstrijd geladen.",
        noLiveMatches: "Geen live wedstrijden nu.",
        fixturesResults: "Wedstrijden & Uitslagen",
        noFixtures: "Geen wedstrijden geladen.",
        groupLabel: "Groep",
        groupsAL: "Groepen A-L",
        noGroups: "Geen groepsstanden geladen.",
        noTeamsGroup: "Geen teams geladen.",
        goldenBoot: "Gouden Schoen",
        noPlayerStats: "Geen spelerstatistieken.",
        knockoutBracket: "Knock-out Schema",
        fixturesNotAvailable: "Wedstrijden niet beschikbaar",
        highestMatchGoals: "Meeste Doelpunten Wedstrijd",
        biggestMargin: "Grootste Marge",
        topTeamGoals: "Meeste Teamdoelpunten",
        bestDefenceGA: "Beste Verdediging",
        highestScoringMatch: "Meeste Doelpunten Wedstrijd",
        biggestWin: "Grootste Overwinning",
        topScoringTeam: "Meeste Teamdoelpunten",
        bestDefence: "Beste Verdediging",
        noResult: "Nog geen resultaat.",
        noTeamGoalData: "Geen doelpuntgegevens.",
        noDefensiveData: "Geen verdedigingsgegevens.",
        matchesPlayed: "Gespeelde Wedstrijden",
        yellowCards: "Gele Kaarten",
        redCards: "Rode Kaarten",
        minutes: "Minuten",
        goalsPerMatch: "Doelpunten / Wedstrijd",
        draws: "Gelijkspel",
        drawRate: "Gelijkspelpercentage",
        bttsRate: "Beide Scoren",
        over25Rate: "Meer dan 2.5",
        stadiums: "Stadions",
        usaVenues: "USA Stadions",
        canadaVenues: "Canada Stadions",
        mexicoVenues: "Mexico Stadions",
        finalVenue: "Finalestadion",
        capacity: "Capaciteit",
        worldCupStadiums: "WK Stadions",
        noVenueData: "Geen stadiongegevens.",
        scheduled: "Gepland",
        liveStatus: "Live",
        paused: "Gepauzeerd",
        fullTime: "Afgelopen",
        aet: "Na Verlenging",
        penalties: "Strafschoppen",
        postponed: "Uitgesteld",
        groupStage: "Groepsfase",
        round32: "Laatste 32",
        round16: "Laatste 16",
        quarterFinals: "Kwartfinales",
        semiFinals: "Halve Finales",
        thirdPlace: "Derde Plaats",
        final: "Finale",
        tbc: "N.t.b.",
        unknown: "Onbekend",
        pos: "Pos",
        team: "Team",
        player: "Speler",
        goals: "Doelpunten",
        assists: "Assists",
        language: "Dashboardtaal",
        controlCentre: 'WK 2026 Controlecentrum',
        overviewSubtitle: 'Live toernooidashboard met wedstrijden, uitslagen, groepen, spelerstatistieken, stadions, records en knock-out in één plek.',
        tournamentIntelligence: 'Toernooi-inzicht',
        goldenBootCentre: 'Gouden Schoen Centrum',
        leaderSpotlight: 'Leider in de Spotlight',
        playersTracked: 'Gevolgde Spelers',
        totalAssists: 'Totaal Assists',
        totalYellowCards: 'Totaal Gele Kaarten',
        totalRedCards: 'Totaal Rode Kaarten',
        upNext: 'Volgende',
        matchSpotlight: 'Wedstrijd in de Spotlight',
        upcomingFixtures: 'Komende Wedstrijden',
        latest: 'Laatste',
        recentResults: 'Recente Uitslagen',
        playerWatch: 'Spelersvolger',
        fixturesSubtitle: 'Een duidelijker wedstrijdcentrum met speeldagen, scorekaarten, vlaggen, stadiondetails en heldere statusbadges.',
        days: 'Dagen',
        versus: 'v',
        supportersNav: '🙏 Supporters',
        supportersThankYouTitle: '🙏 Supporters & dankjewel',
        supportersIntro: 'Dit project begon als een persoonlijk Home Assistant-dashboard en is gegroeid dankzij feedback, testen, ideeën en steun van de community.',
        supportersSpecialThanks: 'Speciale dank aan iedereen die de ontwikkeling van de World Cup 2026-integratie heeft gesteund.',
        supportersTitle: '🍺 Supporters',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Bedankt voor je steun aan de ontwikkeling.',
        anonymousSupporter: 'Anonieme supporter',
        noSupporters: 'Nog geen supporters toegevoegd. Wees de eerste die een biertje koopt en je naam hier laat plaatsen.',
        wantNameAdded: 'Wil je je naam hier toevoegen?',
        supportFutureUpdates: 'Steun toekomstige updates, bugfixes en nieuwe World Cup-functies.',
        supporterBeerMessage: '🍺 Wil je dat je naam op de Supporters-pagina verschijnt? Trakteer me op een biertje via PayPal en je naam kan als bedankje voor je steun aan de ontwikkeling worden toegevoegd aan de World Cup 2026 Supporters-lijst.',
        donateBuyBeer: '🍺 Doneren / Biertje kopen',
        enjoyingIntegration: '🍺 Geniet je van deze integratie?',
        supportIntegration: 'Deze integratie steunen',
        conceded: "tegen",
      },

      ar: {
        title: "كأس العالم FIFA 2026",
        subtitle: "تطبيق بطولة مخصص لـ Home Assistant",
        back: "← رجوع",
        updated: "آخر تحديث",
        loading: "جاري تحميل كأس العالم 2026...",
        errorTitle: "كأس العالم 2026",
        errorText: "تعذر تحميل بيانات التطبيق.",
        overview: "نظرة عامة",
        live: "المركز المباشر",
        fixtures: "المباريات",
        groups: "المجموعات",
        knockout: "الأدوار الإقصائية",
        players: "الحذاء الذهبي",
        records: "الأرقام القياسية",
        stats: "الإحصائيات",
        venues: "الملاعب",
        totalMatches: "إجمالي المباريات",
        loaded: "تم التحميل",
        played: "لُعبت",
        remaining: "المتبقية",
        liveNow: "مباشر الآن",
        totalGoals: "إجمالي الأهداف",
        nextMatch: "المباراة القادمة",
        tournamentStatus: "حالة البطولة",
        demoMode: "وضع العرض",
        on: "تشغيل",
        off: "إيقاف",
        lastUpdate: "آخر تحديث",
        ok: "جيد",
        failed: "فشل",
        progress: "التقدم",
        topScorer: "الهداف",
        notAvailable: "غير متاح",
        noUpcomingMatch: "لا توجد مباراة قادمة.",
        noLiveMatches: "لا توجد مباريات مباشرة الآن.",
        fixturesResults: "المباريات والنتائج",
        noFixtures: "لا توجد مباريات محملة.",
        groupLabel: "المجموعة",
        groupsAL: "المجموعات A-L",
        noGroups: "لا توجد جداول مجموعات.",
        noTeamsGroup: "لا توجد فرق محملة.",
        goldenBoot: "سباق الحذاء الذهبي",
        noPlayerStats: "لا توجد إحصائيات لاعبين.",
        knockoutBracket: "جدول الإقصائيات",
        fixturesNotAvailable: "المباريات غير متاحة",
        highestMatchGoals: "أكثر مباراة أهدافاً",
        biggestMargin: "أكبر فارق",
        topTeamGoals: "أكثر فريق تسجيلاً",
        bestDefenceGA: "أفضل دفاع",
        highestScoringMatch: "أكثر مباراة أهدافاً",
        biggestWin: "أكبر فوز",
        topScoringTeam: "أكثر فريق تسجيلاً",
        bestDefence: "أفضل دفاع",
        noResult: "لا توجد نتيجة بعد.",
        noTeamGoalData: "لا توجد بيانات أهداف.",
        noDefensiveData: "لا توجد بيانات دفاعية.",
        matchesPlayed: "المباريات الملعوبة",
        yellowCards: "البطاقات الصفراء",
        redCards: "البطاقات الحمراء",
        minutes: "الدقائق",
        goalsPerMatch: "أهداف / مباراة",
        draws: "تعادلات",
        drawRate: "نسبة التعادل",
        bttsRate: "كلا الفريقين يسجل",
        over25Rate: "أكثر من 2.5",
        stadiums: "الملاعب",
        usaVenues: "ملاعب أمريكا",
        canadaVenues: "ملاعب كندا",
        mexicoVenues: "ملاعب المكسيك",
        finalVenue: "ملعب النهائي",
        capacity: "السعة",
        worldCupStadiums: "ملاعب كأس العالم",
        noVenueData: "لا توجد بيانات ملاعب.",
        scheduled: "مجدولة",
        liveStatus: "مباشر",
        paused: "استراحة",
        fullTime: "نهاية المباراة",
        aet: "بعد وقت إضافي",
        penalties: "ركلات ترجيح",
        postponed: "مؤجلة",
        groupStage: "دور المجموعات",
        round32: "دور 32",
        round16: "دور 16",
        quarterFinals: "ربع النهائي",
        semiFinals: "نصف النهائي",
        thirdPlace: "المركز الثالث",
        final: "النهائي",
        tbc: "يحدد لاحقاً",
        unknown: "غير معروف",
        pos: "المركز",
        team: "الفريق",
        player: "اللاعب",
        goals: "الأهداف",
        assists: "التمريرات",
        language: "لغة اللوحة",
        controlCentre: 'مركز تحكم كأس العالم 2026',
        overviewSubtitle: 'لوحة بطولة مباشرة تشمل المباريات والنتائج والمجموعات وإحصائيات اللاعبين والملاعب والأرقام والأدوار الإقصائية في مكان واحد.',
        tournamentIntelligence: 'تحليل البطولة',
        goldenBootCentre: 'مركز الحذاء الذهبي',
        leaderSpotlight: 'تسليط الضوء على المتصدر',
        playersTracked: 'اللاعبون المتابعون',
        totalAssists: 'إجمالي التمريرات',
        totalYellowCards: 'إجمالي البطاقات الصفراء',
        totalRedCards: 'إجمالي البطاقات الحمراء',
        upNext: 'التالي',
        matchSpotlight: 'تسليط الضوء على المباراة',
        upcomingFixtures: 'المباريات القادمة',
        latest: 'الأحدث',
        recentResults: 'النتائج الأخيرة',
        playerWatch: 'متابعة اللاعبين',
        fixturesSubtitle: 'مركز مباريات أوضح مع أقسام أيام المباريات وبطاقات نتائج وأعلام وتفاصيل ملاعب وحالات مباشرة أوضح.',
        days: 'أيام',
        versus: 'ضد',
        supportersNav: '🙏 الداعمون',
        supportersThankYouTitle: '🙏 الداعمون والشكر',
        supportersIntro: 'بدأ هذا المشروع كلوحة Home Assistant شخصية، ونما بفضل الملاحظات والاختبارات والأفكار والدعم من المجتمع.',
        supportersSpecialThanks: 'شكر خاص لكل من دعم تطوير تكامل كأس العالم 2026.',
        supportersTitle: '🍺 الداعمون',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'شكراً لدعمك التطوير.',
        anonymousSupporter: 'داعم مجهول',
        noSupporters: 'لا يوجد داعمون بعد. كن أول من يشتري لي بيرة ويظهر اسمه هنا.',
        wantNameAdded: 'هل تريد إضافة اسمك هنا؟',
        supportFutureUpdates: 'ادعم التحديثات المستقبلية وإصلاح الأخطاء وميزات كأس العالم الجديدة.',
        supporterBeerMessage: '🍺 هل تريد ظهور اسمك في صفحة الداعمين؟ اشترِ لي بيرة عبر PayPal ويمكن إضافة اسمك إلى قائمة داعمي World Cup 2026 كشكر على دعمك للتطوير.',
        donateBuyBeer: '🍺 تبرع / اشترِ لي بيرة',
        enjoyingIntegration: '🍺 هل تستمتع بهذا التكامل؟',
        supportIntegration: 'ادعم هذا التكامل',
        conceded: "استقبل",
      },

      pt: {
        title: "Copa do Mundo FIFA 2026",
        subtitle: "Aplicação dedicada do torneio para Home Assistant",
        back: "← Voltar",
        updated: "Atualizado",
        loading: "A carregar Copa do Mundo 2026...",
        errorTitle: "Copa do Mundo 2026",
        errorText: "Não foi possível carregar os dados.",
        overview: "Resumo",
        live: "Centro Ao Vivo",
        fixtures: "Jogos",
        groups: "Grupos",
        knockout: "Eliminatórias",
        players: "Bota de Ouro",
        records: "Recordes",
        stats: "Estatísticas",
        venues: "Estádios",
        totalMatches: "Jogos Totais",
        loaded: "Carregados",
        played: "Jogados",
        remaining: "Restantes",
        liveNow: "Ao Vivo",
        totalGoals: "Golos Totais",
        nextMatch: "Próximo Jogo",
        tournamentStatus: "Estado do Torneio",
        demoMode: "Modo demo",
        on: "Ligado",
        off: "Desligado",
        lastUpdate: "Última atualização",
        ok: "OK",
        failed: "Falhou",
        progress: "Progresso",
        topScorer: "Melhor marcador",
        notAvailable: "Não disponível",
        noUpcomingMatch: "Nenhum próximo jogo carregado.",
        noLiveMatches: "Nenhum jogo ao vivo agora.",
        fixturesResults: "Jogos e Resultados",
        noFixtures: "Nenhum jogo carregado.",
        groupLabel: "Grupo",
        groupsAL: "Grupos A-L",
        noGroups: "Nenhuma classificação carregada.",
        noTeamsGroup: "Nenhuma equipa carregada.",
        goldenBoot: "Bota de Ouro",
        noPlayerStats: "Nenhuma estatística de jogadores.",
        knockoutBracket: "Quadro Eliminatório",
        fixturesNotAvailable: "Jogos não disponíveis",
        highestMatchGoals: "Mais Golos num Jogo",
        biggestMargin: "Maior Margem",
        topTeamGoals: "Equipa com Mais Golos",
        bestDefenceGA: "Melhor Defesa",
        highestScoringMatch: "Jogo com Mais Golos",
        biggestWin: "Maior Vitória",
        topScoringTeam: "Equipa com Mais Golos",
        bestDefence: "Melhor Defesa",
        noResult: "Ainda sem resultado.",
        noTeamGoalData: "Sem dados de golos.",
        noDefensiveData: "Sem dados defensivos.",
        matchesPlayed: "Jogos Jogados",
        yellowCards: "Cartões Amarelos",
        redCards: "Cartões Vermelhos",
        minutes: "Minutos",
        goalsPerMatch: "Golos / Jogo",
        draws: "Empates",
        drawRate: "Taxa de Empates",
        bttsRate: "Ambas Marcam",
        over25Rate: "Mais de 2.5",
        stadiums: "Estádios",
        usaVenues: "Estádios EUA",
        canadaVenues: "Estádios Canadá",
        mexicoVenues: "Estádios México",
        finalVenue: "Estádio da Final",
        capacity: "Capacidade",
        worldCupStadiums: "Estádios da Copa",
        noVenueData: "Nenhum dado de estádio.",
        scheduled: "Agendado",
        liveStatus: "Ao Vivo",
        paused: "Pausado",
        fullTime: "Final",
        aet: "Após Prolongamento",
        penalties: "Penáltis",
        postponed: "Adiado",
        groupStage: "Fase de Grupos",
        round32: "Ronda de 32",
        round16: "Oitavos",
        quarterFinals: "Quartos",
        semiFinals: "Meias-finais",
        thirdPlace: "Terceiro Lugar",
        final: "Final",
        tbc: "Por confirmar",
        unknown: "Desconhecido",
        pos: "Pos",
        team: "Equipa",
        player: "Jogador",
        goals: "Golos",
        assists: "Assistências",
        language: "Idioma do Painel",
        controlCentre: 'Centro de Controlo Mundial 2026',
        overviewSubtitle: 'Painel ao vivo do torneio com jogos, resultados, grupos, estatísticas de jogadores, estádios, recordes e eliminatórias num só local.',
        tournamentIntelligence: 'Análise do Torneio',
        goldenBootCentre: 'Centro da Bota de Ouro',
        leaderSpotlight: 'Líder em Destaque',
        playersTracked: 'Jogadores Acompanhados',
        totalAssists: 'Assistências Totais',
        totalYellowCards: 'Total Cartões Amarelos',
        totalRedCards: 'Total Cartões Vermelhos',
        upNext: 'A seguir',
        matchSpotlight: 'Jogo em Destaque',
        upcomingFixtures: 'Próximos Jogos',
        latest: 'Mais recente',
        recentResults: 'Resultados Recentes',
        playerWatch: 'Acompanhar Jogadores',
        fixturesSubtitle: 'Um centro de jogos mais claro com dias de jogo, cartões de resultado, bandeiras, estádios e estados mais visíveis.',
        days: 'Dias',
        versus: 'v',
        supportersNav: '🙏 Apoiantes',
        supportersThankYouTitle: '🙏 Apoiantes e agradecimentos',
        supportersIntro: 'Este projeto começou como um painel pessoal do Home Assistant e cresceu graças ao feedback, testes, ideias e apoio da comunidade.',
        supportersSpecialThanks: 'Um agradecimento especial a todos os que apoiaram o desenvolvimento da integração World Cup 2026.',
        supportersTitle: '🍺 Apoiantes',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Obrigado por apoiar o desenvolvimento.',
        anonymousSupporter: 'Apoiante anónimo',
        noSupporters: 'Ainda não há apoiantes. Seja o primeiro a pagar-me uma cerveja e a ter o seu nome aqui.',
        wantNameAdded: 'Quer adicionar o seu nome aqui?',
        supportFutureUpdates: 'Apoie futuras atualizações, correções de erros e novas funcionalidades da Copa do Mundo.',
        supporterBeerMessage: '🍺 Quer ver o seu nome na página de apoiantes? Pague-me uma cerveja pelo PayPal e o seu nome poderá ser adicionado à lista de apoiantes World Cup 2026 como agradecimento pelo apoio ao desenvolvimento.',
        donateBuyBeer: '🍺 Donar / Pagar uma cerveja',
        enjoyingIntegration: '🍺 Está a gostar desta integração?',
        supportIntegration: 'Apoiar esta integração',
        conceded: "sofridos",
      },

      pl: {
        title: "Mistrzostwa Świata FIFA 2026",
        subtitle: "Dedykowana aplikacja turniejowa dla Home Assistant",
        back: "← Wstecz",
        updated: "Zaktualizowano",
        loading: "Ładowanie Mistrzostw Świata 2026...",
        errorTitle: "Mistrzostwa Świata 2026",
        errorText: "Nie udało się załadować danych aplikacji.",
        overview: "Przegląd",
        live: "Centrum Live",
        fixtures: "Mecze",
        groups: "Grupy",
        knockout: "Faza pucharowa",
        players: "Złoty But",
        records: "Rekordy",
        stats: "Centrum statystyk",
        venues: "Stadiony",
        totalMatches: "Łączna liczba meczów",
        loaded: "Załadowano",
        played: "Rozegrane",
        remaining: "Pozostałe",
        liveNow: "Na żywo",
        totalGoals: "Łączna liczba goli",
        nextMatch: "Następny mecz",
        tournamentStatus: "Status turnieju",
        demoMode: "Tryb demo",
        on: "Włączony",
        off: "Wyłączony",
        lastUpdate: "Ostatnia aktualizacja",
        ok: "OK",
        failed: "Niepowodzenie",
        progress: "Postęp",
        topScorer: "Najlepszy strzelec",
        notAvailable: "Niedostępne",
        noUpcomingMatch: "Brak załadowanego nadchodzącego meczu.",
        noLiveMatches: "Brak meczów na żywo.",
        fixturesResults: "Mecze i wyniki",
        noFixtures: "Nie załadowano jeszcze meczów.",
        groupLabel: "Grupa",
        groupsAL: "Grupy A-L",
        noGroups: "Nie załadowano jeszcze tabel grup.",
        noTeamsGroup: "Nie załadowano jeszcze drużyn w tej grupie.",
        goldenBoot: "Wyścig o Złoty But",
        noPlayerStats: "Nie załadowano jeszcze statystyk zawodników.",
        knockoutBracket: "Drabinka fazy pucharowej",
        fixturesNotAvailable: "Mecze nie są jeszcze dostępne",
        highestMatchGoals: "Najwięcej goli w meczu",
        biggestMargin: "Największa różnica",
        topTeamGoals: "Najwięcej goli drużyny",
        bestDefenceGA: "Najlepsza obrona",
        highestScoringMatch: "Mecz z największą liczbą goli",
        biggestWin: "Największe zwycięstwo",
        topScoringTeam: "Najskuteczniejsza drużyna",
        bestDefence: "Najlepsza obrona",
        noResult: "Brak wyniku.",
        noTeamGoalData: "Brak danych o golach drużyn.",
        noDefensiveData: "Brak danych defensywnych.",
        matchesPlayed: "Rozegrane mecze",
        yellowCards: "Żółte kartki",
        redCards: "Czerwone kartki",
        minutes: "Minuty",
        goalsPerMatch: "Gole / mecz",
        draws: "Remisy",
        drawRate: "Procent remisów",
        bttsRate: "Obie drużyny strzelą",
        over25Rate: "Powyżej 2,5",
        stadiums: "Stadiony",
        usaVenues: "Stadiony USA",
        canadaVenues: "Stadiony Kanady",
        mexicoVenues: "Stadiony Meksyku",
        finalVenue: "Stadion finału",
        capacity: "Pojemność",
        worldCupStadiums: "Stadiony mundialu",
        noVenueData: "Brak danych o stadionach.",
        scheduled: "Zaplanowany",
        liveStatus: "Na żywo",
        paused: "Przerwa",
        fullTime: "Koniec meczu",
        aet: "Po dogrywce",
        penalties: "Rzuty karne",
        postponed: "Przełożony",
        groupStage: "Faza grupowa",
        round32: "1/16 finału",
        round16: "1/8 finału",
        quarterFinals: "Ćwierćfinały",
        semiFinals: "Półfinały",
        thirdPlace: "Mecz o 3. miejsce",
        final: "Finał",
        tbc: "Do ustalenia",
        unknown: "Nieznane",
        pos: "Poz.",
        team: "Drużyna",
        player: "Zawodnik",
        goals: "Gole",
        assists: "Asysty",
        language: "Język panelu",
        controlCentre: "Centrum kontroli World Cup 2026",
        overviewSubtitle: "Panel turniejowy na żywo z meczami, wynikami, grupami, statystykami zawodników, stadionami, rekordami i fazą pucharową w jednym miejscu.",
        tournamentIntelligence: "Analiza turnieju",
        goldenBootCentre: "Centrum Złotego Buta",
        leaderSpotlight: "Lider w centrum uwagi",
        playersTracked: "Śledzeni zawodnicy",
        totalAssists: "Łączna liczba asyst",
        totalYellowCards: "Łączna liczba żółtych kartek",
        totalRedCards: "Łączna liczba czerwonych kartek",
        upNext: "Następne",
        matchSpotlight: "Mecz w centrum uwagi",
        upcomingFixtures: "Nadchodzące mecze",
        latest: "Najnowsze",
        recentResults: "Ostatnie wyniki",
        playerWatch: "Obserwacja zawodników",
        fixturesSubtitle: "Czytelniejsze centrum meczowe z podziałem na dni, kartami wyników, flagami, szczegółami stadionów i wyraźnymi statusami.",
        days: "Dni",
        versus: "v",
        supportersNav: "🙏 Wspierający",
        supportersThankYouTitle: "🙏 Wspierający i podziękowania",
        supportersIntro: "Ten projekt rozpoczął się jako osobisty panel Home Assistant i rozwinął się dzięki opiniom, testom, pomysłom oraz wsparciu społeczności.",
        supportersSpecialThanks: "Specjalne podziękowania dla wszystkich, którzy wsparli rozwój integracji World Cup 2026.",
        supportersTitle: "🍺 Wspierający",
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: "Dziękuję za wsparcie rozwoju projektu.",
        anonymousSupporter: "Anonimowy wspierający",
        noSupporters: "Nie dodano jeszcze wspierających. Bądź pierwszy, postaw mi piwo i dodaj swoje imię tutaj.",
        wantNameAdded: "Chcesz dodać swoje imię tutaj?",
        supportFutureUpdates: "Wesprzyj przyszłe aktualizacje, poprawki błędów i nowe funkcje mundialowe.",
        supporterBeerMessage: '🍺 Chcesz, aby Twoje imię pojawiło się na stronie wspierających? Postaw mi piwo przez PayPal, a Twoje imię może zostać dodane do listy wspierających World Cup 2026 jako podziękowanie za wsparcie rozwoju.',
        donateBuyBeer: "🍺 Wpłać / Postaw mi piwo",
        enjoyingIntegration: "🍺 Podoba Ci się ta integracja?",
        supportIntegration: "Wesprzyj tę integrację",
        conceded: "stracone",
      },

      ja: {
        title: "FIFAワールドカップ 2026",
        subtitle: "Home Assistant 専用トーナメントアプリ",
        back: "← 戻る",
        updated: "更新",
        loading: "ワールドカップ2026を読み込み中...",
        errorTitle: "ワールドカップ2026",
        errorText: "データを読み込めませんでした。",
        overview: "概要",
        live: "ライブセンター",
        fixtures: "試合",
        groups: "グループ",
        knockout: "決勝トーナメント",
        players: "ゴールデンブーツ",
        records: "記録",
        stats: "統計",
        venues: "会場",
        totalMatches: "総試合数",
        loaded: "読込済み",
        played: "終了",
        remaining: "残り",
        liveNow: "ライブ中",
        totalGoals: "総得点",
        nextMatch: "次の試合",
        tournamentStatus: "大会状況",
        demoMode: "デモモード",
        on: "オン",
        off: "オフ",
        lastUpdate: "最終更新",
        ok: "OK",
        failed: "失敗",
        progress: "進行状況",
        topScorer: "得点王",
        notAvailable: "利用不可",
        noUpcomingMatch: "次の試合はありません。",
        noLiveMatches: "現在ライブ試合はありません。",
        fixturesResults: "試合と結果",
        noFixtures: "試合はまだ読み込まれていません。",
        groupLabel: "グループ",
        groupsAL: "グループ A-L",
        noGroups: "順位表はまだありません。",
        noTeamsGroup: "チームはまだありません。",
        goldenBoot: "ゴールデンブーツ",
        noPlayerStats: "選手統計はまだありません。",
        knockoutBracket: "決勝トーナメント表",
        fixturesNotAvailable: "試合未定",
        highestMatchGoals: "最多得点試合",
        biggestMargin: "最大得点差",
        topTeamGoals: "最多得点チーム",
        bestDefenceGA: "最少失点",
        highestScoringMatch: "最多得点試合",
        biggestWin: "最大勝利",
        topScoringTeam: "最多得点チーム",
        bestDefence: "最少失点",
        noResult: "結果はまだありません。",
        noTeamGoalData: "得点データはありません。",
        noDefensiveData: "守備データはありません。",
        matchesPlayed: "終了試合",
        yellowCards: "イエローカード",
        redCards: "レッドカード",
        minutes: "出場時間",
        goalsPerMatch: "得点 / 試合",
        draws: "引き分け",
        drawRate: "引き分け率",
        bttsRate: "両チーム得点",
        over25Rate: "2.5点超え",
        stadiums: "スタジアム",
        usaVenues: "米国会場",
        canadaVenues: "カナダ会場",
        mexicoVenues: "メキシコ会場",
        finalVenue: "決勝会場",
        capacity: "収容人数",
        worldCupStadiums: "ワールドカップ会場",
        noVenueData: "会場データはありません。",
        scheduled: "予定",
        liveStatus: "ライブ",
        paused: "中断",
        fullTime: "試合終了",
        aet: "延長終了",
        penalties: "PK戦",
        postponed: "延期",
        groupStage: "グループステージ",
        round32: "ラウンド32",
        round16: "ラウンド16",
        quarterFinals: "準々決勝",
        semiFinals: "準決勝",
        thirdPlace: "3位決定戦",
        final: "決勝",
        tbc: "未定",
        unknown: "不明",
        pos: "順位",
        team: "チーム",
        player: "選手",
        goals: "得点",
        assists: "アシスト",
        language: "ダッシュボード言語",
        controlCentre: 'ワールドカップ2026 コントロールセンター',
        overviewSubtitle: '試合、結果、グループ、選手統計、会場、記録、決勝トーナメントを一か所で確認できるライブ大会ダッシュボード。',
        tournamentIntelligence: '大会分析',
        goldenBootCentre: 'ゴールデンブーツセンター',
        leaderSpotlight: 'トップ選手',
        playersTracked: '追跡中の選手',
        totalAssists: '合計アシスト',
        totalYellowCards: '合計イエローカード',
        totalRedCards: '合計レッドカード',
        upNext: '次へ',
        matchSpotlight: '注目の試合',
        upcomingFixtures: '今後の試合',
        latest: '最新',
        recentResults: '最近の結果',
        playerWatch: '選手ウォッチ',
        fixturesSubtitle: '試合日ごとの区分、スコアカード、旗、会場情報、分かりやすい状態表示を備えた見やすい試合センター。',
        days: '日',
        versus: '対',
        supportersNav: '🙏 サポーター',
        supportersThankYouTitle: '🙏 サポーターと感謝',
        supportersIntro: 'このプロジェクトは個人用の Home Assistant ダッシュボードとして始まり、コミュニティからのフィードバック、テスト、アイデア、支援によって成長しました。',
        supportersSpecialThanks: 'World Cup 2026 インテグレーションの開発を支援してくださった皆様に感謝します。',
        supportersTitle: '🍺 サポーター',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: '開発を支援していただきありがとうございます。',
        anonymousSupporter: '匿名サポーター',
        noSupporters: 'まだサポーターはいません。最初にビール代を支援して、ここに名前を載せましょう。',
        wantNameAdded: 'ここに名前を追加しますか？',
        supportFutureUpdates: '今後のアップデート、バグ修正、ワールドカップ新機能を支援できます。',
        supporterBeerMessage: '🍺 サポーターページに名前を掲載したいですか？PayPalでビール代を支援すると、開発支援への感謝としてWorld Cup 2026サポーターリストに名前を追加できます。',
        donateBuyBeer: '🍺 寄付 / ビールをおごる',
        enjoyingIntegration: '🍺 このインテグレーションを楽しんでいますか？',
        supportIntegration: 'このインテグレーションを支援',
        conceded: "失点",
      },

      ko: {
        title: "FIFA 월드컵 2026",
        subtitle: "Home Assistant 전용 대회 앱",
        back: "← 뒤로",
        updated: "업데이트",
        loading: "월드컵 2026 로딩 중...",
        errorTitle: "월드컵 2026",
        errorText: "앱 데이터를 불러올 수 없습니다.",
        overview: "개요",
        live: "라이브 센터",
        fixtures: "경기",
        groups: "조별 순위",
        knockout: "토너먼트",
        players: "골든 부트",
        records: "기록",
        stats: "통계",
        venues: "경기장",
        totalMatches: "총 경기",
        loaded: "로드됨",
        played: "진행 완료",
        remaining: "남은 경기",
        liveNow: "현재 라이브",
        totalGoals: "총 득점",
        nextMatch: "다음 경기",
        tournamentStatus: "대회 상태",
        demoMode: "데모 모드",
        on: "켜짐",
        off: "꺼짐",
        lastUpdate: "마지막 업데이트",
        ok: "OK",
        failed: "실패",
        progress: "진행률",
        topScorer: "득점 선두",
        notAvailable: "사용 불가",
        noUpcomingMatch: "예정된 경기가 없습니다.",
        noLiveMatches: "현재 라이브 경기가 없습니다.",
        fixturesResults: "경기 및 결과",
        noFixtures: "경기가 아직 로드되지 않았습니다.",
        groupLabel: "조",
        groupsAL: "A-L 조",
        noGroups: "조별 순위가 없습니다.",
        noTeamsGroup: "팀이 로드되지 않았습니다.",
        goldenBoot: "골든 부트 경쟁",
        noPlayerStats: "선수 통계가 없습니다.",
        knockoutBracket: "토너먼트 대진표",
        fixturesNotAvailable: "경기 미정",
        highestMatchGoals: "최다 득점 경기",
        biggestMargin: "최대 점수 차",
        topTeamGoals: "최다 득점 팀",
        bestDefenceGA: "최고 수비",
        highestScoringMatch: "최다 득점 경기",
        biggestWin: "최대 승리",
        topScoringTeam: "최다 득점 팀",
        bestDefence: "최고 수비",
        noResult: "결과가 없습니다.",
        noTeamGoalData: "득점 데이터가 없습니다.",
        noDefensiveData: "수비 데이터가 없습니다.",
        matchesPlayed: "진행된 경기",
        yellowCards: "옐로카드",
        redCards: "레드카드",
        minutes: "출전 시간",
        goalsPerMatch: "득점 / 경기",
        draws: "무승부",
        drawRate: "무승부 비율",
        bttsRate: "양팀 득점",
        over25Rate: "2.5 이상",
        stadiums: "경기장",
        usaVenues: "미국 경기장",
        canadaVenues: "캐나다 경기장",
        mexicoVenues: "멕시코 경기장",
        finalVenue: "결승 경기장",
        capacity: "수용 인원",
        worldCupStadiums: "월드컵 경기장",
        noVenueData: "경기장 데이터가 없습니다.",
        scheduled: "예정",
        liveStatus: "라이브",
        paused: "일시 중지",
        fullTime: "경기 종료",
        aet: "연장 종료",
        penalties: "승부차기",
        postponed: "연기",
        groupStage: "조별리그",
        round32: "32강",
        round16: "16강",
        quarterFinals: "8강",
        semiFinals: "4강",
        thirdPlace: "3위 결정전",
        final: "결승",
        tbc: "미정",
        unknown: "알 수 없음",
        pos: "순위",
        team: "팀",
        player: "선수",
        goals: "골",
        assists: "도움",
        language: "대시보드 언어",
        controlCentre: '월드컵 2026 컨트롤 센터',
        overviewSubtitle: '경기, 결과, 조별 순위, 선수 통계, 경기장, 기록, 토너먼트를 한곳에서 보는 라이브 대회 대시보드입니다.',
        tournamentIntelligence: '대회 분석',
        goldenBootCentre: '골든 부트 센터',
        leaderSpotlight: '선두 선수',
        playersTracked: '추적 선수',
        totalAssists: '총 도움',
        totalYellowCards: '총 옐로카드',
        totalRedCards: '총 레드카드',
        upNext: '다음',
        matchSpotlight: '주목 경기',
        upcomingFixtures: '예정 경기',
        latest: '최신',
        recentResults: '최근 결과',
        playerWatch: '선수 확인',
        fixturesSubtitle: '경기일 섹션, 점수 카드, 국기, 경기장 정보, 명확한 상태 배지를 갖춘 더 깔끔한 경기 센터입니다.',
        days: '일',
        versus: '대',
        supportersNav: '🙏 후원자',
        supportersThankYouTitle: '🙏 후원자 및 감사',
        supportersIntro: '이 프로젝트는 개인 Home Assistant 대시보드로 시작했으며 커뮤니티의 피드백, 테스트, 아이디어와 지원 덕분에 성장했습니다.',
        supportersSpecialThanks: 'World Cup 2026 통합 개발을 지원해 주신 모든 분들께 특별히 감사드립니다.',
        supportersTitle: '🍺 후원자',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: '개발을 지원해 주셔서 감사합니다.',
        anonymousSupporter: '익명 후원자',
        noSupporters: '아직 후원자가 없습니다. 첫 번째로 맥주 한 잔을 후원하고 여기에 이름을 올려보세요.',
        wantNameAdded: '여기에 이름을 추가하고 싶으신가요?',
        supportFutureUpdates: '향후 업데이트, 버그 수정 및 새로운 월드컵 기능을 지원해 주세요.',
        supporterBeerMessage: '🍺 후원자 페이지에 이름을 올리고 싶으신가요? PayPal로 맥주 한 잔을 후원하면 개발 지원에 대한 감사의 의미로 World Cup 2026 후원자 목록에 이름을 추가할 수 있습니다.',
        donateBuyBeer: '🍺 기부 / 맥주 사주기',
        enjoyingIntegration: '🍺 이 통합을 즐기고 계신가요?',
        supportIntegration: '이 통합 지원',
        conceded: "실점",
      },

      sv: {
        title: "FIFA Världsmästerskapet 2026",
        subtitle: "Dedikerad turneringsapp för Home Assistant",
        back: "← Tillbaka",
        updated: "Uppdaterad",
        loading: "Laddar Världsmästerskapet 2026...",
        errorTitle: "Världsmästerskapet 2026",
        errorText: "Kunde inte ladda appdata.",
        overview: "Översikt",
        live: "Livecenter",
        fixtures: "Matcher",
        groups: "Grupper",
        knockout: "Slutspel",
        players: "Guldskon",
        records: "Rekord",
        stats: "Statistik",
        venues: "Arenor",
        totalMatches: "Totalt Matcher",
        loaded: "Laddade",
        played: "Spelade",
        remaining: "Återstående",
        liveNow: "Live Nu",
        totalGoals: "Totalt Mål",
        nextMatch: "Nästa Match",
        tournamentStatus: "Turneringsstatus",
        demoMode: "Demoläge",
        on: "På",
        off: "Av",
        lastUpdate: "Senaste uppdatering",
        ok: "OK",
        failed: "Misslyckades",
        progress: "Framsteg",
        topScorer: "Skytteligaledare",
        notAvailable: "Inte tillgängligt",
        noUpcomingMatch: "Ingen kommande match laddad.",
        noLiveMatches: "Inga matcher live just nu.",
        fixturesResults: "Matcher & Resultat",
        noFixtures: "Inga matcher laddade.",
        groupLabel: "Grupp",
        groupsAL: "Grupper A-L",
        noGroups: "Inga gruppställningar laddade.",
        noTeamsGroup: "Inga lag laddade.",
        goldenBoot: "Guldskon",
        noPlayerStats: "Ingen spelarstatistik.",
        knockoutBracket: "Slutspelsträd",
        fixturesNotAvailable: "Matcher ej tillgängliga",
        highestMatchGoals: "Mest Mål i Match",
        biggestMargin: "Största Marginal",
        topTeamGoals: "Mest Mål Lag",
        bestDefenceGA: "Bästa Försvar",
        highestScoringMatch: "Mest Mål i Match",
        biggestWin: "Största Vinst",
        topScoringTeam: "Mest Mål Lag",
        bestDefence: "Bästa Försvar",
        noResult: "Inget resultat ännu.",
        noTeamGoalData: "Ingen måldata.",
        noDefensiveData: "Ingen försvarsdata.",
        matchesPlayed: "Spelade Matcher",
        yellowCards: "Gula Kort",
        redCards: "Röda Kort",
        minutes: "Minuter",
        goalsPerMatch: "Mål / Match",
        draws: "Oavgjorda",
        drawRate: "Oavgjortprocent",
        bttsRate: "Båda Gör Mål",
        over25Rate: "Över 2.5",
        stadiums: "Arenor",
        usaVenues: "USA Arenor",
        canadaVenues: "Kanada Arenor",
        mexicoVenues: "Mexiko Arenor",
        finalVenue: "Finalarena",
        capacity: "Kapacitet",
        worldCupStadiums: "VM Arenor",
        noVenueData: "Ingen arenadata.",
        scheduled: "Planerad",
        liveStatus: "Live",
        paused: "Pausad",
        fullTime: "Full Tid",
        aet: "Efter Förlängning",
        penalties: "Straffar",
        postponed: "Uppskjuten",
        groupStage: "Gruppspel",
        round32: "Sextondelsfinal",
        round16: "Åttondelsfinal",
        quarterFinals: "Kvartsfinal",
        semiFinals: "Semifinal",
        thirdPlace: "Tredjeplats",
        final: "Final",
        tbc: "Ej klart",
        unknown: "Okänd",
        pos: "Pos",
        team: "Lag",
        player: "Spelare",
        goals: "Mål",
        assists: "Assist",
        language: "Dashboard-språk",
        controlCentre: 'VM 2026 Kontrollcenter',
        overviewSubtitle: 'Live turneringspanel med matcher, resultat, grupper, spelarstatistik, arenor, rekord och slutspel på ett ställe.',
        tournamentIntelligence: 'Turneringsanalys',
        goldenBootCentre: 'Guldskon Center',
        leaderSpotlight: 'Ledare i Fokus',
        playersTracked: 'Bevakade Spelare',
        totalAssists: 'Totalt Assist',
        totalYellowCards: 'Totalt Gula Kort',
        totalRedCards: 'Totalt Röda Kort',
        upNext: 'Nästa',
        matchSpotlight: 'Match i Fokus',
        upcomingFixtures: 'Kommande Matcher',
        latest: 'Senaste',
        recentResults: 'Senaste Resultat',
        playerWatch: 'Spelarbevakning',
        fixturesSubtitle: 'Ett tydligare matchcenter med matchdagssektioner, resultatrutor, flaggor, arenadetaljer och tydliga statusmärken.',
        days: 'Dagar',
        versus: 'mot',
        supportersNav: '🙏 Supportrar',
        supportersThankYouTitle: '🙏 Supportrar & tack',
        supportersIntro: 'Det här projektet började som en personlig Home Assistant-panel och har vuxit tack vare feedback, tester, idéer och stöd från communityn.',
        supportersSpecialThanks: 'Särskilt tack till alla som har stött utvecklingen av World Cup 2026-integrationen.',
        supportersTitle: '🍺 Supportrar',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Tack för att du stödjer utvecklingen.',
        anonymousSupporter: 'Anonym supporter',
        noSupporters: 'Inga supportrar har lagts till ännu. Var först med att bjuda på en öl och få ditt namn här.',
        wantNameAdded: 'Vill du lägga till ditt namn här?',
        supportFutureUpdates: 'Stöd framtida uppdateringar, buggfixar och nya World Cup-funktioner.',
        supporterBeerMessage: '🍺 Vill du att ditt namn ska visas på supportersidan? Bjud mig på en öl via PayPal så kan ditt namn läggas till i World Cup 2026-supporterlistan som tack för ditt stöd till utvecklingen.',
        donateBuyBeer: '🍺 Donera / Bjud på en öl',
        enjoyingIntegration: '🍺 Gillar du den här integrationen?',
        supportIntegration: 'Stöd den här integrationen',
        conceded: "insläppta",
      },

      no: {
        title: "FIFA Verdensmesterskapet 2026",
        subtitle: "Dedikert turneringsapp for Home Assistant",
        back: "← Tilbake",
        updated: "Oppdatert",
        loading: "Laster Verdensmesterskapet 2026...",
        errorTitle: "Verdensmesterskapet 2026",
        errorText: "Kunne ikke laste appdata.",
        overview: "Oversikt",
        live: "Livesenter",
        fixtures: "Kamper",
        groups: "Grupper",
        knockout: "Utslag",
        players: "Gullstøvelen",
        records: "Rekorder",
        stats: "Statistikk",
        venues: "Arenaer",
        totalMatches: "Totalt Kamper",
        loaded: "Lastet",
        played: "Spilt",
        remaining: "Gjenstår",
        liveNow: "Live Nå",
        totalGoals: "Totalt Mål",
        nextMatch: "Neste Kamp",
        tournamentStatus: "Turneringsstatus",
        demoMode: "Demomodus",
        on: "På",
        off: "Av",
        lastUpdate: "Siste oppdatering",
        ok: "OK",
        failed: "Feilet",
        progress: "Fremdrift",
        topScorer: "Toppscorer",
        notAvailable: "Ikke tilgjengelig",
        noUpcomingMatch: "Ingen kommende kamp lastet.",
        noLiveMatches: "Ingen livekamper akkurat nå.",
        fixturesResults: "Kamper & Resultater",
        noFixtures: "Ingen kamper lastet.",
        groupLabel: "Gruppe",
        groupsAL: "Grupper A-L",
        noGroups: "Ingen gruppetabeller lastet.",
        noTeamsGroup: "Ingen lag lastet.",
        goldenBoot: "Gullstøvelen",
        noPlayerStats: "Ingen spillerstatistikk.",
        knockoutBracket: "Utslagstre",
        fixturesNotAvailable: "Kamper ikke tilgjengelige",
        highestMatchGoals: "Flest Mål i Kamp",
        biggestMargin: "Største Margin",
        topTeamGoals: "Flest Lagmål",
        bestDefenceGA: "Beste Forsvar",
        highestScoringMatch: "Flest Mål i Kamp",
        biggestWin: "Største Seier",
        topScoringTeam: "Flest Lagmål",
        bestDefence: "Beste Forsvar",
        noResult: "Ingen resultat ennå.",
        noTeamGoalData: "Ingen måldata.",
        noDefensiveData: "Ingen forsvarsdata.",
        matchesPlayed: "Spilte Kamper",
        yellowCards: "Gule Kort",
        redCards: "Røde Kort",
        minutes: "Minutter",
        goalsPerMatch: "Mål / Kamp",
        draws: "Uavgjort",
        drawRate: "Uavgjortprosent",
        bttsRate: "Begge Scorer",
        over25Rate: "Over 2.5",
        stadiums: "Arenaer",
        usaVenues: "USA Arenaer",
        canadaVenues: "Canada Arenaer",
        mexicoVenues: "Mexico Arenaer",
        finalVenue: "Finalearena",
        capacity: "Kapasitet",
        worldCupStadiums: "VM Arenaer",
        noVenueData: "Ingen arenadata.",
        scheduled: "Planlagt",
        liveStatus: "Live",
        paused: "Pause",
        fullTime: "Full Tid",
        aet: "Etter Ekstraomganger",
        penalties: "Straffer",
        postponed: "Utsatt",
        groupStage: "Gruppespill",
        round32: "Sekstendelsfinale",
        round16: "Åttedelsfinale",
        quarterFinals: "Kvartfinale",
        semiFinals: "Semifinale",
        thirdPlace: "Tredjeplass",
        final: "Finale",
        tbc: "Ikke klart",
        unknown: "Ukjent",
        pos: "Pos",
        team: "Lag",
        player: "Spiller",
        goals: "Mål",
        assists: "Målgivende",
        language: "Dashboardspråk",
        controlCentre: 'VM 2026 Kontrollsenter',
        overviewSubtitle: 'Live turneringspanel med kamper, resultater, grupper, spillerstatistikk, arenaer, rekorder og utslagsspill på ett sted.',
        tournamentIntelligence: 'Turneringsanalyse',
        goldenBootCentre: 'Gullstøvelen Senter',
        leaderSpotlight: 'Leder i Fokus',
        playersTracked: 'Spillere Fulgt',
        totalAssists: 'Totalt Målgivende',
        totalYellowCards: 'Totalt Gule Kort',
        totalRedCards: 'Totalt Røde Kort',
        upNext: 'Neste',
        matchSpotlight: 'Kamp i Fokus',
        upcomingFixtures: 'Kommende Kamper',
        latest: 'Siste',
        recentResults: 'Siste Resultater',
        playerWatch: 'Spilleroversikt',
        fixturesSubtitle: 'Et tydeligere kampsenter med kampdager, resultatkort, flagg, arenadetaljer og klare statusmerker.',
        days: 'Dager',
        versus: 'mot',
        supportersNav: '🙏 Støttespillere',
        supportersThankYouTitle: '🙏 Støttespillere og takk',
        supportersIntro: 'Dette prosjektet startet som et personlig Home Assistant-dashbord og har vokst takket være tilbakemeldinger, testing, ideer og støtte fra fellesskapet.',
        supportersSpecialThanks: 'Spesiell takk til alle som har støttet utviklingen av World Cup 2026-integrasjonen.',
        supportersTitle: '🍺 Støttespillere',
        latestSupporters: '⭐ Latest Supporters',
        allSupporters: '🌍 All Supporters',
        supporterDefaultMessage: 'Takk for at du støtter utviklingen.',
        anonymousSupporter: 'Anonym støttespiller',
        noSupporters: 'Ingen støttespillere er lagt til ennå. Bli den første til å kjøpe meg en øl og få navnet ditt her.',
        wantNameAdded: 'Vil du ha navnet ditt lagt til her?',
        supportFutureUpdates: 'Støtt fremtidige oppdateringer, feilrettinger og nye World Cup-funksjoner.',
        supporterBeerMessage: '🍺 Vil du ha navnet ditt på supportersiden? Kjøp meg en øl via PayPal, så kan navnet ditt legges til på World Cup 2026-supporterlisten som takk for at du støtter utviklingen.',
        donateBuyBeer: '🍺 Doner / Kjøp meg en øl',
        enjoyingIntegration: '🍺 Liker du denne integrasjonen?',
        supportIntegration: 'Støtt denne integrasjonen',
        conceded: "sluppet inn",
      },

      is: {
        title: "FIFA heimsmeistaramótið 2026",
        subtitle: "Sérhæft mótaforrit fyrir Home Assistant",
        back: "← Til baka",
        updated: "Uppfært",
        loading: "Hleð heimsmeistaramótinu 2026...",
        errorTitle: "Heimsmeistaramótið 2026",
        errorText: "Gat ekki hlaðið gögnum forritsins.",
        overview: "Yfirlit",
        live: "Bein miðstöð",
        fixtures: "Leikir",
        groups: "Riðlar",
        knockout: "Útsláttarkeppni",
        players: "Gullskórinn",
        records: "Met",
        stats: "Tölfræðimiðstöð",
        venues: "Leikvangar",
        totalMatches: "Samtals leikir",
        loaded: "Hlaðið",
        played: "Spilaðir",
        remaining: "Eftir",
        liveNow: "Í beinni núna",
        totalGoals: "Samtals mörk",
        nextMatch: "Næsti leikur",
        tournamentStatus: "Staða móts",
        demoMode: "Sýningarhamur",
        on: "Kveikt",
        off: "Slökkt",
        lastUpdate: "Síðasta uppfærsla",
        ok: "Í lagi",
        failed: "Mistókst",
        progress: "Framvinda",
        topScorer: "Markahæstur",
        notAvailable: "Ekki tiltækt",
        noUpcomingMatch: "Enginn næsti leikur hlaðinn.",
        noLiveMatches: "Engir leikir í beinni núna.",
        fixturesResults: "Leikir og úrslit",
        noFixtures: "Engir leikir hlaðnir enn.",
        groupLabel: "Riðill",
        groupsAL: "Riðlar A-L",
        noGroups: "Engar riðlatöflur hlaðnar enn.",
        noTeamsGroup: "Engin lið hlaðin fyrir þennan riðil enn.",
        goldenBoot: "Keppnin um Gullskóinn",
        noPlayerStats: "Engin leikmannatölfræði hlaðin enn.",
        knockoutBracket: "Útsláttartré",
        fixturesNotAvailable: "Leikir ekki tiltækir enn",
        highestMatchGoals: "Flest mörk í leik",
        biggestMargin: "Stærsti munur",
        topTeamGoals: "Flest mörk liðs",
        bestDefenceGA: "Besta vörnin",
        highestScoringMatch: "Markahæsti leikur",
        biggestWin: "Stærsti sigur",
        topScoringTeam: "Markahæsta liðið",
        bestDefence: "Besta vörnin",
        noResult: "Engin úrslit enn.",
        noTeamGoalData: "Engin markagögn liða enn.",
        noDefensiveData: "Engin varnargögn enn.",
        matchesPlayed: "Spilaðir leikir",
        yellowCards: "Gul spjöld",
        redCards: "Rauð spjöld",
        minutes: "Mínútur",
        goalsPerMatch: "Mörk / leik",
        draws: "Jafntefli",
        drawRate: "Hlutfall jafntefla",
        bttsRate: "Bæði lið skora",
        over25Rate: "Yfir 2,5 hlutfall",
        stadiums: "Leikvangar",
        usaVenues: "Leikvangar í Bandaríkjunum",
        canadaVenues: "Leikvangar í Kanada",
        mexicoVenues: "Leikvangar í Mexíkó",
        finalVenue: "Úrslitaleikvangur",
        capacity: "Rúmtak",
        worldCupStadiums: "Leikvangar HM",
        noVenueData: "Engin leikvangagögn tiltæk.",
        scheduled: "Á dagskrá",
        liveStatus: "Í beinni",
        paused: "Hlé",
        fullTime: "Leik lokið",
        aet: "Eftir framlengingu",
        penalties: "Vítaspyrnur",
        postponed: "Frestað",
        groupStage: "Riðlakeppni",
        round32: "32 liða úrslit",
        round16: "16 liða úrslit",
        quarterFinals: "8 liða úrslit",
        semiFinals: "Undanúrslit",
        thirdPlace: "Leikur um 3. sæti",
        final: "Úrslit",
        tbc: "Óákveðið",
        unknown: "Óþekkt",
        pos: "Sæti",
        team: "Lið",
        player: "Leikmaður",
        goals: "Mörk",
        assists: "Stoðsendingar",
        language: "Tungumál mælaborðs",
        controlCentre: 'HM 2026 stjórnstöð',
        overviewSubtitle: 'Lifandi mælaborð mótsins með leikjum, úrslitum, riðlum, leikmannatölfræði, leikvöngum, metum og útsláttarkeppni á einum stað.',
        tournamentIntelligence: 'Greining mótsins',
        goldenBootCentre: 'Gullskómiðstöð',
        leaderSpotlight: 'Leiðtogi í kastljósi',
        playersTracked: 'Leikmenn vaktaðir',
        totalAssists: 'Samtals stoðsendingar',
        totalYellowCards: 'Samtals gul spjöld',
        totalRedCards: 'Samtals rauð spjöld',
        upNext: 'Næst',
        matchSpotlight: 'Leikur í kastljósi',
        upcomingFixtures: 'Næstu leikir',
        latest: 'Nýjast',
        recentResults: 'Nýleg úrslit',
        playerWatch: 'Leikmannavakt',
        fixturesSubtitle: 'Skýrari leikjamiðstöð með leikjadögum, skorkortum, fánum, leikvangaupplýsingum og skýrari stöðumerkjum.',
        days: 'Dagar',
        versus: 'gegn',
        supportersNav: '🙏 Stuðningsaðilar',
        supportersThankYouTitle: '🙏 Stuðningsaðilar og þakkir',
        supportersIntro: 'Þetta verkefni byrjaði sem persónulegt Home Assistant mælaborð og hefur vaxið þökk sé endurgjöf, prófunum, hugmyndum og stuðningi samfélagsins.',
        supportersSpecialThanks: 'Sérstakar þakkir til allra sem hafa stutt þróun World Cup 2026 samþættingarinnar.',
        supportersTitle: '🍺 Stuðningsaðilar',
        latestSupporters: '⭐ Nýjustu stuðningsaðilar',
        allSupporters: '🌍 Allir stuðningsaðilar',
        supporterDefaultMessage: 'Takk fyrir að styðja þróunina.',
        anonymousSupporter: 'Nafnlaus stuðningsaðili',
        noSupporters: 'Engir stuðningsaðilar hafa verið bættir við enn. Vertu fyrstur til að bjóða mér bjór og fá nafnið þitt hér.',
        wantNameAdded: 'Viltu fá nafnið þitt bætt við hér?',
        supportFutureUpdates: 'Styðjið framtíðaruppfærslur, villuleiðréttingar og nýja HM-eiginleika.',
        supporterBeerMessage: '🍺 Viltu að nafnið þitt birtist á stuðningssíðunni? Bjóddu mér bjór í gegnum PayPal og nafnið þitt getur verið bætt við stuðningslista World Cup 2026 sem þakklæti fyrir stuðning við þróunina.',
        donateBuyBeer: '🍺 Styrkja / Bjóða mér bjór',
        enjoyingIntegration: '🍺 Líkar þér þessi samþætting?',
        supportIntegration: 'Styðja þessa samþættingu',
        conceded: "fengin á sig",
      },
    };
  }

  t(key) {
    const all = this.translations();
    return all[this._language]?.[key] || all.en[key] || key;
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

    this._countdownInterval = setInterval(() => {
      this.updateCountdownDisplay();
    }, 1000);
  }

  disconnectedCallback() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = null;
    }

    if (this._countdownInterval) {
      clearInterval(this._countdownInterval);
      this._countdownInterval = null;
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

  async loadSupporters() {
    const sortSupporters = (supporters) => {
      return [...supporters].sort((a, b) => {
        const aDate = new Date(a?.date || "1900-01-01").getTime();
        const bDate = new Date(b?.date || "1900-01-01").getTime();
        return bDate - aDate;
      });
    };

    const fetchSupporters = async (url) => {
      const response = await fetch(url, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Supporters file not available");
      }

      const supporters = await response.json();
      return Array.isArray(supporters) ? sortSupporters(supporters) : [];
    };

    try {
      return await fetchSupporters("https://raw.githubusercontent.com/Adya84/ha-world-cup-2026/main/supporters.json?t=" + Date.now());
    } catch {
      try {
        return await fetchSupporters("/world_cup_2026_frontend/data/supporters.json?t=" + Date.now());
      } catch {
        return [];
      }
    }
  }

  async loadAll() {
    try {
      this._data.overview = await this.callApi("world_cup_2026/get_overview");
      this._data.live = await this.callApi("world_cup_2026/get_live_matches");
      this._data.fixtures = await this.callApi("world_cup_2026/get_fixtures");
      this._data.groups = await this.callApi("world_cup_2026/get_groups");
      this._data.scorers = await this.safeCall("world_cup_2026/get_scorers", []);
      this._data.statistics = await this.safeCall("world_cup_2026/get_statistics", {});
      this._data.records = await this.safeCall("world_cup_2026/get_records", {});
      this._data.venues = await this.safeCall("world_cup_2026/get_venues", {});
      this._data.supporters = await this.loadSupporters();
      this.render();
    } catch (err) {
      this.renderError(err);
    }
  }

  goBackToHomeAssistant() {
     history.back();

  }

  changePage(page) {
    this._page = page;
    this.render();
  }

  changeLanguage(language) {
    this._language = language;
    localStorage.setItem("world_cup_2026_language", language);
    this.render();
  }

  locale() {
    const locales = {
      en: "en-GB",
      fr: "fr-FR",
      de: "de-DE",
      es: "es-ES",
      it: "it-IT",
      nl: "nl-NL",
      ar: "ar-SA",
      pt: "pt-PT",
      pl: "pl-PL",
      ja: "ja-JP",
      ko: "ko-KR",
      sv: "sv-SE",
      no: "nb-NO",
      is: "is-IS",
    };

    return locales[this._language] || "en-GB";
  }

  formatDate(value) {
    if (!value) return "";

    try {
      return new Date(value).toLocaleString(this.locale(), {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return value;
    }
  }

  statusLabel(status) {
    const labels = {
      TIMED: this.t("scheduled"),
      SCHEDULED: this.t("scheduled"),
      IN_PLAY: this.t("liveStatus"),
      LIVE: this.t("liveStatus"),
      PAUSED: this.t("paused"),
      FINISHED: this.t("fullTime"),
      FT: this.t("fullTime"),
      AET: this.t("aet"),
      PEN: this.t("penalties"),
      POSTPONED: this.t("postponed"),
    };
    return labels[status] || status || "";
  }

  stageLabel(stage) {
    const labels = {
      GROUP_STAGE: this.t("groupStage"),
      LAST_32: this.t("round32"),
      LAST_16: this.t("round16"),
      QUARTER_FINALS: this.t("quarterFinals"),
      SEMI_FINALS: this.t("semiFinals"),
      THIRD_PLACE: this.t("thirdPlace"),
      FINAL: this.t("final"),
    };
    return labels[stage] || String(stage || "").replaceAll("_", " ");
  }

  groupNameLabel(groupName, index) {
    const fallbackLetter = String.fromCharCode(65 + index);
    const raw = String(groupName || "").trim();

    let letter = fallbackLetter;

    const groupCodeMatch = raw.match(/^GROUP[_\s-]?([A-Z])$/i);
    const groupWordMatch = raw.match(/^Group\s+([A-Z])$/i);
    const singleLetterMatch = raw.match(/^([A-Z])$/i);

    if (groupCodeMatch) {
      letter = groupCodeMatch[1].toUpperCase();
    } else if (groupWordMatch) {
      letter = groupWordMatch[1].toUpperCase();
    } else if (singleLetterMatch) {
      letter = singleLetterMatch[1].toUpperCase();
    } else if (raw && !raw.includes("_")) {
      return raw;
    }

    if (this._language === "ko") {
      return `${letter}${this.t("groupLabel")}`;
    }

    if (this._language === "ja") {
      return `${this.t("groupLabel")} ${letter}`;
    }

    return `${this.t("groupLabel")} ${letter}`;
  }


  cleanTeamName(team) {
    let raw = team;

    if (team && typeof team === "object") {
      raw =
        team.name ||
        team.shortName ||
        team.fullName ||
        team.country ||
        team.tla ||
        team.code ||
        this.t("tbc");
    }

    return String(raw || this.t("tbc"))
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
      ARG: "Argentina",
      AUS: "Australia",
      AUT: "Austria",
      BEL: "Belgium",
      BIH: "Bosnia and Herzegovina",
      BRA: "Brazil",
      CAN: "Canada",
      COL: "Colombia",
      CRC: "Costa Rica",
      CRO: "Croatia",
      CZE: "Czechia",
      DEN: "Denmark",
      ECU: "Ecuador",
      EGY: "Egypt",
      ENG: "England",
      FRA: "France",
      GER: "Germany",
      DEU: "Germany",
      GHA: "Ghana",
      HAI: "Haiti",
      HON: "Honduras",
      IRN: "Iran",
      ITA: "Italy",
      CIV: "Côte d'Ivoire",
      JAM: "Jamaica",
      JPN: "Japan",
      KOR: "Korea Republic",
      MEX: "Mexico",
      MAR: "Morocco",
      NED: "Netherlands",
      NZL: "New Zealand",
      NGA: "Nigeria",
      NOR: "Norway",
      PAN: "Panama",
      PAR: "Paraguay",
      POL: "Poland",
      POR: "Portugal",
      QAT: "Qatar",
      KSA: "Saudi Arabia",
      SCO: "Scotland",
      SEN: "Senegal",
      SRB: "Serbia",
      RSA: "South Africa",
      ESP: "Spain",
      SWE: "Sweden",
      SUI: "Switzerland",
      TUN: "Tunisia",
      TUR: "Turkey",
      UKR: "Ukraine",
      URU: "Uruguay",
      WAL: "Wales",
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

    return fixes[name] || name || this.t("tbc");
  }



  localizedTeamName(team) {
    const canonicalName = this.teamLabel(team);

    if (!canonicalName || canonicalName === this.t("tbc") || canonicalName === "TBC") {
      return this.t("tbc");
    }

    const code = this.countryCode(canonicalName);
    const key = canonicalName.toLowerCase();

    const specialNames = {
      "gb-eng": {
        en: "England", fr: "Angleterre", de: "England", es: "Inglaterra", it: "Inghilterra", nl: "Engeland",
        ar: "إنجلترا", pt: "Inglaterra", pl: "Anglia", ja: "イングランド", ko: "잉글랜드", sv: "England", no: "England", is: "England",
      },
      "gb-sct": {
        en: "Scotland", fr: "Écosse", de: "Schottland", es: "Escocia", it: "Scozia", nl: "Schotland",
        ar: "اسكتلندا", pt: "Escócia", pl: "Szkocja", ja: "スコットランド", ko: "스코틀랜드", sv: "Skottland", no: "Skottland", is: "Skotland",
      },
      "gb-wls": {
        en: "Wales", fr: "Pays de Galles", de: "Wales", es: "Gales", it: "Galles", nl: "Wales",
        ar: "ويلز", pt: "País de Gales", pl: "Walia", ja: "ウェールズ", ko: "웨일스", sv: "Wales", no: "Wales", is: "Wales",
      },
    };

    const countryNameFixes = {
      "korea republic": {
        en: "Korea Republic", fr: "Corée du Sud", de: "Südkorea", es: "Corea del Sur", it: "Corea del Sud", nl: "Zuid-Korea",
        ar: "كوريا الجنوبية", pt: "Coreia do Sul", pl: "Korea Południowa", ja: "韓国", ko: "대한민국", sv: "Sydkorea", no: "Sør-Korea", is: "Suður-Kórea",
      },
      turkey: {
        en: "Turkey", fr: "Turquie", de: "Türkei", es: "Turquía", it: "Turchia", nl: "Turkije",
        ar: "تركيا", pt: "Turquia", pl: "Turcja", ja: "トルコ", ko: "튀르키예", sv: "Turkiet", no: "Tyrkia", is: "Tyrkland",
      },
    };

    if (specialNames[code]?.[this._language]) {
      return specialNames[code][this._language];
    }

    if (countryNameFixes[key]?.[this._language]) {
      return countryNameFixes[key][this._language];
    }

    if (code && !code.includes("-")) {
      try {
        const displayNames = new Intl.DisplayNames([this._language || "en"], { type: "region" });
        return displayNames.of(code.toUpperCase()) || canonicalName;
      } catch (err) {
        return canonicalName;
      }
    }

    return canonicalName;
  }

  localizedCountryName(country) {
    return this.localizedTeamName(country);
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

    if (!code || name === this.t("tbc") || name === "TBC") {
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
    const displayName = this.localizedTeamName(team);

    return `
      <div class="team-flag-block">
        ${this.flag(name)}
        <div class="team-flag-name">${this.esc(displayName)}</div>
      </div>
    `;
  }

  getHomeTeam(m) {
    return m.homeTeam || m.home || m.team1 || m.home_team || this.t("tbc");
  }

  getAwayTeam(m) {
    return m.awayTeam || m.away || m.team2 || m.away_team || this.t("tbc");
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
          <div class="wc-card">${this.t("loading")}</div>
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
            <h1>${this.t("errorTitle")}</h1>
            <p>${this.t("errorText")}</p>
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
          max-width: 1800px;
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

        .wc-donate-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          cursor: pointer;
          color: white;
          font-weight: 900;
          background: linear-gradient(135deg, rgba(0, 112, 186, 0.95), rgba(0, 200, 255, 0.35));
          border: 1px solid rgba(0, 200, 255, 0.55);
          box-shadow: 0 0 16px rgba(0, 200, 255, 0.25);
        }

        .wc-donate-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 22px rgba(0, 200, 255, 0.40);
        }

        
.wc-overview-beer-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,215,0,0.45);
  color: #ffffff;
  text-decoration: none;
  font-weight: 800;
  font-size: 15px;
  box-shadow: 0 0 10px rgba(255,215,0,0.15), 0 0 20px rgba(255,215,0,0.10);
  transition: all 0.2s ease;
}

.wc-overview-beer-button:hover {
  border-color: rgba(255,215,0,0.8);
  box-shadow: 0 0 15px rgba(255,215,0,0.35), 0 0 30px rgba(255,215,0,0.20);
  transform: translateY(-1px);
}

        .wc-header-title-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .wc-header-live-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 24px;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.25px;
          text-transform: uppercase;
          white-space: nowrap;
          max-width: min(420px, 38vw);
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 0 0 auto;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .wc-header-live-pill.live {
          color: #d8ffe8;
          background: rgba(0, 190, 85, 0.20);
          border: 1px solid rgba(0, 255, 120, 0.62);
          box-shadow: 0 0 14px rgba(0, 255, 120, 0.28);
        }

        .wc-header-live-pill.offline {
          color: #ffe0e0;
          background: rgba(210, 28, 28, 0.22);
          border: 1px solid rgba(255, 82, 82, 0.66);
          box-shadow: 0 0 14px rgba(255, 60, 60, 0.25);
        }

        .wc-header-scheduled-pill {
          max-width: min(240px, 24vw);
        }

        .wc-header-countdown-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          min-width: 220px;
          min-height: 42px;
          padding: 8px 18px;
          border-radius: 18px;
          color: #e9fbff;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: blur(12px);
          font-size: clamp(18px, 2.2vw, 32px);
          line-height: 1;
          font-weight: 1000;
          letter-spacing: 0.7px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wc-header-countdown-pill.is-hidden {
          display: none !important;
        }

        .wc-title-stack {
          min-width: 0;
          flex: 0 0 auto;
        }

        .wc-header-subtitle-inline {
          opacity: 0.62;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.1;
          margin-top: 1px;
          letter-spacing: 0.15px;
        }


        .overview-supporters-card {
          background:
            radial-gradient(circle at top left, rgba(255,220,120,0.15), transparent 34%),
            rgba(255,255,255,0.08);
          border-color: rgba(255,220,120,0.24);
        }

        .overview-supporters-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(210px, 0.6fr);
          gap: 14px;
          align-items: stretch;
        }

        .overview-supporters-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 8px;
        }

        .overview-supporter-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.10);
          min-width: 0;
        }

        .overview-supporter-pill strong,
        .overview-supporter-pill span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .overview-supporter-pill strong {
          font-size: 13px;
          font-weight: 950;
        }

        .overview-supporter-pill span {
          font-size: 11px;
          opacity: 0.72;
        }

        .overview-supporters-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .overview-supporters-stats div,
        .supporter-summary-stat {
          border-radius: 16px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.10);
          padding: 12px;
          text-align: center;
        }

        .overview-supporters-stats strong,
        .supporter-summary-stat strong {
          display: block;
          font-size: 24px;
          line-height: 1;
          font-weight: 1000;
          margin-bottom: 5px;
        }

        .overview-supporters-stats span,
        .supporter-summary-stat span {
          font-size: 11px;
          opacity: 0.72;
          font-weight: 900;
          text-transform: uppercase;
        }

        .overview-country-strip,
        .supporter-country-grid {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .overview-country-strip span,
        .supporter-country-grid span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.10);
          font-size: 12px;
          font-weight: 850;
        }

        .overview-supporters-thanks {
          margin-top: 12px;
          opacity: 0.78;
          font-size: 13px;
          font-weight: 800;
        }

        .overview-supporters-link {
          padding: 8px 12px;
        }

        .supporters-summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 10px;
          margin-bottom: 12px;
        }

        .supporters-feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }

        .supporter-card-compact {
          padding: 8px 10px;
          border-radius: 12px;
          min-height: auto;
        }

        .supporter-latest-card {
          background: linear-gradient(135deg, rgba(255,220,120,0.13), rgba(255,255,255,0.07));
          border-color: rgba(255,220,120,0.28);
        }

        .supporter-card-name {
          display: flex !important;
          align-items: center;
          gap: 7px;
          font-size: 14px !important;
          line-height: 1.15;
          min-width: 0;
        }

        .supporter-card-name span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .supporter-card-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
          font-size: 11px;
          opacity: 0.72;
          font-weight: 800;
        }

        .supporter-card-message {
          margin-top: 4px;
          font-size: 11px;
          opacity: 0.68;
          line-height: 1.25;
        }

        @media (max-width: 850px) {
          .overview-supporters-layout {
            grid-template-columns: 1fr;
          }
        }

        .wc-donate-footer {
          margin-top: 22px;
          padding: 14px 18px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(0, 112, 186, 0.38), rgba(0, 200, 255, 0.14));
          border: 1px solid rgba(0, 200, 255, 0.35);
          box-shadow: 0 0 18px rgba(0, 200, 255, 0.16);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          text-align: center;
        }

        .wc-donate-footer span {
          font-weight: 800;
          color: rgba(255,255,255,0.92);
        }

        .wc-donate-footer a {
          color: white;
          font-weight: 900;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(0, 200, 255, 0.24);
          border: 1px solid rgba(0, 200, 255, 0.48);
        }

        .wc-donate-footer a:hover {
          background: rgba(0, 200, 255, 0.34);
        }

        .wc-header-controls {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: nowrap;
          margin-left: auto;
        }

        .wc-language-wrap,
        .wc-updated-wrap {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          gap: 0;
          margin: 0;
        }

        .wc-language-label,
        .wc-updated-label {
          display: none;
        }

        .wc-language-select,
        .wc-updated-pill,
        .wc-header-controls .wc-back-button {
          min-height: 34px;
          height: 34px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
          line-height: 1;
          white-space: nowrap;
        }

        .wc-language-select {
          cursor: pointer;
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.20);
          padding: 7px 12px;
          outline: none;
          min-width: 146px;
        }

        .wc-updated-pill {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.20);
          padding: 7px 12px;
          min-width: 82px;
        }

        .wc-header-controls .wc-back-button {
          padding: 7px 12px;
        }

        .wc-language-select option {
          color: #111;
          background: #fff;
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

        .wc-groups-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          align-items: start;
        }

        .wc-group-card {
          padding: 11px 12px 10px;
          border-radius: 17px;
          margin-bottom: 0;
        }

        .wc-group-card .wc-section-title {
          font-size: 17px;
          line-height: 1;
          margin: 0 0 8px;
        }

        .wc-group-card .wc-table-wrap {
          overflow-x: hidden;
          width: 100%;
        }

        .wc-group-card .wc-table {
          width: 100%;
          min-width: 0;
          table-layout: fixed;
          border-collapse: collapse;
          font-size: 11px;
        }

        .wc-group-card .wc-table th,
        .wc-group-card .wc-table td {
          padding: 3px 3px;
          line-height: 1.15;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          vertical-align: middle;
        }

        .wc-group-card .wc-table th {
          font-size: 9px;
          letter-spacing: -0.2px;
          opacity: 0.78;
          text-align: center;
        }

        .wc-group-card .wc-table th:nth-child(1),
        .wc-group-card .wc-table td:nth-child(1) {
          width: 7%;
          text-align: center;
        }

        .wc-group-card .wc-table th:nth-child(2),
        .wc-group-card .wc-table td:nth-child(2) {
          width: 43%;
          text-align: left;
          padding-left: 4px;
          padding-right: 6px;
        }

        .wc-group-card .wc-table th:nth-child(3),
        .wc-group-card .wc-table td:nth-child(3),
        .wc-group-card .wc-table th:nth-child(4),
        .wc-group-card .wc-table td:nth-child(4),
        .wc-group-card .wc-table th:nth-child(5),
        .wc-group-card .wc-table td:nth-child(5),
        .wc-group-card .wc-table th:nth-child(6),
        .wc-group-card .wc-table td:nth-child(6),
        .wc-group-card .wc-table th:nth-child(7),
        .wc-group-card .wc-table td:nth-child(7),
        .wc-group-card .wc-table th:nth-child(8),
        .wc-group-card .wc-table td:nth-child(8) {
          width: 5.5%;
          text-align: center;
        }

        .wc-group-card .wc-table th:nth-child(9),
        .wc-group-card .wc-table td:nth-child(9) {
          width: 8%;
          text-align: center;
        }

        .wc-group-card .wc-table th:nth-child(10),
        .wc-group-card .wc-table td:nth-child(10) {
          width: 9%;
          text-align: center;
          font-weight: 900;
        }

        .wc-group-card .group-team-cell {
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
          width: 100%;
          overflow: hidden;
        }

        .wc-group-card .group-team-cell strong {
          display: block;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .wc-group-card .group-flag-img,
        .wc-group-card .group-flag-missing {
          width: 21px;
          height: 15px;
          font-size: 10px;
          flex: 0 0 auto;
        }


        .overview-pro-page {
          display: grid;
          gap: 16px;
        }

        .overview-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.55fr);
          gap: 18px;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(circle at top left, rgba(45,190,255,0.22), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255,215,80,0.16), transparent 32%),
            rgba(255,255,255,0.09);
        }

        .overview-hero.compact-overview-hero,
        .overview-hero {
          min-height: auto;
          padding: 12px 16px;
          grid-template-columns: minmax(0, 1.7fr) minmax(220px, 0.5fr);
          gap: 12px;
        }

        .overview-hero .overview-kicker {
          display: none;
        }

        .overview-hero-title.compact-title,
        .overview-hero-title {
          font-size: clamp(24px, 3vw, 38px);
          line-height: 1;
          margin-bottom: 4px;
        }

        .overview-hero-subtitle.compact-subtitle,
        .overview-hero-subtitle {
          font-size: 12px;
          line-height: 1.2;
          opacity: 0.68;
          max-width: 520px;
        }

        .overview-progress-wrap {
          margin-top: 10px;
          max-width: 520px;
        }

        .overview-progress-top {
          margin-bottom: 5px;
          font-size: 11px;
        }

        .overview-progress-bar {
          height: 8px;
        }

        .overview-action-row {
          margin-top: 10px;
          gap: 7px;
        }

        .overview-action-button {
          padding: 7px 11px;
          font-size: 11px;
        }

        .overview-hero-side {
          gap: 8px;
        }

        .overview-status-card {
          min-height: 74px;
          padding: 11px 13px;
          gap: 3px;
          border-radius: 15px;
        }

        .overview-status-card strong {
          font-size: 26px;
        }

        .overview-status-card span,
        .overview-status-card em {
          font-size: 11px;
        }


        .overview-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .overview-hero-main,
        .overview-hero-side {
          position: relative;
          z-index: 1;
        }

        .overview-kicker,
        .overview-small-label {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(155,225,255,0.95);
          margin-bottom: 7px;
        }

        .overview-hero-title {
          font-size: clamp(30px, 4vw, 54px);
          line-height: 0.95;
          font-weight: 1000;
          text-shadow: 0 12px 30px rgba(0,0,0,0.45);
          margin-bottom: 12px;
        }

        .overview-hero-subtitle {
          max-width: 820px;
          color: rgba(255,255,255,0.78);
          font-size: 15px;
          line-height: 1.45;
        }

        .overview-progress-wrap {
          margin-top: 22px;
          max-width: 680px;
        }

        .overview-progress-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .overview-progress-bar {
          height: 12px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
        }

        .overview-progress-bar div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(45,190,255,0.88), rgba(255,215,80,0.88));
          box-shadow: 0 0 22px rgba(45,190,255,0.38);
        }

        .overview-action-row {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 18px;
        }

        .overview-action-button {
          cursor: pointer;
          color: white;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.11);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 900;
          backdrop-filter: blur(10px);
        }

        .overview-action-button:hover {
          background: rgba(45,190,255,0.28);
          border-color: rgba(120,220,255,0.65);
        }

        .overview-hero-side {
          display: grid;
          gap: 12px;
          align-content: stretch;
        }

        .overview-status-card {
          min-height: 132px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 7px;
          padding: 18px;
          border-radius: 20px;
          background: rgba(0,0,0,0.20);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .overview-status-card.is-live {
          background: linear-gradient(135deg, rgba(255,40,40,0.28), rgba(255,255,255,0.08));
          border-color: rgba(255,90,90,0.44);
        }

        .overview-status-card span,
        .overview-status-card em,
        .overview-stat-tile span,
        .overview-stat-tile em,
        .overview-info-list span,
        .overview-info-list em {
          color: rgba(255,255,255,0.70);
          font-style: normal;
          font-size: 12px;
          font-weight: 800;
        }

        .overview-status-card strong {
          font-size: 40px;
          line-height: 1;
          font-weight: 1000;
        }

        .overview-stat-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
        }

        .overview-stat-tile {
          min-height: 112px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 18px;
          padding: 15px;
          background: rgba(255,255,255,0.09);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 14px 34px rgba(0,0,0,0.15);
        }

        .overview-stat-tile strong {
          font-size: 34px;
          line-height: 1;
          font-weight: 1000;
        }

        .overview-stat-tile em {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .overview-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(340px, 0.75fr);
          gap: 16px;
          align-items: stretch;
        }

        .overview-lower-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .overview-panel {
          margin-bottom: 0;
        }

        .overview-panel-heading {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .overview-panel-heading .wc-section-title {
          margin: 0;
        }

        .overview-date-pill {
          flex: 0 0 auto;
          border-radius: 999px;
          padding: 8px 11px;
          background: rgba(255,255,255,0.11);
          border: 1px solid rgba(255,255,255,0.14);
          font-size: 12px;
          font-weight: 900;
          color: rgba(255,255,255,0.78);
        }

        .overview-feature-panel .fixture-card {
          min-height: 210px;
        }

        .overview-info-list {
          display: grid;
          gap: 10px;
        }

        .overview-info-list div {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          gap: 6px 12px;
          align-items: center;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .overview-info-list strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }

        .overview-info-list em {
          grid-column: 2;
        }

        .overview-mini-match-list,
        .overview-player-list {
          display: grid;
          gap: 10px;
        }

        .overview-mini-match {
          padding: 12px;
          border-radius: 16px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .overview-mini-top,
        .overview-mini-date {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          color: rgba(255,255,255,0.66);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .overview-mini-top em {
          font-style: normal;
          color: rgba(255,255,255,0.86);
        }

        .overview-mini-teams {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          gap: 10px;
          margin: 10px 0;
        }

        .overview-mini-teams div {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .overview-mini-teams div:last-child {
          justify-content: flex-end;
          text-align: right;
        }

        .overview-mini-teams strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
        }

        .overview-mini-teams b {
          padding: 8px 10px;
          border-radius: 12px;
          background: rgba(0,0,0,0.24);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 13px;
        }

        .overview-player-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) minmax(0, 0.85fr) auto;
          gap: 10px;
          align-items: center;
          padding: 11px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .overview-player-row span {
          width: 25px;
          height: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(45,190,255,0.26);
          font-size: 12px;
          font-weight: 1000;
        }

        .overview-player-row strong,
        .overview-player-row em {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .overview-player-row em {
          color: rgba(255,255,255,0.62);
          font-size: 12px;
          font-style: normal;
        }

        .overview-player-row b {
          font-size: 18px;
        }



        .fixtures-page-card {
          padding: 20px;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(10,30,58,0.72), rgba(255,255,255,0.075)),
            rgba(255,255,255,0.08);
        }

        .fixtures-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 18px;
          align-items: stretch;
          margin-bottom: 16px;
        }

        .fixtures-title-wrap {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .fixtures-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .fixtures-subtitle {
          opacity: 0.78;
          font-size: 13px;
          margin-top: 2px;
          line-height: 1.35;
        }

        .fixtures-summary-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(82px, 1fr));
          gap: 10px;
          min-width: 430px;
        }

        .fixtures-summary-box {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(45,190,255,0.18), rgba(255,255,255,0.065));
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 18px;
          padding: 13px 12px;
          text-align: center;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 12px 28px rgba(0,0,0,0.14);
        }

        .fixtures-summary-box::after {
          content: "";
          position: absolute;
          inset: auto -20px -26px auto;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          background: rgba(45,190,255,0.13);
        }

        .fixtures-summary-box strong {
          display: block;
          font-size: 27px;
          line-height: 1;
          position: relative;
          z-index: 1;
        }

        .fixtures-summary-box span {
          display: block;
          margin-top: 6px;
          font-size: 10px;
          opacity: 0.78;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          position: relative;
          z-index: 1;
        }

        .fixtures-next-strip {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px 14px;
          margin-bottom: 16px;
          padding: 13px 15px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(45,190,255,0.24), rgba(20,70,130,0.20));
          border: 1px solid rgba(120,220,255,0.34);
          box-shadow: 0 14px 34px rgba(0,0,0,0.16);
        }

        .fixtures-next-strip span {
          opacity: 0.82;
          font-size: 11px;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          white-space: nowrap;
        }

        .fixtures-next-strip strong {
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fixtures-next-strip em {
          opacity: 0.82;
          font-style: normal;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .fixtures-days {
          display: grid;
          gap: 16px;
        }

        .fixtures-day-block {
          background: rgba(0,0,0,0.16);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 22px;
          padding: 14px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .fixtures-day-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          padding: 0 3px;
        }

        .fixtures-day-heading span {
          font-size: 17px;
          font-weight: 950;
        }

        .fixtures-day-heading small {
          opacity: 0.76;
          font-weight: 900;
          white-space: nowrap;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 999px;
          padding: 5px 9px;
        }

        .fixtures-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 12px;
        }

        .fixture-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.11), rgba(255,255,255,0.055));
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 20px;
          padding: 13px;
          box-shadow: 0 14px 32px rgba(0,0,0,0.18);
        }

        .fixture-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at top center, rgba(45,190,255,0.15), transparent 46%);
          opacity: 0.75;
        }

        .fixture-card.is-live {
          background: linear-gradient(135deg, rgba(255,48,48,0.23), rgba(255,255,255,0.055));
          border-color: rgba(255,95,95,0.50);
        }

        .fixture-card.is-finished {
          background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.10));
        }

        .fixture-card-top,
        .fixture-card-footer,
        .fixture-card-main {
          position: relative;
          z-index: 1;
        }

        .fixture-card-top,
        .fixture-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          color: rgba(255,255,255,0.76);
          font-size: 11px;
          font-weight: 850;
        }

        .fixture-card-top span,
        .fixture-card-footer span {
          min-width: 0;
        }

        .fixture-card-footer span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fixture-card-status {
          color: white;
          background: rgba(255,255,255,0.13);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 999px;
          padding: 5px 9px;
          font-size: 10px;
          font-weight: 950;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.25px;
        }

        .fixture-card.is-live .fixture-card-status {
          background: rgba(255,40,40,0.34);
          border-color: rgba(255,120,120,0.55);
        }

        .fixture-card.is-scheduled .fixture-card-status {
          background: rgba(45,190,255,0.20);
          border-color: rgba(120,220,255,0.38);
        }

        .fixture-stage-pill {
          display: inline-flex;
          align-items: center;
          max-width: 70%;
          background: rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 999px;
          padding: 5px 9px;
        }

        .fixture-card-number {
          position: absolute;
          right: 12px;
          bottom: 10px;
          z-index: 0;
          font-size: 40px;
          font-weight: 950;
          opacity: 0.055;
          pointer-events: none;
        }

        .fixture-card-main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          gap: 8px;
          padding: 8px 0 7px;
        }

        .fixture-card-team {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
          font-weight: 900;
          font-size: 13px;
          line-height: 1.05;
        }

        .fixture-card-team span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fixture-card-team-away {
          justify-content: flex-end;
          text-align: right;
        }

        .fixture-card-team-away img,
        .fixture-card-team-away .group-flag-missing {
          order: 2;
        }

        .fixture-card .group-flag-img,
        .fixture-card .group-flag-missing {
          width: 36px;
          height: 25px;
          border-radius: 5px;
          font-size: 14px;
          box-shadow: 0 5px 11px rgba(0,0,0,0.30);
        }

        .fixture-card-score {
          min-width: 58px;
          text-align: center;
          font-size: 20px;
          font-weight: 950;
          padding: 6px 9px;
          border-radius: 12px;
          background: rgba(0,0,0,0.28);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: inset 0 0 18px rgba(255,255,255,0.04), 0 6px 14px rgba(0,0,0,0.14);
        }

        .fixture-card-footer {
          border-top: 1px solid rgba(255,255,255,0.09);
          padding-top: 10px;
        }

        .fixture-card-footer span:last-child:empty {
          display: none;
        }

        .fixture-card-top-merged {
          align-items: flex-start;
          gap: 7px;
          flex-wrap: wrap;
        }

        .fixture-top-details {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 5px;
          min-width: 0;
          flex: 1 1 210px;
        }

        .fixture-top-details span {
          display: inline-flex;
          align-items: center;
          min-width: fit-content;
          max-width: none;
          padding: 4px 7px;
          border-radius: 999px;
          background: rgba(0,0,0,0.16);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: visible;
          text-overflow: clip;
          white-space: normal;
          font-size: 10.5px;
          line-height: 1.15;
        }

        .fixture-top-details .fixture-date-pill,
        .fixture-top-details .fixture-time-pill {
          white-space: nowrap;
        }

        .fixture-top-details .fixture-time-pill {
          font-size: 12px;
          font-weight: 900;
          padding: 5px 8px;
          background: rgba(0,0,0,0.24);
        }

        .fixture-card-main-compact {
          padding: 6px 0 6px;
          gap: 7px;
        }

        .fixture-card-main-compact .fixture-card-team {
          gap: 6px;
          font-size: 12px;
          line-height: 1;
        }

        .fixture-card-main-compact .group-flag-img,
        .fixture-card-main-compact .group-flag-missing {
          width: 32px;
          height: 22px;
          border-radius: 5px;
        }

        .fixture-card-main-compact .fixture-card-score {
          min-width: 52px;
          font-size: 18px;
          padding: 5px 8px;
          border-radius: 11px;
        }

        .fixture-stadium-image {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: 178px;
          object-fit: cover;
          object-position: center;
          border-radius: 13px;
          margin: 5px 0 6px;
          background: rgba(0,0,0,.24);
          border: 1px solid rgba(255,255,255,.10);
          box-shadow: 0 8px 20px rgba(0,0,0,0.20);
        }

        .fixture-card-venue-inline {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(110px, 0.95fr) minmax(78px, auto);
          align-items: center;
          column-gap: 10px;
          row-gap: 4px;
          min-width: 0;
          margin: 0;
          padding: 7px 10px;
          border-radius: 9px;
          background: rgba(0,0,0,.17);
          border: 1px solid rgba(255,255,255,.11);
          font-size: 12px;
          line-height: 1.18;
          color: rgba(255,255,255,0.92);
          overflow: visible;
        }

        .fixture-card-venue-inline span {
          min-width: 0;
          opacity: 0.94;
        }

        .fixture-card-venue-inline .fixture-venue-name {
          font-weight: 900;
          opacity: 1;
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          overflow-wrap: anywhere;
        }

        .fixture-card-venue-inline .fixture-venue-location {
          justify-self: center;
          text-align: center;
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          overflow-wrap: anywhere;
        }

        .fixture-card-venue-inline .fixture-venue-real {
          display: none;
        }

        .fixture-card-venue-inline .fixture-venue-capacity {
          justify-self: end;
          font-size: 12px;
          font-weight: 850;
          text-align: right;
          white-space: nowrap;
        }

        @media (max-width: 760px) {
          .fixture-card-venue-inline {
            grid-template-columns: minmax(0, 1fr) auto;
            font-size: 11.5px;
          }

          .fixture-card-venue-inline .fixture-venue-name {
            grid-column: 1 / -1;
          }

          .fixture-card-venue-inline .fixture-venue-location {
            justify-self: start;
            text-align: left;
          }

          .fixture-card-venue-inline .fixture-venue-capacity {
            font-size: 11.5px;
          }
        }

        @media (max-width: 560px) {
          .fixture-card-top-merged {
            align-items: stretch;
          }

          .fixture-stage-pill {
            max-width: 100%;
          }

          .fixture-top-details {
            flex: 1 1 100%;
            justify-content: flex-start;
          }

          .fixture-top-details span,
          .fixture-card-status {
            font-size: 10px;
            padding: 3px 6px;
          }

          .fixture-top-details .fixture-time-pill {
            font-size: 11px;
            padding: 4px 7px;
          }
        }


        @media (max-width: 1300px) {
          .overview-stat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .overview-lower-grid {
            grid-template-columns: 1fr 1fr;
          }
        }


        @media (max-width: 900px) {
          .overview-hero.compact-overview-hero,
          .overview-hero {
            padding: 11px;
            gap: 10px;
          }

          .overview-hero-title.compact-title,
          .overview-hero-title {
            font-size: 28px;
            text-align: center;
          }

          .overview-hero-subtitle.compact-subtitle,
          .overview-hero-subtitle {
            text-align: center;
            max-width: none;
          }

          .overview-progress-wrap {
            max-width: none;
          }

          .overview-action-row {
            justify-content: center;
          }

          .overview-status-card {
            min-height: 62px;
          }
        }

        @media (max-width: 950px) {
          .overview-hero,
          .overview-main-grid,
          .overview-lower-grid {
            grid-template-columns: 1fr;
          }

          .overview-hero-side {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 650px) {
          .overview-stat-grid,
          .overview-hero-side {
            grid-template-columns: 1fr;
          }

          .overview-hero-title {
            font-size: 32px;
          }

          .overview-info-list div,
          .overview-player-row {
            grid-template-columns: 1fr;
          }

          .overview-info-list em {
            grid-column: auto;
          }

          .overview-mini-teams {
            grid-template-columns: 1fr;
            text-align: left;
          }

          .overview-mini-teams div:last-child {
            justify-content: flex-start;
            text-align: left;
          }
        }

        @media (max-width: 1200px) {
          .wc-groups-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .wc-group-card .wc-table {
            font-size: 10.8px;
          }
        }

        @media (max-width: 700px) {
          .wc-groups-grid {
            grid-template-columns: 1fr;
          }

          .wc-group-card {
            padding: 10px;
          }

          .wc-group-card .wc-table {
            font-size: 10.5px;
          }

          .wc-group-card .wc-table th {
            font-size: 8.5px;
          }

          .wc-group-card .group-flag-img,
          .wc-group-card .group-flag-missing {
            width: 20px;
            height: 14px;
          }
        }



        .golden-boot-hero {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          background:
            linear-gradient(135deg, rgba(255,205,80,0.22), rgba(255,255,255,0.08)),
            rgba(255,255,255,0.08);
          border-color: rgba(255,220,120,0.34);
        }

        .golden-kicker {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 900;
          opacity: 0.78;
          margin-bottom: 6px;
        }

        .golden-title {
          margin-bottom: 6px;
        }

        .golden-boot-icon {
          width: 86px;
          height: 86px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          background: rgba(255,220,120,0.18);
          border: 1px solid rgba(255,220,120,0.34);
          box-shadow: 0 16px 36px rgba(0,0,0,0.25);
          flex: 0 0 auto;
        }

        .golden-layout {
          display: grid;
          grid-template-columns: 1.7fr 0.8fr;
          gap: 16px;
          align-items: stretch;
        }

        .golden-leader {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 20px;
          background: rgba(255,220,120,0.14);
          border: 1px solid rgba(255,220,120,0.28);
          margin-bottom: 14px;
        }

        .golden-leader-medal {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 32px;
          background: rgba(255,255,255,0.12);
        }

        .golden-leader-name {
          font-size: 25px;
          font-weight: 900;
          line-height: 1.1;
        }

        .golden-leader-team,
        .golden-player-team {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 7px;
          opacity: 0.9;
          font-weight: 800;
        }

        .golden-leader-goals {
          text-align: center;
          min-width: 86px;
        }

        .golden-leader-goals strong {
          display: block;
          font-size: 44px;
          line-height: 1;
        }

        .golden-leader-goals span {
          display: block;
          font-size: 12px;
          opacity: 0.75;
          text-transform: uppercase;
          font-weight: 900;
          margin-top: 4px;
        }

        .golden-podium-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .golden-podium-item {
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.12);
          min-width: 0;
        }

        .golden-podium-item.winner {
          background: rgba(255,220,120,0.15);
          border-color: rgba(255,220,120,0.30);
        }

        .golden-medal {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .golden-player-name {
          font-size: 17px;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .golden-player-stats {
          margin-top: 10px;
          display: flex;
          align-items: baseline;
          gap: 8px;
          flex-wrap: wrap;
        }

        .golden-player-stats strong {
          font-size: 26px;
        }

        .golden-player-stats span {
          opacity: 0.72;
          font-size: 12px;
          font-weight: 800;
        }

        .golden-summary-card {
          display: grid;
          gap: 10px;
        }

        .golden-mini-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.075);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .golden-mini-stat strong {
          font-size: 25px;
        }

        .golden-mini-stat span {
          opacity: 0.74;
          font-weight: 800;
          text-align: right;
        }

        .golden-table-wrap .wc-table {
          min-width: 760px;
        }

        .golden-table th,
        .golden-table td {
          vertical-align: middle;
        }

        .golden-rank {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          font-weight: 900;
        }

        .golden-top-row .golden-rank {
          background: rgba(255,220,120,0.22);
          border: 1px solid rgba(255,220,120,0.30);
        }

        .golden-table-player {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .golden-table-medal {
          min-width: 22px;
        }

        .golden-goal-count {
          font-size: 20px;
        }


        .wc-venue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 14px;
        }



        /* Compact overview layout tweaks */
        .overview-hero.compact-overview-hero,
        .overview-hero {
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: start;
          padding: 10px 14px;
          gap: 10px;
          border-radius: 18px;
        }

        .overview-hero-title.compact-title,
        .overview-hero-title {
          font-size: clamp(20px, 2.2vw, 30px);
          line-height: 1;
          margin-bottom: 3px;
        }

        .overview-hero-subtitle.compact-subtitle,
        .overview-hero-subtitle {
          font-size: 11px;
          line-height: 1.2;
          max-width: 520px;
          opacity: 0.7;
        }

        .overview-progress-wrap {
          margin-top: 8px;
          max-width: 420px;
        }

        .overview-progress-top {
          margin-bottom: 4px;
          font-size: 10px;
        }

        .overview-progress-bar {
          height: 6px;
        }

        .overview-action-row {
          margin-top: 8px;
          gap: 6px;
        }

        .overview-action-button {
          padding: 6px 10px;
          font-size: 10px;
        }

        .overview-top-pills {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 6px;
          min-width: 0;
        }

        .overview-status-card.overview-mini-pill {
          min-height: 0;
          width: auto;
          min-width: 74px;
          padding: 5px 8px;
          border-radius: 999px;
          gap: 1px;
          text-align: center;
        }

        .overview-status-card.overview-mini-pill span,
        .overview-status-card.overview-mini-pill em {
          font-size: 8px;
          line-height: 1.05;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .overview-status-card.overview-mini-pill strong {
          font-size: 13px;
          line-height: 1;
        }

        .overview-stat-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 8px;
        }

        .overview-stat-tile {
          min-height: 70px;
          padding: 9px 10px;
          border-radius: 14px;
        }

        .overview-stat-tile strong {
          font-size: clamp(19px, 2vw, 26px);
        }

        .overview-stat-tile span,
        .overview-stat-tile em {
          font-size: 10px;
          line-height: 1.1;
        }

        .overview-supporters-card {
          margin-top: 0;
        }

        @media (max-width: 900px) {
          .wc-header-title-row {
            justify-content: center;
            flex-wrap: wrap;
            text-align: center;
            gap: 8px;
          }

          .wc-header-live-pill {
            font-size: 10px;
            padding: 4px 8px;
          }

          .wc-header-countdown-pill {
            order: 10;
            flex: 1 1 100%;
            width: 100%;
            min-width: 0;
            min-height: 40px;
            font-size: clamp(17px, 5.2vw, 25px);
            padding: 8px 12px;
          }

          .wc-header-subtitle-inline {
            text-align: center;
          }

          .wc-overview-beer-button {
            padding: 10px 18px;
            font-size: 14px;
          }
        }



        @media (max-width: 800px) {
          .overview-hero.compact-overview-hero,
          .overview-hero {
            grid-template-columns: 1fr;
          }

          .overview-top-pills {
            justify-content: flex-start;
            flex-wrap: wrap;
          }

          .overview-stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
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

          .wc-header-controls {
            justify-content: flex-end;
            align-items: center;
            flex-wrap: nowrap;
            margin-top: 12px;
          }

          .wc-pill,
          .wc-language-wrap,
          .wc-updated-wrap {
            display: inline-flex;
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

          .fixtures-hero {
            display: block;
          }

          .fixtures-summary-grid {
            min-width: 0;
            margin-top: 12px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .fixtures-card-grid {
            grid-template-columns: 1fr;
          }

          .fixture-card-main {
            gap: 7px;
          }

          .fixture-card-team {
            font-size: 12px;
          }

          .fixture-card .group-flag-img,
          .fixture-card .group-flag-missing {
            width: 31px;
            height: 22px;
          }

          .fixture-card-score {
            min-width: 54px;
            font-size: 18px;
            padding: 7px 8px;
          }

        }


        @media (max-width: 900px) {
          .golden-layout {
            grid-template-columns: 1fr;
          }

          .golden-podium-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .golden-boot-hero,
          .golden-leader {
            grid-template-columns: 1fr;
            display: grid;
            text-align: center;
          }

          .golden-boot-icon,
          .golden-leader-medal {
            margin: 0 auto;
          }

          .golden-leader-team,
          .golden-player-team {
            justify-content: center;
          }

          .golden-leader-goals {
            margin: 0 auto;
          }
        }


        .golden-layout-polished {
          grid-template-columns: minmax(0, 2.2fr) minmax(280px, 0.85fr);
          align-items: stretch;
        }

        .golden-main-card {
          min-width: 0;
        }

        .golden-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .golden-showcase {
          display: grid;
          grid-template-columns: minmax(230px, 0.8fr) minmax(360px, 1.35fr);
          gap: 14px;
          align-items: stretch;
        }

        .golden-leader-compact {
          grid-template-columns: 1fr;
          text-align: center;
          justify-items: center;
          margin-bottom: 0;
          min-height: 100%;
        }

        .golden-leader-compact .golden-leader-name {
          font-size: 22px;
        }

        .golden-leader-compact .golden-leader-team {
          justify-content: center;
        }

        .golden-leader-compact .golden-leader-goals strong {
          font-size: 58px;
        }

        .golden-podium-grid-polished {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          height: 100%;
        }

        .golden-podium-grid-polished .golden-podium-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 170px;
        }

        .golden-empty-podium {
          opacity: 0.55;
          border-style: dashed;
        }

        .golden-summary-card .wc-section-title {
          margin-bottom: 4px;
        }

        .golden-table-card .golden-card-head {
          margin-bottom: 8px;
        }

        .golden-table .group-team-cell {
          justify-content: flex-start;
        }

        @media (max-width: 1100px) {
          .golden-layout-polished,
          .golden-showcase {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .golden-podium-grid-polished {
            grid-template-columns: 1fr;
          }

          .golden-card-head {
            align-items: flex-start;
          }
        }


        .golden-showcase-polished {
          align-items: stretch;
        }

        .golden-leader-main {
          min-width: 0;
        }

        .golden-leader-strip {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 4px;
        }

        .golden-leader-strip span {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 9px 10px;
          border-radius: 13px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.10);
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          opacity: 0.88;
        }

        .golden-leader-strip strong {
          font-size: 17px;
          line-height: 1;
        }

        .golden-card-stat-row {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 12px;
          font-size: 11px;
          font-weight: 900;
          opacity: 0.82;
        }

        .golden-card-stat-row span {
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .golden-card-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          padding: 5px 8px;
          border-radius: 999px;
          font-weight: 900;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .golden-card-pill.yellow {
          background: rgba(255,220,80,0.12);
          border-color: rgba(255,220,80,0.24);
        }

        .golden-card-pill.red {
          background: rgba(255,90,90,0.12);
          border-color: rgba(255,90,90,0.24);
        }

        .golden-updated {
          text-align: center;
          font-size: 12px;
          margin-top: 2px;
        }

        @media (max-width: 620px) {
          .golden-table-wrap .golden-table {
            min-width: 0;
          }

          .golden-table thead {
            display: none;
          }

          .golden-table,
          .golden-table tbody,
          .golden-table tr,
          .golden-table td {
            display: block;
            width: 100%;
          }

          .golden-table tr {
            padding: 12px;
            margin-bottom: 12px;
            border-radius: 18px;
            background: rgba(255,255,255,0.065);
            border: 1px solid rgba(255,255,255,0.10);
          }

          .golden-table td {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 7px 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .golden-table td:first-child {
            justify-content: center;
            padding-top: 0;
          }

          .golden-table td:last-child {
            border-bottom: 0;
            padding-bottom: 0;
          }

          .golden-table td[data-label]::before {
            content: attr(data-label);
            opacity: 0.68;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 900;
          }

          .golden-table .group-team-cell,
          .golden-table-player {
            justify-content: flex-end;
            text-align: right;
          }

          .golden-leader-strip {
            grid-template-columns: 1fr;
          }
        }


        /* Compact overview hero - tiny status corner */
        .overview-hero.compact-overview-hero,
        .overview-hero {
          position: relative;
          min-height: auto;
          padding: 12px 16px 14px;
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .overview-hero-side {
          position: absolute;
          top: 10px;
          right: 12px;
          display: flex;
          flex-direction: row;
          gap: 6px;
          z-index: 2;
        }

        .overview-status-card {
          min-height: 0;
          padding: 6px 9px;
          border-radius: 999px;
          gap: 0;
          background: rgba(0,0,0,0.22);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: none;
          min-width: auto;
        }

        .overview-status-card span {
          display: none;
        }

        .overview-status-card strong {
          font-size: 12px;
          line-height: 1;
          font-weight: 900;
        }

        .overview-status-card em {
          font-size: 10px;
          line-height: 1;
          opacity: 0.78;
          margin-left: 3px;
        }

        .overview-status-card.is-live {
          background: rgba(255,40,40,0.25);
          border-color: rgba(255,90,90,0.45);
        }

        .overview-hero-title.compact-title,
        .overview-hero-title {
          font-size: clamp(24px, 3vw, 36px);
          line-height: 1;
          margin-bottom: 2px;
          padding-right: 230px;
        }

        .overview-hero-subtitle.compact-subtitle,
        .overview-hero-subtitle {
          font-size: 11px;
          line-height: 1.15;
          opacity: 0.72;
          max-width: 480px;
          padding-right: 230px;
        }

        .overview-progress-wrap {
          margin-top: 8px;
          max-width: none;
        }

        .overview-action-row {
          margin-top: 9px;
        }

        @media (max-width: 900px) {
          .overview-hero-side {
            position: static;
            justify-content: center;
            margin-bottom: 4px;
            order: -1;
          }

          .overview-hero-title.compact-title,
          .overview-hero-title,
          .overview-hero-subtitle.compact-subtitle,
          .overview-hero-subtitle {
            padding-right: 0;
            text-align: center;
          }
        }


        /* Compact overview stat row */
        .overview-stat-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 8px;
        }

        .overview-stat-tile {
          min-height: 62px;
          padding: 8px 10px;
          border-radius: 13px;
        }

        .overview-stat-tile strong {
          font-size: 23px;
          line-height: 1;
          margin-bottom: 2px;
        }

        .overview-stat-tile span,
        .overview-stat-tile em {
          font-size: 10px;
          line-height: 1.15;
        }

        @media (max-width: 1250px) {
          .overview-stat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .overview-stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }


        .overview-supporters-card,
        .overview-latest-supporters-card {
          margin-top: 16px;
        }

        .overview-supporters-card .wc-grid,
        .overview-latest-supporters-card .wc-grid {
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 8px;
        }



        /* User requested: progress bar twice the previous desktop width. */
        .overview-progress-wrap {
          width: 170%;
          max-width: 1156px;
        }

        .overview-live-games-button.is-offline {
          background: rgba(231, 76, 60, 0.24);
          border-color: rgba(231, 76, 60, 0.62);
          box-shadow: 0 0 14px rgba(231, 76, 60, 0.18);
        }

        .overview-live-games-button.is-live {
          background: rgba(46, 204, 113, 0.24);
          border-color: rgba(46, 204, 113, 0.68);
          box-shadow: 0 0 14px rgba(46, 204, 113, 0.20);
        }

        .overview-live-games-button.is-offline:hover {
          background: rgba(231, 76, 60, 0.34);
          border-color: rgba(231, 76, 60, 0.82);
        }

        .overview-live-games-button.is-live:hover {
          background: rgba(46, 204, 113, 0.34);
          border-color: rgba(46, 204, 113, 0.88);
        }

        @media (max-width: 700px) {
          .overview-progress-wrap {
            width: 100%;
            max-width: none;
          }
        }


        /* Compact stat bar refinement - smaller cards, bigger readable text */
        .overview-stat-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 6px;
          margin-top: 8px;
        }

        .overview-stat-tile {
          min-height: 48px;
          padding: 6px 8px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1px;
        }

        .overview-stat-tile strong {
          font-size: clamp(24px, 2.2vw, 32px);
          line-height: 0.95;
          margin: 0;
          font-weight: 900;
        }

        .overview-stat-tile span,
        .overview-stat-tile em {
          font-size: 11px;
          line-height: 1.05;
          margin: 0;
          text-align: center;
          white-space: nowrap;
        }

        @media (max-width: 1250px) {
          .overview-stat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .overview-stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .overview-stat-tile {
            min-height: 46px;
            padding: 5px 7px;
          }

          .overview-stat-tile strong {
            font-size: 24px;
          }

          .overview-stat-tile span,
          .overview-stat-tile em {
            font-size: 10px;
          }
        }


        /* Tighten space between overview progress bar and stat pills */
        .overview-hero.compact-overview-hero,
        .overview-hero {
          padding-bottom: 4px;
          margin-bottom: -16px;
        }

        .overview-stat-grid {
          margin-top: 0;
        }



        /* Merge overview stat pills into the bottom of the progress block */
        .overview-progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .overview-progress-wrap .overview-stat-grid-in-progress {
          margin-top: 0;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 5px;
        }

        .overview-progress-wrap .overview-stat-tile {
          min-height: 42px;
          padding: 5px 7px;
          border-radius: 11px;
        }

        .overview-progress-wrap .overview-stat-tile strong {
          font-size: clamp(21px, 2vw, 29px);
          line-height: 0.95;
        }

        .overview-progress-wrap .overview-stat-tile span,
        .overview-progress-wrap .overview-stat-tile em {
          font-size: 10px;
          line-height: 1;
        }

        .overview-hero.compact-overview-hero,
        .overview-hero {
          padding-bottom: 8px;
          margin-bottom: 8px;
        }

        @media (max-width: 1250px) {
          .overview-progress-wrap .overview-stat-grid-in-progress {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .overview-progress-wrap .overview-stat-grid-in-progress {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }


        /* Final fix: make overview header/stat area fit and match the glass theme */
        .overview-pro-page,
        .overview-hero,
        .overview-main-grid,
        .overview-lower-grid,
        .wc-card {
          max-width: 100%;
          box-sizing: border-box;
        }

        .overview-pro-page {
          overflow-x: hidden;
        }

        .overview-hero.compact-overview-hero,
        .overview-hero {
          width: 100%;
          padding: 12px 14px 14px;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(45,190,255,0.20), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255,215,80,0.13), transparent 32%),
            linear-gradient(135deg, rgba(8,20,48,0.70), rgba(20,75,120,0.36));
          border: 1px solid rgba(120,220,255,0.22);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 12px 30px rgba(0,0,0,0.20);
        }

        .overview-progress-wrap {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0;
        }

        .overview-progress-bar {
          width: 100%;
        }

        .overview-stat-grid.overview-stat-grid-in-progress,
        .overview-stat-grid {
          width: 100%;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 7px;
        }

        .overview-stat-tile {
          min-width: 0;
          min-height: 58px;
          padding: 7px 8px;
          border-radius: 12px;
          background: rgba(255,255,255,0.085);
          border: 1px solid rgba(155,225,255,0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .overview-stat-tile strong {
          font-size: clamp(18px, 1.8vw, 24px);
        }

        .overview-stat-tile span,
        .overview-stat-tile em {
          font-size: 9px;
          line-height: 1.1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .overview-top-pills,
        .overview-hero-side {
          max-width: calc(100% - 24px);
        }

        .overview-status-card.overview-mini-pill,
        .overview-status-card {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          min-height: 0;
          min-width: 0;
          max-width: 145px;
          padding: 6px 9px;
          border-radius: 999px;
          background: rgba(8,20,48,0.62);
          border: 1px solid rgba(155,225,255,0.24);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 18px rgba(0,0,0,0.18);
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .overview-status-card span {
          display: none !important;
        }

        .overview-status-card strong,
        .overview-status-card.overview-mini-pill strong {
          font-size: 12px;
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .overview-status-card em,
        .overview-status-card.overview-mini-pill em {
          font-size: 9px;
          line-height: 1;
          margin-left: 4px;
          opacity: 0.76;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1200px) {
          .overview-stat-grid.overview-stat-grid-in-progress,
          .overview-stat-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .overview-stat-grid.overview-stat-grid-in-progress,
          .overview-stat-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

      </style>
    `;
  }

  nav() {
    const items = [
      ["overview", this.t("overview")],
      ["live", this.t("live")],
      ["fixtures", this.t("fixtures")],
      ["results", this.t("results")],
      ["groups", this.t("groups")],
      ["knockout", this.t("knockout")],
      ["players", this.t("players")],
      ["records", this.t("records")],
      ["stats", this.t("stats")],
      ["venues", this.t("venues")],
      ["supporters", this.t("supportersNav")],
    ];

    return `
      <div class="wc-nav">
        ${items.map(([key, label]) => `
          <button class="${this._page === key ? "active" : ""}" data-page="${key}">
            ${this.esc(label)}
          </button>
        `).join("")}
      </div>
    `;
  }

  languageSelector() {
    return `
      <div class="wc-language-wrap">
        <div class="wc-language-label">${this.esc(this.t("language"))}</div>
        <select class="wc-language-select" id="wc-language-select">
          <option value="en" ${this._language === "en" ? "selected" : ""}>English</option>
          <option value="fr" ${this._language === "fr" ? "selected" : ""}>French</option>
          <option value="de" ${this._language === "de" ? "selected" : ""}>German</option>
          <option value="es" ${this._language === "es" ? "selected" : ""}>Spanish</option>
          <option value="it" ${this._language === "it" ? "selected" : ""}>Italian</option>
          <option value="nl" ${this._language === "nl" ? "selected" : ""}>Dutch</option>
          <option value="ar" ${this._language === "ar" ? "selected" : ""}>Arabic</option>
          <option value="pt" ${this._language === "pt" ? "selected" : ""}>Portuguese</option>
          <option value="pl" ${this._language === "pl" ? "selected" : ""}>Polish</option>
          <option value="ja" ${this._language === "ja" ? "selected" : ""}>Japanese</option>
          <option value="ko" ${this._language === "ko" ? "selected" : ""}>Korean</option>
          <option value="sv" ${this._language === "sv" ? "selected" : ""}>Swedish</option>
          <option value="no" ${this._language === "no" ? "selected" : ""}>Norwegian</option>
          <option value="is" ${this._language === "is" ? "selected" : ""}>Icelandic</option>
        </select>
      </div>
    `;
  }

  overviewPage() {
    const o = this._data.overview || {};
    const fixtures = this._data.fixtures || [];
    const scorers = this._data.scorers || [];
    const stats = this._data.statistics || {};
    const records = this._data.records || {};
    const venues = this._data.venues || {};
    const groups = this._data.groups || [];

    const sortedFixtures = [...fixtures].sort((a, b) => {
      const aTime = new Date(a.utcDate || a.date || 0).getTime();
      const bTime = new Date(b.utcDate || b.date || 0).getTime();
      return aTime - bTime;
    });

    const finishedStatuses = ["FINISHED", "FT", "AET", "PEN"];
    const liveStatuses = ["IN_PLAY", "LIVE", "PAUSED"];
    const upcomingStatuses = ["TIMED", "SCHEDULED"];

    const playedCount = o.matches_played ?? sortedFixtures.filter(m => finishedStatuses.includes(m.status)).length;
    const loadedCount = o.matches_loaded ?? sortedFixtures.length;
    const totalMatches = o.matches_total ?? 104;
    const remainingCount = o.matches_remaining ?? Math.max(totalMatches - playedCount, 0);
    const liveMatches = sortedFixtures.filter(m => liveStatuses.includes(m.status));
    const upcomingMatches = sortedFixtures.filter(m => upcomingStatuses.includes(m.status)).slice(0, 4);
    const recentResults = sortedFixtures.filter(m => finishedStatuses.includes(m.status)).slice(-4).reverse();
    const nextMatch = upcomingMatches[0] || sortedFixtures.find(m => !finishedStatuses.includes(m.status)) || sortedFixtures[0];
    const topScorer = scorers[0];
    const progress = Number(o.progress ?? stats.progress ?? (totalMatches ? Math.round((playedCount / totalMatches) * 100) : 0));
    const safeProgress = Math.max(0, Math.min(100, Number.isFinite(progress) ? progress : 0));
    const totalGoals = o.total_goals ?? stats.total_goals ?? 0;
    const goalsPerMatch = stats.goals_per_match ?? (playedCount ? (totalGoals / playedCount).toFixed(2) : 0);
    const stadiumCount = venues.stadiums?.length ?? 0;
    const loadedGroups = groups.length;
    const finalVenue = venues.final_venue;
    const topTeam = records.top_scoring_team;
    const bestDefence = records.best_defence;
    const supporters = this.sortedSupporters();
    return `
      <div class="overview-pro-page">
        <div class="overview-hero compact-overview-hero wc-card">
<div class="overview-hero-main">
            <div class="overview-progress-wrap">
              <div class="overview-progress-top">
                <span>${this.t("progress")}</span>
                <strong>${safeProgress}%</strong>
              </div>
              <div class="overview-progress-bar">
                <div style="width:${safeProgress}%;"></div>
              </div>

              <div class="overview-stat-grid overview-stat-grid-in-progress">
                <div class="overview-stat-tile"><span>${this.t("totalMatches")}</span><strong>${totalMatches}</strong><em>${loadedCount} ${this.t("loaded").toLowerCase()}</em></div>
                <div class="overview-stat-tile"><span>${this.t("played")}</span><strong>${playedCount}</strong><em>${remainingCount} ${this.t("remaining").toLowerCase()}</em></div>
                <div class="overview-stat-tile"><span>${this.t("totalGoals")}</span><strong>${totalGoals}</strong><em>${goalsPerMatch} ${this.t("goalsPerMatch")}</em></div>
                <div class="overview-stat-tile"><span>${this.t("groups")}</span><strong>${loadedGroups || 12}</strong><em>${this.t("groupsAL")}</em></div>
                <div class="overview-stat-tile"><span>${this.t("stadiums")}</span><strong>${stadiumCount}</strong><em>${this.t("worldCupStadiums")}</em></div>
                <div class="overview-stat-tile"><span>${this.t("topScorer")}</span><strong>${this.esc(topScorer?.goals ?? 0)}</strong><em>${this.esc(topScorer?.player?.name || topScorer?.name || this.t("notAvailable"))}</em></div>
              </div>
            </div>

          </div>

        </div>


        <div class="overview-main-grid">
          <div class="overview-panel wc-card overview-feature-panel">
            <div class="overview-panel-heading">
              <div>
                <div class="overview-small-label">${this.t("nextMatch")}</div>
                <div class="wc-section-title">${this.t("matchSpotlight")}</div>
              </div>
              ${nextMatch ? `<span class="overview-date-pill">${this.esc(this.formatDate(nextMatch.utcDate || nextMatch.date))}</span>` : ""}
            </div>
            ${nextMatch ? this.fixtureCard(nextMatch) : `<div class="wc-empty">${this.t("noUpcomingMatch")}</div>`}
          </div>

          <div class="overview-panel wc-card">
            <div class="overview-panel-heading">
              <div>
                <div class="overview-small-label">${this.t("tournamentStatus")}</div>
                <div class="wc-section-title">${this.t("tournamentIntelligence")}</div>
              </div>
            </div>

            <div class="overview-info-list">
              <div><span>${this.t("topScoringTeam")}</span><strong>${this.esc(topTeam?.team ? this.localizedTeamName(topTeam.team) : this.t("notAvailable"))}</strong><em>${topTeam?.goalsFor ?? 0} ${this.t("goals").toLowerCase()}</em></div>
              <div><span>${this.t("bestDefence")}</span><strong>${this.esc(bestDefence?.team ? this.localizedTeamName(bestDefence.team) : this.t("notAvailable"))}</strong><em>${bestDefence?.goalsAgainst ?? 0} ${this.t("conceded")}</em></div>
              <div><span>${this.t("finalVenue")}</span><strong>${this.esc(finalVenue?.stadium || this.t("notAvailable"))}</strong><em>${this.esc(finalVenue ? `${finalVenue.city}, ${this.localizedCountryName(finalVenue.country)}` : this.t("venues"))}</em></div>
              <div><span>${this.t("matchesPlayed")}</span><strong>${playedCount} / ${totalMatches}</strong><em>${safeProgress}% ${this.t("progress").toLowerCase()}</em></div>
            </div>
          </div>
        </div>

        <div class="overview-lower-grid">
          <div class="overview-panel wc-card">
            <div class="overview-panel-heading">
              <div>
                <div class="overview-small-label">${this.t("upNext")}</div>
                <div class="wc-section-title">${this.t("upcomingFixtures")}</div>
              </div>
              <span class="overview-date-pill">${upcomingMatches.length}</span>
            </div>
            ${upcomingMatches.length ? `
              <div class="overview-mini-match-list">
                ${upcomingMatches.map(m => this.overviewMiniMatch(m)).join("")}
              </div>
            ` : `<div class="wc-empty">${this.t("noUpcomingMatch")}</div>`}
          </div>

          <div class="overview-panel wc-card">
            <div class="overview-panel-heading">
              <div>
                <div class="overview-small-label">${this.t("latest")}</div>
                <div class="wc-section-title">${this.t("recentResults")}</div>
              </div>
              <span class="overview-date-pill">${recentResults.length}</span>
            </div>
            ${recentResults.length ? `
              <div class="overview-mini-match-list">
                ${recentResults.map(m => this.overviewMiniMatch(m, true)).join("")}
              </div>
            ` : `<div class="wc-empty">${this.t("noResult")}</div>`}
          </div>

          <div class="overview-panel wc-card">
            <div class="overview-panel-heading">
              <div>
                <div class="overview-small-label">${this.t("goldenBoot")}</div>
                <div class="wc-section-title">${this.t("playerWatch")}</div>
              </div>
            </div>
            ${scorers.length ? `
              <div class="overview-player-list">
                ${scorers.slice(0, 5).map((s, i) => `
                  <div class="overview-player-row">
                    <span>${i + 1}</span>
                    <strong>${this.esc(typeof s.player === "string" ? s.player : s.player?.name || s.name || this.t("unknown"))}</strong>
                    <em>${this.esc(this.localizedTeamName(s.team?.name || s.team || ""))}</em>
                    <b>${s.goals ?? 0}</b>
                  </div>
                `).join("")}
              </div>
            ` : `<div class="wc-empty">${this.t("noPlayerStats")}</div>`}
          </div>
        </div>

        ${this.overviewSupportersPanel()}
      </div>
    `;
  }

  overviewMiniMatch(m, showScore = false) {
    const homeTeam = this.getHomeTeam(m);
    const awayTeam = this.getAwayTeam(m);
    const homeScore = this.getHomeScore(m);
    const awayScore = this.getAwayScore(m);
    const scoreText = showScore || (homeScore !== "-" || awayScore !== "-") ? `${homeScore} - ${awayScore}` : this.t("versus");
    const status = this.statusLabel(m.status);
    const stage = String(m.group || this.stageLabel(m.stage) || "").replaceAll("_", " ");

    return `
      <div class="overview-mini-match">
        <div class="overview-mini-top">
          <span>${this.esc(stage || this.t("fixtures"))}</span>
          <em>${this.esc(status)}</em>
        </div>
        <div class="overview-mini-teams">
          <div>${this.flag(homeTeam, true)}<strong>${this.esc(this.localizedTeamName(homeTeam))}</strong></div>
          <b>${this.esc(scoreText)}</b>
          <div>${this.flag(awayTeam, true)}<strong>${this.esc(this.localizedTeamName(awayTeam))}</strong></div>
        </div>
        <div class="overview-mini-date">${this.esc(this.formatDate(m.utcDate || m.date))}</div>
      </div>
    `;
  }

  livePage() {
    const live = this._data.live || [];

    if (!live.length) {
      return `
        <div class="wc-card">
          <div class="wc-section-title">${this.t("live")}</div>
          <div class="wc-empty">${this.t("noLiveMatches")}</div>
        </div>
      `;
    }

    return `
      <div class="wc-card">
        <div class="wc-section-title">${this.t("live")} <span class="wc-badge wc-live">${this.t("liveStatus")}</span></div>
        <div class="wc-list">
          ${live.map(m => this.matchRow(m)).join("")}
        </div>
      </div>
    `;
  }

  resultsPage() {
    const fixtures = this._data.fixtures || [];
    const finishedStatuses = ["FINISHED", "FT", "AET", "PEN"];

    const results = fixtures
      .filter(m => finishedStatuses.includes(m.status))
      .sort((a, b) => {
        const aTime = new Date(a.utcDate || a.date || 0).getTime();
        const bTime = new Date(b.utcDate || b.date || 0).getTime();
        return bTime - aTime;
      });

    if (!results.length) {
      return `
        <div class="wc-card fixtures-page-card">
          <div class="fixtures-hero">
            <div>
              <div class="wc-section-title">${this.t("results")}</div>
              <div class="fixtures-subtitle">No results loaded yet.</div>
            </div>
          </div>
        </div>
      `;
    }

    const grouped = results.reduce((days, match) => {
      const key = this.fixtureDateKey(match);
      if (!days[key]) {
        days[key] = [];
      }
      days[key].push(match);
      return days;
    }, {});

    return `
      <div class="fixtures-page-card wc-card">
        <div class="fixtures-hero">
          <div class="fixtures-title-wrap">
            <div class="fixtures-title-row">
              <div class="wc-section-title">${this.t("results")}</div>
            </div>
            <div class="fixtures-subtitle">Finished matches and confirmed scores.</div>
          </div>
          <div class="fixtures-summary-grid">
            <div class="fixtures-summary-box"><strong>${results.length}</strong><span>${this.t("played")}</span></div>
          </div>
        </div>

        <div class="fixtures-days">
          ${Object.entries(grouped).map(([key, matches]) => `
            <div class="fixtures-day-block">
              <div class="fixtures-day-heading">
                <span>${this.esc(this.fixtureDayTitle(matches[0]))}</span>
                <small>${matches.length} ${this.t("results")}</small>
              </div>
              <div class="fixtures-card-grid">
                ${matches.map(m => this.fixtureCard(m)).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  fixturesPage() {
    const fixtures = this._data.fixtures || [];

    if (!fixtures.length) {
      return `
        <div class="wc-card fixtures-page-card">
          <div class="fixtures-hero">
            <div>
              <div class="wc-section-title">${this.t("fixturesResults")}</div>
              <div class="fixtures-subtitle">${this.t("noFixtures")}</div>
            </div>
          </div>
        </div>
      `;
    }

    const sortedFixtures = [...fixtures].sort((a, b) => {
      const aTime = new Date(a.utcDate || a.date || 0).getTime();
      const bTime = new Date(b.utcDate || b.date || 0).getTime();
      return aTime - bTime;
    });

    const playedCount = sortedFixtures.filter(m => ["FINISHED", "FT", "AET", "PEN"].includes(m.status)).length;
    const liveCount = sortedFixtures.filter(m => ["IN_PLAY", "LIVE", "PAUSED"].includes(m.status)).length;
    const remainingCount = Math.max(sortedFixtures.length - playedCount, 0);
    const nextMatch = sortedFixtures.find(m => ["TIMED", "SCHEDULED"].includes(m.status));
    const dayCount = new Set(sortedFixtures.map(m => this.fixtureDateKey(m))).size;

    const grouped = sortedFixtures.reduce((days, match) => {
      const key = this.fixtureDateKey(match);
      if (!days[key]) {
        days[key] = [];
      }
      days[key].push(match);
      return days;
    }, {});

    return `
      <div class="fixtures-page-card wc-card">
        <div class="fixtures-hero">
          <div class="fixtures-title-wrap">
            <div class="fixtures-title-row">
              <div class="wc-section-title">${this.t("fixturesResults")}</div>
              ${liveCount ? `<span class="wc-badge wc-live">${liveCount} ${this.t("liveStatus")}</span>` : ""}
            </div>
            <div class="fixtures-subtitle">${this.t("fixturesSubtitle")}</div>
          </div>
          <div class="fixtures-summary-grid">
            <div class="fixtures-summary-box"><strong>${sortedFixtures.length}</strong><span>${this.t("loaded")}</span></div>
            <div class="fixtures-summary-box"><strong>${playedCount}</strong><span>${this.t("played")}</span></div>
            <div class="fixtures-summary-box"><strong>${remainingCount}</strong><span>${this.t("remaining")}</span></div>
            <div class="fixtures-summary-box"><strong>${liveCount}</strong><span>${this.t("liveNow")}</span></div>
            <div class="fixtures-summary-box"><strong>${dayCount}</strong><span>${this.t("days")}</span></div>
          </div>
        </div>

        ${nextMatch ? `
          <div class="fixtures-next-strip">
            <span>${this.t("nextMatch")}</span>
            <strong>${this.esc(this.localizedTeamName(this.getHomeTeam(nextMatch)))} ${this.t("versus")} ${this.esc(this.localizedTeamName(this.getAwayTeam(nextMatch)))}</strong>
            <em>${this.esc(this.formatDate(nextMatch.utcDate || nextMatch.date))}</em>
          </div>
        ` : ""}

        <div class="fixtures-days">
          ${Object.entries(grouped).map(([key, matches]) => `
            <div class="fixtures-day-block">
              <div class="fixtures-day-heading">
                <span>${this.esc(this.fixtureDayTitle(matches[0]))}</span>
                <small>${matches.length} ${this.t("fixtures")}</small>
              </div>
              <div class="fixtures-card-grid">
                ${matches.map(m => this.fixtureCard(m)).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  fixtureDateKey(match) {
    const value = match.utcDate || match.date;
    if (!value) return "unknown";

    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(new Date(value));

      const year = parts.find((part) => part.type === "year")?.value;
      const month = parts.find((part) => part.type === "month")?.value;
      const day = parts.find((part) => part.type === "day")?.value;

      if (year && month && day) {
        return `${year}-${month}-${day}`;
      }

      return new Date(value).toLocaleDateString("en-CA");
    } catch {
      return String(value).slice(0, 10) || "unknown";
    }
  }

  fixtureDayTitle(match) {
    const value = match.utcDate || match.date;

    if (!value) {
      return this.t("unknown");
    }

    try {
      return new Date(value).toLocaleDateString(this.locale(), {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return value;
    }
  }

  fixtureDateLabel(match) {
    const value = match.utcDate || match.date;

    if (!value) {
      return "";
    }

    try {
      return new Date(value).toLocaleDateString(this.locale(), {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
    } catch {
      return String(value).slice(0, 10);
    }
  }

  fixtureTime(match) {
    const value = match.utcDate || match.date;

    if (!value) {
      return this.t("tbc");
    }

    try {
      return new Date(value).toLocaleTimeString(this.locale(), {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
    } catch {
      return value;
    }
  }


  normaliseFixtureText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, "and")
      .replace(/republic/g, "")
      .replace(/bosnia\s*(and|&)\s*herzegovina/g, "bosnia herzegovina")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  fixtureTeamKey(team) {
    const name = this.localizedTeamName(team);
    return this.normaliseFixtureText(name)
      .replace(/^south korea$/, "korea")
      .replace(/^korea$/, "korea")
      .replace(/^usa$/, "united states")
      .replace(/^u s a$/, "united states")
      .replace(/^turkiye$/, "turkey")
      .replace(/^cote d ivoire$/, "ivory coast");
  }

  fixturePairKey(homeTeam, awayTeam) {
    return `${this.fixtureTeamKey(homeTeam)}|${this.fixtureTeamKey(awayTeam)}`;
  }

  officialFixtureVenueLookup() {
    return {
      "mexico|south africa": "Mexico City Stadium",
      "korea|czechia": "Guadalajara Stadium",
      "canada|bosnia herzegovina": "Toronto Stadium",
      "united states|paraguay": "Los Angeles Stadium",
      "qatar|switzerland": "San Francisco Bay Area Stadium",
      "haiti|scotland": "Boston Stadium",
      "brazil|morocco": "New York New Jersey Stadium",
      "australia|turkey": "Vancouver Stadium",
      "germany|curacao": "Houston Stadium",
      "netherlands|japan": "Dallas Stadium",
      "tunisia|sweden": "Monterrey Stadium",
      "ivory coast|ecuador": "Philadelphia Stadium",
      "spain|cape verde": "Atlanta Stadium",
      "belgium|egypt": "Seattle Stadium",
      "iran|new zealand": "Los Angeles Stadium",
      "austria|jordan": "San Francisco Bay Area Stadium",
      "france|senegal": "New York New Jersey Stadium",
      "norway|iraq": "Boston Stadium",
      "argentina|algeria": "Kansas City Stadium",
      "portugal|congo dr": "Houston Stadium",
      "england|croatia": "Dallas Stadium",
      "ghana|panama": "Toronto Stadium",
      "uzbekistan|colombia": "Mexico City Stadium",
      "canada|qatar": "Vancouver Stadium",
      "south africa|czechia": "Atlanta Stadium",
      "switzerland|bosnia herzegovina": "Los Angeles Stadium",
      "mexico|korea": "Guadalajara Stadium",
      "scotland|morocco": "Boston Stadium",
      "brazil|haiti": "Philadelphia Stadium",
      "united states|australia": "Seattle Stadium",
      "paraguay|turkey": "San Francisco Bay Area Stadium",
      "germany|ivory coast": "Toronto Stadium",
      "tunisia|japan": "Monterrey Stadium",
      "netherlands|sweden": "Houston Stadium",
      "ecuador|curacao": "Kansas City Stadium",
      "new zealand|egypt": "Vancouver Stadium",
      "spain|saudi arabia": "Atlanta Stadium",
      "belgium|iran": "Los Angeles Stadium",
      "uruguay|cape verde": "Miami Stadium",
      "france|iraq": "Philadelphia Stadium",
      "norway|senegal": "New York New Jersey Stadium",
      "jordan|algeria": "San Francisco Bay Area Stadium",
      "argentina|austria": "Dallas Stadium",
      "portugal|uzbekistan": "Houston Stadium",
      "england|ghana": "Boston Stadium",
      "panama|croatia": "Toronto Stadium",
      "colombia|congo dr": "Guadalajara Stadium",
      "canada|switzerland": "Vancouver Stadium",
      "qatar|bosnia herzegovina": "Seattle Stadium",
      "morocco|haiti": "Atlanta Stadium",
      "scotland|brazil": "Miami Stadium",
      "mexico|czechia": "Mexico City Stadium",
      "korea|south africa": "Monterrey Stadium",
      "ecuador|germany": "New York New Jersey Stadium",
      "curacao|ivory coast": "Philadelphia Stadium",
      "tunisia|netherlands": "Kansas City Stadium",
      "japan|sweden": "Dallas Stadium",
      "united states|turkey": "Los Angeles Stadium",
      "paraguay|australia": "San Francisco Bay Area Stadium",
      "senegal|iraq": "Toronto Stadium",
      "norway|france": "Boston Stadium",
      "cape verde|saudi arabia": "Houston Stadium",
      "uruguay|spain": "Guadalajara Stadium",
      "new zealand|belgium": "Vancouver Stadium",
      "egypt|iran": "Seattle Stadium",
      "panama|england": "New York New Jersey Stadium",
      "croatia|ghana": "Philadelphia Stadium",
      "colombia|portugal": "Miami Stadium",
      "uzbekistan|congo dr": "Atlanta Stadium",
      "jordan|argentina": "Dallas Stadium",
      "algeria|austria": "Kansas City Stadium",
    };
  }

  venueFallbackDetails(venueName) {
    const venues = {
      "Atlanta Stadium": { city: "Atlanta", country: "USA", realName: "Mercedes-Benz Stadium", capacity: 75000 },
      "Boston Stadium": { city: "Boston", country: "USA", realName: "Gillette Stadium", capacity: 65878 },
      "Dallas Stadium": { city: "Dallas", country: "USA", realName: "AT&T Stadium", capacity: 80000 },
      "Guadalajara Stadium": { city: "Guadalajara", country: "Mexico", realName: "Estadio Akron", capacity: 48071 },
      "Houston Stadium": { city: "Houston", country: "USA", realName: "NRG Stadium", capacity: 72220 },
      "Kansas City Stadium": { city: "Kansas City", country: "USA", realName: "Arrowhead Stadium", capacity: 76416 },
      "Los Angeles Stadium": { city: "Los Angeles", country: "USA", realName: "SoFi Stadium", capacity: 70240 },
      "Mexico City Stadium": { city: "Mexico City", country: "Mexico", realName: "Estadio Banorte", capacity: 87523 },
      "Miami Stadium": { city: "Miami", country: "USA", realName: "Hard Rock Stadium", capacity: 64767 },
      "Monterrey Stadium": { city: "Monterrey", country: "Mexico", realName: "Estadio BBVA", capacity: 53500 },
      "New York New Jersey Stadium": { city: "New York/New Jersey", country: "USA", realName: "MetLife Stadium", capacity: 82500 },
      "Philadelphia Stadium": { city: "Philadelphia", country: "USA", realName: "Lincoln Financial Field", capacity: 69596 },
      "San Francisco Bay Area Stadium": { city: "San Francisco Bay Area", country: "USA", realName: "Levi's Stadium", capacity: 68500 },
      "Seattle Stadium": { city: "Seattle", country: "USA", realName: "Lumen Field", capacity: 69000 },
      "Toronto Stadium": { city: "Toronto", country: "Canada", realName: "BMO Field", capacity: 45000 },
      "Vancouver Stadium": { city: "Vancouver", country: "Canada", realName: "BC Place", capacity: 54500 },
    };
    return venues[venueName] || null;
  }

  fixtureVenueInfo(match) {
    const homeTeam = this.getHomeTeam(match);
    const awayTeam = this.getAwayTeam(match);
    const directVenue = match.venue || match.stadium || match.location || match.venueName || match.venue_name || match.venue_display_name || "";
    const lookupVenue = this.officialFixtureVenueLookup()[this.fixturePairKey(homeTeam, awayTeam)] || "";
    const venueName = directVenue || lookupVenue;

    const stadiums = this._data?.venues?.stadiums || [];
    const normalisedVenue = this.normaliseFixtureText(venueName);
    const venueData = stadiums.find((v) => {
      const candidates = [v.name, v.stadium, v.real_name, v.venue, v.city].filter(Boolean);
      return candidates.some((candidate) => {
        const normalisedCandidate = this.normaliseFixtureText(candidate);
        return normalisedCandidate === normalisedVenue || normalisedCandidate.includes(normalisedVenue) || normalisedVenue.includes(normalisedCandidate);
      });
    });

    const fallback = this.venueFallbackDetails(venueName) || {};
    const name = venueData?.name || venueData?.stadium || venueName || fallback.name || "";
    const realName = venueData?.real_name || venueData?.realName || fallback.realName || "";
    const city = match.venueCity || match.city || venueData?.city || fallback.city || "";
    const country = match.venueCountry || venueData?.country || fallback.country || "";
    const capacityRaw = match.venueCapacity || match.capacity || venueData?.capacity || fallback.capacity || "";
    const capacityNumber = Number(String(capacityRaw).replace(/[^0-9]/g, ""));
    const capacity = Number.isFinite(capacityNumber) && capacityNumber > 0 ? capacityNumber.toLocaleString() : "";
    const image = venueData?.image ? `/world_cup_2026_frontend/${venueData.image}` : "";

    if (!name && !realName && !city && !capacity) return null;

    return { name, realName, city, country, capacity, image };
  }

  fixtureCard(m) {
    const homeTeam = this.getHomeTeam(m);
    const awayTeam = this.getAwayTeam(m);
    const homeScore = this.getHomeScore(m);
    const awayScore = this.getAwayScore(m);
    const status = this.statusLabel(m.status);
    const stage = String(m.group || this.stageLabel(m.stage) || "").replaceAll("_", " ");
    const scoreText = homeScore === "-" && awayScore === "-" ? "v" : `${homeScore} - ${awayScore}`;
    const liveClass = ["IN_PLAY", "LIVE", "PAUSED"].includes(m.status) ? " is-live" : "";
    const finishedClass = ["FINISHED", "FT", "AET", "PEN"].includes(m.status) ? " is-finished" : "";
    const scheduledClass = ["TIMED", "SCHEDULED"].includes(m.status) ? " is-scheduled" : "";
    const venueInfo = this.fixtureVenueInfo(m);
    const matchNumber = m.matchNumber || m.number || m.fifaMatchNumber || "";
    const matchDate = this.fixtureDateLabel(m);
    const matchTime = this.fixtureTime(m);

    return `
      <div class="fixture-card${liveClass}${finishedClass}${scheduledClass}">
        <div class="fixture-card-top fixture-card-top-merged">
          <span class="fixture-stage-pill">${this.esc(stage || this.t("fixtures"))}</span>
          <div class="fixture-top-details">
            ${matchNumber ? `<span>#${this.esc(matchNumber)}</span>` : ""}
            ${matchDate ? `<span class="fixture-date-pill">${this.esc(matchDate)}</span>` : ""}
            ${matchTime ? `<span class="fixture-time-pill">⏱ ${this.esc(matchTime)}</span>` : ""}
            <strong class="fixture-card-status">${this.esc(status)}</strong>
          </div>
        </div>

        <div class="fixture-card-main fixture-card-main-compact">
          <div class="fixture-card-team fixture-card-team-home">
            ${this.flag(homeTeam, true)}
            <span>${this.esc(this.localizedTeamName(homeTeam))}</span>
          </div>

          <div class="fixture-card-score">${this.esc(scoreText)}</div>

          <div class="fixture-card-team fixture-card-team-away">
            ${this.flag(awayTeam, true)}
            <span>${this.esc(this.localizedTeamName(awayTeam))}</span>
          </div>
        </div>

        ${venueInfo?.image ? `<img src="${this.esc(venueInfo.image)}" class="fixture-stadium-image" loading="lazy">` : ""}

        ${venueInfo ? `
          <div class="fixture-card-venue fixture-card-venue-inline">
            <span class="fixture-venue-name">🏟 ${this.esc(venueInfo.name)}</span>
            ${venueInfo.realName && venueInfo.realName !== venueInfo.name ? `<span class="fixture-venue-real">Real: ${this.esc(venueInfo.realName)}</span>` : ""}
            ${venueInfo.city || venueInfo.country ? `<span class="fixture-venue-location">${this.esc([venueInfo.city, venueInfo.country ? this.localizedCountryName(venueInfo.country) : ""].filter(Boolean).join(", "))}</span>` : ""}
            ${venueInfo.capacity ? `<span class="fixture-venue-capacity">👥 ${this.esc(venueInfo.capacity)}</span>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }

  matchRow(m) {
    const homeTeam = this.getHomeTeam(m);
    const awayTeam = this.getAwayTeam(m);
    const homeScore = this.getHomeScore(m);
    const awayScore = this.getAwayScore(m);
    const status = this.statusLabel(m.status);
    const stage = String(m.group || this.stageLabel(m.stage) || "").replaceAll("_", " ");
    const date = this.formatDate(m.utcDate || m.date);

    return `
      <div class="wc-row">
        <div class="fixture-teams-big">
          ${this.teamFlagBlock(homeTeam)}

          <div class="fixture-middle">
            <div class="wc-score">${homeScore} - ${awayScore}</div>
            <div class="fixture-vs">${this.t("versus")}</div>
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
          <div class="wc-section-title">${this.t("groupsAL")}</div>
          <div class="wc-empty">${this.t("noGroups")}</div>
        </div>
      `;
    }

    return `
      <div class="wc-groups-grid">
        ${groups.map((group, index) => {
          const rawGroupName =
            group.group ||
            group.name ||
            group.stage ||
            `Group ${String.fromCharCode(65 + index)}`;

          const groupName = this.groupNameLabel(rawGroupName, index);

          const table =
            group.table ||
            group.standings ||
            group.teams ||
            [];

          return `
            <div class="wc-card wc-group-card">
              <div class="wc-section-title">${this.esc(groupName)}</div>

              ${
                table.length
                  ? `
                <div class="wc-table-wrap">
                  <table class="wc-table">
                    <thead>
                      <tr>
                        <th>${this.t("pos")}</th>
                        <th>${this.t("team")}</th>
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
                                <strong>${this.esc(this.localizedTeamName(teamName))}</strong>
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
                  : `<div class="wc-empty">${this.t("noTeamsGroup")}</div>`
              }
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  numberValue(...values) {
    for (const value of values) {
      if (value === null || value === undefined || value === "") continue;
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) return parsed;
    }
    return 0;
  }



  resolvedPlayerStat(player, ...keys) {
    const candidates = [
      player,
      player?.player,
      player?.stats,
      player?.statistics,
      player?.discipline,
      player?.cards,
      player?.player?.stats,
      player?.player?.statistics,
      player?.player?.discipline,
      player?.player?.cards,
    ].filter((item) => item && typeof item === "object");

    for (const source of candidates) {
      const value = this.playerStatValue(source, ...keys);
      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }

    return undefined;
  }

  playerStatValue(player, ...keys) {
    for (const key of keys) {
      if (!key) continue;

      if (Object.prototype.hasOwnProperty.call(player, key)) {
        return player[key];
      }

      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      if (Object.prototype.hasOwnProperty.call(player, camelKey)) {
        return player[camelKey];
      }

      const nestedParts = key.split(".");
      if (nestedParts.length > 1) {
        let current = player;
        let found = true;
        for (const part of nestedParts) {
          if (current && Object.prototype.hasOwnProperty.call(current, part)) {
            current = current[part];
          } else {
            found = false;
            break;
          }
        }
        if (found) return current;
      }
    }
    return undefined;
  }

  playersPage() {
    const rawScorers = Array.isArray(this._data.scorers) ? this._data.scorers : [];

    const scorers = rawScorers
      .map((s) => {
        const playerName =
          typeof s.player === "string"
            ? s.player
            : s.player?.name || s.name || this.t("unknown");

        const teamName =
          typeof s.team === "string"
            ? s.team
            : s.team?.shortName || s.team?.name || s.team?.tla || s.nationality || this.t("tbc");

        return {
          name: playerName,
          team: this.localizedTeamName(teamName),
          goals: this.numberValue(this.resolvedPlayerStat(s, "goals", "scored", "goal_count", "total_goals", "totalGoals")),
          assists: this.numberValue(this.resolvedPlayerStat(s, "assists", "assist", "assist_count", "total_assists", "totalAssists")),
          source: s.source || "football-data.org",
        };
      })
      .filter((player) => player.name && player.name !== this.t("unknown"))
      .sort((a, b) =>
        b.goals - a.goals ||
        b.assists - a.assists ||
        a.name.localeCompare(b.name)
      )
      .slice(0, 100);

    const hasScorers = scorers.length > 0;
    const source = hasScorers ? scorers[0].source : "football-data.org";
    const isFallback = String(source).toLowerCase().includes("fallback") || String(source).toLowerCase().includes("local");

    const totalGoals = scorers.reduce((total, p) => total + p.goals, 0);
    const totalAssists = scorers.reduce((total, p) => total + p.assists, 0);
    const leader = scorers[0];

    if (!hasScorers) {
      return `
        <section class="wc-section hero-section players-hero">
          <div class="section-kicker">${this.t("players")}</div>
          <h2>${this.t("goldenBootCentre")}</h2>
          <p>Automatic Golden Boot data will appear once football-data.org publishes World Cup scorer data.</p>
        </section>

        <section class="wc-section">
          <div class="wc-empty">
            No Golden Boot scorer data available yet.
          </div>
        </section>
      `;
    }

    return `
      <section class="wc-section hero-section players-hero">
        <div class="section-kicker">${this.t("players")}</div>
        <h2>${this.t("goldenBootCentre")}</h2>
        <p>
          ${isFallback
            ? "Preview fallback data shown until football-data.org publishes live World Cup scorer data."
            : "Live Golden Boot data from football-data.org."}
        </p>
        <div class="source-pill">
          Source: ${this.esc(source)}
        </div>
      </section>

      <div class="stats-layout">
        <section class="wc-section">
          <div class="section-header-row">
            <div>
              <div class="section-kicker">${this.t("goldenBoot")}</div>
              <h2>${this.t("playerWatch")}</h2>
            </div>
            <div class="mini-pill">${scorers.length} ${this.t("playersTracked")}</div>
          </div>

          ${leader ? `
            <div class="leader-strip">
              <div>
                <div class="section-kicker">${this.t("leaderSpotlight")}</div>
                <h3>${this.esc(leader.name)}</h3>
                <p>${this.flag(leader.team, true)} ${this.esc(leader.team)}</p>
              </div>
              <div class="leader-score">
                <strong>${leader.goals}</strong>
                <span>${this.t("goals")}</span>
              </div>
              <div class="leader-score">
                <strong>${leader.assists}</strong>
                <span>${this.t("assists")}</span>
              </div>
            </div>
          ` : ""}

          <div class="table-wrap">
            <table class="wc-table">
              <thead>
                <tr>
                  <th>${this.t("pos")}</th>
                  <th>${this.t("player")}</th>
                  <th>${this.t("team")}</th>
                  <th>${this.t("goals")}</th>
                  <th>${this.t("assists")}</th>
                </tr>
              </thead>
              <tbody>
                ${scorers.map((player, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td><strong>${this.esc(player.name)}</strong></td>
                    <td>
                      <div class="group-team-cell">
                        ${this.flag(player.team, true)}
                        <span>${this.esc(player.team)}</span>
                      </div>
                    </td>
                    <td><strong>${player.goals}</strong></td>
                    <td>${player.assists}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>

        <aside class="wc-section side-panel">
          <div class="section-kicker">${this.t("stats")}</div>
          <h2>${this.t("tournamentIntelligence")}</h2>
          <div class="stat-list">
            <div><strong>${scorers.length}</strong><span>${this.t("playersTracked")}</span></div>
            <div><strong>${totalGoals}</strong><span>${this.t("totalGoals")}</span></div>
            <div><strong>${totalAssists}</strong><span>${this.t("totalAssists")}</span></div>
            <div><strong>${this.esc(source)}</strong><span>Source</span></div>
          </div>
        </aside>
      </div>
    `;
  }


  knockoutPage() {
    const fixtures = this._data.fixtures || [];
    const rounds = [
      ["LAST_32", this.t("round32")],
      ["LAST_16", this.t("round16")],
      ["QUARTER_FINALS", this.t("quarterFinals")],
      ["SEMI_FINALS", this.t("semiFinals")],
      ["THIRD_PLACE", this.t("thirdPlace")],
      ["FINAL", this.t("final")],
    ];

    return `
      <div class="wc-card">
        <div class="wc-section-title">${this.t("knockoutBracket")}</div>
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
                    : `<div class="wc-bracket-match">${this.t("tbc")}<br><span class="wc-muted">${this.t("fixturesNotAvailable")}</span></div>`
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
        <div class="wc-stat"><strong>${r.highest_scoring_match?.totalGoals ?? 0}</strong>${this.t("highestMatchGoals")}</div>
        <div class="wc-stat"><strong>${r.biggest_win?.margin ?? 0}</strong>${this.t("biggestMargin")}</div>
        <div class="wc-stat"><strong>${r.top_scoring_team?.goalsFor ?? 0}</strong>${this.t("topTeamGoals")}</div>
        <div class="wc-stat"><strong>${r.best_defence?.goalsAgainst ?? 0}</strong>${this.t("bestDefenceGA")}</div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">${this.t("highestScoringMatch")}</div>
          ${r.highest_scoring_match ? this.matchRow(r.highest_scoring_match) : `<div class="wc-empty">${this.t("noResult")}</div>`}
        </div>

        <div class="wc-card">
          <div class="wc-section-title">${this.t("biggestWin")}</div>
          ${r.biggest_win ? this.matchRow(r.biggest_win) : `<div class="wc-empty">${this.t("noResult")}</div>`}
        </div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">${this.t("topScoringTeam")}</div>
          ${
            r.top_scoring_team
              ? `<p><strong>${this.esc(this.localizedTeamName(r.top_scoring_team.team))}</strong></p><p>${r.top_scoring_team.goalsFor} ${this.t("goals").toLowerCase()}</p>`
              : `<div class="wc-empty">${this.t("noTeamGoalData")}</div>`
          }
        </div>

        <div class="wc-card">
          <div class="wc-section-title">${this.t("bestDefence")}</div>
          ${
            r.best_defence
              ? `<p><strong>${this.esc(this.localizedTeamName(r.best_defence.team))}</strong></p><p>${r.best_defence.goalsAgainst} ${this.t("conceded")}</p>`
              : `<div class="wc-empty">${this.t("noDefensiveData")}</div>`
          }
        </div>
      </div>
    `;
  }

  statsPage() {
    const s = this._data.statistics || {};

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${s.matches_played ?? 0}</strong>${this.t("matchesPlayed")}</div>
        <div class="wc-stat"><strong>${s.total_goals ?? 0}</strong>${this.t("totalGoals")}</div>
        <div class="wc-stat"><strong>${s.goals_per_match ?? 0}</strong>${this.t("goalsPerMatch")}</div>
        <div class="wc-stat"><strong>${s.progress ?? 0}%</strong>${this.t("progress")}</div>
        <div class="wc-stat"><strong>${s.draws ?? 0}</strong>${this.t("draws")}</div>
        <div class="wc-stat"><strong>${s.draw_rate ?? 0}%</strong>${this.t("drawRate")}</div>
        <div class="wc-stat"><strong>${s.btts_rate ?? 0}%</strong>${this.t("bttsRate")}</div>
        <div class="wc-stat"><strong>${s.over_25_rate ?? 0}%</strong>${this.t("over25Rate")}</div>
      </div>
    `;
  }

  venuesPage() {
    const v = this._data.venues || {};
    const stadiums = v.stadiums || [];
    const finalVenue = v.final_venue;

    const venueTitle = (venue) => venue.name || venue.stadium || venue.real_name || this.t("unknown");
    const venueRealName = (venue) => venue.real_name || venue.stadium || venue.name || this.t("unknown");
    const venueMatches = (venue) => venue.matches ?? venue.matches_hosted ?? venue.match_count ?? 0;
    const venueCapacity = (venue) => Number(venue.capacity || 0).toLocaleString();
    const venueImageUrl = (venue) => venue?.image ? `/world_cup_2026_frontend/${venue.image}` : "";

    return `
      <div class="wc-grid">
        <div class="wc-stat"><strong>${stadiums.length}</strong>${this.t("stadiums")}</div>
        <div class="wc-stat"><strong>${v.country_counts?.USA ?? 0}</strong>${this.t("usaVenues")}</div>
        <div class="wc-stat"><strong>${v.country_counts?.Canada ?? 0}</strong>${this.t("canadaVenues")}</div>
        <div class="wc-stat"><strong>${v.country_counts?.Mexico ?? 0}</strong>${this.t("mexicoVenues")}</div>
      </div>

      ${
        finalVenue
          ? `
          <div class="wc-card">
            ${
              finalVenue.image
                ? `
                  <img
                    src="${this.esc(venueImageUrl(finalVenue))}"
                    alt="${this.esc(venueTitle(finalVenue))}"
                    loading="lazy"
                    style="width:min(720px, 92%);height:auto;max-height:none;object-fit:contain;border-radius:14px;margin:0 auto 14px;display:block;box-shadow:0 10px 30px rgba(0,0,0,.35);"
                  />
                `
                : ""
            }
            <div class="wc-section-title">${this.t("finalVenue")}</div>
            <p><strong>${this.esc(finalVenue.flag || "")} ${this.esc(venueTitle(finalVenue))}</strong></p>
            <p class="wc-muted">Real stadium: <strong>${this.esc(venueRealName(finalVenue))}</strong></p>
            <p>${this.esc(finalVenue.city)}, ${this.esc(this.localizedCountryName(finalVenue.country))}</p>
            <p>${this.t("capacity")}: <strong>${this.esc(venueCapacity(finalVenue))}</strong></p>
            <p>Matches hosted: <strong>${this.esc(venueMatches(finalVenue))}</strong></p>
          </div>
        `
          : ""
      }

      <div class="wc-card">
        <div class="wc-section-title">${this.t("worldCupStadiums")}</div>
        <div class="wc-venue-grid">
          ${stadiums.map(venue => `
            <div class="wc-stat">
              ${
                venue.image
                  ? `
                    <img
                      src="${this.esc(venueImageUrl(venue))}"
                      alt="${this.esc(venueTitle(venue))}"
                      loading="lazy"
                      style="width:100%;height:140px;object-fit:cover;border-radius:12px;margin-bottom:10px;"
                    />
                  `
                  : ""
              }
              <strong>${this.esc(venue.flag || "")} ${this.esc(venueTitle(venue))}</strong>
              <div class="wc-muted">Real stadium: ${this.esc(venueRealName(venue))}</div>
              <div>${this.esc(venue.city)}, ${this.esc(this.localizedCountryName(venue.country))}</div>
              <div class="wc-muted">${this.t("capacity")}: ${this.esc(venueCapacity(venue))}</div>
              <div class="wc-muted">Matches hosted: <strong>${this.esc(venueMatches(venue))}</strong></div>
            </div>
          `).join("") || `<div class="wc-empty">${this.t("noVenueData")}</div>`}
        </div>
      </div>
    `;
  }

  sortedSupporters() {
    const supporters = Array.isArray(this._data.supporters) ? this._data.supporters : [];

    return [...supporters].sort((a, b) => {
      const aDate = new Date(a?.date || "1900-01-01").getTime();
      const bDate = new Date(b?.date || "1900-01-01").getTime();
      return bDate - aDate;
    });
  }

  supporterCountryCounts(supporters) {
    return supporters.reduce((counts, supporter) => {
      const country = typeof supporter === "string" ? "" : this.teamLabel(supporter.country || "");
      if (!country || country === this.t("tbc")) return counts;
      counts[country] = (counts[country] || 0) + 1;
      return counts;
    }, {});
  }

  overviewSupportersPanel() {
    const supporters = this.sortedSupporters();

    if (!supporters.length) {
      return "";
    }

    const latestSupporters = supporters.slice(0, 5);
    const countryCounts = this.supporterCountryCounts(supporters);
    const countries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 8);

    return `
      <div class="wc-card overview-supporters-card">
        <div class="overview-panel-heading">
          <div>
            <div class="overview-small-label">🍺 Community Support</div>
            <div class="wc-section-title">🌟 Latest Supporters</div>
          </div>
          <button class="overview-action-button overview-supporters-link" data-page="supporters" type="button">
            View All ${supporters.length}
          </button>
        </div>

        <div class="overview-supporters-layout">
          <div>
            <div class="overview-supporters-list">
              ${latestSupporters.map((supporter) => {
                const name = typeof supporter === "string" ? supporter : supporter.name;
                const country = typeof supporter === "string" ? "" : supporter.country;
                return `
                  <div class="overview-supporter-pill">
                    ${country ? this.flag(country, true) : "🍺"}
                    <strong>${this.esc(name || this.t("anonymousSupporter"))}</strong>
                    ${country ? `<span>${this.esc(this.localizedTeamName(country))}</span>` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="overview-supporters-stats">
            <div><strong>${supporters.length}</strong><span>Total Supporters</span></div>
            <div><strong>${countries.length}</strong><span>Countries</span></div>
          </div>
        </div>

        ${countries.length ? `
          <div class="overview-country-strip">
            ${countries.map(([country, count]) => `
              <span>${this.flag(country, true)} ${this.esc(this.localizedCountryName(country))} <b>${count}</b></span>
            `).join("")}
          </div>
        ` : ""}

        <div class="overview-supporters-thanks">
          ❤️ Thanks to everyone helping support development of the World Cup 2026 integration.
        </div>
      </div>
    `;
  }

  supporterCard(supporter, isLatest = false) {
    const name = typeof supporter === "string" ? supporter : supporter.name;
    const country = typeof supporter === "string" ? "" : supporter.country;
    const message = typeof supporter === "string"
      ? this.t("supporterDefaultMessage")
      : supporter.message;
    const date = typeof supporter === "string" ? "" : supporter.date;

    return `
      <div class="wc-stat supporter-card-compact ${isLatest ? "supporter-latest-card" : ""}">
        <strong class="supporter-card-name">
          ${country ? this.flag(country, true) : "🍺"}
          <span>${this.esc(name || this.t("anonymousSupporter"))}</span>
        </strong>
        <div class="supporter-card-meta">
          ${country ? `<span>${this.esc(this.localizedTeamName(country))}</span>` : ""}
          ${date ? `<span>${this.esc(date)}</span>` : ""}
        </div>
        ${message ? `<div class="supporter-card-message">${this.esc(message || this.t("supporterDefaultMessage"))}</div>` : ""}
      </div>
    `;
  }

  supportersPage() {
    const supporters = this.sortedSupporters();
    const countryCounts = this.supporterCountryCounts(supporters);
    const countryList = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    const latestDate = supporters[0]?.date || "";
    const latestSupporters = latestDate
      ? supporters.filter((supporter) => supporter.date === latestDate)
      : supporters.slice(0, 2);

    const allSupporters = supporters;

    return `
      <div class="wc-card">
        <div class="wc-section-title">${this.t("supportersThankYouTitle")}</div>
        <p>
          ${this.t("supportersIntro")}
        </p>
        <p class="wc-muted">
          ${this.t("supportersSpecialThanks")}
        </p>
      </div>

      ${supporters.length ? `
        <div class="wc-card supporters-summary-card">
          <div class="wc-section-title">❤️ Supporters Around The World</div>
          <div class="supporters-summary-grid">
            <div class="supporter-summary-stat"><strong>${supporters.length}</strong><span>Total Supporters</span></div>
            <div class="supporter-summary-stat"><strong>${countryList.length}</strong><span>Countries Supporting</span></div>
            <div class="supporter-summary-stat"><strong>${latestDate || "—"}</strong><span>Latest Support Date</span></div>
          </div>
          ${countryList.length ? `
            <div class="supporter-country-grid">
              ${countryList.map(([country, count]) => `
                <span>${this.flag(country, true)} ${this.esc(this.localizedCountryName(country))} <b>${count}</b></span>
              `).join("")}
            </div>
          ` : ""}
        </div>
      ` : ""}

      ${
        supporters.length
          ? `
            <div class="wc-card">
              <div class="wc-section-title">${this.t("latestSupporters")}</div>
              ${latestDate ? `<p class="wc-muted">${this.esc(latestDate)}</p>` : ""}
              <div class="supporters-feature-grid">
                ${latestSupporters.map((supporter) => this.supporterCard(supporter, true)).join("")}
              </div>
            </div>

            <div class="wc-card">
              <div class="wc-section-title">${this.t("allSupporters")}</div>
              <div class="wc-grid">
                ${allSupporters.map((supporter) => this.supporterCard(supporter)).join("")}
              </div>
            </div>
          `
          : `
            <div class="wc-card">
              <div class="wc-section-title">${this.t("supportersTitle")}</div>
              <div class="wc-empty">${this.t("noSupporters")}</div>
            </div>
          `
      }

      <div class="wc-card" style="text-align:center;">
        <div class="wc-section-title">${this.t("wantNameAdded")}</div>
        <p class="wc-muted">${this.t("supportFutureUpdates")}</p>
        <p class="wc-muted">${this.t("supporterBeerMessage")}</p>
        <a
          class="wc-pill wc-donate-button"
          href="https://paypal.me/graffidoodle"
          target="_blank"
          rel="noopener noreferrer"
          style="display:inline-flex;margin-top:8px;text-decoration:none;"
        >
          ${this.t("donateBuyBeer")}
        </a>
      </div>
    `;
  }


  headerLivePill() {
    const live = this._data.live || [];
    const liveCount = live.length;

    if (!liveCount) {
      return `<div class="wc-header-live-pill offline">🔴 No live games</div>`;
    }

    if (liveCount === 1) {
      const match = live[0];
      const homeTeam = this.localizedTeamName(this.getHomeTeam(match));
      const awayTeam = this.localizedTeamName(this.getAwayTeam(match));
      const homeScore = this.getHomeScore(match);
      const awayScore = this.getAwayScore(match);
      const score = homeScore !== "-" || awayScore !== "-" ? ` ${homeScore}-${awayScore}` : "";
      return `<div class="wc-header-live-pill live">🟢 Live: ${this.esc(homeTeam)}${this.esc(score)} ${this.esc(awayTeam)}</div>`;
    }

    return `<div class="wc-header-live-pill live">🟢 ${liveCount} live games</div>`;
  }

  headerScheduledPill() {
    const fixtures = this._data.fixtures || [];
    const scheduledStatuses = ["TIMED", "SCHEDULED"];

    const todayKey = (() => {
      try {
        const parts = new Intl.DateTimeFormat("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).formatToParts(new Date());

        const year = parts.find((part) => part.type === "year")?.value;
        const month = parts.find((part) => part.type === "month")?.value;
        const day = parts.find((part) => part.type === "day")?.value;

        if (year && month && day) {
          return `${year}-${month}-${day}`;
        }

        return new Date().toLocaleDateString("en-CA");
      } catch {
        return new Date().toISOString().slice(0, 10);
      }
    })();

    const scheduledTodayCount = fixtures.filter((match) => {
      return scheduledStatuses.includes(match.status) && this.fixtureDateKey(match) === todayKey;
    }).length;

    if (!scheduledTodayCount) {
      return `<div class="wc-header-live-pill offline wc-header-scheduled-pill">🔴 No games today</div>`;
    }

    return `<div class="wc-header-live-pill live wc-header-scheduled-pill">🟢 ${scheduledTodayCount} ${scheduledTodayCount === 1 ? "game" : "games"} today</div>`;
  }

  worldCupKickoffDate() {
    // Opening match countdown. Change this one line if FIFA changes the kickoff time.
    return new Date("2026-06-11T20:00:00Z");
  }

  countdownParts() {
    const target = this.worldCupKickoffDate().getTime();
    const now = Date.now();
    const remaining = target - now;

    if (remaining <= 0) {
      return null;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  countdownText() {
    const parts = this.countdownParts();

    if (!parts) {
      return "";
    }

    const pad = (value) => String(value).padStart(2, "0");
    return `⏳ ${parts.days}D ${pad(parts.hours)}H ${pad(parts.minutes)}M ${pad(parts.seconds)}S`;
  }

  headerCountdownPill() {
    const text = this.countdownText();

    if (!text) {
      return "";
    }

    return `<div class="wc-header-countdown-pill" id="wc-header-countdown">${this.esc(text)}</div>`;
  }

  updateCountdownDisplay() {
    const countdown = this.querySelector("#wc-header-countdown");

    if (!countdown) {
      return;
    }

    const text = this.countdownText();

    if (!text) {
      countdown.remove();
      return;
    }

    countdown.textContent = text;
  }

  pageContent() {
    if (this._page === "overview") return this.overviewPage();
    if (this._page === "live") return this.livePage();
    if (this._page === "fixtures") return this.fixturesPage();
    if (this._page === "results") return this.resultsPage();
    if (this._page === "groups") return this.groupsPage();
    if (this._page === "knockout") return this.knockoutPage();
    if (this._page === "players") return this.playersPage();
    if (this._page === "records") return this.recordsPage();
    if (this._page === "stats") return this.statsPage();
    if (this._page === "venues") return this.venuesPage();
    if (this._page === "supporters") return this.supportersPage();
    return this.overviewPage();
  }

  render() {
    this.innerHTML = `
      ${this.styles()}
      <div class="wc-app" dir="${this._language === "ar" ? "rtl" : "ltr"}">
        <div class="wc-shell">
          <div class="wc-header">
            <div class="wc-header-title-row">
              ${this.headerLivePill()}
              ${this.headerScheduledPill()}
              <div class="wc-title-stack">
                <div class="wc-title">${this.t("title")}</div>
                <div class="wc-header-subtitle-inline">${this.t("subtitle")}</div>
              </div>
              ${this.headerCountdownPill()}
            </div>

            <div class="wc-header-controls">
              <div class="wc-updated-wrap">
                <div class="wc-updated-label">${this.t("updated")}</div>
                <div class="wc-updated-pill">${new Date().toLocaleTimeString()}</div>
              </div>

              ${this.languageSelector()}

              <button class="wc-pill wc-back-button" id="wc-back-button" type="button">
                ${this.t("back")}
              </button>
            </div>
          </div>

          ${this.nav()}
          ${this.pageContent()}

        </div>
      </div>
    `;

    this.querySelectorAll(".wc-nav button, .overview-action-button").forEach((button) => {
      button.onclick = () => {
        const page = button.getAttribute("data-page");
        this.changePage(page);
      };
    });

    const languageSelect = this.querySelector("#wc-language-select");

    if (languageSelect) {
      languageSelect.onchange = (e) => {
        this.changeLanguage(e.target.value);
      };
    }

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


  customElements.define("world-cup-2026-panel", WorldCup2026Panel);
}
