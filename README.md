# React A11yDialog

react-a11y-dialog is a React component for [a11y-dialog](https://github.com/edenspiekermann/a11y-dialog) relying on [React portals](https://reactjs.org/docs/portals.html) to ease the use of accessible dialog windows in React applications.

*Note: for React versions **before** 16, use `react-a11y-dialog@2.0.0`.*

## Install

```
npm install --save react-a11y-dialog
```

## API

* **Property name**: `id`
* **Type**: string
* **Mandatory**: true
* **Default value**: —
* **Description**: The HTML `id` attribute of the dialog element, internally used by a11y-dialog to manipulate the dialog.

---

* **Property name**: `title`
* **Type**: string
* **Mandatory**: true
* **Default value**: —
* **Description**: The title of the dialog, mandatory in the document to provide context to assistive technology. Could be hidden (while remaining accessible) with CSS though.

---

* **Property name**: `dialogRef`
* **Type**: function
* **Mandatory**: true
* **Default value**: —
* **Description**: A function called when the component has mounted, receiving the instance of A11yDialog so that it can be programmatically accessed later on.

---

* **Property name**: `appRoot`
* **Type**: string | string[]
* **Mandatory**: true
* **Default value**: —
* **Description**: The [selector(s) a11y-dialog need](http://edenspiekermann.github.io/a11y-dialog/#javascript-instantiation) to disable when the dialog is open.

---

* **Property name**: `dialogRoot`
* **Type**: string
* **Mandatory**: true
* **Default value**: —
* **Description**: The container for the dialog to be rendered into (React portal’s root).

---

* **Property name**: `titleId`
* **Type**: string
* **Mandatory**: false
* **Default value**: `${this.props.id}-title`
* **Description**: The HTML `id` attribute of the dialog’s title element, used by assistive technologies to provide context and meaning to the dialog window.

---

* **Property name**: `closeButtonLabel`
* **Type**: string
* **Mandatory**: false
* **Default value**: “Close this dialog window”
* **Description**:  The HTML `aria-label` attribute of the close button, used by assistive technologies to provide extra meaning to the usual cross-mark.

---

* **Property name**: `closeButtonContent`
* **Type**: string
* **Mandatory**: false
* **Default value**: `\u00D7` (×)
* **Description**: The string that is the innerHTML of the close button.

---

* **Property name**: `initialHidden`
* **Type**: boolean
* **Mandatory**: false
* **Default value**: true
* **Description**: When rendering the component for the first time, the dialog has not been initialised yet and there is no way to figure whether the dialog should be open or closed on load. This sets the initial value for the `aria-hidden` attribute.

---

* **Property name**: `classNames`
* **Type**: object
* **Mandatory**: false
* **Default value**: {}
* **Description**: Object of classes for each HTML element of the dialog element. Keys are: `base`, `overlay`, `element`, `document`, `title`, `closeButton`. See [a11y-dialog docs](http://edenspiekermann.github.io/a11y-dialog/#expected-dom-structure) for reference.

## Server-side rendering

react-a11y-dialog does not render anything on the server, and waits for the client bundle to kick in to render the dialog through the React portal.

## Example

```jsx
const Dialog = require('react-a11y-dialog')

class MyComponent extends React.Component {
  handleClick = () => {
    this.dialog.show()
  }

  render () {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Open the dialog
        </button>

        <Dialog id="my-accessible-dialog"
                appRoot="#main"
                dialogRoot="#dialog-root"
                dialogRef={(dialog) => (this.dialog = dialog)}
                title="The dialog title">
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
