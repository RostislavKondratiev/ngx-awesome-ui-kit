import { animate, state, style, transition, trigger } from '@angular/animations';

// export const arrowPosition = trigger('arrowPosition', [
//   state('none', style({'opacity': 0})),
//   state('asc', style({'transform': 'rotate(0deg)'})),
//   state('desc', style({'transform': 'rotate(180deg)'})),
//   transition('desc => none', [style({'opacity': 0}), animate(3000)]),
//   transition('asc <=> desc', animate(300))
// ]);

export const arrowPosition = trigger('arrowPosition', [
  transition('void => *', [
    style({opacity: 0}),
    animate(100, style({opacity: 1}))
  ]),
  transition('* => void', [
    style({opacity: 1}),
    animate(100, style({opacity: 0}))
  ]),
  state('asc', style({transform: 'rotate(0deg)'})),
  state('desc', style({transform: 'rotate(180deg)'})),
  transition('asc <=> desc', animate(300))
]);
