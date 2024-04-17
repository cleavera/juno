import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {
  public save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public load(key: string): string | null {
    return localStorage.getItem(key) ?? null;
  }

  public clear(): void {
    localStorage.clear();
  }
}
