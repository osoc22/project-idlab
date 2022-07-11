import fs from "fs/promises";
import RMLMapper from "@rmlio/rmlmapper-java-wrapper";

async function run() {
  const rml = await fs.readFile("./example/mapping.ttl", "utf-8");

  const sources = {
    "student.csv": await fs.readFile("./example/student.csv", "utf-8"),
  };

  const wrapper = new RMLMapper("./rmlmapper.jar", "./tmp", true);
  const result = await wrapper.execute(rml, {
    sources,
    generateMetadata: false,
    serialization: "turtle",
  });

  console.log({ result });
}

run();
