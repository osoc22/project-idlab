import fs from "fs/promises";
import RMLMapper from "@rmlio/rmlmapper-java-wrapper";

async function run() {
  const rml = await fs.readFile("./example/map.ttl", "utf-8");

  const sources = {
    "data.json": await fs.readFile("./example/data.json", "utf-8"),
  };

  const wrapper = new RMLMapper("./rmlmapper-5.0.0-r362-all.jar", "./tmp", true);
  const result = await wrapper.execute(rml, {
    sources,
    generateMetadata: false,
    serialization: "jsonld",
  });

  console.log({ result });
}

run();
