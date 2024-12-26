export const headersData = async params => {
  return {
    headers: {
      'Content-Type': params?.type ? params.type : '',
      apikey: params?.apikey ? params.apikey : '',
      reqFrom: params?.reqFrom ? params.reqFrom : '',
      suKey: params?.suKey ? params.suKey : '',
      tzstr: params?.tzstr ? params.tzstr : '',
    },
  };
};
