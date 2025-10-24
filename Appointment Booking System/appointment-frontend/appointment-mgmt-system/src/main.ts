import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';          // ✅ add /app/
import { AppRoutingModule } from './app/app-routing.module'; // ✅ add /app/
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule, ReactiveFormsModule)
  ]
})
.catch(err => console.error(err));
