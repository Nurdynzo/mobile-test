import {ApiServicesAppSnowstormGetsymptomsuggestionGetApiResponse} from '@/state/services/snowstorm';

import {http, HttpResponse} from 'msw';

const getSnowmedSuggestions = http.get(
  `${process.env.API_BASE_URL}/api/services/app/Snowstorm/GetSymptomSuggestion`,
  () => {
    return HttpResponse.json({
      result: [
        {
          id: '1',
          name: 'test1',
        },
        {
          id: '2',
          name: 'test2',
        },
      ] as ApiServicesAppSnowstormGetsymptomsuggestionGetApiResponse,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true,
    });
  },
);

export const snowmedApiHandler = [getSnowmedSuggestions];
