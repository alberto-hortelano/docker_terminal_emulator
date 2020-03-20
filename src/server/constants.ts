const mongoPort = parseInt(process.env.MONGOPORT) || 27017;
const mongoUrl = process.env.MONGOURL || 'mongo';
export const mongoURI = `mongodb://${mongoUrl}:${mongoPort}/terminal_emulator`;
console.log("log: mongoURI", mongoURI);