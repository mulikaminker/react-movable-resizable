# react-movable-resizable

>

[![NPM](https://img.shields.io/npm/v/react-movable-resizable.svg)](https://www.npmjs.com/package/react-movable-resizable
) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### storybook

[click here](https://mulikaminker.github.io/react-movable-resizable/)


## Install

```bash
npm install --save react-movable-resizable

```

## Usage

```tsx
import * as React from 'react'

import ReactMovableResizable from 'react-movable-resizable'

class Example extends React.Component {
  render () {
    return (
      <ReactmovableResizable />
    )
  }
}
```

## Props

```javascript

 {
   useParentBounds: boolean | default: false,
   maxWidth: number,
   maxHeight: number,
   className: string,
   children: React.ReactNode,
    hideHandlers: boolean,
    hideBorder: boolean
 }

```

## License

MIT © [mulikaminker](https://github.com/mulikaminker)
