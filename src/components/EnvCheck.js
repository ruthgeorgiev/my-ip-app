import React from 'react';

const EnvCheck = () => {
  console.log('IPIFY API Key:', process.env.REACT_APP_IPIFY_API_KEY);
  console.log('Country Layer API Key:', process.env.REACT_APP_COUNTRY_LAYER_API_KEY);

  return (
    <div>
      Check console for environment variables.
    </div>
  );
};

export default EnvCheck;
s