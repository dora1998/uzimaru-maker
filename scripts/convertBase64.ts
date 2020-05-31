export default undefined
const fs = require('fs')

fs.readFile(process.argv[2], 'base64', function (err, data) {
  if (err) throw err
  fs.writeFileSync(process.argv[3], `export default '${data}'`)
})
