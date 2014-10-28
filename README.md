Markdown diff
=============

Markdown diff, or mddiff, is a tool to diff two markdown files. It construct
an [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree) for both files and
then compute the diff on those trees.

Usage
-----

Install nodejs and then run:

```
bin/mddiff file1.md file2.md
```

Building from source
--------------------

```
npm install --global gump
npm install .
gulp
```

Credit
------

* John Gruber, for [Markdown](http://daringfireball.net/projects/markdown/)
* John MacFarlane and the CommonMark crew, for [CommonMark](http://commonmark.org/)

Copyright
---------

The code is licensed as MIT. See the MIT-LICENSE file for the full license.

♡2014 by Bruno Michel. Copying is an act of love. Please copy and share.
