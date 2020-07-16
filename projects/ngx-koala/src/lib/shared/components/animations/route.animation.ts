import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

export const routeAnimations =
               trigger('routeAnimations', [
                 transition('* => *', [
                   query(':enter', style({opacity: 0}), {optional: true}),
                   query(':enter',
                     animate('.5s ease-in', keyframes([
                       style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
                       style({opacity: .5, transform: 'translateY(135px)', offset: .3}),
                       style({opacity: 1, transform: 'translateY(0px)', offset: 1})
                     ]))
                     , {optional: true})
                 ])
               ]);
