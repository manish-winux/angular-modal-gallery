/*
 * Copyright (C) 2015-2017 Stefano Cappa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Image } from './modal-gallery.component';
import { GalleryComponent } from './gallery.component';

let comp: GalleryComponent;
let fixture: ComponentFixture<GalleryComponent>;

const IMAGES: Array<Image> = [
  new Image(
    './app/assets/images/gallery/img1.jpg',
    null, // no thumb
    null, // no description
    'http://www.google.com'
  ),
  new Image(
    './app/assets/images/gallery/img2.png', // example with a PNG image
    null, // no thumb
    'Description 2',
    null // url
  ),
  new Image(
    './app/assets/images/gallery/img3.jpg',
    './app/assets/images/gallery/thumbs/img3.png', // example with a PNG thumb image
    'Description 3',
    'http://www.google.com'
  ),
  new Image(
    './app/assets/images/gallery/img4.jpg',
    null, // no thumb
    'Description 4',
    'http://www.google.com'
  ),
  new Image(
    './app/assets/images/gallery/img5.jpg',
    './app/assets/images/gallery/thumbs/img5.jpg',
    null, // no description
    null // url
  ),
  new Image(
    './app/assets/images/gallery/img5.jpg',
    undefined, undefined, undefined
  ),
  new Image(
    './app/assets/images/gallery/img5.jpg',
    null, null, null
  )
];

function initTestBed() {
  TestBed.configureTestingModule({
    declarations: [GalleryComponent]
  }); // not necessary with webpack .compileComponents();

  fixture = TestBed.createComponent(GalleryComponent);
  comp = fixture.componentInstance;

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

describe('GalleryComponent', () => {
  beforeEach(() => initTestBed());

  it('can instantiate it', () => expect(comp).not.toBeNull());

  describe('---YES---', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display the gallery of thumbnails', () => {
      updateInputs(IMAGES, true);
      const element: DebugElement = fixture.debugElement;

      const imgs: DebugElement[] = element.queryAll(By.css('img'));

      // because it will be added to the DOM only if image and image.img are valid
      expect(imgs.length).toBe(IMAGES.length);

      expect(imgs[0].properties.src).toBe(IMAGES[0].img);
      expect(imgs[0].properties.alt).toBe('');
      expect(imgs[1].properties.src).toBe(IMAGES[1].img);
      expect(imgs[1].properties.alt).toBe(IMAGES[1].description);
      expect(imgs[2].properties.src).toBe(IMAGES[2].thumb);
      expect(imgs[2].properties.alt).toBe(IMAGES[2].description);
      expect(imgs[3].properties.src).toBe(IMAGES[3].img);
      expect(imgs[3].properties.alt).toBe(IMAGES[3].description);

      expect(imgs[4].properties.src).toBe(IMAGES[4].thumb);
      expect(imgs[4].properties.alt).toBe('');
      expect(imgs[5].properties.src).toBe(IMAGES[5].img);
      expect(imgs[5].properties.alt).toBe('');
      expect(imgs[6].properties.src).toBe(IMAGES[6].img);
      expect(imgs[6].properties.alt).toBe('');

      // comp.show.subscribe((out: number) => {
      //   imgs[0].triggerEventHandler('click', null);
      //   expect(out).toBe(1);
      //   imgs[1].triggerEventHandler('click', null);
      //   expect(out).toBe(2);
      //   imgs[2].triggerEventHandler('click', null);
      //   expect(out).toBe(2);
      //   imgs[3].triggerEventHandler('click', null);
      //   expect(out).toBe(4);
      //   imgs[4].triggerEventHandler('click', null);
      //   expect(out).toBe(4);
      //   imgs[5].triggerEventHandler('click', null);
      //   expect(out).toBe(5);
      //   imgs[6].triggerEventHandler('click', null);
      //   expect(out).toBe(6);
      // });
    });
  });

  describe('---NO---', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should not display the gallery of thumbnails', () => {
      // ignore tslint errors
      // I made this test to be sure to verify the behaviour also with these edge cases
      updateInputs([
        new Image(undefined, undefined, undefined, undefined),
        new Image(null, null, null, null),
        null,
        undefined
      ], true);

      const element: DebugElement = fixture.debugElement;
      const imgs: DebugElement[] = element.queryAll(By.css('img'));

      // because it will be added to the DOM only if image and image.img are valid
      expect(imgs.length).toBe(0);
    });
  });
});

function updateInputs(images: Array<Image>, showGallery: boolean) {
  comp.images = images;
  comp.showGallery = showGallery;
  fixture.detectChanges();
}