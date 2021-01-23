import Vue from 'vue';
import Toasted from 'vue-toasted';
import {player} from '~/plugins/toasted/player.toasted';
import {allowList} from '~/plugins/toasted/allow-list.toasted';
import translatedCopy from '~/locale/translated-copy';
import {startCase} from 'lodash';
import {error} from '~/plugins/toasted/error.toasted';

Vue.use(Toasted);

function registerToastedNotification(
  namespace: string,
  object: Record<string, unknown>
) {
  Object.entries(object).forEach(
    // @ts-expect-error
    ([key, {target, message, type}]: [
      string,
      {target?: string; message?: string; type: string}
    ]) => {
      const executionName = `${namespace}${startCase(key)}`.replace(/\s/g, '');
      const executionOptions = {
        type,
        duration: 5000
      };
      if (process.env.NODE_ENV === 'development') {
        console.log('[Toasted][Registering]:', executionName);
      }

      Vue.toasted.register(
        executionName,
        (payload: any) =>
          message ?? translatedCopy(target ?? 'key.not.found', payload),
        executionOptions
      );
    }
  );
}

registerToastedNotification('error', error);
registerToastedNotification('player', player);
registerToastedNotification('allowList', allowList);
