---
title: Tower documentation
description: An introduction to the MkDocs Tower documentation project
---

The [Tower docs](https://help.tower.nf) site is built on a [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) project in the [nf-tower-docs](https://github.com/seqeralabs/nf-tower-docs) GitHub repository. nf-tower-docs is a public repository that houses the publishing mechanism and plugins to build the site, and allows external documentation users to submit documentation issues and enhancement requests. 

The source of truth for the Markdown files that form the documentation is the [docs folder](https://github.com/seqeralabs/nf-tower-cloud/tree/master/docs) of the nf-tower-cloud repo. This is a private repo that contains the source code of the Tower application. While the Tower docs were originally entirely in the nf-tower-docs repo, we moved the `.md` content and `mkdocs.yml` configuration file to the nf-tower-cloud repo to maintain the documentation close to the source code of the application. This encourages engineers and other internal stakeholders to contribute to the documentation during the Tower feature building process. 

While we track [issues](https://github.com/seqeralabs/nf-tower-docs/issues) on the nf-tower-docs repo to evaluate fixes and improvements needed on the docs site, all content contributions must be made on a feature branch in the docs folder on nf-tower-cloud. Pull requests raised for files in the docs folder are reviewed by a member of the `tower-docs-codeowners` team and an engineer or other SME closely related to the feature being documented. 

When documentation PRs are reviewed and merged to the master branch on nf-tower-cloud, a [GitHub workflow](https://github.com/seqeralabs/nf-tower-cloud/blob/master/.github/workflows/docs_deploy.yml) copies the docs folder to the master branch of the nf-tower-docs repo so that contant updates can be published manually from there. 

Once the latest from nf-tower-cloud has been merged to master and the docs-deploy workflow has successfully copied the content across to nf-tower-docs, we can publish new content to the staging URL for final sanity checks before publishing to the master site. 

The site theme currently uses [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and Material-insiders. 

The Tower documentation project relies on a number of MkDocs plugins (source: [docs README](https://github.com/seqeralabs/nf-tower-cloud/blob/master/docs/README.md)):

- [mkdocs-table-reader-plugin](https://timvink.github.io/mkdocs-table-reader-plugin/)
    - Insert tables (CSV, YML, etc.) directly into markdown pages using a tag.
    - How it's implemented:
        1. Activate as a `plugins` entry in `mkdocs.yml` (below `social` and `search`, but above other mkdocs plugins)
        2. Create an external yaml file in a `tables` folder within the content subfolder (e.g., `docs/enterprise/configuration/tables/compute_env.yml`)
        3. Add key-value pairs in groups, where each key represents a column name, and each value represents an entry in a row, e.g.:
        ```yaml
        -
        Environment variable:            "`TOWER_DB_USER`"
        Description: >
            The user account to access your database.<br/>
            Create this user manually if using an external database.
        Value:                "e.g., `db_user`"
        -
        Environment variable:            "`TOWER_DB_PASSWORD`"
        Description: >
            The user password to access your database.<br/>
            Create this password manually if using an external database.
        Value:
        -
        ```
        4. Each unique column name will be rendered in the table, so ensure that all row entries have the same column name keys. The example above shows the structure for two row entries in a table with three columns.
        5. Reference this table in other markdown files with `{{ read_yaml('./tables/compute_env.yml')}}` (relevant path to the table from the markdown file where it is being referenced).

- [mkdocs-markdownextradata-plugin](https://github.com/rosscdh/mkdocs-markdownextradata-plugin)
    - Implement DRY-like variables for content which appears throughout the site. ( _Example: The latest Tower Enterprise container names._ )
    - How it's implemented:
        1. Activate as a `plugins` entry in `mkdocs.yml`
        2. Create an external yaml file in `/docs/_data/` ( _e.g. `my_dry_vars`_ )
        3. Add key-value pairs to the external file ( _e.g. `tower_fe_image: "cr.seqera.io/private/nf-tower-enterprise/frontend:v23.1.3"`_ ).
        4. Update the `plugins` entry with a path to the file:
            ```yaml
            plugins:
                - markdownextradata:
                    data: _data/YOUR_FILE
            ```
        5. Reference this variable in other markdown files with `{{ my_dry_vars.tower_fe_image }}`.

- [mkdocs-same-dir](https://github.com/oprypin/mkdocs-same-dir)
    - Enable MkDocs to build with `mkdocs.yml` inside the `/docs` folder. Once listed as a `plugins` entry in the `mkdocs.yml`, no further action is needed.