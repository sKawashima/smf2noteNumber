const midiFileParser = require('midi-file-parser')
const argv = require('argv');

const getNoteNumber = (fileName) => {
  let r = ''
  const file = require('fs').readFileSync(fileName, 'binary')
  const midi = midiFileParser(file) // load smf file

  midi['tracks'][0].forEach((note, i) => {
    if (note['noteNumber'] !== undefined && note['subtype'] === 'noteOn') {
      if (r !== '') {
        r += ', '
      }
      r += String(note['noteNumber'])
    }
  })
  console.log(r)
}

argv.run().targets.forEach((filePath) => {
  getNoteNumber(filePath)
})
