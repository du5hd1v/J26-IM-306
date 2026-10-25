export const paths = {
  A: {
    start: 'a_arrival',
    scenes: {
      a_arrival: { id: 'a_arrival', eyebrow: 'The kingdom before the last king', title: 'Jaffna before the fall', body: 'Jaffna, early seventeenth century. At the northern edge of Sri Lanka stood the Kingdom of Jaffna, ruled by the Aryacakravarti dynasty. But the kingdom existed in an increasingly dangerous political world. Portuguese power had expanded around the island and across the maritime routes of the region. Jaffna’s independence was becoming increasingly difficult to protect.', next: 'a_gateway', tone: 'copper' },
      a_gateway: { id: 'a_gateway', eyebrow: 'Scene 02', title: 'Through the old gateway', body: 'Placeholder scene text. No historical claim is made in this demo.', next: 'a_legacy', previous: 'a_arrival', tone: 'indigo' },
      a_legacy: { id: 'a_legacy', eyebrow: 'Scene 03', title: 'A living legacy', body: 'Placeholder conclusion awaiting approved Tamil and English copy.', previous: 'a_gateway', end: true, tone: 'plum' },
    },
  },
  B: {
    start: 'b_arrival',
    scenes: {
      b_arrival: { id: 'b_arrival', eyebrow: 'Scene 01', title: 'The story is waiting', body: 'Explore the highlighted symbol before choosing where to go.', hotspot: { id: 'gateway_symbol', label: 'Explore symbol', detail: 'Placeholder cultural detail awaiting expert review.' }, choices: [
        { id: 'follow_walls', label: 'Follow the old walls', next: 'b_walls' },
        { id: 'seek_stories', label: 'Seek the hidden stories', next: 'b_stories' },
      ], tone: 'copper' },
      b_walls: { id: 'b_walls', eyebrow: 'Your path', title: 'Along the walls', body: 'Placeholder branch narrative. Your choice has been recorded locally for this demo.', next: 'b_rejoin', tone: 'indigo' },
      b_stories: { id: 'b_stories', eyebrow: 'Your path', title: 'Voices in the stone', body: 'Placeholder branch narrative. Your choice has been recorded locally for this demo.', next: 'b_rejoin', tone: 'teal' },
      b_rejoin: { id: 'b_rejoin', eyebrow: 'Paths reunite', title: 'One story, many ways in', body: 'Both branches rejoin here. Final wording requires cultural review.', end: true, tone: 'plum' },
    },
  },
}

export function getScene(path, id) {
  return paths[path]?.scenes[id] ?? null
}
