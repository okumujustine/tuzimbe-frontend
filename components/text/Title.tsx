import React from 'react'


interface Props {
    text: string
}
function Title(props: Props): JSX.Element {
    return (
        <div>
            <h5 className="text-xl py-4">{props.text}</h5>
        </div>
    )
}

export default Title