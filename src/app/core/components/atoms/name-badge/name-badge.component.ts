import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-name-badge',
  imports: [],
  templateUrl: './name-badge.component.html',
  styleUrl: './name-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameBadgeComponent implements OnChanges {
  name = input<string | undefined>('Default Name');
  initials = '';
  badgeColor = '';

  private colors: string[] = ['#0053D6', '#007A33'];

  ngOnChanges(): void {
    this.initials = this.getInitials(this.name() as string);
    this.badgeColor = this.getRandomColor();
  }

  private getInitials(name: string): string {
    const words = name?.split(' ');
    if (!words) {
      return '-';
    }
    if (words?.length > 1) {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else {
      return words[0][0].toUpperCase();
    }
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}
