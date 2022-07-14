---
title: Docs docs
parent: Docs
nav_order: 5
---

# Documentation documentation
Meta.

## Run locally
{% 
include clone.md 
relpath="docs/"
commands=
"bundle install
bundle update github-pages
bundle exec jekyll serve"      
%}

## Important files
- _config.yml is used to configure Jekyll
- For _config.yml, [Just The Docs has multiple configuration options](https://just-the-docs.github.io/just-the-docs/docs/configuration/)
- _sass/ 
- _includes/ contains excerpts used in multiple pages
  - 