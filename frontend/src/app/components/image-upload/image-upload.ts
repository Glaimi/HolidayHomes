import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  standalone: true,
  styleUrl: './image-upload.scss'
})
export class ImageUpload {
  @Input() onChangeCallback!: Function;

  filenames: string[] = [];

  onChange(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        this.filenames[i] = input.files[i].name;
      }

      this.onChangeCallback(input.files);
    }
  }
}
