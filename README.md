Markdown diff
=============

Markdown diff, or mddiff, is a tool to diff two markdown files. It constructs
an [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree) for both files and
then compute the diff on those trees.

Install
-------

Install nodejs and npmjs, then run `npm install -g mddiff`.

Usage
-----

### Diff between two markdown files

```
bin/mddiff file1.md file2.md
```

### Show the abstract syntax tree of a markdown file

```
bin/mdast file.md
bin/mdast --dot file.md | dot -Tpng -o file.md.png
```

Building from source
--------------------

```
npm install --global gulp
npm install .
gulp
npm test
```

Credit
------

* John Gruber, for [Markdown](http://daringfireball.net/projects/markdown/)
* John MacFarlane and the CommonMark crew, for [CommonMark](http://commonmark.org/)

Copyright
---------

The code is licensed as MIT. See the MIT-LICENSE file for the full license.

♡2014 by Bruno Michel. Copying is an act of love. Please copy and share.
