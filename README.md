# React A11yDialog

react-a11y-dialog is a React component for [a11y-dialog](https://github.com/edenspiekermann/a11y-dialog) relying on [React portals](https://reactjs.org/docs/portals.html) to ease the use of accessible dialog windows in React applications. This component does not render anything on the server, and waits for the client bundle to kick in to render the dialog through the React portal.

This is a fork of [Hugo Giraudel's](https://github.com/HugoGiraudel/react-a11y-dialog) project ported over to TypeScript and includes any minor changes/improvements I needed. Version 1.0.0 of this project is the equivalent of what would be react-a11y-dialog 4.1.1, meaning this project can be a drop in replacement.

## Changes in this Fork

- Includes TypeScript definition file
- Added new `onClose()` callback to the `Dialog` component to allow for notifications of when a dialog was closed.

## Install

```
npm install --save @allejo/react-a11y-dialog
```

## Example

```jsx
import * as React from 'react';
import { Dialog, A11yDialog } from '@allejo/react-a11y-dialog';

class MyComponent extends React.Component {
  private dialog?: A11yDialog;

  handleClick = () => {
    this.dialog && this.dialog.show()
  }

  render () {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Open the dialog
        </button>

        <Dialog
          id="my-accessible-dialog"
          appRoot="#main"
          dialogRoot="#dialog-root"
          dialogRef={(dialog) => (this.dialog = dialog)}
          title="The dialog title"
          onClose={() => console.log('I was closed!')}
        >
          <p>Some content for the dialog.</p>
        </Dialog>
      </div>
    )
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('main')
)
```

```html
<!doctype html>
<html lang="en">
  <body>
    <div id="main">
      <!-- Container in which the entire React application is rendered. -->
    </div>
    <div id="dialog-root">
      <!-- Container in which dialogs are rendered through a React portal. -->
    </div>
  </body>
</html>
```

## API

Take a look at the `Props` interface in the [`index.tsx`](./index.tsx) for all of the available props and their relevant documentation.
