export const componentDefault = (name) => {
    return(
`import React from 'react';
import styles from './${name}.module.scss'

export type ${name}Props = {}

export const ${name} = (props: ${name}Props) => {
    const {} = props;

    return (<div className={styles.container}></div>);
}   
`
    )

}