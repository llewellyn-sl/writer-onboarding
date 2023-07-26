---
title: Tower documentation style
description: Style elements and rules used in the Tower docs MkDocs project
---

The site theme is based on [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and Material-insiders. Material-insiders requires access to the [Seqera Gitea](https://git.seqera.io/) repository. Once your account has been created, generate an access token to use in your local [MkDocs](./mkdocs.md) build:

1. Select **Settings** from the user top-right drop-down menu.
2. Select the **Applications** tab.
3. Under **Generate New Token**, enter a token name and select **Generate Token**. 
4. Store this token as a `GITEA_TOKEN` environment variable on your machine. 

We favor [GitHub-flavored Markdown](https://github.github.com/gfm/). 

We use MkDocs Material [admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/#removing-the-title) without titles (e.g., `!!! note ""`).

We use [mkdocs-table-reader-plugin](https://timvink.github.io/mkdocs-table-reader-plugin/) to render tables:
    1. Create an external yaml file in a `tables` folder within the content subfolder (e.g., `docs/enterprise/configuration/tables/my_table.yml`)
    2. Add key-value pairs in groups, where each key represents a column name, and each value represents an entry in a row, e.g.:
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
    3. Each unique column name will be rendered in the table, so ensure that all row entries have the same column name keys. The example above shows the structure for two row entries in a table with three columns.
    4. Reference this table in other markdown files with `{{ read_yaml('./tables/my_table.yml')}}` (relevant path to the table from the markdown file where it is being referenced).

We use [mkdocs-markdownextradata-plugin](https://github.com/rosscdh/mkdocs-markdownextradata-plugin) to implement DRY-like variables for values that need to be updated in multiple locations on the site (e.g., the Tower container image URLs):
    1. Create an external yaml file in `/docs/_data/` (e.g., `images.yml`)
    2. Add key-value pairs to the external file (e.g. `tower_fe_image: "cr.seqera.io/private/nf-tower-enterprise/frontend:v23.1.3"`).
    3. Update the `plugins` entry with a path to the file:
        ```yaml
        plugins:
            - markdownextradata:
                data: _data/images.yml
        ```
    4. Reference this variable in other markdown files with `{{ images.tower_fe_image }}`.
