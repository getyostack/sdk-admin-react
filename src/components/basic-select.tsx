import React from "react";
import {OptionUnstyled, SelectUnstyled} from "@mui/base";

interface Props {
    name: string;
    value: any;
    defaultValue?: any;
    label: string;
    onChange: (value: any, name: string, config: {[key: string]: any}) => void;
    options: Array<{name: string; value: any; disabled?: boolean}>;
}

export const BasicSelect: React.FC<Props> = (props) => {
    const options = props.options || [];

    const handleChange = (value: any) => {
        props.onChange(value, props.name, {[props.name]: value});
    };

    return (
        <div className='ys-basic-select-editor'>
            <label>
                {props.label}
            </label>
            <SelectUnstyled value={props.value}
                            defaultValue={props.defaultValue}
                            onChange={handleChange}
            >
                {options.map(option =>
                    <OptionUnstyled key={option.name}
                                    value={option.value}
                                    label={option.name}
                                    disabled={option.disabled}>
                        {option.name}
                    </OptionUnstyled>
                )}
            </SelectUnstyled>
        </div>
    );
}