| | |
| --- | :---: |
| Notes by | Abel de Bruijn |

# First meeting notes with client
- End-user is general public
- Show how the power over your own data would be beneficial

- Target is desktop (mobile is not the priority)

## Public with private data
- https://lod-cloud.net/
- Ben suggests: a run [at current location known by pod] before it will rain (or other weather)
   - Location can be mocked

## Any hard requirements
- Solid logo is purple: https://solidproject.org/logo-usage-guidelines
- No further hard requirements

## Testing
- The application is quite broad
- So anyone can test

## Ben’s ideas on our first proof of concept
- Mock data
    - Ben thinks that it would be a good idea
    - But would like to see maybe a little more
- Strava has runs, pod has location, public data has weather to see how long the run will take
- Focus should be solid:
    - Communica is the easiest way to query the solid data


## What would be the preference
- What we do with the data is more important than the data itself
- 
- Would ben prefer to go deeper or broader
    - Broader is better then deeper

# How to use Solid and Linked Data
> Will take approximate 1-3 day workshop
 
- JSON-LD is used as a text format for data [Use-full for mocking data]
- TURTLE  is used as a text format for data

- RDF js is to use data within javascript
- RML.io is used for scraping JSON -> JSON-LD [Will only be useful when using real world data]
- Using content negotiation 
    - Client will ask for JSON-LD, server has TURTLE and transform it to JSON-LD
- Query with sparQL is a Quering language somewhat related to a SQL query
- Data validation is not really needed for now, because we create the data ourself

# Other links and resources
- Hands on excercises |  https://github.com/KNowledgeOnWebScale/solid-linked-data-workshops-hands-on-exercises
- Solid pod command line tools | https://github.com/MellonScholarlyCommunication/css-suite