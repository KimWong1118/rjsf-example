import { useState, useCallback, useMemo } from 'react';

type UseDialogOptions = {
    initiallyOpen?: boolean,
    disableBackdropClick?: boolean,
};

export type DialogProps = {
    open: boolean;
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

type UseDialogResult = [
    () => void,
    DialogProps,
];

export const useDialog = (options?: UseDialogOptions): UseDialogResult => {
    const [open, setOpen] = useState<boolean>(Boolean(options?.initiallyOpen));
    const disableBackdropClick = Boolean(options?.disableBackdropClick);

    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const closeHandler = useCallback((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        if (disableBackdropClick) {
            if (reason !== 'backdropClick') {
                setOpen(false);
            }
        }
        else {
            setOpen(false);
        }
    }, [disableBackdropClick]);

    const dialogProps = useMemo(() => ({
        open,
        onClose: closeHandler,
    }), [open, closeHandler]);

    return [toggle, dialogProps];
};

export default useDialog;
