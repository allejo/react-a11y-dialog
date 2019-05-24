const React = require('react')
const ReactDOM = require('react-dom')
const A11yDialog = require('a11y-dialog')
const PropTypes = require('prop-types')

class Dialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMounted: false,
      container: null
    }

    this.initDialog = this.initDialog.bind(this)
    this.close = this.close.bind(this)
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.container !== this.state.container && this.state.container) {
      this.dialog = this.dialog || this.initDialog()
      this.props.dialogRef(this.dialog)
    }
  }

  componentWillUnmount() {
    if (this.dialog) {
      this.dialog.destroy()
    }

    this.props.dialogRef(undefined)
  }

  initDialog() {
    return new A11yDialog(this.state.container, this.props.appRoot)
  }

  close() {
    this.dialog.hide()
  }

  handleRef(element) {
    this.setState({ container: element })
  }

  render() {
    if (!this.state.isMounted) {
      return null
    }

    const { id, classNames } = this.props
    const titleId = this.props.titleId || id + '-title'
    const Element = this.props.useDialog ? 'dialog' : 'div'

    return ReactDOM.createPortal(
      <div id={id} className={classNames.base} ref={this.handleRef}>
        <div
          tabIndex="-1"
          className={classNames.overlay}
          onClick={this.props.role === 'alertdialog' ? undefined : this.close}
        />

        <Element
          role={this.props.role}
          className={classNames.element}
          aria-labelledby={titleId}
        >
          <div className={classNames.document}>
            <button
              type="button"
              aria-label={this.props.closeButtonLabel}
              onClick={this.close}
              className={classNames.closeButton}
            >
              {this.props.closeButtonContent}
            </button>

            <h1 id={titleId} className={classNames.title}>
              {this.props.title}
            </h1>

            {this.props.children}
          </div>
        </Element>
      </div>,
      document.querySelector(this.props.dialogRoot)
    )
  }
}

Dialog.defaultProps = {
  role: 'dialog',
  closeButtonLabel: 'Close this dialog window',
  closeButtonContent: '\u00D7',
  classNames: {},
  dialogRef: () => void 0,
  useDialog: true
  // Default properties cannot be based on other properties, so the default
  // value for the `titleId` prop is defined in the `render(..)` method.
}

Dialog.propTypes = {
  // The `role` attribute of the dialog element, either `dialog` (default) or
  // `alertdialog` to make it a modal (preventing closing on click outside of
  // ESC key).
  role: PropTypes.oneOf(['dialog', 'alertdialog']),

  // The HTML `id` attribute of the dialog element, internally used by
  // a11y-dialog to manipulate the dialog.
  id: PropTypes.string.isRequired,

  // The title of the dialog, mandatory in the document to provide context to
  // assistive technology. Could be hidden (while remaining accessible) with
  // CSS though.
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  // A function called when the component has mounted, receiving the instance
  // of A11yDialog so that it can be programmatically accessed later on.
  // E.g.: dialogRef={(dialog) => (this.dialog = dialog)}
  dialogRef: PropTypes.func,

  // The HTML `id` attribute of the dialog’s title element, used by assistive
  // technologies to provide context and meaning to the dialog window. Falls
  // back to the `${this.props.id}-title` if not provided.
  titleId: PropTypes.string,

  // The HTML `aria-label` attribute of the close button, used by assistive
  // technologies to provide extra meaning to the usual cross-mark. Defaults
  // to a generic English explanation.
  closeButtonLabel: PropTypes.string,

  // The string that is the innerHTML of the close button.
  closeButtonContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),

  // a11y-dialog needs one or more “targets” to disable when the dialog is open.
  // This prop can be one or more selector which will be passed to a11y-dialog
  // constructor.
  appRoot: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,

  // React 16 requires a container for the portal’s content to be rendered
  // into; this is required and needs to be an existing valid DOM node,
  // adjacent to the React root container of the application.
  dialogRoot: PropTypes.string.isRequired,

  // Object of classes for each HTML element of the dialog element. Keys are:
  // - base
  // - overlay
  // - element
  // - document
  // - title
  // - closeButton
  // See for reference: http://edenspiekermann.github.io/a11y-dialog/#expected-dom-structure
  classNames: PropTypes.objectOf(PropTypes.string),

  // Whether to render a `<dialog>` element or a `<div>` element.
  useDialog: PropTypes.bool,

  // The content of the actual Dialog.
  children: PropTypes.node
}

module.exports = Dialog
