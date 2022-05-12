![Tabix Logo](https://tabix.io/img/LogoTabix22Icon.png?utm_source=git)

Open source simple business intelligence application and sql editor tool for Clickhouse.

## Install

Not need, open in browser http://dash.tabix.io/

### If need install

```bash
# Install NodeJS > v17.X, npm, yarn 

git clone https://github.com/tabixio/tabix.git
cd tabix
git checkout master

# ----
# For use directory /node-modules/ add line to .yarnrc.yml, Tabix now not support PnP / Yarn


echo 'nodeLinker: node-modules' > .yarnrc.yml


# Yarn setup 
yarn set version 3.1.1
yarn -v


# Install js libs
yarn install

# Run on http://0.0.0.0:9000/  
yarn start

# Build html+js to /dist/ 
yarn build


```

## Requirements

* Clickhouse server version up V19
* No SSL Clickhouse port
* Google Chrome
* Not readonly Clickhouse user ( can readonly=2 ) [note](https://tabix.io/doc/Requirements/#note)

## License

Copyright 2022 Tabix LLC Licensed under the Apache License, Version 2.0
