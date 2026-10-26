# 01_Kommunikation

Eingang dieses Projekts. Hier legen die Zentrale, andere Claude-Sessions und Cowork Themen ab, die dieses Projekt betreffen.

## Schreibregel

- In `01_Kommunikation/` darf jede Session und Cowork immer schreiben, ohne Rückfrage.
- In alle anderen Ordner dieses Projekts nur mit Freigabe oder klarer Anweisung von Christian.

## Ablauf

1. Neues liegt direkt in diesem Ordner.
2. Bei „Wo machen wir weiter?“ stellt Claude es zusammen mit Session-Log und ROADMAP vor: Absender, Datum, Kern in ein, zwei Sätzen.
3. Erst besprechen, nichts selbst umsetzen. Christian entscheidet: umsetzen, in die ROADMAP oder verwerfen.
4. Danach wandert die Datei nach `_archiv/JJJJ_MM_TT/` (per `git mv`, wo versioniert).
5. Keine Rückmeldung an den Absender.

## Ausgang

`ausgang/` ist für Empfänger ohne eigenes CLI-Projekt (Claude-App, Copilot, Designer, Cowork-Aufträge). Geht etwas an ein anderes CLI-Projekt, landet es direkt in dessen `01_Kommunikation/`.

## Dateiname

`JJJJ_MM_TT_<absender>_<thema>_vX_X.md`, z. B. `2026_11_02_001-zentrale_ki-radar-treffer_v1_0.md`.
