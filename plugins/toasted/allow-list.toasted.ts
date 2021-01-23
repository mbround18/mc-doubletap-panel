import {IToasted} from '~/plugins/toasted/toasted.interface';

export const allowList: IToasted = {
  toggleOn: {
    target: 'server-settings.component.action.whitelist.on',
    type: 'success'
  },
  toggleOff: {
    target: 'server-settings.component.action.whitelist.off',
    type: 'success'
  },
  addPlayerSuccess: {
    target: 'whitelist.toast.add.success',
    type: 'success'
  },
  addPlayerFailure: {
    target: 'whitelist.toast.add.success',
    type: 'error'
  },
  removePlayerSuccess: {
    target: 'whitelist.toast.remove.success',
    type: 'success'
  },
  removePlayerFailure: {
    target: 'whitelist.toast.remove.success',
    type: 'error'
  }
};
