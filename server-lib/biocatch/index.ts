const BIOCATCH_ENDPOINT = 'http://hooks.zapier.com/hooks/catch/1888053/bgwofce';

export async function initBioCatch(customerSessionId: string, userId: string) {
  const requestBody = {
    customerId: 'dummy',
    action: 'init',
    customerSessionId: customerSessionId,
    activityType: 'LOGIN',
    uuid: userId,
    brand: 'SD',
    solution: 'ATO'
  };

  const response = await fetch(BIOCATCH_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  return response.status === 200;
}

export async function getBioCatchScore(
  customerSessionId: string,
  userId: string,
  activityType: string
) {
  const requestBody = {
    customerId: 'dummy',
    action: 'getScore',
    customerSessionId: customerSessionId,
    activityType: activityType,
    uuid: userId,
    brand: 'SD',
    solution: 'ATO'
  };

  const response = await fetch(BIOCATCH_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  return response.status === 200;
}
