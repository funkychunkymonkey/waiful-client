import create from 'zustand';
import utils from './utils.js';

const [useZ] = create((set, get) => ({
  /****************************************************************************
   * DATA
   ****************************************************************************/
  exercises: null,
  reloadExercises: async () =>
    set({
      exercises: (await utils.getExercises()).slice(0, 50),
    }),
  waifus: null,
  reloadWaifus: async () => {
    set({
      waifus: await utils.getWaifus(),
    });
  },

  /****************************************************************************
   * WAIFU OVERLAY
   ****************************************************************************/
  overlayIsVisible: false,
  overlayOptions: {},
  setOverlayIsVisible: value => {
    set({overlayIsVisible: value});
  },
  popUpWaifu: options => {
    let waifu = null;

    // generate waifu
    if (options.waifu !== undefined) {
      waifu = options.waifu;
    } else {
      const faves = get().waifus.filter(x => x.isFavorite);
      waifu = faves.length
        ? faves[Math.floor(Math.random() * faves.length)]
        : null;
    }

    // if it's a generic dialogue with no waifu, return immediately
    if (!options.gems && !waifu) return;

    // otherwise pop
    set({
      overlayIsVisible: true,
      overlayOptions: {
        ...options,
        waifu,
      },
    });
  },
}));

export default useZ;
