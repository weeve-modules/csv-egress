const { FILENAME, DELIMITER, SPLIT_TYPE, SPLIT_SIZE, INCLUDE_TIMESTAMP } = require('../config/config')
const fs = require('fs')

const DIRECTORY = 'csv-export'
const EXTENSION = '.csv'
const BUFFER_FILENAME = `${DIRECTORY}/${FILENAME}${EXTENSION}`

const processPayload = async json => {
  const data = json.data !== undefined ? json.data : json
  if (fs.existsSync(BUFFER_FILENAME)) {
    if (checkLimits()) {
      swap()
      await writeData(data, false)
    } else {
      await writeData(data, true)
    }
  } else {
    await writeData(data, false)
  }
  if (checkLimits()) swap()
}

const checkLimits = () => {
  if (fs.existsSync(BUFFER_FILENAME)) {
    const stats = fs.statSync(BUFFER_FILENAME)
    const size = stats.size
    const fileData = fs.readFileSync(BUFFER_FILENAME)
    const lines = fileData.toString().split('\n').length
    if ((SPLIT_TYPE === 'size' && size > SPLIT_SIZE) || (SPLIT_TYPE === 'rows' && lines > SPLIT_SIZE)) return true
    else return false
  }
  return false
}
const writeData = async (data, append) => {
  if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY)
  }
  const timestamp = Date.now()
  let d = ','
  switch (DELIMITER) {
    case 'comma':
      d = ','
      break
    case 'tab':
      d = '\t'
      break
    case 'semicolon':
      d = ';'
      break
  }
  const logger = fs.createWriteStream(BUFFER_FILENAME, {
    flags: 'a',
  })
  const writeLine = line => logger.write(`${line}\n`)
  const keys = Object.keys(data[0])
  let l = ''
  if (!keys.includes('timestamp')) l = `timestamp${d}`
  if (!append) {
    for (let i = 0; i < keys.length; i++) {
      l += `${keys[i]}${d}`
    }
    writeLine(l)
  }
  l = ''
  for (let i = 0; i < data.length; i++) {
    if (INCLUDE_TIMESTAMP && !keys.includes('timestamp')) l += `${timestamp}${d}`
    for (let k = 0; k < keys.length; k++) l += `${data[i][keys[k]]}${d}`
    writeLine(l)
    l = ''
  }
  logger.end()
}

const swap = () => {
  fs.renameSync(`${BUFFER_FILENAME}`, `${DIRECTORY}/${FILENAME}_${Date.now()}${EXTENSION}`)
}

module.exports = {
  processPayload,
}
