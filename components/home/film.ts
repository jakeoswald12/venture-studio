/**
 * The film animatic, from the West Ventures homepage artifact and film script.
 * Each plate stands in for a shot until the real footage is cut. `slate` names
 * the intended footage and its source / rights status.
 */

export interface Plate {
  ghost: string
  slate: string
  from: string
  to: string
}

export interface Shot extends Plate {
  at: number
  super?: string
  superNote?: string
  quote?: string
  speaker?: string
}

export const LOOP: Plate[] = [
  { ghost: 'Saturn V', slate: 'Apollo 11 launch · NASA · public domain', from: '#3b2a1a', to: '#0b0f18' },
  { ghost: 'Kitty Hawk', slate: 'Wright Flyer, 1903 · Library of Congress', from: '#5d5a50', to: '#1c1b18' },
  { ghost: 'Hoover Dam', slate: 'Construction, 1934 · U.S. Bureau of Reclamation', from: '#4b3d2c', to: '#14110d' },
  { ghost: 'Harvest', slate: 'Combines, Kansas wheat · original shoot or USDA', from: '#7a5a24', to: '#1d1508' },
  { ghost: 'Falcon 9', slate: 'Booster landing · SpaceX (licensed)', from: '#1b2a44', to: '#05070c' },
  { ghost: 'Ignition', slate: 'National Ignition Facility · LLNL', from: '#16324a', to: '#04080f' },
  { ghost: 'Notre-Dame', slate: 'Spire restored, 2024 · licensed', from: '#3d3a44', to: '#0d0c11' },
  { ghost: 'The Herd', slate: 'Black Angus on horseback · original shoot', from: '#3a2a1c', to: '#0c0906' },
  { ghost: 'The Builders', slate: 'ACU students and Builder Scholars · original', from: '#24324d', to: '#0a0f1a' },
  { ghost: 'Earthrise', slate: 'Apollo 8, 1968 · NASA · public domain', from: '#0f1d36', to: '#000000' },
]

export const FILM_LENGTH = 164

