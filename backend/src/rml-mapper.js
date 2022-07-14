// Import RML-wrapper
import RMLMapper from "@rmlio/rmlmapper-java-wrapper";
import fs from "fs/promises";

// We assume the latest version of rmlmmaper jar file is downloaded and available.
const wrapper = new RMLMapper("./rmlmapper.jar", "./tmp", true);

// Load the RML configuration file (in turtle format)
const rml = await fs.readFile("mappings/map3.ttl", "utf-8");


export async function convertData(weatherJson) {

    // JSON data to be converted
    const sources = {
        "data.json": JSON.stringify(weatherJson),
    };

    // Returns the JSON-lD representation of the data
    return await wrapper.execute(rml, {
        sources,
        generateMetadata: false,
        serialization: "jsonld",
    });
}