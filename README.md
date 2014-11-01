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
mddiff file1.md file2.md
```

### Show the abstract syntax tree of a markdown file

```
mdast file.md
```

If you have graphviz installed, you can visualize the AST as an image:

```
mdast --dot file.md | dot -Tpng -o file.md.png
linux $ xdg-open file.md.png
osx $ open file.md.png

mdast --dot --dark -f 'Droid sans' -s 16 file.md | dot -Tsvg -o file.md.svg
browser file.md.svg
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
