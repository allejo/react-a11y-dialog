import * as React from 'react';
import A11yDialog from 'a11y-dialog';

export type DialogRoleType = 'dialog' | 'alertdialog';

export interface DialogProps {
  role?: DialogRoleType;
  id: string;
  title: string | React.ReactElement;
  dialogRef?: (dialog: A11yDialog) => void;
  titleId?: string;
  onClose?: () => void;
  closeButtonLabel?: string;
  closeButtonContent?: string | React.ReactElement;
  appRoot: string | string[];
  dialogRoot: string;
  classNames?: {
    base?: string;
    overlay?: string;
    element?: string;
    document?: string;
    title?: string;
    closeButton?: string;
  };
  useDialog?: boolean;
  children?: React.ReactNode;
}

declare class Dialog extends React.Component<DialogProps, any> {}
export default Dialog;

export {
  A11yDialog
};
