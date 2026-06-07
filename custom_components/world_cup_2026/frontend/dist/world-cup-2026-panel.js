class WorldCup2026Panel extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
    this._page = "overview";
    this._loaded = false;
    this._refreshInterval = null;
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
    };
  }

  translations() {
    return {
      en: {
        title: "FIFA World Cup 2026",
        subtitle: "Home Assistant dedicated tournament application",
        back: "← Back",
        updated: "Updated",
        loading: "Loading World Cup 2026...",
        errorTitle: "World Cup 2026",
        errorText: "Could not load app data.",
        overview: "Overview",
        live: "Live Centre",
        fixtures: "Fixtures",
        groups: "Groups",
        knockout: "Knockout",
        players: "Players",
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
        scheduled: "Scheduled",
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
        players: "Joueurs",
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
        players: "Spieler",
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
        players: "Jugadores",
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
        players: "Giocatori",
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
        players: "Spelers",
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
        players: "اللاعبون",
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
        players: "Jogadores",
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
        conceded: "sofridos",
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
        players: "選手",
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
        players: "선수",
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
        players: "Spelare",
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
        players: "Spillere",
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
        conceded: "sluppet inn",
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

  changeLanguage(language) {
    this._language = language;
    localStorage.setItem("world_cup_2026_language", language);
    this.render();
  }

  formatDate(value) {
    if (!value) return "";
    try {
      const locales = {
        en: "en-GB",
        fr: "fr-FR",
        de: "de-DE",
        es: "es-ES",
        it: "it-IT",
        nl: "nl-NL",
        ar: "ar-SA",
        pt: "pt-PT",
        ja: "ja-JP",
        ko: "ko-KR",
        sv: "sv-SE",
        no: "nb-NO",
      };

      return new Date(value).toLocaleString(locales[this._language] || "en-GB", {
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

  cleanTeamName(team) {
    return String(team || this.t("tbc"))
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

    return fixes[name] || name || this.t("tbc");
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

    return `
      <div class="team-flag-block">
        ${this.flag(name)}
        <div class="team-flag-name">${this.esc(name)}</div>
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

        .wc-language-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .wc-language-label {
          font-size: 11px;
          opacity: 0.75;
          font-weight: 800;
          padding-left: 6px;
        }

        .wc-language-select {
          cursor: pointer;
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.20);
          border-radius: 999px;
          padding: 9px 13px;
          font-size: 13px;
          font-weight: 800;
          outline: none;
          min-width: 150px;
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

          .wc-pill,
          .wc-language-wrap {
            display: inline-flex;
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
      ["overview", this.t("overview")],
      ["live", this.t("live")],
      ["fixtures", this.t("fixtures")],
      ["groups", this.t("groups")],
      ["knockout", this.t("knockout")],
      ["players", this.t("players")],
      ["records", this.t("records")],
      ["stats", this.t("stats")],
      ["venues", this.t("venues")],
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
          <option value="ja" ${this._language === "ja" ? "selected" : ""}>Japanese</option>
          <option value="ko" ${this._language === "ko" ? "selected" : ""}>Korean</option>
          <option value="sv" ${this._language === "sv" ? "selected" : ""}>Swedish</option>
          <option value="no" ${this._language === "no" ? "selected" : ""}>Norwegian</option>
        </select>
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
        <div class="wc-stat"><strong>${o.matches_total ?? 104}</strong>${this.t("totalMatches")}</div>
        <div class="wc-stat"><strong>${o.matches_loaded ?? 0}</strong>${this.t("loaded")}</div>
        <div class="wc-stat"><strong>${o.matches_played ?? 0}</strong>${this.t("played")}</div>
        <div class="wc-stat"><strong>${o.matches_remaining ?? 104}</strong>${this.t("remaining")}</div>
        <div class="wc-stat"><strong>${o.live_matches ?? 0}</strong>${this.t("liveNow")}</div>
        <div class="wc-stat"><strong>${o.total_goals ?? 0}</strong>${this.t("totalGoals")}</div>
      </div>

      <div class="wc-two">
        <div class="wc-card">
          <div class="wc-section-title">${this.t("nextMatch")}</div>
          ${nextMatch ? this.matchRow(nextMatch) : `<div class="wc-empty">${this.t("noUpcomingMatch")}</div>`}
        </div>

        <div class="wc-card">
          <div class="wc-section-title">${this.t("tournamentStatus")}</div>
          <p>${this.t("demoMode")}: <strong>${o.demo_mode ? this.t("on") : this.t("off")}</strong></p>
          <p>${this.t("lastUpdate")}: <strong>${o.last_update_success ? this.t("ok") : this.t("failed")}</strong></p>
          <p>${this.t("progress")}: <strong>${o.progress ?? 0}%</strong></p>
          <p>${this.t("topScorer")}: <strong>${this.esc(topScorer?.player?.name || topScorer?.name || this.t("notAvailable"))}</strong></p>
        </div>
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
        <div class="wc-section-title">${this.t("live")} <span class="wc-badge wc-live">LIVE</span></div>
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
        <div class="wc-section-title">${this.t("fixturesResults")}</div>
        ${fixtures.length ? `
          <div class="wc-list">
            ${fixtures.map(m => this.matchRow(m)).join("")}
          </div>
        ` : `<div class="wc-empty">${this.t("noFixtures")}</div>`}
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
          <div class="wc-section-title">${this.t("groupsAL")}</div>
          <div class="wc-empty">${this.t("noGroups")}</div>
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
              : `<div class="wc-empty">${this.t("noTeamsGroup")}</div>`
          }
        </div>
      `;
    }).join("");
  }

  playersPage() {
    const scorers = (this._data.scorers || []).slice(0, 30);

    return `
      <div class="wc-card">
        <div class="wc-section-title">${this.t("goldenBoot")}</div>
        ${scorers.length ? `
          <div class="wc-table-wrap">
            <table class="wc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>${this.t("player")}</th>
                  <th>${this.t("team")}</th>
                  <th>${this.t("goals")}</th>
                  <th>${this.t("assists")}</th>
                </tr>
              </thead>
              <tbody>
                ${scorers.map((s, i) => `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${this.esc(s.player?.name || s.name || this.t("unknown"))}</strong></td>
                    <td>${this.esc(this.teamLabel(s.team?.name || s.team || ""))}</td>
                    <td><strong>${s.goals ?? 0}</strong></td>
                    <td>${s.assists ?? 0}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `<div class="wc-empty">${this.t("noPlayerStats")}</div>`}
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
              ? `<p><strong>${this.esc(this.teamLabel(r.top_scoring_team.team))}</strong></p><p>${r.top_scoring_team.goalsFor} ${this.t("goals").toLowerCase()}</p>`
              : `<div class="wc-empty">${this.t("noTeamGoalData")}</div>`
          }
        </div>

        <div class="wc-card">
          <div class="wc-section-title">${this.t("bestDefence")}</div>
          ${
            r.best_defence
              ? `<p><strong>${this.esc(this.teamLabel(r.best_defence.team))}</strong></p><p>${r.best_defence.goalsAgainst} ${this.t("conceded")}</p>`
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
            <div class="wc-section-title">${this.t("finalVenue")}</div>
            <p><strong>${this.esc(finalVenue.flag)} ${this.esc(finalVenue.stadium)}</strong></p>
            <p>${this.esc(finalVenue.city)}, ${this.esc(finalVenue.country)}</p>
            <p>${this.t("capacity")}: <strong>${this.esc(finalVenue.capacity)}</strong></p>
          </div>
        `
          : ""
      }

      <div class="wc-card">
        <div class="wc-section-title">${this.t("worldCupStadiums")}</div>
        <div class="wc-venue-grid">
          ${stadiums.map(venue => `
            <div class="wc-stat">
              <strong>${this.esc(venue.flag)} ${this.esc(venue.stadium)}</strong>
              <div>${this.esc(venue.city)}</div>
              <div class="wc-muted">${this.esc(venue.country)} · ${this.t("capacity")} ${this.esc(venue.capacity)}</div>
            </div>
          `).join("") || `<div class="wc-empty">${this.t("noVenueData")}</div>`}
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
      <div class="wc-app" dir="${this._language === "ar" ? "rtl" : "ltr"}">
        <div class="wc-shell">
          <div class="wc-header">
            <div>
              <div class="wc-title">${this.t("title")}</div>
              <div class="wc-subtitle">${this.t("subtitle")}</div>
            </div>

            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
              ${this.languageSelector()}

              <button class="wc-pill wc-back-button" id="wc-back-button" type="button">
                ${this.t("back")}
              </button>

              <div class="wc-pill">
                ${this.t("updated")} ${new Date().toLocaleTimeString()}
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

if (!customElements.get("world-cup-2026-panel")) {
  customElements.define("world-cup-2026-panel", WorldCup2026Panel);
}
