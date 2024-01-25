import {useSelector} from 'react-redux';
import {useAppDispatch} from '../state/hooks';
import {RootState} from '../state/store';
import {darkMode, lightMode} from '../state/slices/theme/theme';

export const useColors = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useAppDispatch();
  const {colors, defaultMode} = useSelector((state: RootState) => state.theme);

  const toggleTheme = () => {
    return dispatch(defaultMode === 'LIGHT' ? darkMode() : lightMode());
  };

  return {colors, toggleTheme};
};
