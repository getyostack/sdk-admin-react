import React, {PropsWithChildren} from "react";

interface Props {
    className?: string
}

export const SettingsGroup: React.FC<PropsWithChildren<Props>> = (props) => {
    const className = props.className ? props.className + ' section-group' : 'section-group';

    return (
        <div className={className}>
            {props.children}
        </div>
    );
}