# React PowerBI Component

This is to get you quickly embed your powerbi reports to your React Application.

Right now (before v1), it's very much a work in progress.  Please submit your issues.

## How to Use

```jsx
import React, { Component } from 'react'
import PowerbiEmbedded from 'react-powerbi'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <PowerbiEmbedded
          id={`${YOUR_REPORT_ID}`}
          embedUrl={`${YOUR_EMBED_URL}`}
          accessToken={`${YOUR_EMBED_TOKEN}`}
          filterPaneEnabled={false}
          navContentPaneEnabled={false}
          pageName={`${YOUR_PAGE_ID}`}
          embedType={`${EMBED_TYPE}`}
          width='600px'
          height='900px'
        />
      </div>
    )
  }
}

export default App
```
#### Mobile Optimization
  You only need to add **mobile** prop as boolean. 

  That set a configuration `{ layoutType: models.LayoutType.MobilePortrait }`.

  Check this [reference](https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-For-Mobile)

#### Embed Type
The embed type variable allows you to pass in the requested PowerBI "Type", be that a `report`, `dashboard` or `tile`. See [reference](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_src_embed_.iembedconfigurationbase.html#type). By default, `report` is selected.

## TODO
- [ ] Add .d.ts file for typescript
