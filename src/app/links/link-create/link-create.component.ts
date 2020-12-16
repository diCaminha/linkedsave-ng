import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Link } from 'src/app/models/link';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LinksService } from '../links.service';

@Component({
  styleUrls: ['./link-create.component.css'],
  selector: 'ls-link-create',
  templateUrl: './link-create.component.html',
})
export class LinkCreateComponent implements OnInit {
  newLink = 'NO CONTENT';
  isLoading: boolean = false;
  linkForm: FormGroup;
  linkPreview: Link = null;

  constructor(
    private linksService: LinksService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.linkForm = this.formBuilder.group({
      linkUrl: ['', Validators.required],
    });
  }

  loadPreview() {
    this.linkForm.controls['linkUrl'].disable();
    this.isLoading = true;
    if (!this.isValidUrl()) {
      this.isLoading = false;
      this.linkForm.controls['linkUrl'].enable();
      this.linkForm.controls['linkUrl'].setErrors({ incorrect: true });
      return;
    }

    this.linksService.getMetadataLink(this.linkForm.value['linkUrl']).subscribe(
      (result) => {
        this.linkPreview = result.data;
        this.isLoading = false;
      },
      (err) => {
        this.linkPreview = null;
        this.isLoading = false;
      }
    );
  }

  save() {
    this.linkForm.controls['linkUrl'].enable();
    this.isLoading = true;
    if (this.linkForm.invalid) {
      return;
    }

    if (!this.isValidUrl()) {
      this.isLoading = false;
      this.linkForm.controls['linkUrl'].enable();
      this.linkForm.controls['linkUrl'].setErrors({ incorrect: true });
      return;
    }

    const link: Link = {
      id: null,
      title: null,
      linkUrl: this.linkForm.value['linkUrl'],
      source: null,
      description: null,
      image: null,
      logo: null,
      read: false,
      userId: null,
    };
    this.linksService.addLink(link).subscribe(
      (res) => {
        this.snackbarService.openSnackBarSuccess('Link saved with success!');
        this.linksService.linkAdded(res);
      },
      (err) => {
        this.snackbarService.openSnackBarError(
          'Something went wrong saving the link'
        );
      }
    );
  }

  isValidUrl() {
    try {
      new URL(this.linkForm.value['linkUrl']);
    } catch (_) {
      return false;
    }

    return true;
  }

  getErrorMessage() {
    return 'Invalid URL. Please paste a correct link.';
  }

  clearLink() {
    this.linkForm.controls['linkUrl'].enable();
    this.linkPreview = null;
    this.linkForm.reset();
  }
}
