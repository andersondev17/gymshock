require('dotenv').config();
const fs = require('fs');
const path = require('path');
const dbConnect = require('../src/database/dbconnect');
const Exercise = require('../src/models/Exercise');

const importData = async () => {
    try {
        await dbConnect();
        const count = await Exercise.countDocuments();
        if (count > 0) {
            console.log(`Ya existen ${count} ejercicios. Usa --force para reemplazar.`);
            if (!process.argv.includes('--force')) return process.exit(0);

            await Exercise.deleteMany({});
            console.log('Base de datos limpiada.');
        }

        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        const sourcePath = path.join(__dirname, '../data/paste.txt');
        if (fs.existsSync(sourcePath)) {
            const content = fs.readFileSync(sourcePath, 'utf8');

            let jsonStr = content.trim();
            if (jsonStr.endsWith(',')) {
                jsonStr = jsonStr.slice(0, -1);
            }
            if (!jsonStr.startsWith('[')) {
                jsonStr = '[' + jsonStr;
            }
            if (!jsonStr.endsWith(']')) {
                jsonStr = jsonStr + ']';
            }

            const exercises = JSON.parse(jsonStr);
            console.log(`Importando ${exercises.length} ejercicios...`);

            await Exercise.insertMany(exercises);
            console.log('Datos importados exitosamente.');
        } else {
            console.log('Archivo paste.txt no encontrado. Crea este archivo con tus datos JSON.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error al importar datos:', error);
        process.exit(1);
    }
};

importData();