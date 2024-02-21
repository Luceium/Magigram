#!/usr/bin/env sh
npm run build;

# Copy over static files
cp CNAME build/CNAME;
cp -r nameModel build/nameModel;
cp -r dictionary build/dictionary;

# Deploy to gh-pages
gh-pages -d build;