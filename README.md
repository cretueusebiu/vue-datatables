# vue-datatables

> A Vue 2.0 component for [DataTables](https://datatables.net) [WIP].

## Installation

``` bash
npm install --save vue-datatables jquery datatables.net-bs datatables.net-responsive-bs
```

For Webpack, add the following loader:

```js
{
  test: /datatables\.net.*/,
  loader: 'imports?define=>false'
}
```

## Usage

```
import Vue from 'vue'
import $ from 'jquery'
require('datatables.net-bs')(window, $)
// import VueResource from 'vue-resource'
import VueDataTables from 'vue-datatables'

import App from './App.vue'

// Vue.use(VueResource)
Vue.use(VueDataTables)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

See [demo/src/App.vue](demo/src/App.vue).
