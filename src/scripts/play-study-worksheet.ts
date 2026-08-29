type ScalarMap = Record<string, string>;

interface EventEntry extends ScalarMap {
  time: string;
  action: string;
  before: string;
  response: string;
  after: string;
  evidenceRef: string;
}

interface EvidenceEntry extends ScalarMap {
  type: string;
  label: string;
  location: string;
  note: string;
}

interface StudyDraft {
  schemaVersion: 1;
  kind: "nightmare-mode-play-study";
  studyFormat: "the-first-four-minutes";
  status: "draft";
  boundarySeconds: 240;
  elapsedSeconds: number;
  identity: ScalarMap;
  conditions: ScalarMap;
  events: EventEntry[];
  evidence: EvidenceEntry[];
  claims: Record<string, { entry: string; evidenceReference: string }>;
  publicationBoundary: ScalarMap;
  updatedAt: string;
}

const root = document.querySelector<HTMLElement>("[data-play-study-worksheet]");

if (root) {
  const form = root.querySelector<HTMLFormElement>("#play-study-form")!;
  const eventLedger = root.querySelector<HTMLElement>("#event-ledger")!;
  const evidenceList = root.querySelector<HTMLElement>("#evidence-list")!;
  const eventTemplate = root.querySelector<HTMLTemplateElement>("#event-template")!;
  const evidenceTemplate = root.querySelector<HTMLTemplateElement>("#evidence-template")!;
  const elapsedOutput = root.querySelector<HTMLTimeElement>("#study-elapsed")!;
  const autosaveStatus = root.querySelector<HTMLOutputElement>("#autosave-status")!;
  const actionStatus = root.querySelector<HTMLElement>("#action-status")!;
  const storageKey = root.dataset.storageKey!;
  const locale = root.dataset.locale === "de" ? "de" : "en";
  const copy = {
    saved: root.dataset.copySaved!,
    unavailable: root.dataset.copyUnavailable!,
    cleared: root.dataset.copyCleared!,
    confirmClear: root.dataset.copyConfirmClear!,
    boundaryReached: root.dataset.copyBoundaryReached!,
    remove: root.dataset.copyRemove!,
  };
  const exportText = locale === "de" ? {
    untitled: "Unbenannte Play Study", status: "Status", draft: "Entwurf", boundary: "Studiengrenze", duration: "Beobachtete Dauer", edition: "Edition / Version / Build", platform: "Plattform", date: "Datum", observer: "Verantwortliche Beobachtung", unknown: "Unbekannt", notRecorded: "Nicht erfasst.", question: "Frage vor der Sitzung", expectation: "Erwartung vorab", counterevidence: "Mögliche Gegenbelege", conditions: "Bedingungen", ledger: "Ereignisprotokoll", action: "Aktion / Eingabe", before: "Zustand davor", response: "Beobachtete Reaktion", after: "Zustand danach", evidenceReference: "Belegreferenz", sources: "Quellen und Aufnahmen", claims: "Aussagen", evidence: "Beleg", publication: "Publikationsgrenze", supports: "Was diese Sitzung stützt", cannot: "Was sie nicht belegt", rights: "Rechte- oder Datenschutzgrenzen", ai: "KI-Hilfe", editor: "Verantwortliche Redaktion", corrections: "Korrekturkontakt", noLocation: "Kein Ort", generated: "Lokal mit dem Nightmare Mode Play Study Worksheet erzeugt. Das Arbeitsblatt hat keine Daten hochgeladen.",
    conditionLabels: { hardware: "Hardware", os: "Betriebssystem", input: "Eingabegerät", displayAudio: "Bild / Ton", network: "Netzwerkzustand", accountSave: "Konto / Speicherstand", language: "Sprache / Region", difficulty: "Schwierigkeit / Modus", accessibility: "Barrierefreiheit", mods: "Mods / externe Werkzeuge", startMethod: "Startpunkt / Startmethode", unknownConditions: "Unbekannte Bedingungen" },
    claimLabels: { observation: "Beobachtung", externalSource: "Externe Quelle", interpretation: "Interpretation", unknown: "Unbekannt", counterexample: "Gegenbeispiel" },
  } : {
    untitled: "Untitled play study", status: "Status", draft: "Draft", boundary: "Study boundary", duration: "Observed duration", edition: "Edition / version / build", platform: "Platform", date: "Date", observer: "Responsible observer", unknown: "Unknown", notRecorded: "Not recorded.", question: "Question before the session", expectation: "Initial expectation", counterevidence: "Possible counterevidence", conditions: "Conditions", ledger: "Event ledger", action: "Action / input", before: "State before", response: "Observed response", after: "State after", evidenceReference: "Evidence reference", sources: "Sources and captures", claims: "Claims", evidence: "Evidence", publication: "Publication boundary", supports: "What this session supports", cannot: "What it cannot establish", rights: "Rights or privacy limits", ai: "AI assistance", editor: "Responsible editor", corrections: "Correction contact", noLocation: "No location", generated: "Generated locally with the Nightmare Mode Play Study Worksheet. No data was uploaded by the worksheet.",
    conditionLabels: { hardware: "Hardware", os: "Operating system", input: "Input device", displayAudio: "Display / audio", network: "Network state", accountSave: "Account / save state", language: "Language / region", difficulty: "Difficulty / mode", accessibility: "Accessibility settings", mods: "Mods / external tools", startMethod: "Starting point / method", unknownConditions: "Unknown conditions" },
    claimLabels: { observation: "Observation", externalSource: "External source", interpretation: "Interpretation", unknown: "Unknown", counterexample: "Counterexample" },
  };

  let elapsedSeconds = 0;
  let timerStartedAt: number | null = null;
  let timerInterval: number | null = null;
  let saveTimer: number | null = null;

  const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const setStatus = (message: string) => {
    autosaveStatus.value = message;
    actionStatus.textContent = message;
  };

  const updateTimer = () => {
    const runningSeconds = timerStartedAt === null ? elapsedSeconds : elapsedSeconds + Math.floor((Date.now() - timerStartedAt) / 1000);
    const bounded = Math.min(240, runningSeconds);
    elapsedOutput.textContent = formatTime(bounded);
    elapsedOutput.dateTime = `PT${bounded}S`;
    if (runningSeconds >= 240) {
      elapsedSeconds = 240;
      timerStartedAt = null;
      if (timerInterval !== null) window.clearInterval(timerInterval);
      timerInterval = null;
      setStatus(copy.boundaryReached);
      saveNow();
    }
  };

  const currentElapsed = () => timerStartedAt === null ? elapsedSeconds : Math.min(240, elapsedSeconds + Math.floor((Date.now() - timerStartedAt) / 1000));

  const createEventRow = (entry?: Partial<EventEntry>) => {
    const fragment = eventTemplate.content.cloneNode(true) as DocumentFragment;
    const fieldset = fragment.querySelector<HTMLFieldSetElement>(".event-row")!;
    fieldset.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-event-field]").forEach((field) => {
      const key = field.dataset.eventField!;
      field.value = entry?.[key] ?? (key === "time" ? formatTime(currentElapsed()) : "");
    });
    eventLedger.append(fragment);
    renumberRows();
  };

  const createEvidenceRow = (entry?: Partial<EvidenceEntry>) => {
    const fragment = evidenceTemplate.content.cloneNode(true) as DocumentFragment;
    fragment.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-evidence-field]").forEach((field) => {
      field.value = entry?.[field.dataset.evidenceField!] ?? (field.dataset.evidenceField === "type" ? "note" : "");
    });
    evidenceList.append(fragment);
    renumberRows();
  };

  const renumberRows = () => {
    eventLedger.querySelectorAll<HTMLElement>("[data-event-number]").forEach((number, index) => { number.textContent = `${index + 1}.`; });
    evidenceList.querySelectorAll<HTMLElement>("[data-evidence-number]").forEach((number, index) => { number.textContent = `${index + 1}.`; });
  };

  const valuesFor = (selector: string, dataKey: string): ScalarMap => Object.fromEntries(
    [...root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(selector)].map((field) => [field.dataset[dataKey]!, field.value.trim()]),
  );

  const collectDraft = (): StudyDraft => ({
    schemaVersion: 1,
    kind: "nightmare-mode-play-study",
    studyFormat: "the-first-four-minutes",
    status: "draft",
    boundarySeconds: 240,
    elapsedSeconds: currentElapsed(),
    identity: valuesFor("[data-field]", "field"),
    conditions: valuesFor("[data-condition]", "condition"),
    events: [...eventLedger.querySelectorAll<HTMLFieldSetElement>(".event-row")].map((row) => Object.fromEntries(
      [...row.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-event-field]")].map((field) => [field.dataset.eventField!, field.value.trim()]),
    ) as EventEntry),
    evidence: [...evidenceList.querySelectorAll<HTMLFieldSetElement>(".evidence-row")].map((row) => Object.fromEntries(
      [...row.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("[data-evidence-field]")].map((field) => [field.dataset.evidenceField!, field.value.trim()]),
    ) as EvidenceEntry),
    claims: Object.fromEntries([...root.querySelectorAll<HTMLTextAreaElement>("[data-claim]")].map((field) => {
      const key = field.dataset.claim!;
      const reference = root.querySelector<HTMLInputElement>(`[data-claim-reference="${key}"]`);
      return [key, { entry: field.value.trim(), evidenceReference: reference?.value.trim() ?? "" }];
    })),
    publicationBoundary: valuesFor("[data-boundary]", "boundary"),
    updatedAt: new Date().toISOString(),
  });

  const saveNow = () => {
    if (saveTimer !== null) window.clearTimeout(saveTimer);
    try {
      localStorage.setItem(storageKey, JSON.stringify(collectDraft()));
      setStatus(copy.saved);
    } catch {
      setStatus(copy.unavailable);
    }
  };

  const scheduleSave = () => {
    if (saveTimer !== null) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveNow, 250);
  };

  const hydrate = (draft: StudyDraft) => {
    elapsedSeconds = Math.max(0, Math.min(240, Number(draft.elapsedSeconds) || 0));
    Object.entries(draft.identity ?? {}).forEach(([key, value]) => {
      const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-field="${key}"]`);
      if (field) field.value = value;
    });
    Object.entries(draft.conditions ?? {}).forEach(([key, value]) => {
      const field = root.querySelector<HTMLInputElement>(`[data-condition="${key}"]`);
      if (field) field.value = value;
    });
    Object.entries(draft.claims ?? {}).forEach(([key, value]) => {
      const claim = root.querySelector<HTMLTextAreaElement>(`[data-claim="${key}"]`);
      const reference = root.querySelector<HTMLInputElement>(`[data-claim-reference="${key}"]`);
      if (claim) claim.value = value.entry ?? "";
      if (reference) reference.value = value.evidenceReference ?? "";
    });
    Object.entries(draft.publicationBoundary ?? {}).forEach(([key, value]) => {
      const field = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-boundary="${key}"]`);
      if (field) field.value = value;
    });
    eventLedger.replaceChildren();
    evidenceList.replaceChildren();
    (draft.events?.length ? draft.events : [{}]).forEach(createEventRow);
    (draft.evidence?.length ? draft.evidence : [{}]).forEach(createEvidenceRow);
    updateTimer();
  };

  const safeFilename = (game: string) => (game || "play-study-draft").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "play-study-draft";
  const download = (content: string, extension: "md" | "json", type: string) => {
    const draft = collectDraft();
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFilename(draft.identity.game)}-first-four-minutes.${extension}`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const markdown = (draft: StudyDraft) => {
    const cell = (value: string) => (value || "—").replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
    const lines = [
      `# ${draft.identity.game || exportText.untitled}: ${locale === "de" ? "Die ersten vier Minuten" : "The First Four Minutes"}`,
      "",
      `- ${exportText.status}: ${exportText.draft}`,
      `- ${exportText.boundary}: 00:00–04:00 (${draft.boundarySeconds} ${locale === "de" ? "Sekunden" : "seconds"})`,
      `- ${exportText.duration}: ${formatTime(draft.elapsedSeconds)}`,
      `- ${exportText.edition}: ${draft.identity.edition || exportText.unknown}`,
      `- ${exportText.platform}: ${draft.identity.platform || exportText.unknown}`,
      `- ${exportText.date}: ${draft.identity.date || exportText.unknown}`,
      `- ${exportText.observer}: ${draft.identity.observer || exportText.unknown}`,
      "",
      `## ${exportText.question}`,
      draft.identity.question || exportText.notRecorded,
      "",
      `## ${exportText.expectation}`,
      draft.identity.expectation || exportText.notRecorded,
      "",
      `## ${exportText.counterevidence}`,
      draft.identity.counterevidence || exportText.notRecorded,
      "",
      `## ${exportText.conditions}`,
      ...Object.entries(draft.conditions).map(([key, value]) => `- ${exportText.conditionLabels[key as keyof typeof exportText.conditionLabels] ?? key}: ${value || exportText.unknown}`),
      "",
      `## ${exportText.ledger}`,
      `| ${locale === "de" ? "Zeit" : "Time"} | ${exportText.action} | ${exportText.before} | ${exportText.response} | ${exportText.after} | ${exportText.evidenceReference} |`,
      "| --- | --- | --- | --- | --- | --- |",
      ...draft.events.map((event) => `| ${cell(event.time)} | ${cell(event.action)} | ${cell(event.before)} | ${cell(event.response)} | ${cell(event.after)} | ${cell(event.evidenceRef)} |`),
      "",
      `## ${exportText.sources}`,
      ...draft.evidence.map((item) => `- [${item.type || "note"}] ${item.label || exportText.untitled}: ${item.location || exportText.noLocation}${item.note ? ` — ${item.note}` : ""}`),
      "",
      `## ${exportText.claims}`,
      ...Object.entries(draft.claims).flatMap(([typeName, claim]) => [`### ${exportText.claimLabels[typeName as keyof typeof exportText.claimLabels] ?? typeName}`, claim.entry || exportText.notRecorded, claim.evidenceReference ? `${exportText.evidence}: ${claim.evidenceReference}` : `${exportText.evidence}: ${exportText.notRecorded}`, ""]),
      `## ${exportText.publication}`,
      `### ${exportText.supports}\n${draft.publicationBoundary.supports || exportText.notRecorded}`,
      `### ${exportText.cannot}\n${draft.publicationBoundary.cannot || exportText.notRecorded}`,
      `### ${exportText.rights}\n${draft.publicationBoundary.rights || exportText.notRecorded}`,
      `### ${exportText.ai}\n${draft.publicationBoundary.ai || exportText.notRecorded}`,
      `### ${exportText.editor}\n${draft.publicationBoundary.editor || exportText.notRecorded}`,
      `### ${exportText.corrections}\n${draft.publicationBoundary.corrections || exportText.notRecorded}`,
      "",
      exportText.generated,
    ];
    return lines.join("\n");
  };

  const startTimer = () => {
    if (timerStartedAt !== null || elapsedSeconds >= 240) return;
    timerStartedAt = Date.now();
    timerInterval = window.setInterval(updateTimer, 250);
    updateTimer();
  };

  const pauseTimer = () => {
    if (timerStartedAt === null) return;
    elapsedSeconds = currentElapsed();
    timerStartedAt = null;
    if (timerInterval !== null) window.clearInterval(timerInterval);
    timerInterval = null;
    updateTimer();
    saveNow();
  };

  form.addEventListener("submit", (event) => event.preventDefault());
  root.addEventListener("input", scheduleSave);
  root.addEventListener("change", scheduleSave);
  root.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const action = target.closest<HTMLElement>("[data-action]")?.dataset.action;
    if (action === "timer-start") startTimer();
    if (action === "timer-pause") pauseTimer();
    if (action === "timer-reset") { pauseTimer(); elapsedSeconds = 0; updateTimer(); saveNow(); }
    if (action === "add-event") { createEventRow(); scheduleSave(); eventLedger.lastElementChild?.querySelector<HTMLElement>("input, textarea")?.focus(); }
    if (action === "add-evidence") { createEvidenceRow(); scheduleSave(); evidenceList.lastElementChild?.querySelector<HTMLElement>("input, textarea, select")?.focus(); }
    if (action === "download-json") { const draft = collectDraft(); download(`${JSON.stringify(draft, null, 2)}\n`, "json", "application/json;charset=utf-8"); }
    if (action === "download-markdown") { const draft = collectDraft(); download(markdown(draft), "md", "text/markdown;charset=utf-8"); }
    if (action === "clear-draft" && window.confirm(copy.confirmClear)) {
      pauseTimer();
      localStorage.removeItem(storageKey);
      form.reset();
      elapsedSeconds = 0;
      hydrate({ schemaVersion: 1, kind: "nightmare-mode-play-study", studyFormat: "the-first-four-minutes", status: "draft", boundarySeconds: 240, elapsedSeconds: 0, identity: {}, conditions: {}, events: [], evidence: [], claims: {}, publicationBoundary: {}, updatedAt: new Date().toISOString() });
      setStatus(copy.cleared);
    }
    const removeEvent = target.closest<HTMLElement>("[data-remove-event]");
    if (removeEvent) { removeEvent.closest(".event-row")?.remove(); if (!eventLedger.children.length) createEventRow(); renumberRows(); scheduleSave(); }
    const removeEvidence = target.closest<HTMLElement>("[data-remove-evidence]");
    if (removeEvidence) { removeEvidence.closest(".evidence-row")?.remove(); if (!evidenceList.children.length) createEvidenceRow(); renumberRows(); scheduleSave(); }
  });

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) hydrate(JSON.parse(stored) as StudyDraft);
    else hydrate({ schemaVersion: 1, kind: "nightmare-mode-play-study", studyFormat: "the-first-four-minutes", status: "draft", boundarySeconds: 240, elapsedSeconds: 0, identity: {}, conditions: {}, events: [], evidence: [], claims: {}, publicationBoundary: {}, updatedAt: new Date().toISOString() });
  } catch {
    hydrate({ schemaVersion: 1, kind: "nightmare-mode-play-study", studyFormat: "the-first-four-minutes", status: "draft", boundarySeconds: 240, elapsedSeconds: 0, identity: {}, conditions: {}, events: [], evidence: [], claims: {}, publicationBoundary: {}, updatedAt: new Date().toISOString() });
    setStatus(copy.unavailable);
  }
}
