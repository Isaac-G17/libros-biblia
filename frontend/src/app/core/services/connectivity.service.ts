import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConnectivityService {
  private readonly window = inject(DOCUMENT).defaultView;
  private readonly _online = signal(this.window?.navigator.onLine ?? true);

  readonly online = this._online.asReadonly();

  constructor() {
    this.window?.addEventListener('online', () => this._online.set(true));
    this.window?.addEventListener('offline', () => this._online.set(false));
  }
}