import React from 'react';
import {Helmet} from 'react-helmet';
import Document, { Main, NextScript } from 'next/document';
import propTypes from 'prop-types';

class MyDocument extends Document {
    static getInitialProps(context) {
        const page = context.renderPage((App) => (props) => <App {...props} />);
        return {...page, helmet: Helmet.renderStatic()};
    }
    render() {
        const { htmlAttributes, bodyAttributes, ...helmet} = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        console.log(helmet);
        return (
            <html {...htmlAttrs}>
                <head>
                    {Object.values(helmet).map(el=>el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        )
    }
}

MyDocument.propTypes = {
    helmet: propTypes.object.isRequired
}

export default MyDocument;