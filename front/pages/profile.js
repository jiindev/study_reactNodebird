import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
        <Head>
           <title>Nodebird</title>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.9/antd.css"/>
       </Head>
        <AppLayout>
            <div>프로필</div>
        </AppLayout>
        </>
    )
}

export default Profile;