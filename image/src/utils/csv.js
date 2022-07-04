const fetch = require('node-fetch')
const { FILENAME, DELIMITER, LIMIT_TYPE, LIMIT_SIZE, EGRESS_URL, INCLUDE_TIMESTAMP } = require('../config/config')
const fs = require('fs')
const { isValidURL } = require('./util')

const processPayload = async json => {
  const data = json.data !== undefined ? json.data : json
  if (fs.existsSync(FILENAME)) {
    if (checkLimits()) await upload()
    await writeData(data, true)
  } else {
    await writeData(data, false)
  }
  if (checkLimits()) await upload()
}

const checkLimits = () => {
  if (fs.existsSync(FILENAME)) {
    const stats = fs.statSync(FILENAME)
    const size = stats.size
    const fileData = fs.readFileSync(FILENAME)
    const lines = fileData.toString().split('\n').length
    if ((LIMIT_TYPE === 'size' && size > LIMIT_SIZE) || (LIMIT_TYPE === 'rows' && lines > LIMIT_SIZE)) return true
    else return false
  }
  return false
}
const writeData = async (data, append) => {
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
  const logger = fs.createWriteStream(FILENAME, {
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

const upload = async () => {
  const readStream = fs.createReadStream(FILENAME)
  const stats = fs.statSync(FILENAME)
  const size = stats.size
  if (isValidURL(EGRESS_URL)) {
    const res = await fetch(EGRESS_URL, {
      method: 'POST',
      headers: {
        'Content-length': size,
      },
      body: readStream,
    })
    if (res.ok) {
      console.log('File uploaded successfully.')
      // delete file after upload is done
      fs.unlinkSync(FILENAME)
    } else {
      console.log('Failed uploading the file.')
    }
  } else {
    console.log('EGRESS URL not specified.')
  }
}

module.exports = {
  processPayload,
}
