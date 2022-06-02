import React from 'react';
import styles from './Pricing.module.scss';

export const Pricing = (props) => {
    return (
        <div className={styles.pricingMain}>
            <div className={styles.pricingContainer}>
                <div className={styles.padding}>
                    <div className={styles.card}>
                        <h1 className={styles.h1Name}>Bronze</h1> <p>Branding on a budget</p>{' '}
                        <span className={styles.price}>US$299</span>
                    </div>
                    <div className={styles.card}>
                        <h1>Bronze</h1> <p>Branding on a budget</p>{' '}
                        <span className={styles.price}>US$299</span>
                    </div>
                    <div className={styles.card}>
                        <h1>Bronze</h1> <p>Branding on a budget</p>{' '}
                        <span className={styles.price}>US$299</span>
                    </div>
                    <div className={styles.card}>
                        <h1>Bronze</h1> <p>Branding on a budget</p>{' '}
                        <span className={styles.price}>US$299</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
