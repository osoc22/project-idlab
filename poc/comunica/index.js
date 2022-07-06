const { QueryEngine } = require('@comunica/query-sparql');

(async function () {
  const myEngine = new QueryEngine();
  const bindingsStream = await myEngine.queryBindings(
    `
  SELECT ?s ?p ?o WHERE {
      ?s ?p ?o.
      ?s <http://www.wikidata.org/prop/direct/P802> ?o.
  } LIMIT 100`,
    {
      sources: ['http://www.wikidata.org/entity/Q51730'],
    }
  );

  bindingsStream.on('data', (binding) => {
    console.log(binding.toString()); // Quick way to print bindings for testing

    console.log(binding.has('s')); // Will be true

    // Obtaining values
    console.log(binding.get('s').value);
    console.log(binding.get('s').termType);
    console.log(binding.get('p').value);
    console.log(binding.get('o').value);
    console.log('');
  });

  const binding = await bindingsStream.toArray();
  console.log(binding.length);
  console.log(binding[0]);
})();
