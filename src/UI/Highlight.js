import React from 'react';
import classnames from 'classnames';


export default function Highlight({children, className, ...rest}) {
// calculate the css class name

    return (
        <div className={classnames('highlight', className, 'shadow-lg')}
                {...rest}
        >
            {children}
        </div>
    )
}