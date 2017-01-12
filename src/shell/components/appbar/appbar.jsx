import React from 'react';
import { Link } from 'react-router';

import s from './appbar.css';

export default () => (
    <div className={s.appbar}>
        <Link to="/" className={s.title}>React Redux Starter</Link>
        <a className={s.githubLink} href="https://github.com" />
    </div>
);
