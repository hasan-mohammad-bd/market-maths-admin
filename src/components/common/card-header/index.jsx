import React from 'react';

import './styles.scss';

const CardHeader = ({ prefixIcon, heading, actions }) => {
  return (
    <header className="common-card-header">
      {prefixIcon && <section className="prefix-icon-container">{prefixIcon}</section>}
      {heading && <section className="heading-container">{heading}</section>}
      {actions && <section className="actions-container">{actions}</section>}
    </header>
  );
};

export default CardHeader;
