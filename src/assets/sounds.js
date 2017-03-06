import kick from './sounds/kick.wav'
import snare from './sounds/snare.wav'
import hihat from './sounds/hihat.wav'
const percussion =
[
  {name: 'kick', sound: kick, trigger: 65},
  {name: 'snare', sound: snare, trigger: 83},
  {name: 'hihat', sound: hihat, trigger: 68}
]

import bass1 from './sounds/bass1.wav'
import bass2 from './sounds/bass2.wav'
import bass3 from './sounds/bass3.wav'
const bass =
[
  {name: 'bass1', sound: bass1, trigger: 74},
  {name: 'bass2', sound: bass2, trigger: 75},
  {name: 'bass3', sound: bass3, trigger: 76}
]

export default {percussion, bass}