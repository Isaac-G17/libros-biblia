import { Injectable, inject } from '@angular/core';
import { ProgressService } from './progress.service';

export type SoundKind = 'correct' | 'wrong' | 'done';

// Notas suaves; el "error" baja de tono con delicadeza (nunca castiga).
const NOTES: Readonly<Record<SoundKind, readonly number[]>> = {
  correct: [660, 880],
  wrong: [330, 262],
  done: [523, 659, 784],
};

/** Sonidos sintetizados con Web Audio: sin archivos, funcionan offline. */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private readonly progress = inject(ProgressService);
  private context: AudioContext | null = null;

  play(kind: SoundKind): void {
    if (!this.progress.soundEnabled()) return;
    try {
      this.context ??= new AudioContext();
      const context = this.context;
      if (context.state === 'suspended') void context.resume();
      NOTES[kind].forEach((frequency, i) => this.tone(context, frequency, context.currentTime + i * 0.12));
    } catch {
      // Sin audio disponible: la app sigue funcionando.
    }
  }

  private tone(context: AudioContext, frequency: number, start: number): void {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.15, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.2);
  }
}