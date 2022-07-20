import React, {PropsWithChildren, ReactNode, useState} from "react";
import {MenuUnstyled, MenuUnstyledActions} from "@mui/base";

interface Props {
    open?: boolean;
    onClose?: () => void;
    anchorEl?: HTMLElement;
    triggerContent?: ReactNode;
    triggerClassName?: string;
    className?: string;
}

export const Menu: React.FC<PropsWithChildren<Props>> = (props) => {
    const [isOpen, setOpen] = useState(Boolean(props.open));
    const [anchorEl, setAnchorEl] = React.useState<any>(props.anchorEl);
    const menuActions = React.useRef<MenuUnstyledActions>(null);

    const toggle = () => {
        setOpen(!isOpen);
    };

    const close = () => {
        setOpen(false);
        if (props.onClose) {
            props.onClose();
        }
    };

    return (
        <>
            {!props.anchorEl && props.triggerContent &&
                <button ref={anchorEl}
                        type='button'
                        onClick={toggle}
                        className={`ys-menu-trigger ${props.triggerClassName || ''}`}
                        aria-controls={isOpen ? 'simple-menu' : undefined}
                        aria-expanded={isOpen || undefined}
                        aria-haspopup="menu"
                >
                    {props.triggerContent}
                </button>
            }

            <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                onClose={close}
                anchorEl={anchorEl}
                componentsProps={{ listbox: { className: 'ys-menu-listbox' } }}
                className={`ys-menu ${props.className || ''}`}
            >
                {React.Children.map(props.children, (child, index) =>
                    <li key={index} onClick={close}>
                        {child}
                    </li>
                )}
            </MenuUnstyled>
        </>
    );
}