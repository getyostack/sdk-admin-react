import React from "react";
import {SwitchUnstyled} from "@mui/base";

interface Props {
    name: string;
    checked?: boolean;
    label: string;
    disabled?: boolean;
    onChange: (value: boolean, name: string, config: {[key: string]: any}) => void;
}

export const Switch: React.FC<Props> = (props) => {

    const handleChange = (ev: any) => {
        const checked = ev.target.checked;
        props.onChange(checked, props.name, {[props.name]: checked});
    };

    return (
        <div className='ys-switch-editor'>
            <label>
                {props.label}
            </label>
            <SwitchUnstyled checked={!!props.checked}
                            disabled={!!props.disabled}
                            onChange={handleChange}
            />
        </div>
    );
}