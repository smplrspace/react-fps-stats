# React FPS Stats

## Graphics Performance Monitor for React

Forked from https://github.com/sebslomski/react-stats, inspired by https://github.com/mrdoob/stats.js.

### Screenshots

![FPS](http://i.imgur.com/nqcXluS.png)

### Usage

```javascript
import React from "react";
import { render } from "react-dom";
import FPSStats from "react-fps-stats";

const App = () => {
  return (
    <div>
      <h2 style={{ marginTop: 60 }}>Minimal example using react-fps-stats</h2>
      <FPSStats />
    </div>
  );
};

render(<App />, document.body);
```

Try it on [CodeSandbox](https://codesandbox.io/embed/github/tibotiber/react-fps-stats-example/tree/master/).

### Optional Props

By default, the meter is fixed positioned in the top left of the screen. You can pass the optional props `top`, `right`, `bottom` & `left` to overrride that positioning. Each prop maps to the css values and can use either string or number format. `top` and `left` have values by default, so pass `'auto'` as their values if you want to use `bottom` or `right` values.

Graph height and the graph width can be set via the `graphHeight` and `graphWidth` props.

## Alternatives

If you are only using this for development purpose and your users don't need to see it, you can consider using the [Chrome Devtools FPS Meter](https://developer.chrome.com/devtools/docs/rendering-settings#show-fps%20meter).

## Contributing

This is a tiny library with little activity, no process, just reach out ;)

<details>
<summary>Publish process</summary>
Just a reminder for the maintainer ;)

- run `yarn build`
- bump version
- commit / push / merge PR
- tag version `v__` to create release
- add changelog to release note
- run `npm publish` from dev host
  </details>
