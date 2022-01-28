import * as fs from "fs"

let config = fs.readFileSync("~/util/data/discord.private.json")
let firebase = fs.readFileSync("~/util/data/firebase.private.json")
let privateKey = fs.readFileSync("~/util/data/privateKey.private.json")

export { config, firebase, privateKey }