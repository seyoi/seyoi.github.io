import { GetServerSideProps } from 'next';
import cookies from 'next-cookies';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async context => {
  const { accessToken } = cookies(context);

  return {
    props: {
      accessToken,
    },
  };
};

export default function Page({ accessToken }) {
  return (
    <div>
      <p>Access Token: {accessToken}</p>
    </div>
  );
}
