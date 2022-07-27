---
title: Docs docs
parent: Docs
nav_order: 5
---

# Documentation documentation
Meta.

## Run locally

Requirements:
- [Ruby](https://rubyinstaller.org/downloads/)
- [Bundler](https://bundler.io/) - `gem install bundler`

{% 
include clone.md 
relpath="docs/"
commands=
"bundle install
bundle update github-pages
bundle exec jekyll serve"      
%}

## Important docs/ files that aren't straight up documentation
- {% include rl.md base="docs/" relpath="404.html" %} page displayed in the docs when no result is found.
- *[app/](https://github.com/osoc22/project-idlab/tree/gh-pages/docs/app) only available on the gh-pages branch. static build of the Svelte frontend, built through GitHub Actions in {% include rl.md base=".github/workflows/" relpath="svelte-to-gh-pages.yml" %}.*
- {% include rl.md base="docs/" relpath="assets" %} stores files like the crest svg, icons...
- {% include rl.md base="docs/" relpath="_config.yml" %} is used to configure Jekyll.
  - For _config.yml, [Just The Docs has multiple configuration options](https://just-the-docs.github.io/just-the-docs/docs/configuration/)
- {% include rl.md base="docs/" relpath=".gitignore" %} gitignore provided with Jekyll/GitHub Pages repo.
- {% include rl.md base="docs/" relpath="_includes/" %} contains excerpts & templates used in multiple pages
  - {% include rl.md base="docs/_includes/" relpath="clone.md" %} is a bash codeblock with a link to the repo, a `cd` command into the correct sub-part of the project, and then commands as defined in the include
  - {% include rl.md base="docs/_includes/" relpath="repo-page-content.md" %} is the content of the [repo page](repo-no-content) page
  - {% include rl.md base="docs/_includes/" relpath="rl.md" %} creates a clean markdown link to the repo. Lower upkeep in case of repo changes, yay.
  - {% include rl.md base="docs/_includes/" relpath="spts_setup.md" %} holds instructions to set up solidpod-testserver! These get re-used through multiple different pages.
- {% include rl.md base="docs/" relpath="_sass/custom/custom.scss" %} is a scss file that gets applied to every page, currently used to scale images.
- *_site/ build artifacts from jekyll serve*
- {% include rl.md base="docs/" relpath="Gemfile" %} (& {% include rl.md base="docs/" relpath="Gemfile.lock" %}) Gemfile used when building the jekyll/github pages site locally.