export const FILM: Shot[] = [
  { at: 0, ghost: '', slate: 'Black · countdown audio · NASA', from: '#000', to: '#000' },
  { at: 4, ghost: 'Saturn V', slate: 'Apollo 11 launch, 1969 · NASA · public domain', from: '#3b2a1a', to: '#0b0f18', quote: 'We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard.', speaker: 'John F. Kennedy · Rice University · 1962' },
  { at: 16, ghost: 'Rice Stadium', slate: 'JFK at Rice, 1962 · NASA / JFK Library', from: '#4a4332', to: '#121008' },
  { at: 20, ghost: 'Kitty Hawk', slate: 'Wright Flyer, 1903 · Library of Congress', from: '#5d5a50', to: '#1c1b18', super: '1903' },
  { at: 24, ghost: 'Promontory', slate: 'Golden spike, 1869 · A. J. Russell · public domain', from: '#51432f', to: '#15110b', super: '1869' },
  { at: 27, ghost: 'Hoover Dam', slate: 'Construction, 1934 · Bureau of Reclamation', from: '#4b3d2c', to: '#14110d', super: '1936' },
  { at: 30, ghost: 'Highland Park', slate: 'Moving assembly line, 1913 · Ford archives (licensed)', from: '#3c3c3c', to: '#0f0f0f', super: '1913' },
  { at: 34, ghost: '', slate: 'Golden Gate Bridge · public domain', from: '#5a2a1e', to: '#120806', super: 'We built this.' },
  { at: 40, ghost: 'Normandy', slate: 'D-Day landings · U.S. Army Signal Corps · National Archives', from: '#3a3d38', to: '#0c0d0c', quote: 'You are about to embark upon the Great Crusade, toward which we have striven these many months. The eyes of the world are upon you.', speaker: 'Dwight D. Eisenhower · Order of the Day · June 6, 1944' },
  { at: 52, ghost: 'Earthrise', slate: 'Apollo 8, 1968 · NASA · public domain', from: '#0f1d36', to: '#000', quote: 'In the beginning God created the heaven and the earth.', speaker: 'Apollo 8 crew · Christmas Eve, 1968' },
  { at: 62, ghost: 'Tranquility', slate: 'Apollo 11 first step · NASA · public domain', from: '#2a2a2a', to: '#000', quote: 'That’s one small step for man, one giant leap for mankind.', speaker: 'Neil Armstrong · July 20, 1969' },
  { at: 70, ghost: 'Brandenburg', slate: 'Reagan at the Brandenburg Gate · Reagan Library', from: '#4a3b2a', to: '#120e09', quote: 'Mr. Gorbachev, tear down this wall!', speaker: 'Ronald Reagan · Berlin · 1987' },
  { at: 76, ghost: '1989', slate: 'The Wall falls · licensed news footage', from: '#2e3442', to: '#0a0c10', super: '1989' },
  { at: 84, ghost: '', slate: 'Black', from: '#000', to: '#000', super: 'Every generation inherits the West.' },
  { at: 89, ghost: '', slate: 'Black', from: '#000', to: '#000', super: 'Some add to it.' },
  { at: 94, ghost: 'Inauguration', slate: 'JFK inaugural, 1961 · public domain', from: '#3d3d46', to: '#0d0d10', quote: 'And so, my fellow Americans: ask not what your country can do for you — ask what you can do for your country.', speaker: 'John F. Kennedy · Inaugural Address · 1961' },
  { at: 104, ghost: 'Falcon 9', slate: 'Booster landing · SpaceX (permission)', from: '#1b2a44', to: '#05070c', quote: 'We’re too great a nation to limit ourselves to small dreams.', speaker: 'Ronald Reagan · First Inaugural Address · 1981' },
  { at: 110, ghost: 'Starship', slate: 'Booster catch, 2024 · SpaceX (permission)', from: '#2b3440', to: '#06080b' },
  { at: 114, ghost: 'Autonomy', slate: 'Anduril systems · Anduril (permission)', from: '#26302a', to: '#070908', quote: 'We’re not, as some would have us believe, doomed to an inevitable decline.', speaker: 'Ronald Reagan · 1981' },
  { at: 120, ghost: 'Ignition', slate: 'Fusion ignition, 2022 · Lawrence Livermore National Laboratory', from: '#16324a', to: '#04080f', super: '2022' },
  { at: 124, ghost: 'Collider', slate: 'Large Hadron Collider · CERN (CC BY)', from: '#26203f', to: '#08070f' },
  { at: 128, ghost: 'The Line', slate: 'Robotic auto plant · licensed stock', from: '#333a44', to: '#0b0d10' },
  { at: 132, ghost: 'Notre-Dame', slate: 'Reopened, 2024 · licensed', from: '#3d3a44', to: '#0d0c11', super: '2024. Rebuilt.' },
  { at: 137, ghost: 'Harvest', slate: 'Combines and the herd · original shoot', from: '#7a5a24', to: '#1d1508', quote: 'And after all, why shouldn’t we believe that? We are Americans.', speaker: 'Ronald Reagan · 1981' },
  { at: 143, ghost: 'Symphony', slate: 'Orchestra · original shoot', from: '#3a2418', to: '#0b0705' },
  { at: 147, ghost: 'The Builders', slate: 'ACU students, Builder Scholars, Gloo Hackathon · original', from: '#24324d', to: '#0a0f1a', super: 'They’re sixteen. Eighteen. Twenty-one.' },
  { at: 153, ghost: 'The Arena', slate: 'Students at work · original', from: '#1f2a40', to: '#070a12', super: 'The credit belongs to the man who is actually in the arena.', superNote: 'Theodore Roosevelt · 1910' },
  { at: 159, ghost: '', slate: 'Black', from: '#000', to: '#000', super: 'It’s our turn.' },
  { at: 162, ghost: 'West', slate: 'End card', from: '#0B1220', to: '#000', super: 'Build the West.', superNote: 'west.ventures' },
]
