import create from 'zustand';
import utils from '../utils.js';

const [useZ] = create((set, get) => ({
  /****************************************************************************
   * DATA
   ****************************************************************************/
  user: null,
  setUser: user => set({user, waifus: user.waifus}),
  incrementGems: gems =>
    set({user: {...get().user, gems: get().user.gems + gems}}),
  exercises: null,
  reloadExercises: async () =>
    set({
      exercises: (await utils.getExercises()).slice(0, 50),
    }),
  waifus: null,
  setWaifus: waifus => set({waifus, user: {...get().user, waifus}}),
  reloadUser: async () => {
    const data = await utils.getUser();
    set({
      user: data,
      waifus: data.waifus,
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
