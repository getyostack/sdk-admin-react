import React, {PropsWithChildren} from "react";

interface Props {
    title: string;
    className?: string;
}

export const SettingsSection: React.FC<PropsWithChildren<Props>> = (props) => {
    const className = props.className ? props.className + ' ys-settings-section' : 'ys-settings-section';

    return (
        <div className={className}>
            <div className='section-header'>
                {props.title}
            </div>
            {props.children}
        </div>
    );
}