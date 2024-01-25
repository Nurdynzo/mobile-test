import File from '@/types/file';
import {logThis} from './logThis';

export const getFormData = (object: {
  [x: string]: Blob | File | string | number | boolean;
}): FormData | undefined => {
  try {
    const formData: FormData = new FormData();

    Object.keys(object).forEach(key => {
      const value =
        typeof object[key] === 'number' ? object[key].toString() : object[key];
      formData.append(key, value as Blob | File | string);
    });

    return formData;
  } catch (error) {
    logThis('Form data error===', error);
  }
};
