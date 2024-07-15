#!/bin/sh
node index.js
node injectDiagram.js
npx http-server . -p 8080 -a 0.0.0.0