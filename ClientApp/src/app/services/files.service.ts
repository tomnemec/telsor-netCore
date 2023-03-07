import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result as string;
      this.saveFileToAssets(contents, file.name);
    };
    reader.readAsText(file);
  }

  saveFileToAssets(contents: string, filename: string) {
    const url = `https://localhost:7129/assets/${filename}`;
    this.http.put(url, contents, { responseType: 'text' }).subscribe(
      () => console.log(`Saved file ${filename} to assets folder`),
      error => console.error(`Error saving file ${filename} to assets folder: ${error}`)
    );
  }
}