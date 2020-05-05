import { trigger, style, query, transition, group, animate } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    // Transition for all state changes
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'fixed', width: '100%' })
        , { optional: true }),
      group([
        query(':enter', [
          // On enter, fade in container
          query('.c', [
            style({ opacity: 0 }),
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true }),
        query(':leave', [
          // On leave, fade out container
          query('.c', [
            style({ opacity: 1 }),
            animate('0.3s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
      ])
    ])
]);
