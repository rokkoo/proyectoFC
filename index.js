'use strict'
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const _ = require('lodash');
//const request = require('request');
//const argv = require('yargs').argv;
//const direccion = argv.direccion;

app.get('/:raza', (req, res) => {
    var razas = [
        { id: "0", ingles: "affenpinscher", castellano: "Affenpinscher", regionOrigen: "Alemania", dimensiones: "24 – 28 cm", tamaño: "Pequeño – Medio", peso: "3 – 4 kg", caracter: "Extravagante y reservado.", descripcion: "Es una raza de perro de la familia de los pinschers de constitución pequeña y robusta, criada desde el siglo XVII. Su pelaje es erizado, comúnmente negro y corto, lo que le da una apariencia simiesca, de allí el nombre de la raza." },
        { id: "1", ingles: "african", castellano: "Lycaon pictus", regionOrigen: "Africa", dimensiones: "75 – 80 cm", tamaño: "Grande", peso: "18 y 34 kg", caracter: "Salvaje", descripcion: "Es una especie de mamífero carnívoro de la familia Canidae. También es conocido vulgarmente como perro salvaje africano, lobo pintado, perro hiena o perro cazador de El Cabo."  },
        { id: "2", ingles: "airedale", castellano: "Airedale terrier", regionOrigen: "Inglaterra", dimensiones: "59 y 61 cm", tamaño: "Medio", peso: "25 kg", caracter: "Inteligente, Fiel, Tranquilo", descripcion: "Un incondicional compañero que disfruta de pasear y responde al entrenamiento básico de órdenes simples sin ningún problema."  },
        { id: "3", ingles: "akita", castellano: "Akita Inu", regionOrigen: "Japón", dimensiones: "Machos: 67 cm, hembras: 61 cm", tamaño: "Grande", peso: "Machos: 34 a 53 kg, hembras: 30 a 49 kg", caracter: "Temperamento calmado, fiel, dominante y receptivo.", descripcion: "Es una raza canina originaria de Japón, llamado así por la prefectura de Akita. Al inicio fue un perro de caza mayor y durante generaciones fue usado por los guerreros del Japón como perro de defensa y ataque, y también para cazar osos."  },
        { id: "4", ingles: "appenzeller", castellano: "Boyero de Appenzell", regionOrigen: "Suiza", dimensiones: "Machos: 52 a 58 cm, hembras: 48 a 54 cm", tamaño: "Medio", peso: "20 kg", caracter: "Equilibrado, tranquilo, amable, valiente, inteligente y muy vivaz.", descripcion: "Descienden de un antiguo perro de origen asiático conocido como Dogo del Tíbet. Se cree que los navegantes griegos y fenicios trajeron estos perros al mediterráneo, donde se empezaron a usar como perros de guerra. Los romanos, aparte de emplearlos en la batalla, también los utilizaron como guías de rebaños."  },
        { id: "5", ingles: "basenji", castellano: "Basenji", regionOrigen: "República Democrática del Congo", dimensiones: "Machos: 43 cm, hembras: 40 cm", tamaño: "Medio", peso: "De 8 a 10 Kg", caracter: "Espíritu intranquilo y juguetón", descripcion: "Es una raza primitiva empleada para la caza y el rastreo. Tienen la característica única de no ladrar, y en su lugar emiten un curioso sonido al estilo del Canto tirolés."  },
        
        { id: "6", ingles: "beagle", castellano: "Beagle", regionOrigen: "Reino Unido", dimensiones: "Machos: 33 a 41 cm, hembras: 48 a 54 c", tamaño: "Pequeño – Medio", peso: "8 – 16 kg", caracter: "Apacible, Alegre, Disfrutan de la compañía", descripcion: "Los orígenes de esta raza no están muy claros, pero perros de la talla y características similares al beagle moderno se remontan hasta la Antigua Grecia."  },
        { id: "7", ingles: "bluetick", castellano: "Bluetick coonhound", regionOrigen: "Estados Unidos", dimensiones: "Machos: 56-69 cm, hembras: 53-64 cm", tamaño: "Grande", peso: "Hembra: 20–29 kg, Macho: 25–36 kg", caracter: "Inteligente, juguetón y activo, hasta la edad adulta, protector", descripcion: "Son atléticos, fuertes y necesitan actividad diaria como correr o cazar para mantenerse felices."  },
        { id: "8", ingles: "borzoi", castellano: "Borzoi", regionOrigen: "Rusia", dimensiones: " Machos de 70 a 82 cm, la de las hembras es más pequeña en aproximadamente 5 cm", tamaño: "Grande", peso: " desde 25 hasta 48 kg", caracter: "Carácter", descripcion: "Borzoi es una raza de perro desarrollada en Rusia. El Borzoi desciende del galgo árabe, siendo parecido a un perro ovejero ruso. Anteriormente conocido como galgo ruso, fue originalmente criado para cazar lobos y liebres."  },
        { id: "9", ingles: "bouvier", castellano: "Boyero de Flandes", regionOrigen: "Bélgica", dimensiones: "60 y 69 cm", tamaño: "Grande", peso: "36 – 45 kg", caracter: "temperamento estable; nunca tímido pero tampoco agresivo. Como perro pastor y de vigilancia, puede ser desconfiado y protector con su familia o rebaño.", descripcion: "Tradicionalmente usado como perro pastor de ganado bovino y como perro guardián. Es un perro de tamaño grande y con el cuerpo cubierto de una abundante capa de pelo largo."  },
        { id: "10", ingles: "boxer", castellano: "Bóxer", regionOrigen: "Alemania", dimensiones: "Macho: 57-63 cm, Hembra: 53-59", tamaño: "Medio", peso: "Macho: 30kg, Hembra: 25kg", caracter: "Inteligente, juguetón y activo, hasta la edad adulta, protector.", descripcion: "es una raza canina alemana de trabajo y compañía, tipo moloso, que tiende a un tamaño mediano. Su particular conformación hace que sea un perro que no siempre puede ladrar, salvo cuando la ocasión lo amerita o en estado de excitación."  },
        
        { id: "11", ingles: "brabancon", castellano: "nombe" },
        { id: "12", ingles: "briard", castellano: "nombe" },
        { id: "13", ingles: "bulldog", castellano: "nombe" },
        { id: "14", ingles: "bullterrier", castellano: "nombe" },
        { id: "15", ingles: "cairn", castellano: "nombe" },
        { id: "16", ingles: "chihuahua", castellano: "nombe" },
        { id: "17", ingles: "chow", castellano: "nombe" },
        { id: "18", ingles: "clumber", castellano: "nombe" },
        { id: "19", ingles: "collie", castellano: "nombe" },
        { id: "20", ingles: "coonhound", castellano: "nombe" },
        { id: "21", ingles: "corgi", castellano: "nombe" },
        { id: "22", ingles: "dachshund", castellano: "nombe" },
        { id: "23", ingles: "dane", castellano: "nombe" },
        { id: "24", ingles: "deerhound", castellano: "nombe" },
        { id: "25", ingles: "dhole", castellano: "nombe" },
        { id: "26", ingles: "dingo", castellano: "nombe" },
        { id: "27", ingles: "doberman", castellano: "nombe" },
        { id: "28", ingles: "elkhound", castellano: "nombe" },
        { id: "29", ingles: "entlebucher", castellano: "nombe" },
        { id: "30", ingles: "eskimo", castellano: "nombe" },
        { id: "31", ingles: "germanshepherd", castellano: "nombe" },
        { id: "32", ingles: "greyhound", castellano: "nombe" },
        { id: "33", ingles: "groenendael", castellano: "nombe" },
        { id: "34", ingles: "hound", castellano: "nombe" },
        { id: "35", ingles: "husky", castellano: "nombe" },
        { id: "36", ingles: "keeshond", castellano: "nombe" },
        { id: "37", ingles: "kelpie", castellano: "nombe" },
        { id: "38", ingles: "komondor", castellano: "nombe" },
        { id: "39", ingles: "kuvasz", castellano: "nombe" },
        { id: "40", ingles: "labrador", castellano: "nombe" },
        { id: "41", ingles: "leonberg", castellano: "nombe" },
        { id: "42", ingles: "lhasa", castellano: "nombe" },
        { id: "43", ingles: "malamute", castellano: "nombe" },
        { id: "44", ingles: "malinois", castellano: "nombe" },
        { id: "45", ingles: "maltese", castellano: "nombe" },
        { id: "46", ingles: "mastiff", castellano: "nombe" },
        { id: "47", ingles: "mexicanhairless", castellano: "nombe" },
        { id: "48", ingles: "mountain", castellano: "nombe" },
        { id: "49", ingles: "newfoundland", castellano: "nombe" },
        { id: "50", ingles: "otterhound", castellano: "nombe" },
        { id: "51", ingles: "papillon", castellano: "nombe" },
        { id: "52", ingles: "pekinese", castellano: "nombe" },
        { id: "53", ingles: "pembroke", castellano: "nombe" },
        { id: "54", ingles: "pinscher", castellano: "nombe" },
        { id: "55", ingles: "pointer", castellano: "nombe" },
        { id: "56", ingles: "pomeranian", castellano: "nombe" },
        { id: "57", ingles: "poodle", castellano: "nombe" },
        { id: "58", ingles: "pug", castellano: "nombe" },
        { id: "59", ingles: "pyrenees", castellano: "nombe" },
        { id: "60", ingles: "redbone", castellano: "nombe" },
        { id: "61", ingles: "retriever", castellano: "nombe" },
        { id: "62", ingles: "ridgeback", castellano: "nombe" },
        { id: "63", ingles: "rottweiler", castellano: "nombe" },
        { id: "64", ingles: "saluki", castellano: "nombe" },
        { id: "65", ingles: "samoyed", castellano: "nombe" },
        { id: "66", ingles: "schipperke", castellano: "nombe" },
        { id: "67", ingles: "schnauzer", castellano: "nombe" },
        { id: "68", ingles: "setter", castellano: "nombe" },
        { id: "69", ingles: "sheepdog", castellano: "nombe" },
        { id: "70", ingles: "shiba", castellano: "nombe" },
        { id: "71", ingles: "shihtzu", castellano: "nombe" },
        { id: "72", ingles: "spaniel", castellano: "nombe" },
        { id: "73", ingles: "springer", castellano: "nombe" },
        { id: "74", ingles: "stbernard", castellano: "nombe" },
        { id: "75", ingles: "terrier", castellano: "nombe" },
        { id: "76", ingles: "vizsla", castellano: "nombe" },
        { id: "77", ingles: "weimaraner", castellano: "nombe" },
        { id: "78", ingles: "whippet", castellano: "nombe" },
        { id: "79", ingles: "wolfhound", castellano: "nombe" },
    ]


    //con "req.params.raza" coge el parámetro que se mana por la url por ejemplo: localhost:3000/pastorAleman, devuelve "pastorAleman"
    //"_.find" busca en el array razas el json que tenga el nombre que le indicas, por ejemplo Pasotor Aleman, y te devuelve el json con todos los datos
    foto(req.params.raza)
        .then((resp) => {
            //String
            var perros = { 
                raza: req.params.raza,
                foto: resp.message,
                regionOrigen: _.find(razas, {ingles: req.params.raza}).regionOrigen,
                dimensiones: _.find(razas, {ingles: req.params.raza}).dimensiones,
                tamaño: _.find(razas, {ingles: req.params.raza}).tamaño,
                peso: _.find(razas, {ingles: req.params.raza}).peso,
                caracter: _.find(razas, {ingles: req.params.raza}).caracter,
                descripcion: _.find(razas, {ingles: req.params.raza}).descripcion 
            };
            res.send(perros);
        });

    //Esta función devuelve una foto aleatoria
    async function foto(raza) {
        let url = "https://dog.ceo/api/breed/" + raza + "/images/random";
        var jRandom = await fetch(url);
        var json = await jRandom.json();
        return json;
    }
})
app.listen('3008');