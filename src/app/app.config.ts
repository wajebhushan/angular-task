import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BarChart2, ClipboardList, HelpCircle, Home, Layers, LucideAngularModule, PieChart, Settings, Users } from 'lucide-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({
      Home,
      BarChart2,
      Layers,
      ClipboardList,
      PieChart,
      Users,
      HelpCircle,
      Settings
    }))
  ]
};
