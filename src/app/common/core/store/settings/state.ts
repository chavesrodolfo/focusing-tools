export interface State {
  notificationsEnabled?: boolean;
  soundEnabled?: boolean;
};

export const initialState: State = {
  notificationsEnabled: false,
  soundEnabled: true
};
