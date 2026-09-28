#!/bin/sh
# Re-render every concept screenshot with the brand renderer.
cd "$(dirname "$0")"
R=../../brand/render.js
for p in index shop product research info; do
  node $R png $p.html shots/$p-1440.png 1440 0 1
  node $R png $p.html shots/$p-390.png 390 0 2
done
node $R png "index.html?open=menu" shots/state-mobile-menu-390.png 390 844 2
node $R png "product.html?open=menu" shots/state-mobile-menu-product-390.png 390 844 2
node $R png "index.html?open=mega&m=shop" shots/state-mega-shop-1440.png 1440 900 1
node $R png "index.html?open=mega&m=books" shots/state-mega-books-1440.png 1440 900 1
node $R png "product.html?open=bag" shots/state-bag-1440.png 1440 900 1
node $R png "shop.html?open=search" shots/state-search-1440.png 1440 900 1
