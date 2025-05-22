"use client";

import React, { Suspense } from 'react';
import NewTripDetailsPageClient from './NewTripDetailsPageClient';

const NewTripDetailsPage = () => {
  return (
    <Suspense>
      <NewTripDetailsPageClient />
    </Suspense>
  );
};

export default NewTripDetailsPage;
