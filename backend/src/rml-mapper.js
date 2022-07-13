import RMLMapper from "@rmlio/rmlmapper-java-wrapper";
import fs from "fs/promises";

const wrapper = new RMLMapper("./rmlmapper.jar", "./tmp", true);
const rml = await fs.readFile("mappings/map3.ttl", "utf-8");


export async function convertData(weatherJson) {

    const sources = {
        "data.json": JSON.stringify(weatherJson),
    };

    return await wrapper.execute(rml, {
        sources,
        generateMetadata: false,
        serialization: "jsonld",
    });
}