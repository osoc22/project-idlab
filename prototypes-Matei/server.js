const jsonld = require('jsonld');

// JSON-LD mapping of a Person entity as shown in the exercise 1.1 from tutorial:
// https://github.com/KNowledgeOnWebScale/solid-linked-data-workshops-hands-on-exercises/blob/main/exercise-1-1.md
let jsonData = {
    "@context": "http://schema.org/",
    "@type": "Person",
    "@id": "https://new-u.tech/gwen/#me",
    "first_name": "Gwendolyne",
    "last_name": "Stacy",
    "nickname": "Gwen",
    "website": "https://new-u.tech/gwen",
    "email": "gwen@new-u.tech",
    "profile_picture": "https://static.wikia.nocookie.net/marveldatabase/images/e/e7/Symbiote_Spider-Man_Vol_1_1_Artgerm_Virgin_Variant.jpg/revision/latest/scale-to-width-down/856?cb=20190125221031",
    "member_of": [
        {
            "@type": "Organization",
            "name": "New U Technologies",
            "Website": "https://new-u.tech"
        }
    ]
}

// console.log(jsonData["member_of"])

// Converts JSON-LD to RDF
async function convertToRDF() {

    const nquads = await jsonld().toRDF(jsonData,{format: 'application/n-quads'})

    console.log(nquads)
}

// Example of framing a JSON-LD document
async function frameDocument() {

    const framed = await jsonld().frame(jsonData, {
        "@context": "http://schema.org/",
        "member_of": {
            "name": "New U Technologie"
        }
    })


    console.log(framed)
}

// Not ideal, but purely for testing
//convertToRDF()
frameDocument()


