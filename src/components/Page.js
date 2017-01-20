// @flow
import React from 'react';
import style from './Page.css';

export default function ({ title, subtitle, children}) {
  return (
    <div className={style.page}>
      <p className={style.title}>{ title }</p>
      <p className={style.subTitle}>{ subtitle }</p>
      { children }
    </div>
  )
}
