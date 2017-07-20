import { Howl } from 'howler';

export interface State {
  notificationsEnabled?: boolean;
  soundEnabled?: boolean;
  sound?: Howl;
  soundType?: string;
};

export const initialState: State = {
  notificationsEnabled: false,
  soundEnabled: true,
  sound: null,
  soundType: null
};
