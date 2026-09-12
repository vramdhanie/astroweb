Run the weekly Podcast Addict ingestion for this site.

Steps:

1. Check `src/raw/` for a `PodcastAddict_autoBackup_*.backup` file (the user drops the weekly backup there; it's gitignored). If none exists, stop and ask the user to copy one in.

2. From the astroweb root, run:
   `node scripts/ingest-podcasts.mjs`
   It parses the newest backup's SQLite DB, recomputes per-podcast + global listening stats, refreshes each show's artwork into `public/images/podcasts/`, and MERGES into `src/data/podcasts.json` — preserving the hand-authored fields (`opinion`, `rating`, `statusOverride`, `categoryOverride`). It also carries forward shows already in the JSON that aren't in this backup (as retired).

3. Report what changed from the script output: totals (episodes/hours), how many shows are current vs retired, and especially the "new (need an opinion)" list.

4. For each newly added podcast with an empty `opinion`, ask the user for a short one-line opinion and a rating (0–10), and write them into that show's entry in `src/data/podcasts.json`. **Do not invent opinions** — leave blank if the user doesn't give one.

5. If any show wrongly flipped current↔retired (default: current = played within 60 days), the user can set `"statusOverride": "current"` or `"retired"` on that entry to pin it.

6. Do NOT commit the `.backup` (gitignored). The committed artifacts are `src/data/podcasts.json` and any refreshed `public/images/podcasts/*.jpg`. Leave the commit to the user unless they ask.

7. Remind the user that the normal `pnpm build` regenerates the `/podcasts` page from the JSON.
