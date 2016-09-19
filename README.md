# SVN-Gradebook
A more friendly Gradebook for CS 225 / 233 / 241

## Install

using terminal cd into your repo, and run the following command

```sh
curl -fSL -R -J -O "https://rawgit.com/rijn/SVN-Gradebook/master/gradebook.html"
svn add gradebook.html
svn propset svn:mime-type text/html *.html
svn ci -m "add gradebook"
```