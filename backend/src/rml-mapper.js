import RMLMapper from "@rmlio/rmlmapper-java-wrapper";
import fs from "fs/promises";

const rml = await fs.readFile("../mappings/black.ttl", "utf-8");
const wrapper = new RMLMapper("./rmlmapper-5.0.0-r362-all.jar", "./tmp", true);

export async function convertData(weatherJson) {

    const sources = {
        "weather.json": weatherJson,
    };

    return await wrapper.execute(rml, {
        sources,
        generateMetadata: false,
        serialization: "jsonld",
    });
}